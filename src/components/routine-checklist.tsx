"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check, Circle, PlusCircle, X } from 'lucide-react';
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
  canDeleteItems?: boolean;
  onComplete?: () => void;
  isCompleted?: boolean;
  isEditing?: boolean;
}

export function RoutineChecklist({ 
    title, 
    icon, 
    routines, 
    onStepsUpdate, 
    isSortable = false, 
    onDragEnd, 
    canAddTasks = false, 
    canDeleteItems = false,
    onComplete, 
    isCompleted = false,
    isEditing = false
}: RoutineChecklistProps) {
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
    const routineToUpdate = routines.find(routine => 
        routine.steps.some(s => s.text === toggledStepText)
    );

    if (!routineToUpdate) return;
  
    const newSteps = routineToUpdate.steps.map(step => {
      if (step.text === toggledStepText) {
        return { ...step, completed: !step.completed };
      }
      return step;
    });
  
    onStepsUpdate(routineToUpdate.id, newSteps);
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

  const handleDeleteStep = (stepTextToDelete: string) => {
    const routineToUpdate = routines.find(routine => 
      routine.steps.some(s => s.text === stepTextToDelete)
    );

    if (!routineToUpdate) return;

    const newSteps = routineToUpdate.steps.filter(step => step.text !== stepTextToDelete);
    onStepsUpdate(routineToUpdate.id, newSteps);
  }

  const allCompleted = useMemo(() => allSteps.length > 0 && allSteps.every(step => step.completed), [allSteps]);

  if (allSteps.length === 0 && !canAddTasks) {
    return null;
  }
  
  const renderChecklistItem = (step: (Step & {routineId: string})) => (
    <div className="flex items-center relative pl-12 group" data-checklist-item="true">
      <button
        onClick={() => handleStepToggle(step.text)}
        className={cn(
          "flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors z-10",
          "absolute left-6 transform -translate-x-1/2 top-1/2 -translate-y-1/2",
          step.completed ? "bg-accent border-accent-foreground/50" : "border-border hover:border-primary bg-background",
          (title === "Today's Flow" && !isCompleted) && "cursor-not-allowed"
        )}
        disabled={title === "Today's Flow" && !isCompleted}
      >
        {step.completed ? (
          <Check className="w-4 h-4 text-accent-foreground" />
        ) : (
          <Circle className="w-3 h-3 text-muted-foreground/50 fill-current" />
        )}
      </button>
      <span
        className={cn(
          "text-muted-foreground transition-opacity flex-grow",
          step.completed && "opacity-50 line-through"
        )}
      >
        {step.text.startsWith('*') && step.text.endsWith('*') ? (
          <span className="italic">{step.text.slice(1, -1)}</span>
        ) : (
          step.text
        )}
      </span>
      {canDeleteItems && (
        <Button variant="ghost" size="icon" className="w-6 h-6 rounded-full text-destructive/50 hover:text-destructive hover:bg-destructive/10" onClick={() => handleDeleteStep(step.text)}>
            <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );

  const checklistContent = (
    <div ref={containerRef} className="relative">
      {!isSortable && lineHeight > 0 && allSteps.length > 1 && (
         <div 
            className="absolute left-6 transform -translate-x-1/2 w-0.5 bg-border top-[12px]"
            style={{height: `${lineHeight}px`}}
         ></div>
      )}
      {allSteps.map((step) => (
         <SortableItem key={step.text} id={step.text} isSortable={isSortable && !isCompleted} className="mb-2 last:mb-0">
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
      <CardHeader className="flex-row items-start justify-between">
        <div>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
          {isEditing && (
            <CardDescription className="text-xs italic !mt-0">
              Drag and drop to re-order
            </CardDescription>
          )}
        </div>
        {onComplete && !isCompleted && !isEditing && title === "Today's Flow" && (
          <Button onClick={onComplete} size="sm" variant="outline">Finish List</Button>
        )}
         {isEditing && onComplete && (
          <Button onClick={onComplete} size="sm" variant="outline">Finish Editing</Button>
        )}
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
            <div className="flex items-center gap-2 mt-4 pl-12 relative">
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
