import React, { forwardRef } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { KanbanBoardData, KanbanColumn, TaskCard } from './index';
import { Column } from './Column';
import { withDroppable } from './withDroppable';
import { 
  getCoordinates, 
  isAColumnMove, 
  isMovingAColumnToAnotherPosition, 
  isMovingACardToAnotherPosition,
  getCard
} from './boardUtils';

const Columns = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => (
    <div 
      ref={ref} 
      style={{ 
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'flex-start',
        overflowX: 'auto',
        overflowY: 'hidden',
        minHeight: '500px',
        padding: '1rem'
      }} 
      {...props} 
    />
  )
);

const DroppableBoard = withDroppable(Columns);

interface BoardContainerProps {
  board: KanbanBoardData;
  renderCard?: (column: KanbanColumn, card: TaskCard, dragging: boolean) => React.ReactNode;
  disableColumnDrag?: boolean;
  disableCardDrag?: boolean;
  renderColumnHeader?: (column: KanbanColumn) => React.ReactNode;
  renderColumnAdder?: () => React.ReactNode;
  allowRemoveColumn?: boolean;
  onColumnRemove?: (column: KanbanColumn) => void;
  allowRenameColumn?: boolean;
  onColumnRename?: (column: KanbanColumn, newTitle: string) => void;
  onColumnDragEnd?: (args: {
    source: NonNullable<ReturnType<typeof getCoordinates>['source']>;
    destination: NonNullable<ReturnType<typeof getCoordinates>['destination']>;
    subject: KanbanColumn;
  }) => void;
  onCardDragEnd?: (args: {
    source: NonNullable<ReturnType<typeof getCoordinates>['source']>;
    destination: NonNullable<ReturnType<typeof getCoordinates>['destination']>;
    subject: TaskCard;
  }) => void;
  onCardNew?: (column: KanbanColumn, card: Partial<TaskCard>) => void;
  allowAddCard?: boolean;
  onCardRemove?: (column: KanbanColumn, card: TaskCard) => void;
  allowRemoveCard?: boolean;
}

export const BoardContainer: React.FC<BoardContainerProps> = ({
  board,
  renderCard,
  disableColumnDrag = false,
  disableCardDrag = false,
  renderColumnHeader,
  renderColumnAdder,
  allowRemoveColumn = true,
  onColumnRemove,
  allowRenameColumn = true,
  onColumnRename,
  onColumnDragEnd,
  onCardDragEnd,
  onCardNew,
  allowAddCard = true,
  onCardRemove,
  allowRemoveCard = true
}) => {
  const handleOnDragEnd = (event: DropResult) => {
    const coordinates = getCoordinates(event, board);
    
    if (!coordinates.source) return;

    if (isAColumnMove(event.type)) {
      if (isMovingAColumnToAnotherPosition(coordinates) && onColumnDragEnd) {
        onColumnDragEnd({
          ...coordinates,
          source: coordinates.source!,
          destination: coordinates.destination!,
          subject: board.columns[coordinates.source.fromPosition]
        });
      }
    } else {
      if (isMovingACardToAnotherPosition(coordinates) && onCardDragEnd) {
        onCardDragEnd({
          ...coordinates,
          source: coordinates.source!,
          destination: coordinates.destination!,
          subject: getCard(board, coordinates.source)
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="react-kanban-board">
        <DroppableBoard
          droppableId="board-droppable"
          direction="horizontal"
          type="BOARD"
        >
          {board.columns.map((column, index) => (
            <Column
              key={column.id}
              index={index}
              column={column}
              renderCard={renderCard}
              renderColumnHeader={renderColumnHeader}
              disableColumnDrag={disableColumnDrag}
              disableCardDrag={disableCardDrag}
              onCardNew={onCardNew}
              allowAddCard={allowAddCard}
              allowRemoveColumn={allowRemoveColumn}
              onColumnRemove={onColumnRemove}
              allowRenameColumn={allowRenameColumn}
              onColumnRename={onColumnRename}
              onCardRemove={onCardRemove}
              allowRemoveCard={allowRemoveCard}
            />
          ))}
          {renderColumnAdder && renderColumnAdder()}
        </DroppableBoard>
      </div>
    </DragDropContext>
  );
};