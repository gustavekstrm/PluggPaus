import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Landskap } from '../data/landskap';
import { getTodayDateString, nextStreak, puzzleIndexForDate } from '../utils/dailyDate';
import { readJSON, writeJSON } from '../utils/safeStorage';

export const MAX_GUESSES = 6;
export const HINT_AFTER = 3;

const STATE_KEY = 'landskapetState';
const STATS_KEY = 'landskapetStats';

export interface GuessResult {
  name: string;
  km: number;
  /** Riktning från gissningen mot rätt landskap, i grader (0 = norr). */
  bearing: number;
  proximity: number;
  correct: boolean;
}

export type Status = 'playing' | 'won' | 'lost';

export interface LandskapetStats {
  played: number;
  wins: number;
  streak: number;
  maxStreak: number;
  lastCompletedDate?: string;
  dist: number[];
}

const EMPTY_STATS: LandskapetStats = { played: 0, wins: 0, streak: 0, maxStreak: 0, dist: [0, 0, 0, 0, 0, 0] };

interface SavedState {
  date: string;
  target: string;
  guesses: string[];
}

const R = 6371;
const rad = (d: number) => (d * Math.PI) / 180;

export function distanceKm(a: Landskap, b: Landskap): number {
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function bearingDeg(a: Landskap, b: Landskap): number {
  const y = Math.sin(rad(b.lon - a.lon)) * Math.cos(rad(b.lat));
  const x = Math.cos(rad(a.lat)) * Math.sin(rad(b.lat)) - Math.sin(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.cos(rad(b.lon - a.lon));
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

const DIRS = ['norr', 'nordost', 'öster', 'sydost', 'söder', 'sydväst', 'väster', 'nordväst'];
const ARROWS = ['⬆️', '↗️', '➡️', '↘️', '⬇️', '↙️', '⬅️', '↖️'];
export const directionName = (deg: number) => DIRS[Math.round(deg / 45) % 8];
export const directionArrow = (deg: number) => ARROWS[Math.round(deg / 45) % 8];

/** Gör inmatning jämförbar: gemener, utan mellanslag. Å/Ä/Ö behålls men "a" matchar "å". */
export const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, '');
export const fold = (s: string) => normalize(s).normalize('NFD').replace(/[̀-ͯ]/g, '');

export function useLandskapet() {
  const [data, setData] = useState<{ list: Landskap[]; order: number[]; box: [number, number, number, number] } | null>(null);
  const [today] = useState(getTodayDateString);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [practiceTarget, setPracticeTarget] = useState<string | null>(null);
  const [stats, setStats] = useState<LandskapetStats>(() => {
    const s = readJSON<LandskapetStats>(STATS_KEY);
    return s && Array.isArray(s.dist) && s.dist.length === MAX_GUESSES ? { ...EMPTY_STATS, ...s } : EMPTY_STATS;
  });

  // Konturerna (~50 kB) laddas först när någon öppnar spelet.
  useEffect(() => {
    let alive = true;
    import('../data/landskap').then((m) => {
      if (alive) setData({ list: m.LANDSKAP, order: m.DAILY_ORDER, box: m.MAP_BOX });
    });
    return () => {
      alive = false;
    };
  }, []);

  const dailyTarget = useMemo(() => {
    if (!data) return null;
    return data.list[data.order[puzzleIndexForDate(today, data.order.length)]];
  }, [data, today]);

  const practice = practiceTarget !== null;
  const target = useMemo(() => {
    if (!data) return null;
    if (practiceTarget) return data.list.find((l) => l.name === practiceTarget) ?? dailyTarget;
    return dailyTarget;
  }, [data, practiceTarget, dailyTarget]);

  // Återställ dagens sparade gissningar – bara om de gäller samma dag och samma landskap.
  useEffect(() => {
    if (!dailyTarget) return;
    const saved = readJSON<SavedState>(STATE_KEY);
    const valid = saved && saved.date === today && saved.target === dailyTarget.name ? saved.guesses : [];
    // Engångsinitiering efter att datan laddats asynkront.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGuesses(valid.slice(0, MAX_GUESSES));
  }, [dailyTarget, today]);

  const maxKm = useMemo(() => {
    if (!data) return 1;
    let m = 1;
    for (const a of data.list) for (const b of data.list) m = Math.max(m, distanceKm(a, b));
    return m;
  }, [data]);

  const results: GuessResult[] = useMemo(() => {
    if (!data || !target) return [];
    return guesses
      .map((name) => data.list.find((l) => l.name === name))
      .filter((l): l is Landskap => !!l)
      .map((l) => {
        const correct = l.name === target.name;
        const km = correct ? 0 : distanceKm(l, target);
        return {
          name: l.name,
          km: Math.round(km),
          bearing: bearingDeg(l, target),
          proximity: correct ? 100 : Math.max(0, Math.round((1 - km / maxKm) * 100)),
          correct,
        };
      });
  }, [data, target, guesses, maxKm]);

  const status: Status = results.some((r) => r.correct) ? 'won' : results.length >= MAX_GUESSES ? 'lost' : 'playing';

  const guess = useCallback(
    (name: string): string | null => {
      if (!data || !target || status !== 'playing') return null;
      const match = data.list.find((l) => normalize(l.name) === normalize(name)) ?? data.list.find((l) => fold(l.name) === fold(name));
      if (!match) return 'Okänt landskap – välj ett från listan';
      if (guesses.includes(match.name)) return `Du har redan gissat ${match.name}`;
      const next = [...guesses, match.name];
      setGuesses(next);
      if (practice) return null;

      writeJSON(STATE_KEY, { date: today, target: target.name, guesses: next } satisfies SavedState);
      const won = match.name === target.name;
      const finished = won || next.length >= MAX_GUESSES;
      if (finished) {
        setStats((prev) => {
          const s: LandskapetStats = { ...prev, dist: [...prev.dist], played: prev.played + 1 };
          if (won) {
            s.wins = prev.wins + 1;
            s.dist[next.length - 1] += 1;
            s.streak = nextStreak(prev.streak, prev.lastCompletedDate, today);
            s.lastCompletedDate = today;
          } else {
            s.streak = 0;
          }
          s.maxStreak = Math.max(prev.maxStreak, s.streak);
          writeJSON(STATS_KEY, s);
          return s;
        });
      }
      return null;
    },
    [data, target, status, guesses, practice, today]
  );

  const startPractice = useCallback(() => {
    if (!data) return;
    const pool = data.list.filter((l) => l.name !== target?.name);
    setPracticeTarget(pool[Math.floor(Math.random() * pool.length)].name);
    setGuesses([]);
  }, [data, target]);

  const backToDaily = useCallback(() => {
    setPracticeTarget(null);
    const saved = readJSON<SavedState>(STATE_KEY);
    setGuesses(saved && saved.date === today && dailyTarget && saved.target === dailyTarget.name ? saved.guesses : []);
  }, [today, dailyTarget]);

  return {
    loading: !data || !target,
    list: data?.list ?? [],
    mapBox: data?.box ?? null,
    target,
    results,
    status,
    stats,
    practice,
    today,
    guess,
    startPractice,
    backToDaily,
  };
}
