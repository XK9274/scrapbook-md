import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import KanbanBoard from '@site/src/components/KanbanBoard';
import todoManifest from '@site/src/data/todoManifest.json';

const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '200px',
    flexDirection: 'column'
  }}>
    <div style={{
      border: '4px solid var(--ifm-color-emphasis-200)',
      borderTop: '4px solid var(--ifm-color-primary)',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      animation: 'spin 2s linear infinite'
    }} />
    <p style={{ marginTop: '16px' }}>Loading TODO Kanban Board...</p>
    <style dangerouslySetInnerHTML={{
      __html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `
    }} />
  </div>
);

const TodoKanbanBoard = () => {
  const [kanbanData, setKanbanData] = useState({ columns: [] });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    try {
      // Convert TODO manifest to Kanban format
      const todoFiles = todoManifest.items || [];
      const columns = [
        { id: 1, title: '📝 To Do', cards: [], color: '#e74c3c' },
        { id: 2, title: '🔄 In Progress', cards: [], color: '#f39c12' },
        { id: 3, title: '✅ Done', cards: [], color: '#27ae60' }
      ];
      
      todoFiles.forEach((todo, index) => {
        const columnId = todo.status === 'active' ? 1 : 
                       todo.status === 'in-progress' ? 2 : 3;
        const column = columns.find(col => col.id === columnId);
        
        if (column) {
          const taskCard = {
            id: index + 1,
            title: todo.title,
            description: `Context: ${todo.context}`,
            priority: todo.priority,
            tags: todo.tags || [],
            assignee: 'TODO System',
            dueDate: todo.date
          };
          column.cards.push(taskCard);
        }
      });
      
      setKanbanData({ columns });
    } catch (error) {
      console.error('Error loading TODO data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleBoardChange = (newBoard) => {
    setKanbanData(newBoard);
    console.log('Board updated:', newBoard);
  };
  
  if (loading) {
    return <LoadingFallback />;
  }
  
  return (
    <KanbanBoard
      initialData={kanbanData}
      onBoardChange={handleBoardChange}
      allowAddCards={false}
      allowDeleteCards={false}
      disableColumnDrag={false}
      disableCardDrag={false}
    />
  );
};

export default function KanbanPage() {
  return (
    <Layout
      title="Kanban"
      description="Interactive task management with drag-and-drop functionality"
    >
      <BrowserOnly fallback={<LoadingFallback />}>
        {() => <TodoKanbanBoard />}
      </BrowserOnly>
    </Layout>
  );
}