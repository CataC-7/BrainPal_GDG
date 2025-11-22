"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { dailyWorkflows as initialDailyWorkflows, protocols } from '@/lib/data';
import type { Routine, Step } from '@/lib/data';
import { ListChecks, Moon, Sunrise } from 'lucide-react';
import { RoutineChecklist } from './routine-checklist';
import { KeyValueActivityPairs } from './key-value-activity-pairs';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { arrayMove } from '@dnd-kit/sortable';

export function RoutineAccessor() {
  const [dailyWorkflows, setDailyWorkflows] = useState<Routine[]>(initialDailyWorkflows);
  const { toast } = useToast();

  const morningRoutines = dailyWorkflows.filter(
    (r) => r.category === 'morning'
  );
  const flowRoutines = dailyWorkflows.filter((r) => r.category === 'flow');
  const nightRoutines = dailyWorkflows.filter((r) => r.category === 'night');

  const emergencyProtocols = protocols.filter(
    (p) => p.category === 'emergency'
  );
  const boredomProtocols = protocols.filter((p) => p.category === 'boredom');
  const reroutingProtocols = protocols.filter(
    (p) => p.category === 'rerouting'
  );

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
        description: "Maximum number of items has been inputted",
        variant: "destructive",
      });
      return;
    }

    const newSteps: Step[] = tasks.map(task => ({ text: `*${task}*`, completed: false }));

    setDailyWorkflows(prevWorkflows => {
      return prevWorkflows.map(workflow => {
        if (workflow.id === 'dwf-flow') {
          if (newSteps.length > 0) {
            return { ...workflow, steps: newSteps };
          }
          // If input is empty, revert to default
          const defaultFlow = initialDailyWorkflows.find(w => w.id === 'dwf-flow');
          return defaultFlow ? { ...defaultFlow } : workflow;
        }
        return workflow;
      });
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
          <div>
            <RoutineChecklist
                title="Today's Flow"
                icon={<ListChecks className="text-primary" />}
                routines={flowRoutines}
                onStepsUpdate={handleStepsUpdate}
                isSortable={true}
                onDragEnd={(e) => handleDragEnd(e, 'dwf-flow')}
                canAddTasks={true}
            />
            <p className="text-xs text-muted-foreground italic text-right pr-2 pt-1">Drag and drop to re-order</p>
          </div>
          <RoutineChecklist
            title="Night Routine"
            icon={<Moon className="text-primary" />}
            routines={nightRoutines}
            onStepsUpdate={handleStepsUpdate}
          />
        </div>

        {/* Protocols Column */}
        <div className="space-y-4">
          <KeyValueActivityPairs onActivityChange={handleActivityChange} onNonNegotiablesChange={handleNonNegotiablesChange} />
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem
              value="emergency-protocol"
              className="border border-destructive/50 bg-destructive/10 rounded-md px-4"
            >
              <AccordionTrigger className="text-left font-semibold text-destructive hover:no-underline [&[data-state=open]>svg]:text-destructive">
                Emergency Protocol
              </AccordionTrigger>
              <AccordionContent>
                <ol className="list-inside list-decimal space-y-2 pl-2 text-destructive/90">
                  {emergencyProtocols
                    .flatMap((p) => p.steps)
                    .map((step, index) => (
                      <li key={index}>{step.text}</li>
                    ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="boredom-protocol"
              className="border bg-card rounded-md px-4"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                Boredom Protocol
              </AccordionTrigger>
              <AccordionContent>
                <ol className="list-inside list-decimal space-y-2 pl-2 text-muted-foreground">
                  {boredomProtocols
                    .flatMap((p) => p.steps)
                    .map((step, index) => (
                      <li key={index}>{step.text}</li>
                    ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="rerouting-protocol"
              className="border bg-card rounded-md px-4"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                Re-routing Protocol
              </AccordionTrigger>
              <AccordionContent>
                <ol className="list-inside list-decimal space-y-2 pl-2 text-muted-foreground">
                  {reroutingProtocols
                    .flatMap((p) => p.steps)
                    .map((step, index) => (
                      <li key={index}>{step.text}</li>
                    ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
