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
  /** Datumet ("YYYY-MM-DD") då senaste spelet avslutades. Avgör om sviten är obruten. */
  lastCompletedDate?: string;
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
  /** Vilket pussel spelläget gäller. Saknas i data från äldre versioner. */
  puzzleKey?: string;
  lastPlayed: string;
  gameState: GameState;
  stats: GameStats;
}
