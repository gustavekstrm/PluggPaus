export interface Guess {
  word: string;
  rank: number;
  guessNumber: number;
}

export interface ContextoPuzzle {
  date: string;
  targetWord: string;
  rankings: Record<string, number>; // word -> rank (1 = closest, 1000 = very far)
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  averageGuesses: number;
}

export interface GameState {
  guesses: Guess[];
  gameStatus: 'playing' | 'won';
  hintsUsed: number;
}

export interface ContextoData {
  lastPlayed: string;
  gameState: GameState;
  stats: GameStats;
}
