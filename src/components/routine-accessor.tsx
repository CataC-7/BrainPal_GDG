"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { dailyWorkflows as initialDailyWorkflows } from '@/lib/data';
import type { Routine, Step } from '@/lib/data';
import { ListChecks, Moon, Plus, Sunrise, Users, Bot, Plane, KeyRound } from 'lucide-react';
import { RoutineChecklist } from './routine-checklist';
import { KeyValueActivityPairs } from './key-value-activity-pairs';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { arrayMove } from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export function RoutineAccessor() {
  const [dailyWorkflows, setDailyWorkflows] = useState<Routine[]>(initialDailyWorkflows);
  const { toast } = useToast();
  const [isFlowCompleted, setIsFlowCompleted] = useState(false);

  const morningRoutines = dailyWorkflows.filter(
    (r) => r.category === 'morning'
  );
  const flowRoutines = dailyWorkflows.filter((r) => r.category === 'flow');
  const nightRoutines = dailyWorkflows.filter((r) => r.category === 'night');

  const handleActivityChange = (activityKey: string, value: string) => {
    const activityName = activityKey.charAt(0).toUpperCase() + activityKey.slice(1).replace(/([A-Z])/g, ' $1');
    
    setDailyWorkflows(prevWorkflows => {
      return prevWorkflows.map(workflow => {
        if (workflow.category === 'morning' || workflow.category === 'night') {
          const newSteps = workflow.steps.map(step => {
            if (step.text.startsWith(activityName)) {
              if(value) {
                return { ...step, text: `${activityName}: ${value}` };
              }
              return { ...step, text: activityName };
            }
            return step;
          });
          return { ...workflow, steps: newSteps };
        }
        return workflow;
      });
    });
  };

  const handleNonNegotiablesChange = (value: string) => {
    const tasks = value.split(',').map(task => task.trim()).filter(task => task);
  
    if (tasks.length > 3) {
      toast({
        title: "Input Error",
        description: "Maximum of 3 non-negotiables is allowed.",
        variant: "destructive",
      });
      tasks.length = 3;
    }
  
    const newSteps: Step[] = tasks.map(task => ({ text: `*${task}*`, completed: false }));
  
    setDailyWorkflows(prevWorkflows => {
      const flowRoutineIndex = prevWorkflows.findIndex(workflow => workflow.id === 'dwf-flow');
      if (flowRoutineIndex === -1) return prevWorkflows;

      const newWorkflows = [...prevWorkflows];
      const flowRoutine = newWorkflows[flowRoutineIndex];

      const existingManualSteps = flowRoutine.steps.filter(step => !step.text.startsWith('*'));
  
      let updatedSteps;
      if (value.trim() === '') {
        updatedSteps = existingManualSteps;
      } else {
        updatedSteps = [...existingManualSteps, ...newSteps];
      }

      newWorkflows[flowRoutineIndex] = { ...flowRoutine, steps: updatedSteps };
      
      return newWorkflows;
    });
  };

  const handleStepsUpdate = (routineId: string, newSteps: Step[]) => {
    setDailyWorkflows(prevWorkflows => {
      return prevWorkflows.map(workflow => {
        if (workflow.id === routineId) {
          return { ...workflow, steps: newSteps };
        }
        return workflow;
      });
    });
  };
  
  const handleDragEnd = (event: any, routineId: string) => {
    const {active, over} = event;
    if (active.id !== over.id) {
        setDailyWorkflows((workflows) => {
            const newWorkflows = workflows.map(w => {
                if (w.id === routineId) {
                    const oldIndex = w.steps.findIndex(s => s.text === active.id);
                    const newIndex = w.steps.findIndex(s => s.text === over.id);
                    return {...w, steps: arrayMove(w.steps, oldIndex, newIndex)};
                }
                return w;
            });
            return newWorkflows;
        });
    }
  };

  const handleCompleteFlow = () => {
    setIsFlowCompleted(true);
    setDailyWorkflows(prevWorkflows => {
      return prevWorkflows.map(workflow => {
        if (workflow.id === 'dwf-flow') {
          const completedSteps = workflow.steps.map(step => ({...step, completed: true}));
          return {...workflow, steps: completedSteps};
        }
        return workflow;
      })
    })
  }


  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Daily Workflows Column */}
        <div className="space-y-4">
          <RoutineChecklist
            title="Morning Routine"
            icon={<Sunrise className="text-primary" />}
            routines={morningRoutines}
            onStepsUpdate={handleStepsUpdate}
          />
          <RoutineChecklist
              title="Today's Flow"
              icon={<ListChecks className="text-primary" />}
              routines={flowRoutines}
              onStepsUpdate={handleStepsUpdate}
              isSortable={true}
              onDragEnd={(e) => handleDragEnd(e, 'dwf-flow')}
              canAddTasks={!isFlowCompleted}
              onComplete={handleCompleteFlow}
              isCompleted={isFlowCompleted}
          />
          <RoutineChecklist
            title="Night Routine"
            icon={<Moon className="text-primary" />}
            routines={nightRoutines}
            onStepsUpdate={handleStepsUpdate}
          />
        </div>

        {/* Protocols Column */}
        <div className="space-y-4">
          <KeyValueActivityPairs onActivityChange={handleActivityChange} onNonNegotiablesChange={handleNonNegotiablesChange} isFlowCompleted={isFlowCompleted} />
          <Card className="border bg-card rounded-md">
            <CardHeader className="px-4 pt-4 pb-2 flex-row items-center justify-between">
              <CardTitle className="text-left font-semibold text-base">My Protocols</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Create new
              </Button>
            </CardHeader>
            <CardContent className="px-4 pb-4">
                <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 justify-start px-2 py-1 rounded-md hover:bg-muted/50 cursor-pointer">
                        <Users className="w-4 h-4" />
                        <span>Family Visit Protocol</span>
                    </div>
                    <div className="flex items-center gap-2 justify-start px-2 py-1 rounded-md hover:bg-muted/50 cursor-pointer">
                        <Bot className="w-4 h-4" />
                        <span>Choice Overwhelm Protocol</span>
                    </div>
                    <div className="flex items-center gap-2 justify-start px-2 py-1 rounded-md hover:bg-muted/50 cursor-pointer">
                        <Plane className="w-4 h-4" />
                        <span>Travel Protocol</span>
                    </div>
                </div>
            </CardContent>
          </Card>
          <Card className="border bg-card rounded-md">
            <CardHeader className="px-4 pt-4 pb-2 flex-row items-center justify-between">
              <CardTitle className="text-left font-semibold text-base">My Setup</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
                <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 justify-start px-2 py-1 rounded-md hover:bg-muted/50 cursor-pointer">
                        <Sunrise className="w-4 h-4" />
                        <span>Modify Morning Routine</span>
                    </div>
                    <div className="flex items-center gap-2 justify-start px-2 py-1 rounded-md hover:bg-muted/50 cursor-pointer">
                        <Moon className="w-4 h-4" />
                        <span>Modify Night Routine</span>
                    </div>
                    <div className="flex items-center gap-2 justify-start px-2 py-1 rounded-md hover:bg-muted/50 cursor-pointer">
                        <KeyRound className="w-4 h-4" />
                        <span>Modify Key:Value Activity Pairs</span>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
