/**
 * Hjälpare för spelens globala tangentlyssnare.
 *
 * Spelen lyssnar på `window` och anropade `preventDefault()` villkorslöst så länge
 * komponenten var monterad. Eftersom spelsidorna också innehåller om-text, tips, FAQ och
 * annonser gick det inte att scrolla sidan med piltangenter eller mellanslag, mellanslag
 * aktiverade inte fokuserade knappar, och Enter kunde inte följa en länk man tabbat till.
 */

/** Sant när tangenttrycket hör hemma i ett fält, en knapp eller en länk – inte i spelet. */
export function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  return ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(target.tagName);
}
