"use client";
import React, { useEffect, useRef } from 'react';

interface CelebrationProps {
  onClose?: () => void;
  autoHideMs?: number;
  message: string;
}

export const Celebration: React.FC<CelebrationProps> = ({ onClose, autoHideMs = 6000, message }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>();
  const startRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(1,0,0,1,0,0);
      ctx.scale(DPR, DPR);
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#ff780a','#2fb3ff','#18c964','#ffba08','#ff3b30','#bfe5ff'];
    const pieces = Array.from({ length: 160 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * window.innerHeight,
      r: 6 + Math.random() * 10,
      c: colors[Math.floor(Math.random() * colors.length)],
      vx: -1 + Math.random() * 2,
      vy: 2 + Math.random() * 4,
      spin: Math.random() * Math.PI,
      vr: 0.05 + Math.random() * 0.12
    }));

    const duration = 4500; // ms
    function frame(t: number) {
      if (!startRef.current) startRef.current = t;
      const elapsed = t - startRef.current;
      if (!canvasRef.current || !ctx) return;
      ctx.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
      pieces.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.spin += p.vr;
        if (p.y > window.innerHeight + 40) p.y = -20;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.spin);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = Math.max(0, 1 - elapsed / duration);
        ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r);
        ctx.restore();
      });
      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(frame);
      }
    }
    rafRef.current = requestAnimationFrame(frame);
    let hideTimer: number | undefined;
    if (autoHideMs && onClose) {
      hideTimer = window.setTimeout(onClose, autoHideMs);
    }
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [autoHideMs, onClose]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
      <div className="relative pointer-events-auto">
        <div className="animate-celebrate-enter shadow-2xl bg-gradient-to-br from-brand-700/90 via-brand-800/90 to-brand-900/90 border border-white/15 backdrop-blur-xl rounded-3xl px-8 py-8 max-w-md text-center flex flex-col gap-5">
          <h2 className="text-3xl font-extrabold gradient-text">¡{message}!</h2>
          <p className="text-sm text-white/70">Has descubierto el número secreto. ¿Listo para intentar con otra longitud o mejorar tus intentos?</p>
          {onClose && (
            <button onClick={onClose} className="mx-auto mt-2 px-5 py-2 rounded-lg bg-accent-500 hover:bg-accent-400 font-semibold text-white transition-colors">Cerrar</button>
          )}
        </div>
      </div>
    </div>
  );
};
