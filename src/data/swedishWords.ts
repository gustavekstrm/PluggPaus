import { getDateString, getTodayDateString, puzzleIndexForDate } from '../utils/dailyDate';

// Swedish 5-letter words for Orda (Wordle).
// ANSWER_WORDS: curated, verified real 5-letter Swedish words used as daily answers.
// Guess validation in useWordle is lenient (any 5 Swedish letters are accepted),
// so real Swedish words are never wrongly rejected.
export const ANSWER_WORDS: string[] = [
  'plats', 'krona', 'skola', 'spela', 'glass', 'banan', 'tavla', 'lampa', 'stege', 'fjord',
  'kudde', 'vinst', 'druva', 'flock', 'gräns', 'hjort', 'kanel', 'karta', 'kasta', 'kille',
  'klara', 'klass', 'komma', 'konst', 'korta', 'kraft', 'krama', 'kruka', 'kulle', 'kunna',
  'kvart', 'kväll', 'kyssa', 'lista', 'liten', 'lokal', 'lycka', 'längd', 'läser', 'löfte',
  'mamma', 'massa', 'minut', 'modig', 'moral', 'morot', 'mössa', 'nästa', 'njuta', 'noter',
  'nudel', 'någon', 'några', 'ordet', 'order', 'organ', 'pappa', 'parad', 'parti', 'penna',
  'plank', 'poäng', 'prata', 'press', 'prick', 'prins', 'punkt', 'raket', 'regel', 'regna',
  'rensa', 'rikta', 'ringa', 'rolig', 'roman', 'rulle', 'runda', 'räcka', 'rädda', 'rätta',
  'rösta', 'sagan', 'samla', 'samma', 'sedan', 'sidan', 'simma', 'sitta', 'sjuka', 'själv',
  'skala', 'skapa', 'skatt', 'skida', 'skiva', 'skott', 'skrik', 'skära', 'slott', 'smart',
  'smula', 'snabb', 'snart', 'solig', 'sonen', 'sport', 'språk', 'stack', 'start', 'stiga',
  'stolt', 'stopp', 'stora', 'storm', 'stuga', 'stund', 'ställ', 'städa', 'summa', 'svara',
  'svart', 'svett', 'syfte', 'säker', 'sälja', 'tiden', 'tolka', 'träna', 'trött', 'tunna',
  'tvätt', 'under', 'varje', 'vecka', 'verka', 'vinna', 'vråla', 'väder', 'vänta', 'värde',
  'växel', 'yngre', 'äldre', 'ängel', 'äpple', 'ärlig', 'öppna', 'örter', 'brand', 'blund',
];

// Kept for backwards compatibility / potential future strict mode.
export const VALID_WORDS: string[] = ANSWER_WORDS;

// Dagens ord. Datum och pusselindex räknas via den delade dagsfunktionen, så att
// datumnyckeln i localStorage och ordvalet alltid byter vid exakt samma tidpunkt.
export function getWordForDate(dateString: string): string {
  return ANSWER_WORDS[puzzleIndexForDate(dateString, ANSWER_WORDS.length)];
}

export function getDailyWord(date: Date): string {
  return getWordForDate(getDateString(date));
}

export function getTodaysWord(): string {
  return getWordForDate(getTodayDateString());
}
