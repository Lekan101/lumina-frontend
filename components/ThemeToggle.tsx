'use client';

/**
 * ThemeToggle — cycles through system → light → dark → system.
 * Reads/writes via useTheme which persists to localStorage.
 */
import { useTheme, type Theme } from '@/lib/useTheme';

const ICONS: Record<Theme, string> = {
  system: '💻',
  light: '☀️',
  dark: '🌙',
};

const LABELS: Record<Theme, string> = {
  system: 'System theme',
  light: 'Light theme',
  dark: 'Dark theme',
};

const NEXT: Record<Theme, Theme> = {
  system: 'dark',
  dark: 'light',
  light: 'system',
};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(NEXT[theme])}
      aria-label={`Current: ${LABELS[theme]}. Click to switch.`}
      title={LABELS[theme]}
      className="w-8 h-8 flex items-center justify-center rounded-lg text-base
                 text-[--color-text-secondary] hover:text-[--color-text-primary]
                 hover:bg-[--color-bg-raised] transition-colors"
    >
      {ICONS[theme]}
    </button>
  );
}
