"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { getAnalyser, nowPlayingStore } from "@/lib/audioBus";

const BARS = 44;
const GAP = 3;
const TAIL_MS = 700; // keep drawing briefly after a clip stops so the bars fade out smoothly

export default function Visualizer() {
  const label = useSyncExternalStore(nowPlayingStore.subscribe, nowPlayingStore.get, nowPlayingStore.getServer);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const data = new Uint8Array(64);
    let raf = 0;
    let activeUntil = 0;
    let w = 0;
    let h = 0;
    let grad: CanvasGradient;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = w * dpr;
      el.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, "#7dd3fc");
      grad.addColorStop(0.55, "#a5b4fc");
      grad.addColorStop(1, "#c4b5fd");
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      if (performance.now() >= activeUntil) {
        raf = 0;
        return;
      }
      getAnalyser()?.getByteFrequencyData(data);
      const barW = (w - GAP * (BARS - 1)) / BARS;
      const mid = (BARS - 1) / 2;
      ctx.fillStyle = grad;
      ctx.shadowColor = "rgb(150 190 255 / 0.55)";
      ctx.shadowBlur = 8;
      for (let i = 0; i < BARS; i++) {
        // bass in the middle, treble toward the edges
        const d = Math.abs(i - mid) / mid;
        const v = data[Math.min(data.length - 1, Math.floor(d * 40))] / 255;
        const bh = Math.max(2, v * v * h);
        ctx.beginPath();
        ctx.roundRect(i * (barW + GAP), h - bh, barW, bh, 1.5);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      activeUntil = nowPlayingStore.get() !== null ? Infinity : performance.now() + TAIL_MS;
      if (!raf) {
        setup();
        raf = requestAnimationFrame(frame);
      }
    };

    const unsubscribe = nowPlayingStore.subscribe(sync);
    return () => {
      unsubscribe();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden={label === null}
      className={`pointer-events-none absolute inset-x-0 top-full mt-5 transition-opacity duration-500 ${
        label ? "opacity-100" : "opacity-0"
      }`}
    >
      <canvas ref={canvas} className="block h-7 w-full" />
      <p className="mt-2 text-center text-xs text-foreground/50">{label ? `♪ ${label}` : " "}</p>
    </div>
  );
}
