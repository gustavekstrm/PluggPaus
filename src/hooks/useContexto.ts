import { useState, useEffect, useCallback } from 'react';
import { getTodaysPuzzleMeta, loadPuzzle } from '../data/contextoPuzzles';
import { getTodayDateString, nextStreak } from '../utils/dailyDate';
import { readJSON, writeJSON } from '../utils/safeStorage';
import type { GameState, GameStats, ContextoData, Guess, ContextoPuzzle } from '../types/contexto';

const STORAGE_KEY = 'contexto-data';

// Rang som ges åt giltiga svenska ord som inte finns i pusslets rankning.
// De registreras alltså (avvisas inte) men markeras som "långt bort". Måste ligga
// över antalet förberäknade rangordnade ord (~13 000) så att de alltid hamnar sist.
export const FAR_RANK = 99999;

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

export function useContexto() {
  const [puzzle, setPuzzle] = useState<ContextoPuzzle | null>(null);
  const [gameState, setGameState] = useState<GameState>(defaultGameState);
  const [stats, setStats] = useState<GameStats>(defaultStats);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const [puzzleId] = useState<string>(() => getTodaysPuzzleMeta().id);

  useEffect(() => {
    let cancelled = false;

    // Rankningarna är förberäknade och laddas lazy (bara dagens pussel).
    loadPuzzle(getTodaysPuzzleMeta())
      .then(todayPuzzle => {
        if (cancelled) return;
        setPuzzle(todayPuzzle);
        setLoading(false);
      })
      .catch(err => {
        if (cancelled) return;
        console.error('Failed to load puzzle rankings:', err);
        setError('Kunde inte ladda dagens pussel. Ladda om sidan.');
        setLoading(false);
      });

    const data = readJSON<ContextoData>(STORAGE_KEY);
    if (data) {
      {
        setStats({ ...defaultStats, ...data.stats });

        // Behåll bara spelläget om det gäller samma dag OCH samma pussel. Utan
        // pusselkontrollen skulle gamla gissningar leva vidare med rangvärden från ett
        // annat målord (t.ex. efter en deploy mitt på dagen, eller data från en äldre
        // version som saknar puzzleId).
        const today = getTodayDateString();
        if (data.lastPlayed === today && data.puzzleId === puzzleId && data.gameState) {
          setGameState({ ...defaultGameState, ...data.gameState });
        }
      }
    }

    return () => {
      cancelled = true;
    };
  }, [puzzleId]);

  const saveGameState = useCallback((newState: GameState, newStats: GameStats) => {
    const data: ContextoData = {
      lastPlayed: getTodayDateString(),
      puzzleId,
      gameState: newState,
      stats: newStats,
    };
    writeJSON(STORAGE_KEY, data);
  }, [puzzleId]);

  const makeGuess = useCallback((word: string) => {
    if (!puzzle || gameState.gameStatus !== 'playing') return;

    const normalizedWord = word.toLowerCase().trim();

    if (!normalizedWord) {
      setError('Skriv ett ord');
      return;
    }

    // Check if already guessed
    if (gameState.guesses.some(g => g.word === normalizedWord)) {
      setError('Redan gissat!');
      setTimeout(() => setError(''), 2000);
      return;
    }

    // Hämta rang från pusslet. Ligger ordet inte i rankningen men ser ut som ett
    // riktigt svenskt ord registrerar vi det ändå som "långt bort" – så räknas
    // varje rimlig gissning i stället för att avvisas.
    let rank: number;
    const known = puzzle.rankings[normalizedWord];
    if (known !== undefined) {
      rank = known;
    } else if (/^[a-zåäöé]{2,}$/.test(normalizedWord)) {
      rank = FAR_RANK;
    } else {
      setError('Skriv ett riktigt svenskt ord');
      setTimeout(() => setError(''), 2500);
      return;
    }

    const newGuess: Guess = {
      word: normalizedWord,
      rank,
      guessNumber: gameState.guesses.length + 1,
    };

    const newGuesses = [...gameState.guesses, newGuess].sort((a, b) => a.rank - b.rank);
    const isWin = rank === 1;

    const newStats: GameStats = { ...stats };
    if (isWin) {
      const today = getTodayDateString();
      // Ledtrådar läggs till som gissningar i listan men ska inte räknas som spelarens egna.
      const ownGuesses = Math.max(1, newGuesses.length - gameState.hintsUsed);
      const totalGuesses = (stats.totalGuesses ?? 0) + ownGuesses;
      newStats.gamesPlayed++;
      newStats.gamesWon++;
      newStats.currentStreak = nextStreak(stats.currentStreak, stats.lastCompletedDate, today);
      newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
      newStats.lastCompletedDate = today;
      newStats.totalGuesses = totalGuesses;
      newStats.averageGuesses = Math.round(totalGuesses / newStats.gamesWon);
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

    // Ord som inte gissats än, sorterade närmast först. Böjningar och sammansättningar
    // av målordet filtreras bort – de skulle i praktiken avslöja svaret.
    const guessedWords = new Set(gameState.guesses.map(g => g.word));
    const target = puzzle.targetWord;
    const availableWords = Object.entries(puzzle.rankings)
      .filter(([word]) => !guessedWords.has(word) && word !== target)
      .filter(([word]) => !word.includes(target) && !target.includes(word))
      .sort(([, rankA], [, rankB]) => rankA - rankB);

    if (availableWords.length === 0) return;

    // Ge ett ord ungefär halvvägs mellan spelarens bästa gissning och målordet, så att
    // tipset flyttar fram spelaren i stället för att servera svaret direkt.
    const bestRank = gameState.guesses.length
      ? Math.min(...gameState.guesses.map(g => g.rank))
      : 1000;
    const wantedRank = Math.min(1000, Math.max(2, Math.floor(bestRank / 2)));
    let hintIndex = availableWords.findIndex(([, rank]) => rank >= wantedRank);
    if (hintIndex === -1) hintIndex = availableWords.length - 1;
    const hintWord = availableWords[hintIndex][0];

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

    // Att ge upp är inte en vinst. Tidigare sattes status till 'won', vilket fick sidan att
    // gratulera spelaren, delningstexten att påstå en lösning, och gjorde vinstprocenten
    // låst vid 100 % eftersom gamesPlayed bara räknades upp i vinstgrenen.
    const newStats: GameStats = {
      ...stats,
      gamesPlayed: stats.gamesPlayed + 1,
      currentStreak: 0,
      lastCompletedDate: getTodayDateString(),
    };

    const targetGuess: Guess = {
      word: puzzle.targetWord,
      rank: 1,
      guessNumber: gameState.guesses.length + 1,
    };

    const newState: GameState = {
      guesses: [...gameState.guesses, targetGuess].sort((a, b) => a.rank - b.rank),
      gameStatus: 'gaveup',
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
    loading,
    makeGuess,
    getHint,
    giveUp,
  };
}
