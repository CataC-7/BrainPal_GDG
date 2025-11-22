"use client";

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';

interface SortableItemProps {
    children: React.ReactNode;
    id: string;
    isSortable: boolean;
    className?: string;
}

export function SortableItem({ children, id, isSortable, className }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({id: id, disabled: !isSortable});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 0.25s ease',
    zIndex: isDragging ? 1 : 0,
    position: 'relative' as const,
  };
  
  if (!isSortable) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={className}>
      {children}
    </div>
  );
}
