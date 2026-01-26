import { useState, useEffect, useCallback } from 'react';
import { getTodaysPuzzle } from '../data/connectionsPuzzles';
import type { GameState, GameStats, ConnectionsData, ConnectionsPuzzle } from '../types/connections';

const MAX_MISTAKES = 4;
const STORAGE_KEY = 'connections-data';

const defaultStats: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
};

function getTodayDateString(): string {
  const now = new Date();
  const swedenTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Stockholm' }));
  return swedenTime.toISOString().split('T')[0];
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function useConnections() {
  const [puzzle, setPuzzle] = useState<ConnectionsPuzzle | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [stats, setStats] = useState<GameStats>(defaultStats);

  // Initialize game
  useEffect(() => {
    const todayPuzzle = getTodaysPuzzle();
    setPuzzle(todayPuzzle);

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data: ConnectionsData = JSON.parse(saved);
        setStats(data.stats);

        const today = getTodayDateString();
        if (data.lastPlayed === today) {
          setGameState(data.gameState);
        } else {
          initializeNewGame(todayPuzzle);
        }
      } catch (error) {
        console.error('Failed to load saved data:', error);
        initializeNewGame(todayPuzzle);
      }
    } else {
      initializeNewGame(todayPuzzle);
    }
  }, []);

  const initializeNewGame = (puzzle: ConnectionsPuzzle) => {
    const allWords = puzzle.categories.flatMap(cat => cat.words);
    const shuffledWords = shuffleArray(allWords);

    setGameState({
      selectedWords: [],
      solvedCategories: [],
      remainingWords: shuffledWords,
      mistakesRemaining: MAX_MISTAKES,
      gameStatus: 'playing',
      shakingWords: [],
    });
  };

  const saveGameState = useCallback((newState: GameState, newStats: GameStats) => {
    const data: ConnectionsData = {
      lastPlayed: getTodayDateString(),
      gameState: newState,
      stats: newStats,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  const toggleWordSelection = useCallback((word: string) => {
    if (!gameState || gameState.gameStatus !== 'playing') return;

    setGameState(prev => {
      if (!prev) return prev;

      const isSelected = prev.selectedWords.includes(word);
      let newSelected: string[];

      if (isSelected) {
        newSelected = prev.selectedWords.filter(w => w !== word);
      } else {
        if (prev.selectedWords.length >= 4) {
          return prev;
        }
        newSelected = [...prev.selectedWords, word];
      }

      return { ...prev, selectedWords: newSelected };
    });
  }, [gameState]);

  const deselectAll = useCallback(() => {
    if (!gameState) return;
    setGameState(prev => prev ? { ...prev, selectedWords: [] } : prev);
  }, [gameState]);

  const shuffleWords = useCallback(() => {
    if (!gameState) return;
    setGameState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        remainingWords: shuffleArray(prev.remainingWords),
        selectedWords: [],
      };
    });
  }, [gameState]);

  const submitGuess = useCallback(() => {
    if (!gameState || !puzzle || gameState.selectedWords.length !== 4) return;

    const selectedSet = new Set(gameState.selectedWords);
    const matchedCategory = puzzle.categories.find(category =>
      category.words.every(word => selectedSet.has(word))
    );

    if (matchedCategory) {
      // Correct guess
      const newRemaining = gameState.remainingWords.filter(w => !selectedSet.has(w));
      const newSolved = [...gameState.solvedCategories, matchedCategory];
      const isWin = newSolved.length === 4;

      let newStats = { ...stats };
      if (isWin) {
        newStats.gamesPlayed++;
        newStats.gamesWon++;
        newStats.currentStreak++;
        newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
      }

      const newState: GameState = {
        selectedWords: [],
        solvedCategories: newSolved,
        remainingWords: newRemaining,
        mistakesRemaining: gameState.mistakesRemaining,
        gameStatus: isWin ? 'won' : 'playing',
        shakingWords: [],
      };

      setGameState(newState);
      setStats(newStats);
      saveGameState(newState, newStats);
    } else {
      // Incorrect guess
      const newMistakes = gameState.mistakesRemaining - 1;
      const isLoss = newMistakes === 0;

      let newStats = { ...stats };
      if (isLoss) {
        newStats.gamesPlayed++;
        newStats.currentStreak = 0;
      }

      const newState: GameState = {
        ...gameState,
        selectedWords: [],
        mistakesRemaining: newMistakes,
        gameStatus: isLoss ? 'lost' : 'playing',
        shakingWords: gameState.selectedWords,
      };

      setGameState(newState);
      setStats(newStats);
      saveGameState(newState, newStats);

      // Clear shaking animation after a delay
      setTimeout(() => {
        setGameState(prev => prev ? { ...prev, shakingWords: [] } : prev);
      }, 500);
    }
  }, [gameState, puzzle, stats, saveGameState]);

  return {
    puzzle,
    gameState,
    stats,
    toggleWordSelection,
    deselectAll,
    shuffleWords,
    submitGuess,
  };
}
