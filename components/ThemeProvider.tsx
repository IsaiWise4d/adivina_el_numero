"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'default' | 'rosa' | 'bnw';
interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider');
  return ctx;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('default');

  useEffect(() => {
    const stored = localStorage.getItem('theme-select');
    if (stored === 'rosa' || stored === 'bnw' || stored === 'default') {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    document.body.classList.remove('theme-default','theme-rosa','theme-bnw');
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('theme-select', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
