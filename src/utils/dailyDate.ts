/**
 * En enda källa till sanning för "vilken dag är det?" i alla dagliga spel.
 *
 * Tidigare räknade varje spel dagen på sitt eget sätt. Datumnyckeln som sparas i
 * localStorage använde `new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Stockholm' }))`
 * — svensk väggklockstid tolkad i webbläsarens EGEN tidszon, sedan tillbaka till UTC via
 * toISOString(). Pusselindexet räknades i stället direkt på tidsstämpeln mot en epok.
 * De två metoderna glider isär: för en svensk användare i sommartid byter pusslet kl 01:00
 * medan datumnyckeln byter kl 02:00. Under den timmen visas ett nytt pussel med gårdagens
 * sparade spelläge, och samma pussel kan spelas (och räknas i statistiken) två gånger.
 *
 * Här räknas allt från ETT värde: dagens datum i Europe/Stockholm som "YYYY-MM-DD".
 */

const TIME_ZONE = 'Europe/Stockholm';

/** Epok som alla pusselrotationer räknas från. Ändra aldrig — det flyttar alla pussel. */
const EPOCH = '2024-01-01';

const MS_PER_DAY = 86400000;

// sv-SE ger redan formatet YYYY-MM-DD.
const formatter = new Intl.DateTimeFormat('sv-SE', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** Datumet i Sverige för en given tidpunkt, som "YYYY-MM-DD". */
export function getDateString(date: Date): string {
  return formatter.format(date);
}

/** Dagens datum i Sverige som "YYYY-MM-DD". Nyckeln allt annat utgår från. */
export function getTodayDateString(): string {
  return getDateString(new Date());
}

/**
 * Antal dagar mellan epoken och ett datum ("YYYY-MM-DD"). Räknas på rena datum, aldrig på
 * tidsstämplar, så sommartidsskiften inte kan ge ett halvt dygns fel.
 */
export function daysSinceEpoch(dateString: string): number {
  const then = Date.parse(`${EPOCH}T00:00:00Z`);
  const now = Date.parse(`${dateString}T00:00:00Z`);
  return Math.round((now - then) / MS_PER_DAY);
}

/** Index i en pussellista för ett givet datum. Samma dag ger alltid samma pussel. */
export function puzzleIndexForDate(dateString: string, listLength: number): number {
  const day = daysSinceEpoch(dateString);
  return ((day % listLength) + listLength) % listLength;
}

/**
 * Stabil identitet för dagens pussel i en lista av given längd.
 *
 * Ingår i sparat spelläge så att gamla gissningar kan kasseras när pusslet faktiskt bytts.
 * Både index och listlängd ingår: växer pussellistan flyttas hela kalendern, och då ska
 * gårdagens halvfärdiga bräde inte återuppstå ovanpå ett annat pussel.
 */
export function puzzleKey(dateString: string, listLength: number): string {
  return `${puzzleIndexForDate(dateString, listLength)}/${listLength}`;
}

/** Löpande pusselnummer sedan epoken. Används i delningstexter: "Orda #963". */
export function puzzleNumber(dateString: string): number {
  return daysSinceEpoch(dateString) + 1;
}

/** Datumet dagen före ett givet datum. Används för att avgöra om en svit är obruten. */
export function getPreviousDateString(dateString: string): string {
  const ms = Date.parse(`${dateString}T00:00:00Z`) - MS_PER_DAY;
  return new Date(ms).toISOString().slice(0, 10);
}

/**
 * Uppdaterar en svit efter ett avslutat spel. Sviten fortsätter bara om förra spelet
 * avslutades i går; annars börjar den om på 1. Tidigare ökades den alltid, så en spelare
 * som hoppade över fyra dagar behöll sin svit — siffran mätte ingenting.
 */
export function nextStreak(
  currentStreak: number,
  lastCompletedDate: string | undefined,
  today: string
): number {
  if (lastCompletedDate === today) return currentStreak;
  if (lastCompletedDate && lastCompletedDate === getPreviousDateString(today)) {
    return currentStreak + 1;
  }
  return 1;
}

/**
 * Millisekunder kvar tills pusslet byts (midnatt i Sverige).
 *
 * Binärsöker efter första sekunden som ger ett nytt svenskt datum i stället för att räkna
 * med offset. Då blir sommartidsskiftena rätt av sig själva – de nätter då dygnet är 23
 * eller 25 timmar långt behöver ingen specialhantering.
 */
export function msUntilNextPuzzle(): number {
  const now = new Date();
  const today = getDateString(now);
  let lo = now.getTime();
  let hi = lo + 2 * MS_PER_DAY;
  while (hi - lo > 1000) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (getDateString(new Date(mid)) === today) lo = mid;
    else hi = mid;
  }
  return Math.max(0, hi - now.getTime());
}
