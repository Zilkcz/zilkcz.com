"use client";

import { useEffect, useRef, useState } from "react";
import type { Track } from "@/data/likes";
import Plank from "@/components/Plank";

// Only one preview plays at a time.
let current: { stop: () => void } | null = null;

const FADE_MS = 250;
const VOLUME = 0.6;

export default function MusicCard({ track, tall = false }: { track: Track; tall?: boolean }) {
  const label = `${track.title}${track.artist ? ` by ${track.artist}` : ""}`;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number>(0);
  const [playing, setPlaying] = useState(false);

  const fadeTo = (target: number, done?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    window.clearInterval(fadeRef.current);
    const step = (target - audio.volume) / (FADE_MS / 25);
    fadeRef.current = window.setInterval(() => {
      const next = audio.volume + step;
      const reached = step >= 0 ? next >= target : next <= target;
      audio.volume = reached ? target : Math.min(1, Math.max(0, next));
      if (reached) {
        window.clearInterval(fadeRef.current);
        done?.();
      }
    }, 25);
  };

  const stop = () => {
    if (!audioRef.current) return;
    setPlaying(false);
    fadeTo(0, () => audioRef.current?.pause());
    if (current === selfRef.current) current = null;
  };
  // A stable handle for the module-level "currently playing" slot.
  const stopRef = useRef(stop);
  const selfRef = useRef({ stop: () => stopRef.current() });
  useEffect(() => {
    stopRef.current = stop;
  });

  const play = () => {
    if (!track.preview) return;
    current?.stop();
    if (!audioRef.current) {
      const audio = new Audio(track.preview);
      audio.loop = true;
      audio.preload = "none";
      audioRef.current = audio;
    }
    const audio = audioRef.current;
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        current = selfRef.current;
        setPlaying(true);
        fadeTo(VOLUME);
      })
      .catch(() => {
        // Browsers block audio until the visitor has interacted with the page.
      });
  };

  useEffect(
    () => () => {
      window.clearInterval(fadeRef.current);
      audioRef.current?.pause();
    },
    [],
  );

  const hasPreview = Boolean(track.preview);

  return (
    <figure
      tabIndex={0}
      aria-label={hasPreview ? `${label}, preview plays on hover` : label}
      data-playing={playing || undefined}
      className="group outline-none"
      onPointerEnter={(e) => e.pointerType === "mouse" && play()}
      onPointerLeave={(e) => e.pointerType === "mouse" && stop()}
      onFocus={play}
      onBlur={stop}
      onClick={(e) => {
        // Touch has no hover, so a tap toggles the preview instead.
        if (hasPreview && (e.nativeEvent as PointerEvent).pointerType === "touch") {
          if (playing) stop();
          else play();
        }
      }}
    >
      {/* Sleeve standing on the plank, its base sunk slightly into the top surface */}
      <div className="relative z-10 -mb-1.5 px-[13%] pt-7">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={track.image}
            alt=""
            width={tall ? 360 : 320}
            height={tall ? 480 : 320}
            loading="lazy"
            className={`block w-full object-cover ${tall ? "aspect-[3/4]" : "aspect-square"} shadow-[0_6px_8px_-4px_rgb(0_0_0/0.7)] transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:-rotate-1 group-focus:-translate-y-2 group-focus:-rotate-1`}
          />
          {playing && (
            <span
              aria-hidden
              className="eq pointer-events-none absolute bottom-2 right-2 flex h-4 items-end gap-[3px] rounded bg-black/55 px-1.5 py-1 transition-transform duration-300 group-hover:-translate-y-2 group-hover:-rotate-1 group-focus:-translate-y-2 group-focus:-rotate-1"
            >
              <i />
              <i />
              <i />
            </span>
          )}
        </div>
      </div>
      <Plank />
      <figcaption className="mt-4 min-w-0 px-[13%]">
        <p className={`text-sm font-medium ${tall ? "line-clamp-2" : "truncate"}`}>{track.title}</p>
        {track.artist && <p className="truncate text-xs text-foreground/60">{track.artist}</p>}
      </figcaption>
    </figure>
  );
}
