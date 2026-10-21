"use client";

import { useEffect } from "react";

const PHRASES = ["zilkcz"];
const TYPE_MS = 170;
const DELETE_MS = 90;
const HOLD_MS = 1800;
const REST_MS = 500;

// Types each phrase into the browser tab title, holds it, then deletes it back down.
// The tab always keeps at least one character so the browser never falls back to the URL.
export default function TitleTyper() {
  useEffect(() => {
    const original = document.title;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer = 0;
    let phrase = 0;
    let len = 1;
    let typing = true;

    const render = (cursor: boolean) => {
      document.title = PHRASES[phrase].slice(0, len) + (cursor ? "|" : "");
    };

    const tick = () => {
      const text = PHRASES[phrase];
      if (typing) {
        render(len < text.length);
        if (len < text.length) {
          len++;
          timer = window.setTimeout(tick, TYPE_MS);
        } else {
          typing = false;
          timer = window.setTimeout(tick, HOLD_MS);
        }
      } else {
        len--;
        render(true);
        if (len > 1) {
          timer = window.setTimeout(tick, DELETE_MS);
        } else {
          typing = true;
          phrase = (phrase + 1) % PHRASES.length;
          timer = window.setTimeout(tick, REST_MS);
        }
      }
    };

    tick();
    return () => {
      window.clearTimeout(timer);
      document.title = original;
    };
  }, []);

  return null;
}
