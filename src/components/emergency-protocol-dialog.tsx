"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Check, Circle } from 'lucide-react';

type Step = {
  text: string;
  completed: boolean;
};

const initialProtocol = {
  'sensory-safety': [
    { text: 'Turn lights off', completed: false },
    { text: 'Wear headcap', completed: false },
    { text: 'Cover with weighted blanket', completed: false },
    { text: 'Wear headphones', completed: false },
  ],
  'communicate-needs': [
    { text: 'Text low battery emoji to close relatives', completed: false },
    { text: 'Cancel plans (where applicable)', completed: false },
    { text: 'Notify therapist', completed: false },
  ],
};

const ChecklistItem = ({
  step,
  onToggle,
}: {
  step: Step;
  onToggle: (text: string) => void;
}) => (
  <div className="flex items-center gap-3">
    <button
      onClick={() => onToggle(step.text)}
      className={cn(
        'flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors',
        step.completed
          ? 'bg-accent border-accent-foreground/50'
          : 'border-border hover:border-primary bg-background'
      )}
    >
      {step.completed ? (
        <Check className="w-3 h-3 text-accent-foreground" />
      ) : (
        <Circle className="w-2.5 h-2.5 text-muted-foreground/50 fill-current" />
      )}
    </button>
    <span
      className={cn(
        'text-muted-foreground transition-opacity',
        step.completed && 'opacity-50 line-through'
      )}
    >
      {step.text}
    </span>
  </div>
);

export function EmergencyProtocolDialog({ children }: { children: React.ReactNode }) {
  const [protocolSteps, setProtocolSteps] = useState(initialProtocol);

  const handleToggle = (category: keyof typeof initialProtocol, text: string) => {
    setProtocolSteps((prev) => ({
      ...prev,
      [category]: prev[category].map((step) =>
        step.text === text ? { ...step, completed: !step.completed } : step
      ),
    }));
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Emergency Protocol
          </DialogTitle>
          <DialogDescription className="text-center italic">
            For those moments when a shutdown or meltdown is occuring
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">1. Establish sensory safety:</h3>
            <div className="pl-4 space-y-2">
              {protocolSteps['sensory-safety'].map((step) => (
                <ChecklistItem
                  key={step.text}
                  step={step}
                  onToggle={() => handleToggle('sensory-safety', step.text)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">2. Communicate needs:</h3>
            <div className="pl-4 space-y-2">
              {protocolSteps['communicate-needs'].map((step) => (
                <ChecklistItem
                  key={step.text}
                  step={step}
                  onToggle={() => handleToggle('communicate-needs', step.text)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-3">
             <h3 className="font-semibold text-lg">3. Take time to rest</h3>
             <p className="text-muted-foreground pl-4">Once you are feeling better, the re-routing protocol will be there for you to re-plan your day/week</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
