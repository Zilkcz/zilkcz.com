"use client";

import { useEffect, useRef } from "react";

type Flake = { x: number; y: number; r: number; vy: number; drift: number; phase: number; vx: number };

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
    const pointer = { x: -1000, y: -1000 };

    const make = (): Flake => {
      const r = 0.8 + Math.random() * 2.2;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r,
        vy: 0.25 + r * 0.22,
        drift: 0.15 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        vx: 0,
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
        // flakes near the cursor get pushed away, then settle back to falling
        const dx = f.x - pointer.x;
        const dy = f.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 110 * 110 && d2 > 1) {
          const push = (1 - Math.sqrt(d2) / 110) * 1.4;
          const d = Math.sqrt(d2);
          f.vx += (dx / d) * push;
          f.y += (dy / d) * push * 0.6;
        }
        f.x += f.vx;
        f.vx *= 0.94;
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
    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -1000;
    };
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : start());

    resize();
    start();
    window.addEventListener("resize", () => {
      resize();
      start();
    });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onPointer);
    document.addEventListener("pointerleave", onLeave);
    reduce.addEventListener("change", start);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      reduce.removeEventListener("change", start);
    };
  }, []);

  return (
    <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
  );
}
