"use client";

import { useEffect, useRef } from "react";

const greetings = [
  "hey, i'm zilkcz.",
  "hi, i'm zilkcz.",
  "yo, it's zilkcz.",
  "sup, i'm zilkcz.",
  "hello, i'm zilkcz.",
  "what's up, i'm zilkcz.",
  "you found zilkcz.",
  "welcome to zilkcz's corner.",
  "zilkcz was here.",
];

const KEY = "zilkcz-greeting";

export default function Greeting() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Pick a new greeting on every visit or refresh, never the same one twice in a row.
    let last = -1;
    try {
      last = Number(sessionStorage.getItem(KEY) ?? -1);
    } catch {}
    let i = Math.floor(Math.random() * greetings.length);
    if (i === last) i = (i + 1) % greetings.length;
    try {
      sessionStorage.setItem(KEY, String(i));
    } catch {}
    const el = ref.current;
    if (!el) return;
    el.firstChild!.textContent = greetings[i];
    el.style.opacity = "1";
  }, []);

  return (
    <h1
      ref={ref}
      style={{ opacity: 0 }}
      className="greeting text-5xl font-bold tracking-tight transition-opacity duration-500 sm:text-7xl"
    >
      {greetings[0]}
      <noscript>
        <style>{".greeting{opacity:1!important}"}</style>
      </noscript>
    </h1>
  );
}
