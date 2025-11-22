"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check, Circle } from 'lucide-react';
import type { Routine, Step } from '@/lib/data';

interface RoutineChecklistProps {
  title: string;
  icon: React.ReactNode;
  routines: Routine[];
  onStepsUpdate: (routineId: string, steps: Step[]) => void;
}

export function RoutineChecklist({ title, icon, routines, onStepsUpdate }: RoutineChecklistProps) {
  const allSteps = useMemo(() => routines.flatMap(r => r.steps.map(s => ({...s, routineId: r.id}))), [routines]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    // A timeout is used to ensure all elements are rendered before we calculate the height.
    const timer = setTimeout(() => {
      if (containerRef.current) {
        const items = containerRef.current.children;
        if (items.length > 1) {
          const firstItem = items[0] as HTMLDivElement;
          const lastItem = items[items.length - 1] as HTMLDivElement;
          const firstCircle = firstItem.querySelector('button');
          const lastCircle = lastItem.querySelector('button');
          if (firstCircle && lastCircle) {
             const firstRect = firstCircle.getBoundingClientRect();
             const lastRect = lastCircle.getBoundingClientRect();
             const containerRect = containerRef.current.getBoundingClientRect();
             const height = (lastRect.top - containerRect.top) - (firstRect.top - containerRect.top);
             setLineHeight(height);
          }
        } else {
          setLineHeight(0);
        }
      }
    }, 50); // Increased timeout slightly for stability
  
    return () => clearTimeout(timer);
  }, [allSteps]);


  const handleStepToggle = (toggledStepIndex: number) => {
    const newStepsForRoutine = [...allSteps];
    const toggledStep = newStepsForRoutine[toggledStepIndex];
    
    // Find all steps for the specific routine
    const routineSteps = routines.find(r => r.id === toggledStep.routineId)?.steps || [];
    const newRoutineSteps = routineSteps.map(step => {
        if(step.text === toggledStep.text) {
            return {...step, completed: !step.completed};
        }
        return step;
    });

    onStepsUpdate(toggledStep.routineId, newRoutineSteps);
  };

  const allCompleted = useMemo(() => allSteps.every(step => step.completed), [allSteps]);

  if (allSteps.length === 0) {
    return null;
  }

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
        <div ref={containerRef} className="relative">
           {lineHeight > 0 && (
            <div
                className="absolute left-[12px] w-px bg-border -translate-x-1/2"
                style={{ 
                    top: '12px', // half of the circle height
                    height: `${lineHeight}px` 
                }}
            ></div>
           )}
          {allSteps.map((step, index) => (
            <div key={index} className="flex items-center mb-4 last:mb-0 relative pl-10">
              <button
                onClick={() => handleStepToggle(index)}
                className={cn(
                  "flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors z-10",
                  "absolute left-[0px] bg-background",
                  step.completed
                    ? "bg-accent border-accent-foreground/50"
                    : "border-border hover:border-primary"
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
                {step.text}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
