import type { ContextoPuzzle } from '../types/contexto';
import { getDateString, getTodayDateString, puzzleIndexForDate } from '../utils/dailyDate';
import { PUZZLE_LOADERS } from './kontext';

// Svenska Kontext-pussel.
//
// Rankningarna är FÖRBERÄKNADE med en svensk ordvektormodell (spaCy `sv_core_news_md`,
// floret-vektorer) – se scripts/generate-kontext.py. För varje målord är ~13 000 vanliga
// svenska ord sorterade efter cosinuslikhet, närmast först. Rang 1 = målordet.
//
// Data ligger i src/data/kontext/: `vocab.ts` (delad ordlista) och `pNN.ts` (en permutation
// per pussel, kodad som base36 med 3 tecken per ordindex). Filerna laddas lazy via
// dynamisk import (se kontext/index.ts), så spelaren hämtar bara dagens pussel (~39 kB)
// plus ordlistan (~110 kB) – inget av det hamnar i huvudbundeln.

export interface PuzzleMeta {
  id: string;
  date: string;
  targetWord: string;
}

export const PUZZLES: PuzzleMeta[] = [
  { id: 'p01', date: '2024-01-01', targetWord: 'hav' },
  { id: 'p02', date: '2024-01-02', targetWord: 'skola' },
  { id: 'p03', date: '2024-01-03', targetWord: 'kaffe' },
  { id: 'p04', date: '2024-01-04', targetWord: 'vinter' },
  { id: 'p05', date: '2024-01-05', targetWord: 'sommar' },
  { id: 'p06', date: '2024-01-06', targetWord: 'sol' },
  { id: 'p07', date: '2024-01-07', targetWord: 'regn' },
  { id: 'p08', date: '2024-01-08', targetWord: 'snö' },
  { id: 'p09', date: '2024-01-09', targetWord: 'skog' },
  { id: 'p10', date: '2024-01-10', targetWord: 'berg' },
  { id: 'p11', date: '2024-01-11', targetWord: 'musik' },
  { id: 'p12', date: '2024-01-12', targetWord: 'film' },
  { id: 'p13', date: '2024-01-13', targetWord: 'bok' },
  { id: 'p14', date: '2024-01-14', targetWord: 'fotboll' },
  { id: 'p15', date: '2024-01-15', targetWord: 'hund' },
  { id: 'p16', date: '2024-01-16', targetWord: 'katt' },
  { id: 'p17', date: '2024-01-17', targetWord: 'häst' },
  { id: 'p18', date: '2024-01-18', targetWord: 'fågel' },
  { id: 'p19', date: '2024-01-19', targetWord: 'fisk' },
  { id: 'p20', date: '2024-01-20', targetWord: 'blomma' },
  { id: 'p21', date: '2024-01-21', targetWord: 'träd' },
  { id: 'p22', date: '2024-01-22', targetWord: 'äpple' },
  { id: 'p23', date: '2024-01-23', targetWord: 'choklad' },
  { id: 'p24', date: '2024-01-24', targetWord: 'glass' },
  { id: 'p25', date: '2024-01-25', targetWord: 'pizza' },
  { id: 'p26', date: '2024-01-26', targetWord: 'bröd' },
  { id: 'p27', date: '2024-01-27', targetWord: 'mjölk' },
  { id: 'p28', date: '2024-01-28', targetWord: 'vatten' },
  { id: 'p29', date: '2024-01-29', targetWord: 'mat' },
  { id: 'p30', date: '2024-01-30', targetWord: 'frukost' },
  { id: 'p31', date: '2024-01-31', targetWord: 'hus' },
  { id: 'p32', date: '2024-02-01', targetWord: 'rum' },
  { id: 'p33', date: '2024-02-02', targetWord: 'säng' },
  { id: 'p34', date: '2024-02-03', targetWord: 'fönster' },
  { id: 'p35', date: '2024-02-04', targetWord: 'dörr' },
  { id: 'p36', date: '2024-02-05', targetWord: 'kök' },
  { id: 'p37', date: '2024-02-06', targetWord: 'trädgård' },
  { id: 'p38', date: '2024-02-07', targetWord: 'stad' },
  { id: 'p39', date: '2024-02-08', targetWord: 'gata' },
  { id: 'p40', date: '2024-02-09', targetWord: 'bro' },
  { id: 'p41', date: '2024-02-10', targetWord: 'bil' },
  { id: 'p42', date: '2024-02-11', targetWord: 'cykel' },
  { id: 'p43', date: '2024-02-12', targetWord: 'tåg' },
  { id: 'p44', date: '2024-02-13', targetWord: 'flygplan' },
  { id: 'p45', date: '2024-02-14', targetWord: 'båt' },
  { id: 'p46', date: '2024-02-15', targetWord: 'buss' },
  { id: 'p47', date: '2024-02-16', targetWord: 'resa' },
  { id: 'p48', date: '2024-02-17', targetWord: 'semester' },
  { id: 'p49', date: '2024-02-18', targetWord: 'strand' },
  { id: 'p50', date: '2024-02-19', targetWord: 'fjäll' },
  { id: 'p51', date: '2024-02-20', targetWord: 'telefon' },
  { id: 'p52', date: '2024-02-21', targetWord: 'dator' },
  { id: 'p53', date: '2024-02-22', targetWord: 'internet' },
  { id: 'p54', date: '2024-02-23', targetWord: 'pengar' },
  { id: 'p55', date: '2024-02-24', targetWord: 'jobb' },
  { id: 'p56', date: '2024-02-25', targetWord: 'tid' },
  { id: 'p57', date: '2024-02-26', targetWord: 'klocka' },
  { id: 'p58', date: '2024-02-27', targetWord: 'morgon' },
  { id: 'p59', date: '2024-02-28', targetWord: 'natt' },
  { id: 'p60', date: '2024-02-29', targetWord: 'dröm' },
  { id: 'p61', date: '2024-03-01', targetWord: 'vän' },
  { id: 'p62', date: '2024-03-02', targetWord: 'familj' },
  { id: 'p63', date: '2024-03-03', targetWord: 'mamma' },
  { id: 'p64', date: '2024-03-04', targetWord: 'kärlek' },
  { id: 'p65', date: '2024-03-05', targetWord: 'glädje' },
  { id: 'p66', date: '2024-03-06', targetWord: 'skratt' },
  { id: 'p67', date: '2024-03-07', targetWord: 'sång' },
  { id: 'p68', date: '2024-03-08', targetWord: 'dans' },
  { id: 'p69', date: '2024-03-09', targetWord: 'fest' },
  { id: 'p70', date: '2024-03-10', targetWord: 'jul' },
  { id: 'p71', date: '2024-03-11', targetWord: 'hjärta' },
  { id: 'p72', date: '2024-03-12', targetWord: 'hand' },
  { id: 'p73', date: '2024-03-13', targetWord: 'öga' },
  { id: 'p74', date: '2024-03-14', targetWord: 'hår' },
  { id: 'p75', date: '2024-03-15', targetWord: 'kläder' },
  { id: 'p76', date: '2024-03-16', targetWord: 'sko' },
  { id: 'p77', date: '2024-03-17', targetWord: 'färg' },
  { id: 'p78', date: '2024-03-18', targetWord: 'ljus' },
  { id: 'p79', date: '2024-03-19', targetWord: 'mörker' },
  { id: 'p80', date: '2024-03-20', targetWord: 'vind' },
  { id: 'p81', date: '2024-03-21', targetWord: 'sten' },
  { id: 'p82', date: '2024-03-22', targetWord: 'guld' },
  { id: 'p83', date: '2024-03-23', targetWord: 'papper' },
  { id: 'p84', date: '2024-03-24', targetWord: 'penna' },
  { id: 'p85', date: '2024-03-25', targetWord: 'brev' },
  { id: 'p86', date: '2024-03-26', targetWord: 'tidning' },
  { id: 'p87', date: '2024-03-27', targetWord: 'foto' },
  { id: 'p88', date: '2024-03-28', targetWord: 'konst' },
  { id: 'p89', date: '2024-03-29', targetWord: 'teater' },
  { id: 'p90', date: '2024-03-30', targetWord: 'spel' },
  { id: 'p91', date: '2024-03-31', targetWord: 'träning' },
  { id: 'p92', date: '2024-04-01', targetWord: 'hälsa' },
  { id: 'p93', date: '2024-04-02', targetWord: 'läkare' },
  { id: 'p94', date: '2024-04-03', targetWord: 'sjukhus' },
  { id: 'p95', date: '2024-04-04', targetWord: 'språk' },
  { id: 'p96', date: '2024-04-05', targetWord: 'ord' },
  { id: 'p97', date: '2024-04-06', targetWord: 'matematik' },
  { id: 'p98', date: '2024-04-07', targetWord: 'historia' },
  { id: 'p99', date: '2024-04-08', targetWord: 'bibliotek' },
  { id: 'p100', date: '2024-04-09', targetWord: 'student' },
];

