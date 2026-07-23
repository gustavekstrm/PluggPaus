import { useEffect } from 'react';

/**
 * Marks the current page as noindex,nofollow while it is mounted.
 * Used on thin pages that only recommend/link to an external game, so Google
 * does not treat them as low-value indexed content. The tag is removed again
 * when navigating away so real game pages stay fully indexable.
 */
export function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);
}
