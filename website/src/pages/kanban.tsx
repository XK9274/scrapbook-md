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
        const columnId = todo.status === 'active' ? 1 : 
                       todo.status === 'in-progress' ? 3 : 5;
        const column = columns.find(col => col.id === columnId);
        
        if (column) {
          const taskCard = {
            id: index + 1,
            title: todo.title,
            description: (
              <div>
                <div style={{ marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--ifm-font-color-secondary)' }}>
                  {todo.context && todo.context.length > 50 
                    ? `${todo.context.substring(0, 50)}...` 
                    : todo.context || 'No context'}
                </div>
                {todo.tags && todo.tags.length > 0 && (
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '0.25rem', 
                    marginBottom: '0.5rem' 
                  }}>
                    {todo.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        style={{
                          backgroundColor: '#ff6b35',
                          color: '#1a1a1a',
                          padding: '0.125rem 0.375rem',
                          fontSize: '0.625rem',
                          fontWeight: '600',
                          borderRadius: '0',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {todo.date && (
                  <div style={{ 
                    fontSize: '0.7rem', 
                    color: 'var(--ifm-font-color-secondary)',
                    fontStyle: 'italic'
                  }}>
                    {new Date(todo.date).toLocaleDateString()}
                  </div>
                )}
              </div>
            ),
            priority: todo.priority,
            assignee: 'TODO System'
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