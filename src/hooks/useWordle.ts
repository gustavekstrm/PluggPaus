import { useState, useEffect, useCallback } from 'react';
import { ANSWER_WORDS, getTodaysWord } from '../data/swedishWords';
import { getTodayDateString, nextStreak, puzzleKey } from '../utils/dailyDate';
import { readJSON, writeJSON } from '../utils/safeStorage';
import type { GameState, GameStats, WordleData, GuessLetter, LetterStatus } from '../types/wordle';
import { isInteractiveTarget } from '../utils/keyboard';

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;
const STORAGE_KEY = 'wordle-data';

const defaultStats: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
};

const defaultGameState: GameState = {
  guesses: [],
  currentGuess: '',
  gameStatus: 'playing',
  evaluations: [],
};

/** Fyller på sparad statistik med standardvärden, så ofullständig data inte kraschar spelet. */
function mergeStats(saved: unknown): GameStats {
  const s = (saved ?? {}) as Partial<GameStats>;
  return {
    ...defaultStats,
    ...s,
    guessDistribution: { ...defaultStats.guessDistribution, ...(s.guessDistribution ?? {}) },
  };
}

function evaluateGuess(guess: string, answer: string): GuessLetter[] {
  const result: GuessLetter[] = [];
  const answerLetters = answer.split('');
  const guessLetters = guess.split('');

  // First pass: mark correct letters
  const remaining: string[] = [...answerLetters];
  guessLetters.forEach((letter, i) => {
    if (letter === answerLetters[i]) {
      result[i] = { letter, status: 'correct' };
      remaining[i] = '';
    }
  });

  // Second pass: mark present and absent letters
  guessLetters.forEach((letter, i) => {
    if (result[i]) return; // already marked as correct

    const foundIndex = remaining.indexOf(letter);
    if (foundIndex !== -1) {
      result[i] = { letter, status: 'present' };
      remaining[foundIndex] = '';
    } else {
      result[i] = { letter, status: 'absent' };
    }
  });

  return result;
}

export function useWordle() {
  const [answer, setAnswer] = useState('');
  const [gameState, setGameState] = useState<GameState>(defaultGameState);
  const [stats, setStats] = useState<GameStats>(defaultStats);
  const [invalidWord, setInvalidWord] = useState(false);

  // Load saved data
  useEffect(() => {
    const todayWord = getTodaysWord();
    setAnswer(todayWord);

    const data = readJSON<WordleData>(STORAGE_KEY);
    if (data) {
      setStats(mergeStats(data.stats));

      // Återuppta bara om det gäller samma dag OCH samma pussel. Utan pusselkontrollen kan
      // gårdagens bräde återställas ovanpå ett nytt ord (t.ex. om ordlistan vuxit).
      const today = getTodayDateString();
      if (data.lastPlayed === today && data.puzzleKey === puzzleKey(today, ANSWER_WORDS.length) && data.gameState) {
        setGameState({ ...defaultGameState, ...data.gameState });
      }
    }
  }, []);

  // Save game state
  const saveGameState = useCallback((newState: GameState, newStats: GameStats) => {
    const today = getTodayDateString();
    const data: WordleData = {
      lastPlayed: today,
      puzzleKey: puzzleKey(today, ANSWER_WORDS.length),
      gameState: newState,
      stats: newStats,
    };
    writeJSON(STORAGE_KEY, data);
  }, []);

  // Handle key press
  const handleKeyPress = useCallback((key: string) => {
    if (gameState.gameStatus !== 'playing') return;

    if (key === 'Enter') {
      // Submit guess
      if (gameState.currentGuess.length !== WORD_LENGTH) {
        return;
      }

      // Accept any well-formed 5-letter Swedish word so real words are never
      // wrongly rejected (input is already restricted to Swedish letters).
      if (!/^[a-zåäöé]{5}$/i.test(gameState.currentGuess)) {
        setInvalidWord(true);
        setTimeout(() => setInvalidWord(false), 1500);
        return;
      }

      // Evaluate guess
      const evaluation = evaluateGuess(gameState.currentGuess, answer);
      const newGuesses = [...gameState.guesses, gameState.currentGuess];
      const newEvaluations = [...gameState.evaluations, evaluation];

      // Check win/loss
      const isWin = gameState.currentGuess.toLowerCase() === answer.toLowerCase();
      const isLoss = newGuesses.length >= MAX_GUESSES && !isWin;

      // Djup kopia av fördelningen – en grund spridning delar objektet med React-statet.
      const newStats: GameStats = { ...stats, guessDistribution: { ...stats.guessDistribution } };
      let newStatus: 'playing' | 'won' | 'lost' = 'playing';
      const today = getTodayDateString();

      if (isWin) {
        newStatus = 'won';
        newStats.gamesPlayed++;
        newStats.gamesWon++;
        // Sviten fortsätter bara om förra spelet avslutades i går.
        newStats.currentStreak = nextStreak(stats.currentStreak, stats.lastCompletedDate, today);
        newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
        newStats.lastCompletedDate = today;
        newStats.guessDistribution[newGuesses.length as keyof typeof newStats.guessDistribution]++;
      } else if (isLoss) {
        newStatus = 'lost';
        newStats.gamesPlayed++;
        newStats.currentStreak = 0;
        newStats.lastCompletedDate = today;
      }

      const newState: GameState = {
        guesses: newGuesses,
        currentGuess: '',
        gameStatus: newStatus,
        evaluations: newEvaluations,
      };

      setGameState(newState);
      setStats(newStats);
      saveGameState(newState, newStats);
    } else if (key === 'Backspace') {
      // Delete letter
      setGameState((prev) => ({
        ...prev,
        currentGuess: prev.currentGuess.slice(0, -1),
      }));
    } else if (key.length === 1 && /^[a-zåäö]$/i.test(key)) {
      // Add letter
      if (gameState.currentGuess.length < WORD_LENGTH) {
        setGameState((prev) => ({
          ...prev,
          currentGuess: prev.currentGuess + key.toLowerCase(),
        }));
      }
    }
  }, [gameState, answer, stats, saveGameState]);

  // Keyboard event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (isInteractiveTarget(e.target)) return;

      if (e.key === 'Enter' || e.key === 'Backspace') {
        e.preventDefault();
        handleKeyPress(e.key);
      } else if (e.key.length === 1 && /^[a-zåäö]$/i.test(e.key)) {
        e.preventDefault();
        handleKeyPress(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  // Get keyboard letter status
  const getKeyboardLetterStatus = useCallback((letter: string): LetterStatus => {
    let status: LetterStatus = 'empty';

    gameState.evaluations.forEach((evaluation) => {
      evaluation.forEach((item) => {
        if (item.letter === letter.toLowerCase()) {
          if (item.status === 'correct') {
            status = 'correct';
          } else if (item.status === 'present' && status !== 'correct') {
            status = 'present';
          } else if (item.status === 'absent' && status === 'empty') {
            status = 'absent';
          }
        }
      });
    });

    return status;
  }, [gameState.evaluations]);

  return {
    gameState,
    stats,
    answer,
    invalidWord,
    handleKeyPress,
    getKeyboardLetterStatus,
  };
}
