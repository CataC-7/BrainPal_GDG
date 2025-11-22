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
  } = useSortable({id: id, disabled: !isSortable});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  if (!isSortable) {
    return <div>{children}</div>;
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
