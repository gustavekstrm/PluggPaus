import { useCallback, useEffect, useMemo, useState } from 'react';
import type { BikupanPuzzle } from '../data/bikupan';
import {
  getPreviousDateString,
  nextStreak,
  puzzleIndexForDate,
  puzzleKey,
} from '../utils/dailyDate';
import { readJSON, writeJSON } from '../utils/safeStorage';
import { readArchive, writeArchive } from '../utils/archive';

const STATE_KEY = 'bikupanState';
const STATS_KEY = 'bikupanStats';

export const MIN_WORD = 4;

/** Rangerna i procent av maxpoängen. Sista steget kräver alla ord. */
export const RANKS: { name: string; pct: number }[] = [
  { name: 'Ägg', pct: 0 },
  { name: 'Larv', pct: 2 },
  { name: 'Puppa', pct: 5 },
  { name: 'Arbetsbi', pct: 10 },
  { name: 'Flitigt bi', pct: 20 },
  { name: 'Honungssamlare', pct: 35 },
  { name: 'Vaxbyggare', pct: 50 },
  { name: 'Drottning', pct: 70 },
  { name: 'Hela kupan', pct: 100 },
];
/** Rangen som räknas som "klarad dag" för sviten. */
export const STREAK_RANK = 'Arbetsbi';

export interface BikupanPuzzleView {
  center: string;
  outer: string[];
  answers: string[];
  pangrams: Set<string>;
  maxScore: number;
}

interface SavedState {
  key: string;
  date: string;
  found: string[];
}

export interface BikupanStats {
  daysPlayed: number;
  streak: number;
  maxStreak: number;
  lastCompletedDate?: string;
  totalWords: number;
  queens: number;
}

const EMPTY_STATS: BikupanStats = { daysPlayed: 0, streak: 0, maxStreak: 0, totalWords: 0, queens: 0 };

export type Feedback = { kind: 'ok' | 'pangram' | 'error'; text: string } | null;

export function scoreWord(word: string, isPangram: boolean): number {
  const base = word.length === MIN_WORD ? 1 : word.length;
  return base + (isPangram ? 7 : 0);
}

export function viewOf(p: BikupanPuzzle): BikupanPuzzleView {
  const letters = p.l.split('');
  const answers = p.w.split(' ');
  const all = new Set(letters);
  const pangrams = new Set(answers.filter((w) => all.size === new Set(w).size && [...all].every((c) => w.includes(c))));
  const maxScore = answers.reduce((sum, w) => sum + scoreWord(w, pangrams.has(w)), 0);
  return { center: letters[0], outer: letters.slice(1), answers, pangrams, maxScore };
}

