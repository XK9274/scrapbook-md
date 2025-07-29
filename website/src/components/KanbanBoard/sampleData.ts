import type { KanbanBoardData, TaskCard } from './index';

// Sample data for testing the Kanban board
export const sampleKanbanData: KanbanBoardData = {
  columns: [
    {
      id: 1,
      title: '📝 Todo',
      color: '#e3f2fd',
      cards: [
        {
          id: 1,
          title: 'Setup Development Environment',
          description: 'Install Node.js, VS Code, and configure development tools',
          priority: 'high',
          tags: ['setup', 'development'],
          assignee: 'John Doe',
          dueDate: '2024-02-15'
        },
        {
          id: 2,
          title: 'Create Project Documentation',
          description: 'Write README, API docs, and user guides',
          priority: 'medium',
          tags: ['documentation', 'writing'],
          assignee: 'Jane Smith'
        },
        {
          id: 3,
          title: 'Design Database Schema',
          description: 'Plan and design the database structure for the application',
          priority: 'high',
          tags: ['database', 'design', 'architecture'],
          assignee: 'Bob Johnson'
        }
      ]
    },
    {
      id: 2,
      title: '🔄 In Progress',
      color: '#fff3e0',
      cards: [
        {
          id: 4,
          title: 'Implement User Authentication',
          description: 'Build login, registration, and password reset functionality',
          priority: 'critical',
          tags: ['auth', 'security', 'backend'],
          assignee: 'Alice Wilson',
          dueDate: '2024-02-10'
        },
        {
          id: 5,
          title: 'Create Landing Page',
          description: 'Design and implement the main landing page with responsive layout',
          priority: 'medium',
          tags: ['frontend', 'design', 'responsive'],
          assignee: 'Charlie Brown'
        }
      ]
    },
    {
      id: 3,
      title: '👀 Review',
      color: '#f3e5f5',
      cards: [
        {
          id: 6,
          title: 'Code Review - Payment Module',
          description: 'Review implementation of payment processing and integration',
          priority: 'high',
          tags: ['review', 'payment', 'security'],
          assignee: 'David Lee',
          dueDate: '2024-02-12'
        }
      ]
    },
    {
      id: 4,
      title: '✅ Done',
      color: '#e8f5e8',
      cards: [
        {
          id: 7,
          title: 'Setup CI/CD Pipeline',
          description: 'Configure automated testing and deployment workflows',
          priority: 'medium',
          tags: ['devops', 'automation', 'ci/cd'],
          assignee: 'Eva Martinez'
        },
        {
          id: 8,
          title: 'Choose Tech Stack',
          description: 'Research and select technologies for the project',
          priority: 'high',
          tags: ['planning', 'research', 'architecture'],
          assignee: 'Frank Zhang'
        },
        {
          id: 9,
          title: 'Project Kickoff Meeting',
          description: 'Initial team meeting to discuss project goals and timeline',
          priority: 'low',
          tags: ['meeting', 'planning'],
          assignee: 'Grace Kim'
        }
      ]
    }
  ]
};

// Additional sample data for different scenarios
export const personalTasksData: KanbanBoardData = {
  columns: [
    {
      id: 1,
      title: '🎯 This Week',
      cards: [
        {
          id: 1,
          title: 'Learn React Kanban Integration',
          description: 'Study how to integrate Kanban boards into Docusaurus sites',
          priority: 'high',
          tags: ['learning', 'react', 'docusaurus']
        },
        {
          id: 2,
          title: 'Update Portfolio Website',
          description: 'Add recent projects and improve design',
          priority: 'medium',
          tags: ['portfolio', 'design']
        }
      ]
    },
    {
      id: 2,
      title: '📅 Next Week',
      cards: [
        {
          id: 3,
          title: 'Prepare for Conference Talk',
          description: 'Create slides and practice presentation on modern web development',
          priority: 'high',
          tags: ['presentation', 'conference']
        }
      ]
    },
    {
      id: 3,
      title: '💭 Ideas',
      cards: [
        {
          id: 4,
          title: 'Build a Task Management App',
          description: 'Create a full-featured task management application with React',
          priority: 'low',
          tags: ['project', 'react', 'idea']
        }
      ]
    }
  ]
};

// Minimal sample for demonstration
export const minimalSampleData: KanbanBoardData = {
  columns: [
    {
      id: 1,
      title: 'To Do',
      cards: [
        {
          id: 1,
          title: 'Sample Task',
          description: 'This is a sample task to demonstrate the Kanban board',
          priority: 'medium'
        }
      ]
    },
    {
      id: 2,
      title: 'In Progress',
      cards: []
    },
    {
      id: 3,
      title: 'Done',
      cards: []
    }
  ]
};