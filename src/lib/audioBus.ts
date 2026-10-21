// Shared audio plumbing: every preview <audio> is routed through one analyser, so the
// visualizer can show whichever clip is playing, plus a tiny "now playing" store.

let ctx: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
const attached = new WeakSet<HTMLAudioElement>();

function getCtx(): AudioContext | null {
  if (ctx) return ctx;
  const Ctor =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  ctx = new Ctor();
  analyser = ctx.createAnalyser();
  analyser.fftSize = 128;
  analyser.smoothingTimeConstant = 0.82;
  analyser.connect(ctx.destination);
  return ctx;
}

export function getAnalyser(): AnalyserNode | null {
  return analyser;
}

// Route an element through the analyser. If the browser won't let the audio context run
// (no user gesture yet), leave the element alone so it still plays normally, just without bars.
export async function attach(audio: HTMLAudioElement): Promise<void> {
  const c = getCtx();
  if (!c || !analyser || attached.has(audio)) return;
  if (c.state !== "running") {
    try {
      await c.resume();
    } catch {
      return;
    }
  }
  if (c.state !== "running") return;
  c.createMediaElementSource(audio).connect(analyser);
  attached.add(audio);
}

// "Now playing" label, as a subscribable store
let nowPlaying: string | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const nowPlayingStore = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  },
  get: () => nowPlaying,
  getServer: () => null as string | null,
};

export function start(label: string) {
  nowPlaying = label;
  emit();
}

// Only clears if this label is still the current one, so a card switching to another
// preview doesn't get cleared by the old card's fade-out.
export function stop(label: string) {
  if (nowPlaying !== label) return;
  nowPlaying = null;
  emit();
}
