/**
 * Delning av dagens resultat.
 *
 * Modalerna anropade tidigare `navigator.clipboard.writeText(text)` utan att invänta
 * löftet och följde upp med `alert('Kopierat till urklipp!')`. I lägen där urklippet nekas
 * — osäker kontext, webbläsare som kräver användargest, iOS i vissa vyer — påstod rutan
 * att texten kopierats fast ingenting hänt, och konsolen fick ett ohanterat fel.
 *
 * På mobil är systemets delningsark det man faktiskt vill ha; urklipp är fallback.
 */
export async function shareResult(text: string): Promise<'shared' | 'copied' | 'failed'> {
  try {
    if (typeof navigator !== 'undefined' && navigator.share) {
      await navigator.share({ text });
      return 'shared';
    }
  } catch {
    // Spelaren avbröt delningsarket – försök inte kopiera i stället, det vore påträngande.
    return 'failed';
  }

  try {
    await navigator.clipboard.writeText(text);
    return 'copied';
  } catch {
    return 'failed';
  }
}
