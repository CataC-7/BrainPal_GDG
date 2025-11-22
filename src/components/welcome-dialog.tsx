"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface WelcomeDialogProps {
  open: boolean;
  onNameSubmit: (name: string) => void;
}

export function WelcomeDialog({ open, onNameSubmit }: WelcomeDialogProps) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]" hideCloseButton={true}>
        <DialogHeader>
          <DialogTitle>Hello, welcome to BrainPal.</DialogTitle>
          <DialogDescription>
            Let&apos;s get ready to support yourself when it matters most.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              What is your name?
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type your name here..."
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={!name.trim()}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
