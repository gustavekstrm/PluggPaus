import { useState, useEffect } from 'react';
import { msUntilNextPuzzle } from '../utils/dailyDate';

/**
 * Nedräkning till nästa dagliga pussel.
 *
 * Räknar mot exakt samma gräns som spelen byter pussel vid (se utils/dailyDate). Tidigare
 * räknade den mot en egen uträkning av svensk midnatt och nådde noll medan gårdagens pussel
 * fortfarande låg kvar. `onExpire` låter sidan hämta det nya pusslet i stället för att
 * lämna spelaren med en nolla som inte händer något vid.
 */
export function useCountdown(onExpire?: () => void) {
  const [timeUntilNext, setTimeUntilNext] = useState('');

  useEffect(() => {
    let expired = false;

    const updateCountdown = () => {
      const diff = msUntilNextPuzzle();

      if (diff <= 0 && !expired) {
        expired = true;
        onExpire?.();
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeUntilNext(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [onExpire]);

  return timeUntilNext;
}
