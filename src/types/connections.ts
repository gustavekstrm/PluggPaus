export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'tricky';

export interface Category {
  name: string;
  words: string[];
  difficulty: DifficultyLevel;
}

export interface ConnectionsPuzzle {
  date: string;
  categories: Category[];
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
}

export interface GameState {
  selectedWords: string[];
  solvedCategories: Category[];
  remainingWords: string[];
  mistakesRemaining: number;
  gameStatus: 'playing' | 'won' | 'lost';
  shakingWords: string[];
}

export interface ConnectionsData {
  lastPlayed: string;
  gameState: GameState;
  stats: GameStats;
}
