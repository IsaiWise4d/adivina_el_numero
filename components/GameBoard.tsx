import React from 'react';

export interface GameBoardProps {
  history: { guess: string; correct: number }[];
  length: number;
}

export const GameBoard: React.FC<GameBoardProps> = ({ history, length }) => {
  return (
    <div className="space-y-3">
      {history.length === 0 && (
        <div className="text-sm opacity-70">
          Aún no hay intentos. Escribe un número de {length} dígitos.
        </div>
      )}
      <ul className="space-y-2 max-h-[50vh] overflow-auto pr-1">
        {history.slice().reverse().map((row, idx) => {
          const progress = row.correct / length;
          return (
            <li key={idx} className="group relative rounded-xl overflow-hidden">
              <div className="absolute inset-0 opacity-30" style={{ background: `linear-gradient(90deg,#0d86ff ${progress*100}%, transparent ${progress*100}%)` }} />
              <div className="relative flex items-center justify-between bg-white/10 backdrop-blur px-4 py-2 rounded-xl border border-white/10">
                <code className="font-mono tracking-widest text-lg">
                  {row.guess.split('').map((d,i) => (
                    <span key={i} className={d === ' ' ? 'opacity-30' : ''}>{d}</span>
                  ))}
                </code>
                <span className="text-sm font-semibold tabular-nums flex items-center gap-1">
                  <span className="px-2 py-1 rounded-lg bg-brand-500/30 border border-brand-400/30">{row.correct}</span>
                  <span className="opacity-60">/{length}</span>
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
