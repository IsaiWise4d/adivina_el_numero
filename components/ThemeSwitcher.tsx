"use client";
import React from 'react';
import { useTheme } from './ThemeProvider';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const btnBase = 'px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400/60';
  return (
    <div
      className="mt-8 mb-4 flex gap-2 justify-center z-40
      sm:fixed sm:z-50 sm:top-3 sm:right-3 sm:mt-0 sm:mb-0 sm:justify-start sm:backdrop-blur-md sm:bg-black/30 sm:border sm:border-white/10 sm:rounded-2xl sm:px-3 sm:py-2 sm:shadow-lg"
    >
      {(['default','rosa','bnw'] as const).map(t => (
        <button
          key={t}
          aria-pressed={theme === t}
          onClick={() => setTheme(t)}
          className={btnBase + ' ' + (theme === t ? 'bg-accent-500 text-white shadow' : 'bg-white/10 text-white/70 hover:bg-white/20')}>
          {t === 'default' ? 'Azul' : t === 'rosa' ? 'Rosa' : 'B/N'}
        </button>
      ))}
    </div>
  );
}