const cache = new Map<string, Record<string, number>>();

/** Avkodar en base36-permutation (3 tecken per ordindex) till { ord: rang }. */
function decodeOrder(order: string, vocab: string[]): Record<string, number> {
  const rankings: Record<string, number> = {};
  const total = Math.floor(order.length / 3);
  for (let i = 0; i < total; i++) {
    const index = parseInt(order.slice(i * 3, i * 3 + 3), 36);
    const word = vocab[index];
    if (word !== undefined && rankings[word] === undefined) {
      rankings[word] = i + 1;
    }
  }
  return rankings;
}

/** Laddar rankningarna för ett pussel. Resultatet cachas för sessionen. */
export async function loadPuzzle(meta: PuzzleMeta): Promise<ContextoPuzzle> {
  const cached = cache.get(meta.id);
  if (cached) {
    return { date: meta.date, targetWord: meta.targetWord, rankings: cached };
  }

  const loader = PUZZLE_LOADERS[meta.id];
  if (!loader) {
    throw new Error(`Saknar rankningsdata för pusslet ${meta.id}`);
  }

  // Ordlistan importeras lazy den också, så inget av Kontext-datat hamnar i huvudbundeln.
  const [mod, vocabMod] = await Promise.all([loader(), import('./kontext/vocab')]);
  const rankings = decodeOrder(mod.ORDER, vocabMod.VOCAB);
  rankings[meta.targetWord] = 1;
  cache.set(meta.id, rankings);

  return { date: meta.date, targetWord: meta.targetWord, rankings };
}

export function getPuzzleMetaForDate(dateString: string): PuzzleMeta {
  return PUZZLES[puzzleIndexForDate(dateString, PUZZLES.length)];
}

export function getDailyPuzzleMeta(date: Date): PuzzleMeta {
  return getPuzzleMetaForDate(getDateString(date));
}

export function getTodaysPuzzleMeta(): PuzzleMeta {
  return getPuzzleMetaForDate(getTodayDateString());
}

/**
 * Bakåtkompatibla synkrona hjälpare: returnerar pusslet utan rankningar (de laddas
 * asynkront via loadPuzzle). Använd getTodaysPuzzleMeta + loadPuzzle i ny kod.
 */
export function getDailyPuzzle(date: Date): ContextoPuzzle {
  const meta = getDailyPuzzleMeta(date);
  return { date: meta.date, targetWord: meta.targetWord, rankings: cache.get(meta.id) ?? {} };
}

export function getTodaysPuzzle(): ContextoPuzzle {
  return getDailyPuzzle(new Date());
}
