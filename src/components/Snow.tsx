"use client";

import { useEffect, useRef } from "react";

type Flake = { x: number; y: number; r: number; vy: number; drift: number; phase: number };

export default function Snow() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let w = 0;
    let h = 0;
    let flakes: Flake[] = [];
    let raf = 0;

    const make = (): Flake => {
      const r = 0.8 + Math.random() * 2.2;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r,
        vy: 0.25 + r * 0.22,
        drift: 0.15 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(160, Math.round((w * h) / 9000));
      flakes = Array.from({ length: count }, make);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        ctx.globalAlpha = 0.35 + f.r * 0.2;
        ctx.beginPath();
        ctx.arc(f.x + Math.sin(t / 1800 + f.phase) * 14 * f.drift, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
      }
    };

    const tick = (t: number) => {
      for (const f of flakes) {
        f.y += f.vy;
        if (f.y > h + 4) {
          f.y = -4;
          f.x = Math.random() * w;
        }
      }
      draw(t);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce.matches) draw(0);
      else raf = requestAnimationFrame(tick);
    };
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : start());

    resize();
    start();
    window.addEventListener("resize", () => {
      resize();
      start();
    });
    document.addEventListener("visibilitychange", onVisibility);
    reduce.addEventListener("change", start);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      reduce.removeEventListener("change", start);
    };
  }, []);

  return (
    <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
  );
}
