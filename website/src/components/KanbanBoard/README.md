# KanbanBoard Component

A fully-featured, TypeScript-powered Kanban board component for Docusaurus sites. Built on top of `@caldwell619/react-kanban` with full SSR compatibility and Docusaurus theme integration.

## Features

- ✅ **Full SSR Compatibility** - Works perfectly with Docusaurus server-side rendering
- 🎨 **Theme Integration** - Automatically matches your Docusaurus theme (light/dark mode)
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 🖱️ **Drag & Drop** - Smooth drag and drop interactions using @hello-pangea/dnd
- 🔧 **TypeScript Support** - Fully typed for better development experience
- ⚙️ **Configurable** - Control card addition, deletion, and drag behaviors
- 📊 **Rich Data Model** - Support for priorities, tags, assignees, descriptions, and due dates
- 🎯 **Customizable Cards** - Custom card rendering with priority badges and tags
- 💾 **Data Export** - Export board data as JSON

## Installation

The required dependencies are already installed:

```bash
npm install @caldwell619/react-kanban @hello-pangea/dnd
```

## Basic Usage

```tsx
import KanbanBoard from '@site/src/components/KanbanBoard';
import { sampleKanbanData } from '@site/src/components/KanbanBoard/sampleData';

export default function MyPage() {
  const handleBoardChange = (board) => {
    console.log('Board updated:', board);
    // Save to backend, localStorage, etc.
  };

  return (
    <KanbanBoard 
      initialData={sampleKanbanData}
      onBoardChange={handleBoardChange}
      allowAddCards={true}
      allowDeleteCards={true}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialData` | `KanbanBoardData` | `{ columns: [] }` | Initial board data structure |
| `onBoardChange` | `(board: KanbanBoardData) => void` | `undefined` | Callback fired when board changes |
| `className` | `string` | `undefined` | Additional CSS class for the container |
| `allowAddCards` | `boolean` | `false` | Enable card addition functionality |
| `allowDeleteCards` | `boolean` | `false` | Enable card deletion functionality |
| `cardHeight` | `number` | `100` | Minimum height for cards in pixels |
| `disableColumnDrag` | `boolean` | `false` | Disable column reordering |
| `disableCardDrag` | `boolean` | `false` | Disable card dragging |

## Data Structure

### KanbanBoardData
```tsx
interface KanbanBoardData {
  columns: KanbanColumn[];
}
```

### KanbanColumn
```tsx
interface KanbanColumn {
  id: number;
  title: string;
  cards: TaskCard[];
  color?: string;
}
```

### TaskCard
```tsx
interface TaskCard extends Card {
  id: number;
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  tags?: string[];
  assignee?: string;
  dueDate?: string;
}
```

## Sample Data

Three pre-built sample datasets are available:

```tsx
import { 
  sampleKanbanData,    // Full project management board
  personalTasksData,   // Personal task tracking
  minimalSampleData    // Simple demonstration
} from '@site/src/components/KanbanBoard/sampleData';
```

## Advanced Usage

### Custom Card Rendering

The component automatically renders cards with:
- **Title and Description** - Basic task information
- **Priority Badges** - Color-coded priority indicators
- **Tags** - Categorization labels
- **Assignee** - Person responsible for the task
- **Delete Button** - When `allowDeleteCards` is enabled

### Styling Customization

The component uses CSS modules and CSS custom properties for styling. You can override styles by:

1. **Custom CSS Classes** - Pass `className` prop
2. **CSS Custom Properties** - Override Docusaurus theme variables
3. **Global Overrides** - Use `:global()` selectors in your CSS modules

### SSR Compatibility

The component is wrapped with `BrowserOnly` to ensure proper server-side rendering:

```tsx
import BrowserOnly from '@docusaurus/BrowserOnly';

// This pattern is already implemented in the component
<BrowserOnly fallback={<LoadingFallback />}>
  {() => <KanbanBoardClient {...props} />}
</BrowserOnly>
```

## Use Cases

- **Project Management** - Track tasks across different stages
- **Personal Organization** - Manage personal todos and goals  
- **Team Workflows** - Visualize team progress and workload
- **Documentation Planning** - Organize documentation tasks
- **Content Creation** - Track blog posts, articles, and content
- **Bug Tracking** - Manage software issues and fixes

## Live Demo

Visit `/todo` on your Docusaurus site to see the live interactive demo with:
- Multiple sample datasets
- Interactive controls
- Board configuration options
- Export functionality
- Responsive design demonstration

## Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- 📱 iOS Safari 13+
- 📱 Chrome Android 80+

## Performance

- **Bundle Size**: ~50KB gzipped (including dependencies)
- **Runtime Performance**: Optimized with React.memo and useCallback
- **Memory Usage**: Efficient with proper cleanup on unmount
- **Loading**: Dynamic imports for optimal bundle splitting

## Troubleshooting

### Build Issues
If you encounter build issues, ensure all dependencies are correctly installed:

```bash
npm install @caldwell619/react-kanban @hello-pangea/dnd
```

### TypeScript Errors
Make sure your `tsconfig.json` includes the component directory:

```json
{
  "include": ["src/**/*"]
}
```

### Styling Issues
The component inherits Docusaurus theme variables. If styles look incorrect:

1. Check dark mode compatibility
2. Verify CSS custom properties are available
3. Ensure Tailwind CSS doesn't conflict with component styles

## Contributing

The component is designed to be extensible. Common customizations:

1. **Add new card fields** - Extend the `TaskCard` interface
2. **Custom priority levels** - Modify priority types and styling
3. **Additional card actions** - Add buttons to the card footer
4. **Column customization** - Extend `KanbanColumn` interface
5. **Theme integration** - Add new CSS custom properties

## License

This component integrates with `@caldwell619/react-kanban` and `@hello-pangea/dnd`. Please check their respective licenses for usage terms.