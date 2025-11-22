"use client";

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
    children: React.ReactNode;
    id: string;
    isSortable: boolean;
}

export function SortableItem({ children, id, isSortable }: SortableItemProps) {
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
    return <>{children}</>;
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
