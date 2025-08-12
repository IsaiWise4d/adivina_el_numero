"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Landing() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<'facil' | 'medio' | 'dificil'>('medio');
  const lengthMap: Record<typeof difficulty, number> = { facil: 3, medio: 4, dificil: 5 };
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 gap-14 max-w-full">
      <header className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-6xl font-extrabold gradient-text drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)] tracking-tight leading-tight">Adivina el Número</h1>
        <p className="mt-5 text-brand-100/90 text-base sm:text-lg leading-relaxed px-1">
          Juego de lógica: generamos un número secreto con dígitos <strong>todos diferentes</strong>. Cada intento te dice cuántas posiciones acertaste exactamente. No se revelan qué dígitos, solo el conteo correcto. El objetivo: acertar todas las posiciones en el menor número de intentos.
        </p>
      </header>

      <section className="w-full max-w-xl card-glass rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div>
          <h2 className="text-xl font-semibold mb-2">Configura tu partida</h2>
          <p className="text-sm text-white/70">Elige la dificultad. A mayor dificultad, más dígitos a descubrir.</p>
        </div>
  <div className="flex flex-col sm:flex-row items-stretch gap-3 justify-center w-full" role="radiogroup" aria-label="Selecciona dificultad">
          {([
            { id: 'facil', label: 'Fácil', desc: '3 dígitos', activeClass: 'diff-facil-active' },
            { id: 'medio', label: 'Medio', desc: '4 dígitos', activeClass: 'diff-medio-active' },
            { id: 'dificil', label: 'Difícil', desc: '5 dígitos', activeClass: 'diff-dificil-active' }
          ] as const).map(opt => {
            const active = difficulty === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setDifficulty(opt.id)}
                className={`relative isolate rounded-2xl px-5 py-4 w-full sm:min-w-[7rem] sm:w-auto text-left border focus:outline-none focus:ring-2 focus:ring-accent-400/70 transition-[transform,box-shadow,background-color,filter] duration-300 ease-out will-change-transform hover:brightness-110 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 active:translate-y-0 active:scale-[0.97] ${active ? `border-white/40 ring-1 ring-inset ring-white/30 diff-active ${opt.activeClass} shadow-lg shadow-[0_0_0_1px_rgba(255,255,255,0.06)]` : 'border-white/15 bg-white/10 hover:border-white/30'}`}
              >
                <span className="block font-semibold text-sm">{opt.label}</span>
                <span className="block text-[11px] uppercase tracking-wide text-white/60 font-medium">{opt.desc}</span>
              </button>
            );
          })}
        </div>
        <div className="pt-2">
          <button
            onClick={() => router.push(`/juego?dif=${difficulty}`)}
            className="group w-full rounded-2xl btn-base btn-primary focus:outline-none focus:ring-4 focus:ring-accent-400/40 px-7 py-5 text-xl font-extrabold shadow-[0_8px_32px_-6px_rgba(0,0,0,0.55)] hover:-translate-y-1 hover:shadow-[0_10px_40px_-4px_rgba(0,0,0,0.65)]"
          >Jugar <span className="ml-2 inline-block translate-x-0 group-hover:translate-x-1 group-active:translate-x-0 transition-transform">→</span></button>
        </div>
        <div className="text-xs text-white/50 leading-relaxed">
          Dificultad actual: {difficulty} • Longitud {lengthMap[difficulty]}.
          Consejos: Empieza con números variados. Analiza el conteo y ajusta tus intentos. No repitas dígitos porque el secreto no los repite.
        </div>
      </section>

      <section className="max-w-3xl w-full grid gap-6 sm:gap-8 sm:grid-cols-3 mt-4">
        <div className="card-glass p-4 rounded-xl space-y-2 border border-white/10">
          <h3 className="font-semibold text-brand-200">Reto</h3>
          <p className="text-xs text-white/70">Acierta todas las posiciones ocupando menos intentos que tus amigos.</p>
        </div>
        <div className="card-glass p-4 rounded-xl space-y-2 border border-white/10">
          <h3 className="font-semibold text-brand-200">Estrategia</h3>
          <p className="text-xs text-white/70">Cambia varios dígitos entre intentos para reducir posibilidades.</p>
        </div>
        <div className="card-glass p-4 rounded-xl space-y-2 border border-white/10">
          <h3 className="font-semibold text-brand-200">Próximamente</h3>
          <p className="text-xs text-white/70">Ranking, desafíos diarios y compartir partida.</p>
        </div>
      </section>

      <footer className="text-xs text-white/50 py-8 mt-auto text-center">
        © {new Date().getFullYear()} Adivina el Número
      </footer>
    </main>
  );
}
