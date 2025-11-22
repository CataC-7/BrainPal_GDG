"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check, Circle } from 'lucide-react';
import type { Routine, Step } from '@/lib/data';

interface RoutineChecklistProps {
  title: string;
  icon: React.ReactNode;
  routines: Routine[];
}

export function RoutineChecklist({ title, icon, routines }: RoutineChecklistProps) {
  const initialSteps = useMemo(() => routines.flatMap(r => r.steps), [routines]);
  const [steps, setSteps] = useState<Step[]>(initialSteps);

  const handleStepToggle = (index: number) => {
    const newSteps = [...steps];
    newSteps[index].completed = !newSteps[index].completed;
    setSteps(newSteps);
  };

  const allCompleted = useMemo(() => steps.every(step => step.completed), [steps]);

  if (steps.length === 0) {
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
        <div className="relative pl-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center mb-4 last:mb-0">
              <div className="absolute left-[3px] w-px h-full bg-border -translate-x-1/2"></div>
              <button
                onClick={() => handleStepToggle(index)}
                className={cn(
                  "absolute left-[3px] -translate-x-1/2 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors",
                  step.completed
                    ? "bg-accent border-accent-foreground/50"
                    : "bg-background border-border hover:border-primary"
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
                  "ml-6 text-muted-foreground transition-opacity",
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