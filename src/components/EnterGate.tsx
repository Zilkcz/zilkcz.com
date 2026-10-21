"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const KEY = "zilkcz-entered";

// "Entered" lives outside React so every part of the page sees it, and it survives
// refreshes within the same tab. It also counts as the click browsers need before audio can play.
let entered = false;
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};
const getSnapshot = () => {
  if (entered) return true;
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};
const getServerSnapshot = () => false;

function enter() {
  entered = true;
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {}
  listeners.forEach((l) => l());
}

export default function EnterGate() {
  const open = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) button.current?.focus();
  }, [open]);

  return (
    <>
      <noscript>
        <style>{".gate{display:none!important}"}</style>
      </noscript>
      <button
        ref={button}
        type="button"
        onClick={enter}
        aria-hidden={open}
        tabIndex={open ? -1 : 0}
        className={`gate fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-[#070b14] outline-none transition-[opacity,visibility] duration-700 ${
          open ? "invisible opacity-0" : "visible opacity-100"
        }`}
      >
        <span className="gate-text text-lg tracking-[0.3em] text-foreground/70">click to enter</span>
      </button>
    </>
  );
}
