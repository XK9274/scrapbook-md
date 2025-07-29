import React, { forwardRef } from 'react';
import { Droppable, DroppableProps } from '@hello-pangea/dnd';

interface WithDroppableProps extends Omit<DroppableProps, 'children'> {
  children: React.ReactNode;
}

export const withDroppable = <T extends Record<string, any>>(
  Component: React.ComponentType<T>
) => {
  return forwardRef<HTMLDivElement, T & WithDroppableProps>(
    function WrapperComponent({ children, ...props }, ref) {
      const { droppableId, direction, type, ...componentProps } = props;
      
      return (
        <Droppable
          droppableId={droppableId}
          direction={direction}
          type={type}
        >
          {(provided) => (
            <Component
              ref={provided.innerRef}
              {...provided.droppableProps}
              {...(componentProps as T)}
            >
              {children}
              {provided.placeholder}
            </Component>
          )}
        </Droppable>
      );
    }
  );
};