"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check, Circle, GripVertical, PlusCircle } from 'lucide-react';
import type { Routine, Step } from '@/lib/data';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './sortable-item';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface RoutineChecklistProps {
  title: string;
  icon: React.ReactNode;
  routines: Routine[];
  onStepsUpdate: (routineId: string, steps: Step[]) => void;
  isSortable?: boolean;
  onDragEnd?: (event: any) => void;
  canAddTasks?: boolean;
}

export function RoutineChecklist({ title, icon, routines, onStepsUpdate, isSortable = false, onDragEnd, canAddTasks = false }: RoutineChecklistProps) {
  const allSteps = useMemo(() => routines.flatMap(r => r.steps.map(s => ({...s, routineId: r.id}))), [routines]);
  const [newActivity, setNewActivity] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current && allSteps.length > 1 && !isSortable) {
      const items = Array.from(containerRef.current.children).filter(
        (child) => child.getAttribute('data-checklist-item') === 'true'
      );
      if (items.length > 1) {
        const firstItem = items[0] as HTMLElement;
        const lastItem = items[items.length - 1] as HTMLElement;
        const firstCircle = firstItem.querySelector('button');
        const lastCircle = lastItem.querySelector('button');
        if (firstCircle && lastCircle) {
            const height = lastCircle.offsetTop - firstCircle.offsetTop;
            setLineHeight(height);
        }
      } else {
        setLineHeight(0);
      }
    } else {
        setLineHeight(0);
    }
  }, [allSteps, containerRef, isSortable]);
  
  const handleStepToggle = (toggledStepText: string) => {
    const stepToToggle = allSteps.find(s => s.text === toggledStepText);
    if (!stepToToggle) return;
    
    const routine = routines.find(r => r.id === stepToToggle.routineId);
    if (!routine) return;

    const newRoutineSteps = routine.steps.map(step => {
        if(step.text === toggledStepText) {
            return {...step, completed: !step.completed};
        }
        return step;
    });

    onStepsUpdate(stepToToggle.routineId, newRoutineSteps);
  };

  const handleAddNewActivity = () => {
    if (newActivity.trim() === '') return;
    const routine = routines[0];
    if (routine) {
        const newSteps = [...routine.steps, {text: newActivity, completed: false}];
        onStepsUpdate(routine.id, newSteps);
        setNewActivity('');
    }
  }

  const allCompleted = useMemo(() => allSteps.length > 0 && allSteps.every(step => step.completed), [allSteps]);

  if (allSteps.length === 0 && !canAddTasks) {
    return null;
  }
  
  const renderChecklistItem = (step: (Step & {routineId: string})) => (
    <div className="flex items-center mb-4 last:mb-0 relative pl-10" data-checklist-item="true">
      {isSortable && <GripVertical className="absolute left-0 text-muted-foreground/50" />}
      <button
        onClick={() => handleStepToggle(step.text)}
        className={cn(
          "flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors z-10",
          "absolute left-6 transform -translate-x-1/2 top-0",
          step.completed ? "bg-accent border-accent-foreground/50" : "border-border hover:border-primary bg-background"
        )}
      >
        {step.completed ? (
          <Check className="w-4 h-4 text-accent-foreground" />
        ) : (
          <Circle className="w-3 h-3 text-muted-foreground/50 fill-current" />
        )}
      </button>
      <span
        className={cn(
          "text-muted-foreground transition-opacity",
          step.completed && "opacity-50 line-through"
        )}
      >
        {step.text.startsWith('*') && step.text.endsWith('*') ? (
          <span className="italic">{step.text.slice(1, -1)}</span>
        ) : (
          step.text
        )}
      </span>
    </div>
  );

  const checklistContent = (
    <div ref={containerRef} className="relative">
      {!isSortable && lineHeight > 0 && (
         <div 
            className="absolute left-6 transform -translate-x-1/2 w-0.5 bg-border top-[12px]"
            style={{height: `${lineHeight}px`}}
         ></div>
      )}
      {allSteps.map((step) => (
         <SortableItem key={step.text} id={step.text} isSortable={isSortable}>
            {renderChecklistItem(step)}
         </SortableItem>
      ))}
    </div>
  );

  return (
    <Card className={cn(
      "transition-colors duration-300",
      allCompleted && "bg-accent/40 border-accent"
    )}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isSortable ? (
             <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <SortableContext items={allSteps.map(s => s.text)} strategy={verticalListSortingStrategy}>
                    {checklistContent}
                </SortableContext>
            </DndContext>
        ) : checklistContent}
        {canAddTasks && (
            <div className="flex items-center gap-2 mt-4 pl-10 relative">
                 <PlusCircle className="w-6 h-6 absolute left-6 transform -translate-x-1/2 text-muted-foreground/50 top-1/2 -translate-y-1/2" />
                 <Input 
                    placeholder="Add new activity..."
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddNewActivity()}
                    className="h-9 flex-1 bg-transparent"
                 />
                 <Button size="sm" onClick={handleAddNewActivity} variant="ghost">Add</Button>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
