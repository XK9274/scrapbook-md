import { KanbanBoardData, KanbanColumn, TaskCard } from './index';
import { DropResult } from '@hello-pangea/dnd';

// Array manipulation utilities
export const removeFromArrayAtPosition = <T>(array: T[], position: number): T[] => [
  ...array.slice(0, position),
  ...array.slice(position + 1)
];

export const addInArrayAtPosition = <T>(array: T[], item: T, position: number): T[] => [
  ...array.slice(0, position),
  item,
  ...array.slice(position)
];

export const changeElementOfPositionInArray = <T>(array: T[], from: number, to: number): T[] => {
  const item = array[from];
  const arrayWithoutItem = removeFromArrayAtPosition(array, from);
  return addInArrayAtPosition(arrayWithoutItem, item, to);
};

export const replaceElementOfArray = <T>(array: T[]) => (options: {
  when: (item: T) => boolean;
  for: (item: T) => T;
}) => array.map(item => options.when(item) ? options.for(item) : item);

// Coordinate system for drag events
export interface Coordinates {
  source?: {
    fromPosition: number;
    fromColumnId?: number;
  };
  destination?: {
    toPosition: number;
    toColumnId?: number;
  };
}

export const getCoordinates = (event: DropResult, board: KanbanBoardData): Coordinates => {
  if (event.destination === null) return {};

  const columnSource = { fromPosition: event.source.index };
  const columnDestination = { toPosition: event.destination.index };

  if (isAColumnMove(event.type)) {
    return { source: columnSource, destination: columnDestination };
  }

  return {
    source: { 
      ...columnSource, 
      fromColumnId: getColumnStrict(board, event.source.droppableId).id 
    },
    destination: { 
      ...columnDestination, 
      toColumnId: getColumnStrict(board, event.destination.droppableId).id 
    }
  };
};

export const isAColumnMove = (type: string) => type === 'BOARD';

export const getCard = (board: KanbanBoardData, sourceCoordinate: NonNullable<Coordinates['source']>): TaskCard => {
  if (!sourceCoordinate.fromColumnId) throw new Error('fromColumnId is required for card operations');
  
  const column = board.columns.find((column) => column.id === sourceCoordinate.fromColumnId);
  if (!column) throw new Error(`Cannot find column: ${sourceCoordinate.fromColumnId}`);
  
  return column.cards[sourceCoordinate.fromPosition];
};

export const getColumn = (board: KanbanBoardData, droppableId: string) => {
  return board.columns.find(({ id }) => String(id) === droppableId);
};

export const getColumnStrict = (board: KanbanBoardData, droppableId: string) => {
  const column = getColumn(board, droppableId);
  if (!column) throw new Error(`Cannot find column with ID: ${droppableId}`);
  return column;
};

export const isMovingAColumnToAnotherPosition = (coordinates: Coordinates) => {
  return coordinates.source?.fromPosition !== coordinates.destination?.toPosition;
};

export const isMovingACardToAnotherPosition = (coordinates: Coordinates) => {
  return !(
    coordinates.source?.fromPosition === coordinates.destination?.toPosition &&
    coordinates.source?.fromColumnId === coordinates.destination?.toColumnId
  );
};

// Board manipulation functions
export const moveColumn = (
  board: KanbanBoardData,
  source: NonNullable<Coordinates['source']>,
  destination: NonNullable<Coordinates['destination']>
): KanbanBoardData => ({
  ...board,
  columns: changeElementOfPositionInArray(board.columns, source.fromPosition, destination.toPosition)
});

export const moveCard = (
  board: KanbanBoardData,
  source: NonNullable<Coordinates['source']>,
  destination: NonNullable<Coordinates['destination']>
): KanbanBoardData => {
  if (!source.fromColumnId || !destination.toColumnId) {
    throw new Error('Column IDs are required for card operations');
  }

  const sourceColumn = board.columns.find((column) => column.id === source.fromColumnId);
  const destinationColumn = board.columns.find((column) => column.id === destination.toColumnId);

  if (!sourceColumn || !destinationColumn) {
    throw new Error('Cannot find source or destination column');
  }

  const reorderColumnsOnBoard = (reorderColumnsMapper: (column: KanbanColumn) => KanbanColumn) => ({
    ...board,
    columns: board.columns.map(reorderColumnsMapper)
  });

  // Moving within the same column
  if (sourceColumn.id === destinationColumn.id) {
    const reorderedCards = changeElementOfPositionInArray(
      sourceColumn.cards,
      source.fromPosition,
      destination.toPosition
    );
    
    return reorderColumnsOnBoard((column) =>
      column.id === sourceColumn.id ? { ...column, cards: reorderedCards } : column
    );
  }

  // Moving between different columns
  const sourceCards = removeFromArrayAtPosition(sourceColumn.cards, source.fromPosition);
  const destinationCards = addInArrayAtPosition(
    destinationColumn.cards,
    sourceColumn.cards[source.fromPosition],
    destination.toPosition
  );

  return reorderColumnsOnBoard((column) => {
    if (column.id === sourceColumn.id) return { ...column, cards: sourceCards };
    if (column.id === destinationColumn.id) return { ...column, cards: destinationCards };
    return column;
  });
};

export const addColumn = (board: KanbanBoardData, column: KanbanColumn): KanbanBoardData => ({
  ...board,
  columns: addInArrayAtPosition(board.columns, column, board.columns.length)
});

export const removeColumn = (board: KanbanBoardData, column: KanbanColumn): KanbanBoardData => ({
  ...board,
  columns: board.columns.filter(({ id }) => id !== column.id)
});

export const changeColumn = (
  board: KanbanBoardData,
  column: KanbanColumn,
  newColumn: Partial<KanbanColumn>
): KanbanBoardData => {
  const changedColumns = replaceElementOfArray(board.columns)({
    when: ({ id }) => id === column.id,
    for: (value) => ({ ...value, ...newColumn })
  });
  
  return { ...board, columns: changedColumns };
};

export const addCard = (
  board: KanbanBoardData,
  inColumn: KanbanColumn,
  card: TaskCard,
  options: { on?: 'top' | 'bottom' } = {}
): KanbanBoardData => {
  const columnToAdd = board.columns.find(({ id }) => id === inColumn.id);
  if (!columnToAdd) throw new Error(`Cannot find column with ID: ${inColumn.id}`);

  const cards = addInArrayAtPosition(
    columnToAdd.cards,
    card,
    options.on === 'top' ? 0 : columnToAdd.cards.length
  );

  const columns = replaceElementOfArray(board.columns)({
    when: ({ id }) => inColumn.id === id,
    for: (value) => ({ ...value, cards })
  });

  return { ...board, columns };
};

export const removeCard = (
  board: KanbanBoardData,
  fromColumn: KanbanColumn,
  card: TaskCard
): KanbanBoardData => {
  const columnToRemove = board.columns.find(({ id }) => id === fromColumn.id);
  if (!columnToRemove) throw new Error(`Cannot find column with ID: ${fromColumn.id}`);

  const filteredCards = columnToRemove.cards.filter(({ id }) => card.id !== id);
  const columnWithoutCard = { ...columnToRemove, cards: filteredCards };
  
  const filteredColumns = board.columns.map((column) =>
    fromColumn.id === column.id ? columnWithoutCard : column
  );

  return { ...board, columns: filteredColumns };
};