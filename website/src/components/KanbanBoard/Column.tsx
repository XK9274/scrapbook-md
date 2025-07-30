import React, { useState, forwardRef } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { KanbanColumn, TaskCard } from './index';
import { Card } from './Card';
import { withDroppable } from './withDroppable';

const ColumnEmptyPlaceholder = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => (
    <div 
      ref={ref} 
      style={{ 
        minHeight: 'inherit', 
        height: 'inherit',
        minHeight: '200px',
        padding: '1rem'
      }} 
      {...props} 
    />
  )
);

const DroppableColumn = withDroppable(ColumnEmptyPlaceholder);

interface DefaultColumnHeaderProps {
  column: KanbanColumn;
  allowRemoveColumn?: boolean;
  onColumnRemove?: (column: KanbanColumn) => void;
  allowRenameColumn?: boolean;
  onColumnRename?: (column: KanbanColumn, newTitle: string) => void;
}

const DefaultColumnHeader: React.FC<DefaultColumnHeaderProps> = ({
  column,
  allowRemoveColumn = true,
  onColumnRemove,
  allowRenameColumn = true,
  onColumnRename
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);

  const handleTitleClick = () => {
    if (allowRenameColumn) {
      setIsEditing(true);
    }
  };

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && title !== column.title) {
      onColumnRename?.(column, title.trim());
    }
    setIsEditing(false);
  };

  const handleTitleCancel = () => {
    setTitle(column.title);
    setIsEditing(false);
  };

  const handleRemove = () => {
    onColumnRemove?.(column);
  };

  return (
    <div className="react-kanban-column-header">
      {isEditing ? (
        <form onSubmit={handleTitleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleCancel}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                handleTitleCancel();
              }
            }}
            autoFocus
            style={{
              background: 'transparent',
              border: '1px solid var(--ifm-color-primary)',
              borderRadius: '4px',
              padding: '0.25rem 0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--ifm-font-color-base)',
              width: '100%'
            }}
          />
          <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
            <button
              type="submit"
              style={{
                padding: '0.25rem 0.5rem',
                fontSize: '0.75rem',
                background: 'var(--ifm-color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleTitleCancel}
              style={{
                padding: '0.25rem 0.5rem',
                fontSize: '0.75rem',
                background: 'var(--ifm-color-secondary)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3
            onClick={handleTitleClick}
            style={{
              margin: 0,
              cursor: allowRenameColumn ? 'pointer' : 'default',
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--ifm-font-color-base)'
            }}
            title={allowRenameColumn ? 'Click to rename' : ''}
          >
            {column.title}
            <span style={{ 
              marginLeft: '0.5rem', 
              fontSize: '0.8rem', 
              color: 'var(--ifm-color-secondary)',
              fontWeight: 'normal'
            }}>
              ({column.cards.length})
            </span>
          </h3>
          {allowRemoveColumn && (
            <button
              onClick={handleRemove}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--ifm-color-danger)',
                cursor: 'pointer',
                fontSize: '1.2rem',
                padding: '0.25rem',
                borderRadius: '4px'
              }}
              title="Remove column"
            >
              ×
            </button>
          )}
        </div>
      )}
    </div>
  );
};

interface ColumnProps {
  column: KanbanColumn;
  index: number;
  renderCard?: (column: KanbanColumn, card: TaskCard, dragging: boolean) => React.ReactNode;
  renderColumnHeader?: (column: KanbanColumn) => React.ReactNode;
  disableColumnDrag?: boolean;
  disableCardDrag?: boolean;
  onCardNew?: (column: KanbanColumn, card: Partial<TaskCard>) => void;
  allowAddCard?: boolean;
  allowRemoveColumn?: boolean;
  onColumnRemove?: (column: KanbanColumn) => void;
  allowRenameColumn?: boolean;
  onColumnRename?: (column: KanbanColumn, newTitle: string) => void;
  onCardRemove?: (column: KanbanColumn, card: TaskCard) => void;
  allowRemoveCard?: boolean;
}

export const Column: React.FC<ColumnProps> = ({
  column,
  index,
  renderCard,
  renderColumnHeader,
  disableColumnDrag = false,
  disableCardDrag = false,
  onCardNew,
  allowAddCard = true,
  allowRemoveColumn = true,
  onColumnRemove,
  allowRenameColumn = true,  
  onColumnRename,
  onCardRemove,
  allowRemoveCard = true
}) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCardTitle.trim()) {
      const newCard: Partial<TaskCard> = {
        title: newCardTitle.trim(),
        id: Date.now() // Simple ID generation - in real app, use proper ID
      };
      onCardNew?.(column, newCard);
      setNewCardTitle('');
      setIsAddingCard(false);
    }
  };

  const pickPropOut = (obj: any, prop: string) => {
    const { [prop]: _, ...rest } = obj;
    return rest;
  };

  return (
    <Draggable
      draggableId={`column-draggable-${column.id}`}
      index={index}
      isDragDisabled={disableColumnDrag}
    >
      {(provided) => {
        const draggablePropsWithoutStyle = pickPropOut(provided.draggableProps, 'style');
        
        return (
          <div
            ref={provided.innerRef}
            {...draggablePropsWithoutStyle}
            style={{
              height: '100%',
              minHeight: '500px',
              display: 'inline-block',
              verticalAlign: 'top',
              marginRight: '1rem',
              width: '280px',
              ...provided.draggableProps.style
            }}
            className="react-kanban-column"
            data-testid={`column-${column.id}`}
          >
            <div {...provided.dragHandleProps}>
              {renderColumnHeader ? (
                renderColumnHeader(column)
              ) : (
                <DefaultColumnHeader
                  column={column}
                  allowRemoveColumn={allowRemoveColumn}
                  onColumnRemove={onColumnRemove}
                  allowRenameColumn={allowRenameColumn}
                  onColumnRename={onColumnRename}
                />
              )}
            </div>

            {allowAddCard && (
              <div style={{ padding: '0.5rem' }}>
                {isAddingCard ? (
                  <form onSubmit={handleAddCard}>
                    <input
                      type="text"
                      value={newCardTitle}
                      onChange={(e) => setNewCardTitle(e.target.value)}
                      placeholder="Enter card title..."
                      autoFocus
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid var(--ifm-color-emphasis-300)',
                        borderRadius: '4px',
                        marginBottom: '0.5rem'
                      }}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        type="submit"
                        style={{
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.75rem',
                          background: 'var(--ifm-color-primary)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingCard(false);
                          setNewCardTitle('');
                        }}
                        style={{
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.75rem',
                          background: 'var(--ifm-color-secondary)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setIsAddingCard(true)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      background: 'transparent',
                      border: '2px dashed var(--ifm-color-emphasis-300)',
                      borderRadius: '4px',
                      color: 'var(--ifm-color-emphasis-600)',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    + Add a card
                  </button>
                )}
              </div>
            )}

            <DroppableColumn droppableId={String(column.id)}>
              {column.cards.length ? (
                column.cards.map((card, cardIndex) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={cardIndex}
                    column={column}
                    renderCard={renderCard}
                    disableCardDrag={disableCardDrag}
                    onCardRemove={onCardRemove}
                    allowRemoveCard={allowRemoveCard}
                  />
                ))
              ) : (
                <div 
                  className="react-kanban-card-skeleton"
                  style={{
                    margin: '0.5rem',
                    padding: '1rem',
                    textAlign: 'center',
                    color: 'var(--ifm-color-emphasis-600)',
                    fontSize: '0.9rem'
                  }}
                >
                  Drop cards here
                </div>
              )}
            </DroppableColumn>
          </div>
        );
      }}
    </Draggable>
  );
};