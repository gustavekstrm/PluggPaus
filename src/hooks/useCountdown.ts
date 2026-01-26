import { useState, useEffect } from 'react';

export function useCountdown() {
  const [timeUntilNext, setTimeUntilNext] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const swedenTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Stockholm' }));

      // Get tomorrow at midnight in Sweden
      const tomorrow = new Date(swedenTime);
      tomorrow.setHours(24, 0, 0, 0);

      const diff = tomorrow.getTime() - swedenTime.getTime();

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
  }, []);

  return timeUntilNext;
}
