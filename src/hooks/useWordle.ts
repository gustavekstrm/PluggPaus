import { useState, useEffect, useCallback } from 'react';
import { getTodaysWord, VALID_WORDS } from '../data/swedishWords';
import type { GameState, GameStats, WordleData, GuessLetter, LetterStatus } from '../types/wordle';

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

function getTodayDateString(): string {
  const now = new Date();
  const swedenTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Stockholm' }));
  return swedenTime.toISOString().split('T')[0];
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

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data: WordleData = JSON.parse(saved);
        setStats(data.stats);

        // Check if it's a new day
        const today = getTodayDateString();
        if (data.lastPlayed === today) {
          // Continue today's game
          setGameState(data.gameState);
        }
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, []);

  // Save game state
  const saveGameState = useCallback((newState: GameState, newStats: GameStats) => {
    const data: WordleData = {
      lastPlayed: getTodayDateString(),
      gameState: newState,
      stats: newStats,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  // Handle key press
  const handleKeyPress = useCallback((key: string) => {
    if (gameState.gameStatus !== 'playing') return;

    if (key === 'Enter') {
      // Submit guess
      if (gameState.currentGuess.length !== WORD_LENGTH) {
        return;
      }

      // Check if word is valid
      if (!VALID_WORDS.includes(gameState.currentGuess.toLowerCase())) {
        setInvalidWord(true);
        setTimeout(() => setInvalidWord(false), 500);
        return;
      }

      // Evaluate guess
      const evaluation = evaluateGuess(gameState.currentGuess, answer);
      const newGuesses = [...gameState.guesses, gameState.currentGuess];
      const newEvaluations = [...gameState.evaluations, evaluation];

      // Check win/loss
      const isWin = gameState.currentGuess.toLowerCase() === answer.toLowerCase();
      const isLoss = newGuesses.length >= MAX_GUESSES && !isWin;

      let newStats = { ...stats };
      let newStatus: 'playing' | 'won' | 'lost' = 'playing';

      if (isWin) {
        newStatus = 'won';
        newStats.gamesPlayed++;
        newStats.gamesWon++;
        newStats.currentStreak++;
        newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
        newStats.guessDistribution[newGuesses.length as keyof typeof newStats.guessDistribution]++;
      } else if (isLoss) {
        newStatus = 'lost';
        newStats.gamesPlayed++;
        newStats.currentStreak = 0;
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
