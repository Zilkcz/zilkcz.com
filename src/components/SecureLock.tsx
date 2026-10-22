"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
// The static HTML is built for the https site; the browser reports what it really is.
const isHttps = () => window.location.protocol === "https:";

export default function SecureLock() {
  const secure = useSyncExternalStore(subscribe, isHttps, () => true);
  const text = secure ? "the connection is secure" : "this connection is not secure";

  return (
    <div className="group fixed right-4 top-4 z-40">
      <button
        type="button"
        aria-label={text}
        className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-black/30 text-foreground/70 outline-none backdrop-blur-md transition duration-300 hover:border-white/30 hover:text-white hover:shadow-[0_0_18px_rgb(150_190_255/0.3)] focus-visible:border-white/40 focus-visible:text-white"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-[18px]"
        >
          <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" fill="currentColor" fillOpacity="0.18" />
          {secure ? <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /> : <path d="M8 10.5V7.5a4 4 0 0 1 7.6-1.7" />}
          <circle cx="12" cy="15.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute right-0 top-full mt-2 whitespace-nowrap rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-foreground/80 opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {text}
      </span>
    </div>
  );
}
