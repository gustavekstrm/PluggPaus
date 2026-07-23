import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface AppState {
  theme: Theme;
  toggleTheme: () => void;
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  favsOnly: boolean;
  setFavsOnly: (v: boolean) => void;
  toggleFavsOnly: () => void;
}

const Ctx = createContext<AppState | null>(null);

function readInitialTheme(): Theme {
  try {
    const t = localStorage.getItem('theme');
    if (t === 'dark' || t === 'light') return t;
    const dm = localStorage.getItem('darkMode');
    if (dm !== null) return JSON.parse(dm) ? 'dark' : 'light';
  } catch {
    /* ignore */
  }
  return 'dark';
}

function readInitialFavorites(): string[] {
  try {
    const s = localStorage.getItem('favoriteGames');
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);
  const [favorites, setFavorites] = useState<string[]>(readInitialFavorites);
  const [favsOnly, setFavsOnly] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem('favoriteGames', JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);
  const toggleFavsOnly = useCallback(() => setFavsOnly((v) => !v), []);

  return (
    <Ctx.Provider
      value={{ theme, toggleTheme, favorites, isFavorite, toggleFavorite, favsOnly, setFavsOnly, toggleFavsOnly }}
    >
      {children}
    </Ctx.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
