import { useState, useEffect, useCallback } from 'react';
import { getTodaysPuzzle } from '../data/contextoPuzzles';
import type { GameState, GameStats, ContextoData, Guess, ContextoPuzzle } from '../types/contexto';

const STORAGE_KEY = 'contexto-data';

const defaultStats: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  averageGuesses: 0,
};

const defaultGameState: GameState = {
  guesses: [],
  gameStatus: 'playing',
  hintsUsed: 0,
};

function getTodayDateString(): string {
  const now = new Date();
  const swedenTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Stockholm' }));
  return swedenTime.toISOString().split('T')[0];
}

export function useContexto() {
  const [puzzle, setPuzzle] = useState<ContextoPuzzle | null>(null);
  const [gameState, setGameState] = useState<GameState>(defaultGameState);
  const [stats, setStats] = useState<GameStats>(defaultStats);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const todayPuzzle = getTodaysPuzzle();
    setPuzzle(todayPuzzle);

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data: ContextoData = JSON.parse(saved);
        setStats(data.stats);

        const today = getTodayDateString();
        if (data.lastPlayed === today) {
          setGameState(data.gameState);
        }
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, []);

  const saveGameState = useCallback((newState: GameState, newStats: GameStats) => {
    const data: ContextoData = {
      lastPlayed: getTodayDateString(),
      gameState: newState,
      stats: newStats,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  const makeGuess = useCallback((word: string) => {
    if (!puzzle || gameState.gameStatus !== 'playing') return;

    const normalizedWord = word.toLowerCase().trim();

    if (!normalizedWord) {
      setError('Please enter a word');
      return;
    }

    // Check if already guessed
    if (gameState.guesses.some(g => g.word === normalizedWord)) {
      setError('Already guessed!');
      setTimeout(() => setError(''), 2000);
      return;
    }

    // Get rank from puzzle
    const rank = puzzle.rankings[normalizedWord];

    if (rank === undefined) {
      setError('Word not in dictionary');
      setTimeout(() => setError(''), 2000);
      return;
    }

    const newGuess: Guess = {
      word: normalizedWord,
      rank,
      guessNumber: gameState.guesses.length + 1,
    };

    const newGuesses = [...gameState.guesses, newGuess].sort((a, b) => a.rank - b.rank);
    const isWin = rank === 1;

    let newStats = { ...stats };
    if (isWin) {
      const totalGuesses = stats.gamesPlayed * stats.averageGuesses + newGuesses.length;
      newStats.gamesPlayed++;
      newStats.gamesWon++;
      newStats.currentStreak++;
      newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
      newStats.averageGuesses = Math.round(totalGuesses / newStats.gamesPlayed);
    }

    const newState: GameState = {
      guesses: newGuesses,
      gameStatus: isWin ? 'won' : 'playing',
      hintsUsed: gameState.hintsUsed,
    };

    setGameState(newState);
    setStats(newStats);
    saveGameState(newState, newStats);
    setError('');
  }, [puzzle, gameState, stats, saveGameState]);

  const getHint = useCallback(() => {
    if (!puzzle || gameState.gameStatus !== 'playing') return;

    // Get words not yet guessed
    const guessedWords = new Set(gameState.guesses.map(g => g.word));
    const availableWords = Object.entries(puzzle.rankings)
      .filter(([word]) => !guessedWords.has(word) && word !== puzzle.targetWord)
      .sort(([, rankA], [, rankB]) => rankA - rankB);

    if (availableWords.length === 0) return;

    // Give a hint from the top 20 closest words
    const hintWord = availableWords[Math.min(gameState.hintsUsed * 3, availableWords.length - 1)][0];

    const hintGuess: Guess = {
      word: hintWord,
      rank: puzzle.rankings[hintWord],
      guessNumber: gameState.guesses.length + 1,
    };

    const newGuesses = [...gameState.guesses, hintGuess].sort((a, b) => a.rank - b.rank);

    const newState: GameState = {
      guesses: newGuesses,
      gameStatus: 'playing',
      hintsUsed: gameState.hintsUsed + 1,
    };

    setGameState(newState);
    saveGameState(newState, stats);
  }, [puzzle, gameState, stats, saveGameState]);

  const giveUp = useCallback(() => {
    if (!puzzle || gameState.gameStatus !== 'playing') return;

    const newStats = {
      ...stats,
      currentStreak: 0,
    };

    const targetGuess: Guess = {
      word: puzzle.targetWord,
      rank: 1,
      guessNumber: gameState.guesses.length + 1,
    };

    const newState: GameState = {
      guesses: [...gameState.guesses, targetGuess].sort((a, b) => a.rank - b.rank),
      gameStatus: 'won',
      hintsUsed: gameState.hintsUsed,
    };

    setGameState(newState);
    setStats(newStats);
    saveGameState(newState, newStats);
  }, [puzzle, gameState, stats, saveGameState]);

  return {
    puzzle,
    gameState,
    stats,
    error,
    makeGuess,
    getHint,
    giveUp,
  };
}
