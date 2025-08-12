"use client";
import React, { useCallback, useEffect, useRef, useState, Suspense } from 'react';
export const dynamic = 'force-dynamic';
import { GameBoard } from '../../components/GameBoard';
import { Celebration } from '../../components/Celebration';
import { generateSecret } from '../../lib/secret';
import { useSearchParams, useRouter } from 'next/navigation';

function GameInner() {
  const params = useSearchParams();
  const router = useRouter();
  const difParam = (params.get('dif') || 'medio').toLowerCase();
  const lengthFromDif = (d: string) => d === 'facil' ? 3 : d === 'dificil' ? 5 : 4;
  const [difficulty] = useState<'facil' | 'medio' | 'dificil'>(['facil','medio','dificil'].includes(difParam) ? difParam as any : 'medio');
  const [length] = useState(() => lengthFromDif(difficulty));
  const [secret, setSecret] = useState<string>(() => generateSecret(length));
  const [history, setHistory] = useState<{ guess: string; correct: number }[]>([]);
  const [status, setStatus] = useState<'playing' | 'won' | 'gaveup'>('playing');
  const [input, setInput] = useState('');
  const [warnDuplicate, setWarnDuplicate] = useState(false);
  // Detectar si el intento actual ya existe en el historial
  const attemptExists = history.some(h => h.guess === input);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const restart = useCallback(() => {
    setSecret(generateSecret(length));
    setHistory([]);
    setStatus('playing');
    setInput('');
    inputRef.current?.focus();
  }, [length]);

  useEffect(() => restart(), [restart]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'playing') return;
    const guess = input.trim();
    if (guess.length !== length) return;
    const correct = guess.split('').reduce((acc: number, ch, idx) => (ch === secret[idx] ? acc + 1 : acc), 0);
    const next = [...history, { guess, correct }];
    setHistory(next);
    if (correct === length) setStatus('won');
    setInput('');
    inputRef.current?.focus();
  };

  return (
  <main className="min-h-screen flex flex-col items-center p-6 gap-6 sm:pb-10 pb-24 max-w-full relative">
      <header className="mt-2 text-center">
  <h1 className="text-3xl sm:text-4xl font-bold gradient-text drop-shadow-md tracking-tight">Partida ({difficulty})</h1>
      </header>

      <section className="w-full max-w-xl card-glass rounded-2xl p-6 space-y-6 shadow-lg">
        <form onSubmit={onSubmit} noValidate className="flex flex-col sm:flex-row gap-4 items-stretch" autoComplete="off">
          <div className="flex-1 flex gap-3 flex-col xs:flex-row">
            <div className="flex-1 flex flex-col gap-1">
              <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                pattern={`[0-9]{${length}}`}
                value={input}
                onChange={e => {
                  const raw = e.target.value.replace(/[^0-9]/g, '');
                  const seen = new Set<string>();
                  let unique = '';
                  for (const ch of raw) {
                    if (!seen.has(ch) && unique.length < length) {
                      seen.add(ch);
                      unique += ch;
                    }
                  }
                  setWarnDuplicate(raw.length !== unique.length);
                  setInput(unique);
                }}
                placeholder={'Ingresa ' + length + ' dígitos'}
                aria-invalid={warnDuplicate || (input.length === length && input.length !== new Set(input).size)}
                className={`input-code flex-1 rounded-xl bg-white/10 border px-4 py-3 tracking-widest text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-brand-400/70 focus:bg-white/20 placeholder:text-white/40 w-full transition-colors ${warnDuplicate ? 'border-warning focus:ring-warning' : 'border-white/20'}`}
              />
              <div className="min-h-[1.1rem] text-xs">
                {warnDuplicate && (
                  <span className="text-warning font-medium" role="alert">No repitas dígitos: los duplicados se ignoran.</span>
                )}
                {!warnDuplicate && attemptExists && input.length === length && (
                  <span className="text-danger font-medium" role="alert">Ese número ya lo intentaste.</span>
                )}
                {!warnDuplicate && !attemptExists && input.length > 0 && input.length < length && (
                  <span className="text-white/40">Faltan {length - input.length} dígito(s).</span>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={input.length !== length || status !== 'playing' || warnDuplicate || attemptExists}
              className="btn-base btn-primary px-6 py-3 disabled:opacity-50 w-full xs:w-auto hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
            >Probar</button>
          </div>
        </form>

        <GameBoard history={history} length={length} />

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-sm text-white/80 pt-2">
          <div className="space-y-1">
            {status === 'won' && (
              <div className="text-success font-semibold">¡Ganaste! Secreto: {secret}</div>
            )}
            {status === 'gaveup' && (
              <div className="text-danger font-semibold">Te rendiste. Secreto: {secret}</div>
            )}
            {status === 'playing' && (
              <div>Intentos: {history.length} • Dificultad: {difficulty}</div>
            )}
          </div>
          <div className="flex gap-3 flex-col sm:flex-row">
            {status === 'playing' && (
              <button
                type="button"
                onClick={() => setStatus('gaveup')}
                className="btn-base btn-danger px-4 py-2 w-full sm:w-auto hover:-translate-y-0.5 hover:shadow-lg"
              >Rendirse</button>
            )}
            <button onClick={restart} type="button" className="btn-base btn-accent px-4 py-2 w-full sm:w-auto hover:-translate-y-0.5 hover:shadow-lg">Reiniciar</button>
            <button onClick={() => router.push('/')} type="button" className="btn-base btn-secondary px-4 py-2 w-full sm:w-auto hover:-translate-y-0.5 hover:shadow-lg">Salir</button>
          </div>
        </div>
      </section>

      {status === 'won' && (
        <Celebration message="Ganaste" onClose={() => { /* permitir cerrar sin reiniciar */ }} />
      )}

  <footer className="text-xs text-white/50 py-4 mt-auto">
        Adivina el Número • Partida en curso
      </footer>
    </main>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback={<main className="min-h-screen flex items-center justify-center text-white/70"><div>Cargando partida...</div></main>}>
      <GameInner />
    </Suspense>
  );
}
