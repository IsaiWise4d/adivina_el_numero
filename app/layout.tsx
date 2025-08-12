import './globals.css';
import React from 'react';
import { ThemeProvider } from '../components/ThemeProvider';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adivina el Número',
  description: 'Juego de lógica: adivina el número secreto por posiciones',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
      </head>
      <body className="min-h-screen antialiased touch-manipulation">
        <ThemeProvider>
          {children}
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
