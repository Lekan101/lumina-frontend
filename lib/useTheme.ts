'use client';

/**
 * useTheme — reads and writes the manual theme preference.
 *
 * Storage: `localStorage.theme` → "light" | "dark" | undefined (system).
 * DOM:     `document.documentElement.dataset.theme` → consumed by globals.css.
 *
 * Three states:
 *   "system"  — no data-theme attribute; the CSS media-query decides.
 *   "light"   — data-theme="light" overrides the media-query to light.
 *   "dark"    — data-theme="dark"  overrides the media-query to dark.
 */
import { useCallback, useEffect, useState } from 'react';

export type Theme = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'lumina-theme';

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'system') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', theme);
  }
}

export function useTheme(): { theme: Theme; setTheme: (t: Theme) => void } {
  const [theme, setThemeState] = useState<Theme>('system');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const resolved: Theme = stored === 'light' || stored === 'dark' ? stored : 'system';
    setThemeState(resolved);
    applyTheme(resolved);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    if (next === 'system') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, next);
    }
    applyTheme(next);
  }, []);

  return { theme, setTheme };
}
