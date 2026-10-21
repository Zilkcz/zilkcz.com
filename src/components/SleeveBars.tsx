"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { getAnalyser, nowPlayingStore } from "@/lib/audioBus";

const BARS = 22;
const GAP = 3;
const TAIL_MS = 600; // keep drawing briefly after the clip stops so the bars fade out smoothly

// Audio visualizer drawn along the bottom of a sleeve. Active only while this
// sleeve's own preview (`label`) is the one playing.
export default function SleeveBars({ label }: { label: string }) {
  const current = useSyncExternalStore(
    nowPlayingStore.subscribe,
    nowPlayingStore.get,
    nowPlayingStore.getServer,
  );
  const canvas = useRef<HTMLCanvasElement>(null);
  const active = current === label;

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
      grad = ctx.createLinearGradient(0, h, 0, 0);
      grad.addColorStop(0, "rgb(255 255 255 / 0.95)");
      grad.addColorStop(1, "rgb(170 205 255 / 0.85)");
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      if (performance.now() >= activeUntil) {
        raf = 0;
        return;
      }
      getAnalyser()?.getByteFrequencyData(data);
      const barW = (w - GAP * (BARS - 1)) / BARS;
      ctx.fillStyle = grad;
      ctx.shadowColor = "rgb(140 190 255 / 0.7)";
      ctx.shadowBlur = 6;
      for (let i = 0; i < BARS; i++) {
        // low frequencies on the left, highs on the right
        const v = data[Math.min(data.length - 1, Math.floor((i / BARS) * 44))] / 255;
        const bh = Math.max(2, v * v * h * 1.05);
        ctx.beginPath();
        ctx.roundRect(i * (barW + GAP), h - bh, barW, bh, 1.5);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      activeUntil = nowPlayingStore.get() === label ? Infinity : performance.now() + TAIL_MS;
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
  }, [label]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent px-[7%] pb-[6%] transition-opacity duration-300 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      <canvas ref={canvas} className="block h-full w-full" />
    </div>
  );
}
