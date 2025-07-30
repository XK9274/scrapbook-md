import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import KanbanBoard from '@site/src/components/KanbanBoard';
import todoManifest from '@site/src/data/todoManifest.json';


const TodoKanbanBoard = () => {
  const [kanbanData, setKanbanData] = useState({ columns: [] });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    try {
      // Convert TODO manifest to Kanban format
      const todoFiles = todoManifest.items || [];
      const columns = [
        { id: 1, title: '🔴 Todo', cards: [], color: '#e74c3c' },
        { id: 2, title: '🔴 Todo#2', cards: [], color: '#e74c3c' },
        { id: 3, title: '🟠 In Progress', cards: [], color: '#f39c12' },
        { id: 4, title: '🟠 In Progress#2', cards: [], color: '#f39c12' },
        { id: 5, title: '🟢 Done', cards: [], color: '#27ae60' }
      ];
      
      todoFiles.forEach((todo, index) => {
        let columnId;
        switch(todo.status) {
          case 'active': columnId = 1; break;
          case 'active-secondary': columnId = 2; break;
          case 'in-progress': columnId = 3; break;
          case 'in-progress-secondary': columnId = 4; break;
          case 'completed': columnId = 5; break;
          default: columnId = 1; // fallback to first column
        }
        const column = columns.find(col => col.id === columnId);
        
        if (column) {
          // Generate note link based on todo id
          const noteLink = `/docs/todos/${todo.id}`;
            
          const taskCard = {
            id: index + 1,
            noteId: todo.id,
            noteLink: noteLink,
            title: todo.title,
            description: todo.context || 'No context available',
            priority: todo.priority,
            tags: todo.tags || []
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
    return <div>Loading...</div>;
  }
  
  return (
    <KanbanBoard
      initialData={kanbanData}
      onBoardChange={handleBoardChange}
      allowAddCards={false}
      allowDeleteCards={false}
      allowAddColumns={false}
      disableColumnDrag={true}
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
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '80vh',
        padding: '2rem 1rem'
      }}>
        <BrowserOnly fallback={<div>Loading...</div>}>
          {() => <TodoKanbanBoard />}
        </BrowserOnly>
      </div>
    </Layout>
  );
}