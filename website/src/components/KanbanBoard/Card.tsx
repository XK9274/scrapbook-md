import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { TaskCard, KanbanColumn } from './index';
import styles from './styles.module.css';

interface CardProps {
  card: TaskCard;
  index: number;
  column: KanbanColumn;
  renderCard?: (column: KanbanColumn, card: TaskCard, dragging: boolean) => React.ReactNode;
  disableCardDrag?: boolean;
  onCardRemove?: (column: KanbanColumn, card: TaskCard) => void;
  allowRemoveCard?: boolean;
}

const DefaultCard: React.FC<{
  card: TaskCard;
  column: KanbanColumn;
  dragging: boolean;
  onCardRemove?: (column: KanbanColumn, card: TaskCard) => void;
  allowRemoveCard?: boolean;
}> = ({ card, column, dragging, onCardRemove, allowRemoveCard }) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCardRemove?.(column, card);
  };

  const getPriorityClass = (priority?: string) => {
    if (!priority) return '';
    return styles[`priority-${priority}`];
  };

  return (
    <div className={`${styles.kanbanCard} ${dragging ? styles.dragging : ''}`}>
      <div className={styles.cardHeader}>
        <h4 className={styles.cardTitle}>{card.title}</h4>
        {allowRemoveCard && (
          <button
            className={styles.deleteButton}
            onClick={handleRemove}
            aria-label="Remove card"
            type="button"
          >
            ×
          </button>
        )}
      </div>
      
      {card.description && (
        <p className={styles.cardDescription}>{card.description}</p>
      )}
      
      <div className={styles.cardFooter}>
        {card.priority && (
          <span className={`${styles.priorityBadge} ${getPriorityClass(card.priority)}`}>
            {card.priority}
          </span>
        )}
        
        {card.tags && card.tags.length > 0 && (
          <div className={styles.cardTags}>
            {card.tags.map((tag, index) => (
              <span key={index} className={styles.cardTag}>
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {card.assignee && (
          <span className={styles.cardAssignee}>@{card.assignee}</span>
        )}
      </div>
      
      {card.dueDate && (
        <div className={styles.cardFooter}>
          <small>Due: {new Date(card.dueDate).toLocaleDateString()}</small>
        </div>
      )}
    </div>
  );
};

export const Card: React.FC<CardProps> = ({
  card,
  index,
  column,
  renderCard,
  disableCardDrag = false,
  onCardRemove,
  allowRemoveCard = true
}) => {
  return (
    <Draggable
      draggableId={String(card.id)}
      index={index}
      isDragDisabled={disableCardDrag}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          data-testid={`card-${card.id}`}
        >
          <div style={{ display: 'inline-block', whiteSpace: 'normal' }}>
            {renderCard ? (
              renderCard(column, card, snapshot.isDragging)
            ) : (
              <DefaultCard
                card={card}
                column={column}
                dragging={snapshot.isDragging}
                onCardRemove={onCardRemove}
                allowRemoveCard={allowRemoveCard}
              />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};