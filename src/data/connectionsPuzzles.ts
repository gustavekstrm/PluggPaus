import type { ConnectionsPuzzle } from '../types/connections';

// Svenska pussel i Connections-anda. Varje pussel har fyra grupper med fyra ord.
// Svårigheten byggs med tvetydiga ord (som verkar passa i flera grupper) och
// ordlek-grupper (t.ex. "___STJÄRNA", "___VÄRK") snarare än självklara kategorier.
export const PUZZLES: ConnectionsPuzzle[] = [
  {
    date: '2024-01-01',
    categories: [
      { name: 'HUNDRASER', words: ['PUDEL', 'TAX', 'MOPS', 'BOXER'], difficulty: 'easy' },
      { name: 'KORTSPEL', words: ['VIRA', 'CANASTA', 'KILLE', 'BRIDGE'], difficulty: 'medium' },
      { name: 'SLANG FÖR PENGAR', words: ['STÅLAR', 'DEG', 'KOSING', 'KLÖVER'], difficulty: 'hard' },
      { name: 'BAKVERK', words: ['BULLE', 'KAKA', 'TÅRTA', 'LIMPA'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-02',
    categories: [
      { name: 'SVENSKA STÄDER', words: ['LUND', 'MALMÖ', 'KIRUNA', 'YSTAD'], difficulty: 'easy' },
      { name: 'TRÄD', words: ['TALL', 'GRAN', 'LÖNN', 'LIND'], difficulty: 'medium' },
      { name: 'BILMÄRKEN', words: ['VOLVO', 'SAAB', 'FORD', 'KIA'], difficulty: 'hard' },
      { name: 'FYSIKALISKA ENHETER', words: ['VOLT', 'WATT', 'NEWTON', 'TESLA'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-03',
    categories: [
      { name: 'FÅGLAR', words: ['KRÅKA', 'SKATA', 'MÅS', 'TRAST'], difficulty: 'easy' },
      { name: 'SCHACKPJÄSER', words: ['KUNG', 'DAM', 'TORN', 'LÖPARE'], difficulty: 'medium' },
      { name: 'YRKEN', words: ['LÄKARE', 'LÄRARE', 'SNICKARE', 'BAGARE'], difficulty: 'hard' },
      { name: 'KÖKSREDSKAP', words: ['VISP', 'SLEV', 'KAVEL', 'DURKSLAG'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-04',
    categories: [
      { name: 'VÄDERTYPER', words: ['REGN', 'SNÖ', 'DIMMA', 'HAGEL'], difficulty: 'easy' },
      { name: 'MUSIKGENRER', words: ['ROCK', 'JAZZ', 'PUNK', 'SOUL'], difficulty: 'medium' },
      { name: 'DELAR AV ANSIKTET', words: ['PANNA', 'HAKA', 'KIND', 'LÄPP'], difficulty: 'hard' },
      { name: '___STJÄRNA', words: ['FILM', 'SJÖ', 'POP', 'POL'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-05',
    categories: [
      { name: 'FRÅGEORD', words: ['VEM', 'VAR', 'HUR', 'VAD'], difficulty: 'easy' },
      { name: 'KROPPSDELAR', words: ['ARM', 'LÅR', 'NACKE', 'HÄL'], difficulty: 'medium' },
      { name: '___VÄRK', words: ['HUVUD', 'TAND', 'RYGG', 'MAG'], difficulty: 'hard' },
      { name: '___STEG', words: ['FOT', 'BAK', 'FRAM', 'TRAPP'], difficulty: 'tricky' },
    ],
  },
  {
    date: '2024-01-06',
    categories: [
      { name: 'GREKISKA BOKSTÄVER', words: ['ALFA', 'BETA', 'GAMMA', 'SIGMA'], difficulty: 'easy' },
      { name: 'PALINDROM', words: ['ANNA', 'OTTO', 'KAJAK', 'RADAR'], difficulty: 'medium' },
      { name: '___LJUS', words: ['SOL', 'MÅN', 'DAG', 'STJÄRN'], difficulty: 'hard' },
      { name: '___PAPPER', words: ['SAND', 'SMÖR', 'TOA', 'TIDNINGS'], difficulty: 'tricky' },
    ],
  },
];

export function getDailyPuzzle(date: Date): ConnectionsPuzzle {
  const epoch = new Date('2024-01-01T00:00:00+01:00');
  const msPerDay = 86400000;
  const daysSinceEpoch = Math.floor((date.getTime() - epoch.getTime()) / msPerDay);
  const puzzleIndex = ((daysSinceEpoch % PUZZLES.length) + PUZZLES.length) % PUZZLES.length;
  return PUZZLES[puzzleIndex];
}

export function getTodaysPuzzle(): ConnectionsPuzzle {
  const now = new Date();
  const swedenTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Stockholm' }));
  return getDailyPuzzle(swedenTime);
}
