export interface Card {
    id: number;
    title: string;
    description: string;
    type: 'blocker' | 'discussion' | 'fyi' | 'paused' | 'goal';
    count: number;
  }
  
  export interface BoardColumn {
    title: string;
    cards: Card[];
  }