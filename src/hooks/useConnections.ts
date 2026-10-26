import { useState, useCallback } from 'react';
import { PUZZLES, getPuzzleForDate } from '../data/connectionsPuzzles';
import { nextStreak, puzzleKey } from '../utils/dailyDate';
import { readArchive, writeArchive } from '../utils/archive';
import { readJSON, writeJSON } from '../utils/safeStorage';
import type { GameState, GameStats, ConnectionsData, ConnectionsPuzzle } from '../types/connections';

const MAX_MISTAKES = 4;
const STORAGE_KEY = 'connections-data';

const defaultStats: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
};

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function newGame(puzzle: ConnectionsPuzzle): GameState {
  return {
    selectedWords: [],
    solvedCategories: [],
    remainingWords: shuffleArray(puzzle.categories.flatMap((cat) => cat.words)),
    mistakesRemaining: MAX_MISTAKES,
    gameStatus: 'playing',
    shakingWords: [],
  };
}

/** Läser sparat läge synkront, så första renderingen redan visar rätt bräde. */
function loadInitial(date: string, isArchive: boolean, puzzle: ConnectionsPuzzle) {
  const data = readJSON<ConnectionsData>(STORAGE_KEY);
  const stats: GameStats = { ...defaultStats, ...(data?.stats ?? {}) };
  if (isArchive) {
    const saved = readArchive<GameState>('connections', date);
    return { stats, gameState: saved ? { ...saved, shakingWords: [] } : newGame(puzzle) };
  }
  // Återuppta bara om både dag och pussel stämmer. Utan pusselkontrollen kunde
  // gårdagens kvarvarande ord ligga kvar medan gissningarna matchades mot dagens
  // kategorier – ingen kombination kunde då matcha och pusslet blev olösbart.
  if (data && data.lastPlayed === date && data.puzzleKey === puzzleKey(date, PUZZLES.length) && data.gameState) {
    return { stats, gameState: data.gameState };
  }
  return { stats, gameState: newGame(puzzle) };
}

/**
 * @param date      vilket dagspussel som spelas (YYYY-MM-DD, svensk tid)
 * @param isArchive sant för ett äldre pussel från arkivet – sparas separat och rör inte statistiken
 */
export function useConnections(date: string, isArchive = false) {
  const [puzzle] = useState<ConnectionsPuzzle>(() => getPuzzleForDate(date));
  const [initial] = useState(() => loadInitial(date, isArchive, puzzle));
  const [gameState, setGameState] = useState<GameState | null>(initial.gameState);
  const [stats, setStats] = useState<GameStats>(initial.stats);

  const saveGameState = useCallback(
    (newState: GameState, newStats: GameStats) => {
      if (isArchive) {
        writeArchive('connections', date, newState);
        return;
      }
      const data: ConnectionsData = {
        lastPlayed: date,
        puzzleKey: puzzleKey(date, PUZZLES.length),
        gameState: newState,
        stats: newStats,
      };
      writeJSON(STORAGE_KEY, data);
    },
    [date, isArchive]
  );

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

      const newStats: GameStats = { ...stats };
      if (isWin && !isArchive) {
        const today = date;
        newStats.gamesPlayed++;
        newStats.gamesWon++;
        newStats.currentStreak = nextStreak(stats.currentStreak, stats.lastCompletedDate, today);
        newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
        newStats.lastCompletedDate = today;
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

      const newStats: GameStats = { ...stats };
      if (isLoss && !isArchive) {
        newStats.gamesPlayed++;
        newStats.currentStreak = 0;
        newStats.lastCompletedDate = date;
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
  }, [gameState, puzzle, stats, saveGameState, date, isArchive]);

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
