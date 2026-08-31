/**
 * localStorage som inte kan sänka sidan.
 *
 * Direkta anrop mot localStorage kastar i lägen som är fullt normala hos besökare:
 * blockerade cookies, privatläge med full kvot, sajten inbäddad i en iframe. Ett kast under
 * render avmonterar hela React-trädet och ger en vit sida. Spelen läste dessutom rekord med
 * `parseInt(saved, 10)` utan kontroll — blev värdet NaN skrevs NaN tillbaka vid nästa
 * uppdatering och rekordet självläkte aldrig.
 */

export function readJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as T) : null;
  } catch {
    return null;
  }
}

export function writeJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* full kvot eller blockerad lagring – spelet fungerar ändå, bara utan att spara */
  }
}

/** Läser ett heltal och faller tillbaka på `fallback` för allt som inte är ett giltigt tal. */
export function readNumber(key: string, fallback = 0): number {
  try {
    const n = Number.parseInt(localStorage.getItem(key) ?? '', 10);
    return Number.isFinite(n) ? n : fallback;
  } catch {
    return fallback;
  }
}

export function writeNumber(key: string, value: number): void {
  if (!Number.isFinite(value)) return;
  try {
    localStorage.setItem(key, String(value));
  } catch {
    /* ignoreras med flit */
  }
}