export function rankFor(score: number, max: number): { index: number; name: string } {
  const pct = max === 0 ? 0 : (score / max) * 100;
  let index = 0;
  RANKS.forEach((r, i) => {
    if (pct >= r.pct) index = i;
  });
  return { index, name: RANKS[index].name };
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * @param date      vilket dagspussel som spelas (YYYY-MM-DD, svensk tid)
 * @param isArchive sant för ett äldre pussel från arkivet – sparas separat och rör inte statistiken
 */
export function useBikupan(date: string, isArchive = false) {
  const [puzzles, setPuzzles] = useState<BikupanPuzzle[] | null>(null);
  const today = date;
  const [found, setFound] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [outerOrder, setOuterOrder] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [stats, setStats] = useState<BikupanStats>(() => ({ ...EMPTY_STATS, ...(readJSON<BikupanStats>(STATS_KEY) ?? {}) }));

  // Pusseldatan (~100 kB) laddas först när någon öppnar spelet.
  useEffect(() => {
    let alive = true;
    import('../data/bikupan').then((m) => {
      if (alive) setPuzzles(m.BIKUPAN);
    });
    return () => {
      alive = false;
    };
  }, []);

  const puzzle = useMemo(
    () => (puzzles ? viewOf(puzzles[puzzleIndexForDate(today, puzzles.length)]) : null),
    [puzzles, today]
  );
  const yesterday = useMemo(
    () => (puzzles ? viewOf(puzzles[puzzleIndexForDate(getPreviousDateString(today), puzzles.length)]) : null),
    [puzzles, today]
  );
  const key = puzzles ? puzzleKey(today, puzzles.length) : '';

  // Återställ sparat läge när pusslet är laddat – men bara om det gäller samma pussel.
  useEffect(() => {
    if (!puzzle) return;
    const saved = isArchive ? readArchive<SavedState>('bikupan', today) : readJSON<SavedState>(STATE_KEY);
    const valid = saved && saved.key === key && saved.date === today ? saved.found.filter((w) => puzzle.answers.includes(w)) : [];
    // Engångsinitiering efter att datan laddats asynkront.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFound(valid);
    setOuterOrder(puzzle.outer);
  }, [puzzle, key, today, isArchive]);

  const score = useMemo(
    () => (puzzle ? found.reduce((s, w) => s + scoreWord(w, puzzle.pangrams.has(w)), 0) : 0),
    [found, puzzle]
  );
  const rank = puzzle ? rankFor(score, puzzle.maxScore) : { index: 0, name: RANKS[0].name };

  const persist = useCallback(
    (nextFound: string[]) => {
      const state: SavedState = { key, date: today, found: nextFound };
      if (isArchive) writeArchive('bikupan', today, state);
      else writeJSON(STATE_KEY, state);
    },
    [key, today, isArchive]
  );

  const updateStats = useCallback(
    (nextFound: string[], prevScore: number, nextScore: number) => {
      if (!puzzle || isArchive) return;
      setStats((prev) => {
        const next = { ...prev, totalWords: prev.totalWords + 1 };
        if (nextFound.length === 1) next.daysPlayed = prev.daysPlayed + 1;
        const streakIdx = RANKS.findIndex((r) => r.name === STREAK_RANK);
        const before = rankFor(prevScore, puzzle.maxScore).index;
        const after = rankFor(nextScore, puzzle.maxScore).index;
        if (before < streakIdx && after >= streakIdx) {
          next.streak = nextStreak(prev.streak, prev.lastCompletedDate, today);
          next.maxStreak = Math.max(prev.maxStreak, next.streak);
          next.lastCompletedDate = today;
        }
        const queenIdx = RANKS.findIndex((r) => r.name === 'Drottning');
        if (before < queenIdx && after >= queenIdx) next.queens = prev.queens + 1;
        writeJSON(STATS_KEY, next);
        return next;
      });
    },
    [puzzle, today, isArchive]
  );

  const submit = useCallback(() => {
    if (!puzzle) return;
    const word = input.trim().toLowerCase();
    setInput('');
    if (!word) return;
    const allowed = new Set([puzzle.center, ...puzzle.outer]);
    let error: string | null = null;
    if (word.length < MIN_WORD) error = `För kort – minst ${MIN_WORD} bokstäver`;
    else if ([...word].some((c) => !allowed.has(c))) error = 'Använd bara bokstäverna i kupan';
    else if (!word.includes(puzzle.center)) error = `Ordet måste innehålla ${puzzle.center.toUpperCase()}`;
    else if (found.includes(word)) error = 'Redan hittat';
    else if (!puzzle.answers.includes(word)) error = 'Finns inte i ordlistan';
    if (error) {
      setFeedback({ kind: 'error', text: error });
      return;
    }
    const isPangram = puzzle.pangrams.has(word);
    const points = scoreWord(word, isPangram);
    const nextFound = [...found, word];
    setFound(nextFound);
    persist(nextFound);
    updateStats(nextFound, score, score + points);
    setFeedback(
      isPangram
        ? { kind: 'pangram', text: `Pangram! +${points} poäng` }
        : { kind: 'ok', text: points >= 7 ? `Snyggt! +${points}` : points >= 5 ? `Bra! +${points}` : `+${points}` }
    );
  }, [puzzle, input, found, persist, updateStats, score]);

  const addLetter = useCallback((c: string) => {
    setFeedback(null);
    setInput((v) => (v.length >= 20 ? v : v + c));
  }, []);
  const removeLetter = useCallback(() => setInput((v) => v.slice(0, -1)), []);
  const reshuffle = useCallback(() => setOuterOrder((o) => shuffle(o)), []);

  return {
    loading: !puzzle,
    puzzle,
    yesterday,
    outerOrder,
    found,
    input,
    setInput,
    score,
    rank,
    feedback,
    stats,
    today,
    submit,
    addLetter,
    removeLetter,
    reshuffle,
  };
}
