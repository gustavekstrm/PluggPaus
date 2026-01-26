export type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

export interface GuessLetter {
  letter: string;
  status: LetterStatus;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: Record<number, number>; // 1-6 guesses
}

export interface GameState {
  guesses: string[];
  currentGuess: string;
  gameStatus: 'playing' | 'won' | 'lost';
  evaluations: GuessLetter[][];
}

export interface WordleData {
  lastPlayed: string; // ISO date string
  gameState: GameState;
  stats: GameStats;
}
