import { useSearchParams } from 'react-router-dom';
import { getPreviousDateString, getTodayDateString } from './dailyDate';
import { readJSON, writeJSON } from './safeStorage';

/** Hur många dagar bakåt arkivet sträcker sig. */
export const ARCHIVE_DAYS = 30;
/** Max antal sparade arkivomgångar per spel, så lagringen inte växer för evigt. */
const MAX_SAVED = 60;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** De senaste ARCHIVE_DAYS dagarna före i dag, nyast först. */
export function archiveDates(today = getTodayDateString()): string[] {
  const out: string[] = [];
  let d = today;
  for (let i = 0; i < ARCHIVE_DAYS; i++) {
    d = getPreviousDateString(d);
    out.push(d);
  }
  return out;
}

export interface PuzzleDate {
  /** Datumet vars pussel ska spelas. */
  date: string;
  today: string;
  /** Sant när ett äldre pussel spelas från arkivet – räknas inte i statistiken. */
  isArchive: boolean;
}

/**
 * Läser ?datum=YYYY-MM-DD. Bara dagar inom arkivfönstret godkänns – framtida datum
 * (spoilers) och skräp faller tillbaka på dagens pussel.
 */
export function usePuzzleDate(): PuzzleDate {
  const [params] = useSearchParams();
  const today = getTodayDateString();
  const wanted = params.get('datum') ?? '';
  const ok = DATE_RE.test(wanted) && archiveDates(today).includes(wanted);
  return { date: ok ? wanted : today, today, isArchive: ok };
}

type ArchiveStore<T> = Record<string, T>;

export function readArchive<T>(game: string, date: string): T | null {
  const store = readJSON<ArchiveStore<T>>(`${game}-arkiv`);
  return store?.[date] ?? null;
}

export function writeArchive<T>(game: string, date: string, value: T): void {
  const store = readJSON<ArchiveStore<T>>(`${game}-arkiv`) ?? {};
  store[date] = value;
  const keys = Object.keys(store).sort();
  for (const k of keys.slice(0, Math.max(0, keys.length - MAX_SAVED))) delete store[k];
  writeJSON(`${game}-arkiv`, store);
}

const MONTHS = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];
const WEEKDAYS = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];

/** "20 oktober" – eller "måndag 20 oktober" med veckodag. */
export function formatSwedishDate(date: string, withWeekday = false): string {
  const [y, m, d] = date.split('-').map(Number);
  const wd = WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return `${withWeekday ? wd + ' ' : ''}${d} ${MONTHS[m - 1]}`;
}
