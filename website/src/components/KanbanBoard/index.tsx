import React, { useState, useEffect, useRef, type ReactNode } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { BoardContainer } from './BoardContainer';
import { moveCard, moveColumn, addCard, removeCard, addColumn, removeColumn, changeColumn } from './boardUtils';
import styles from './styles.module.css';

// TypeScript interfaces for our Kanban data (based on README)
export interface TaskCard {
  id: number;
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  tags?: string[];
  assignee?: string;
  dueDate?: string;
}

export interface KanbanColumn {
  id: number;
  title: string;
  cards: TaskCard[];
  color?: string;
}

export interface KanbanBoardData {
  columns: KanbanColumn[];
}

interface KanbanBoardProps {
  initialData?: KanbanBoardData;
  onBoardChange?: (board: KanbanBoardData) => void;
  className?: string;
  allowAddCards?: boolean;
  allowDeleteCards?: boolean;
  allowAddColumns?: boolean;
  cardHeight?: number;
  disableColumnDrag?: boolean;
  disableCardDrag?: boolean;
}

// Fallback loading component
const LoadingFallback = (): ReactNode => (
  <div className={styles.loadingContainer}>
    <div className={styles.loadingSpinner} />
    <p>Loading Kanban Board...</p>
  </div>
);

// The actual Kanban component that renders only on client
const KanbanBoardClient = ({ 
  initialData, 
  onBoardChange, 
  className,
  allowAddCards = true,
  allowDeleteCards = true,
  allowAddColumns = true,
  cardHeight = 100,
  disableColumnDrag = false,
  disableCardDrag = false
}: KanbanBoardProps): ReactNode => {
  const [board, setBoard] = useState<KanbanBoardData>(initialData || { columns: [] });
  const [mounted, setMounted] = useState(false);
  const kanbanRef = useRef<HTMLDivElement>(null);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBoardChange = (newBoard: KanbanBoardData) => {
    setBoard(newBoard);
    onBoardChange?.(newBoard);
  };

  const handleCardDragEnd = ({ source, destination, subject }) => {
    if (!destination) return;
    
    const newBoard = moveCard(board, source, destination);
    handleBoardChange(newBoard);
  };

  const handleColumnDragEnd = ({ source, destination, subject }) => {
    if (!destination) return;
    
    const newBoard = moveColumn(board, source, destination);
    handleBoardChange(newBoard);
  };

  const handleCardRemove = (column: KanbanColumn, card: TaskCard) => {
    if (!allowDeleteCards) return;
    
    const newBoard = removeCard(board, column, card);
    handleBoardChange(newBoard);
  };

  const handleCardNew = (column: KanbanColumn, cardData: Partial<TaskCard>) => {
    if (!allowAddCards) return;
    
    const newCard: TaskCard = {
      id: Date.now(), // Simple ID generation
      title: cardData.title || 'New Card',
      description: cardData.description,
      priority: cardData.priority,
      tags: cardData.tags,
      assignee: cardData.assignee,
      dueDate: cardData.dueDate
    };
    
    const newBoard = addCard(board, column, newCard);
    handleBoardChange(newBoard);
  };

  const handleColumnRemove = (column: KanbanColumn) => {
    const newBoard = removeColumn(board, column);
    handleBoardChange(newBoard);
  };

  const handleColumnRename = (column: KanbanColumn, newTitle: string) => {
    const newBoard = changeColumn(board, column, { title: newTitle });
    handleBoardChange(newBoard);
  };

  const handleAddColumn = (e: React.FormEvent) => {
    e.preventDefault();
    if (newColumnTitle.trim()) {
      const newColumn: KanbanColumn = {
        id: Date.now(), // Simple ID generation
        title: newColumnTitle.trim(),
        cards: []
      };
      
      const newBoard = addColumn(board, newColumn);
      handleBoardChange(newBoard);
      setNewColumnTitle('');
      setIsAddingColumn(false);
    }
  };

  const renderColumnAdder = () => (
    <div style={{ minWidth: '280px', marginRight: '1rem' }}>
      {isAddingColumn ? (
        <div className="react-kanban-column" style={{ padding: '1rem' }}>
          <form onSubmit={handleAddColumn}>
            <input
              type="text"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              placeholder="Enter column title..."
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
                Add Column
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAddingColumn(false);
                  setNewColumnTitle('');
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
        </div>
      ) : (
        <button
          onClick={() => setIsAddingColumn(true)}
          style={{
            minWidth: '280px',
            minHeight: '60px',
            background: 'transparent',
            border: '2px dashed var(--ifm-color-emphasis-300)',
            borderRadius: '8px',
            color: 'var(--ifm-color-emphasis-600)',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          + Add Column
        </button>
      )}
    </div>
  );

  if (!mounted) {
    return <LoadingFallback />;
  }

  return (
    <div ref={kanbanRef} className={`${styles.kanbanContainer} ${className || ''}`}>
      <BoardContainer
        board={board}
        disableColumnDrag={disableColumnDrag}
        disableCardDrag={disableCardDrag}
        onCardDragEnd={handleCardDragEnd}
        onColumnDragEnd={handleColumnDragEnd}
        onCardRemove={handleCardRemove}
        allowRemoveCard={allowDeleteCards}
        onCardNew={handleCardNew}
        allowAddCard={allowAddCards}
        onColumnRemove={handleColumnRemove}
        allowRemoveColumn={true}
        onColumnRename={handleColumnRename}
        allowRenameColumn={true}
        renderColumnAdder={allowAddColumns ? renderColumnAdder : undefined}
      />
    </div>
  );
};

// Main component with SSR handling
export default function KanbanBoard(props: KanbanBoardProps): ReactNode {
  return (
    <BrowserOnly fallback={<LoadingFallback />}>
      {() => <KanbanBoardClient {...props} />}
    </BrowserOnly>
  );
}

// Export types for external use
export type { KanbanBoardProps, TaskCard, KanbanColumn, KanbanBoardData };