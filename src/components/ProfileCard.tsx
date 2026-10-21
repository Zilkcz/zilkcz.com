"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Greeting from "@/components/Greeting";
import SocialIcon from "@/components/SocialIcon";
import { socials } from "@/data/socials";

const USER_ID = "1427412466014355456";
const API = `https://api.lanyard.rest/v1/users/${USER_ID}`;
const SOCKET = "wss://api.lanyard.rest/socket";
const REFRESH_MS = 30_000;
const TICK_MS = 5_000;

type Activity = {
  type: number;
  name: string;
  state?: string;
  emoji?: { name?: string };
};

type Presence = {
  discord_status: "online" | "idle" | "dnd" | "offline";
  discord_user: { id: string; username: string; avatar: string | null; global_name?: string | null };
  activities: Activity[];
  listening_to_spotify: boolean;
  spotify: { song: string; artist: string; timestamps?: { start: number; end: number } } | null;
};

const STATUS = {
  online: { label: "online", color: "#3ba55d" },
  idle: { label: "idle", color: "#faa81a" },
  dnd: { label: "do not disturb", color: "#ed4245" },
  offline: { label: "offline", color: "#747f8d" },
} as const;

// Discord keeps a Spotify activity around after a song ends or is paused, so only
// count it as current until the track's own end time has passed.
function isListening(p: Presence, now: number): boolean {
  if (!p.listening_to_spotify || !p.spotify) return false;
  const end = p.spotify.timestamps?.end;
  return end === undefined || now < end + 3000;
}

function describe(p: Presence, now: number): string {
  if (isListening(p, now) && p.spotify) return `listening to ${p.spotify.song} by ${p.spotify.artist}`;
  const game = p.activities.find((a) => [0, 1, 3, 5].includes(a.type));
  if (game) {
    const verb = game.type === 1 ? "streaming" : game.type === 3 ? "watching" : "playing";
    return `${verb} ${game.name}`;
  }
  const custom = p.activities.find((a) => a.type === 4);
  const text = [custom?.emoji?.name, custom?.state].filter(Boolean).join(" ");
  return text || STATUS[p.discord_status].label;
}

const subscribe = () => () => {};

export default function ProfileCard() {
  // False in the static HTML, true in the browser. The avatar <img> is only created
  // client-side so its onError handler is attached before the image can fail to load.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const [presence, setPresence] = useState<Presence | null>(null);
  const [now, setNow] = useState(() => Date.now());
  // Avatar sources, in order: the self-hosted /avatar.jpg, then the live Discord avatar, then a letter.
  const [discordFailed, setDiscordFailed] = useState(false);
  const [localFailed, setLocalFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    let socket: WebSocket | null = null;
    let heartbeat = 0;
    let reconnect = 0;
    let attempts = 0;
    const controller = new AbortController();

    // Live updates over Lanyard's websocket
    const connect = () => {
      socket = new WebSocket(SOCKET);
      socket.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.op === 1) {
            heartbeat = window.setInterval(() => socket?.send(JSON.stringify({ op: 3 })), msg.d.heartbeat_interval);
            socket?.send(JSON.stringify({ op: 2, d: { subscribe_to_id: USER_ID } }));
          } else if (msg.op === 0 && (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE") && alive) {
            setPresence(msg.d as Presence);
            setNow(Date.now());
          }
        } catch {
          // ignore malformed frames
        }
      };
      socket.onopen = () => {
        attempts = 0;
      };
      socket.onclose = () => {
        window.clearInterval(heartbeat);
        if (alive) reconnect = window.setTimeout(connect, Math.min(30_000, 1000 * 2 ** attempts++));
      };
    };

    // REST: the first paint, and a fallback if the socket is blocked
    const load = async () => {
      try {
        const res = await fetch(API, { signal: controller.signal });
        const json = await res.json();
        if (alive && json.success) {
          setPresence(json.data as Presence);
          setNow(Date.now());
        }
      } catch {
        // Offline, blocked or not tracked by Lanyard: the card just shows without a status.
      }
    };

    load();
    connect();
    const poll = window.setInterval(() => {
      if (!document.hidden) load();
    }, REFRESH_MS);
    // re-check "is this song still playing" between updates
    const tick = window.setInterval(() => setNow(Date.now()), TICK_MS);

    return () => {
      alive = false;
      controller.abort();
      socket?.close();
      window.clearInterval(heartbeat);
      window.clearInterval(poll);
      window.clearInterval(tick);
      window.clearTimeout(reconnect);
    };
  }, []);

  const user = presence?.discord_user;
  const status = presence ? STATUS[presence.discord_status] : null;
  const ext = user?.avatar?.startsWith("a_") ? "gif" : "png";
  const discordAvatar =
    user?.avatar && !discordFailed
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`
      : null;
  const avatar = !mounted ? null : localFailed ? discordAvatar : "/avatar.jpg";

  return (
    <section className="profile-card mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-black/30 px-8 pb-8 pt-10 text-center backdrop-blur-xl">
      <div className="relative mx-auto size-28">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatar}
            alt=""
            width={112}
            height={112}
            onError={() => (avatar === "/avatar.jpg" ? setLocalFailed(true) : setDiscordFailed(true))}
            className="size-28 rounded-full object-cover ring-2 ring-white/20"
          />
        ) : (
          <span className="flex size-28 items-center justify-center rounded-full bg-gradient-to-br from-sky-400/30 to-violet-500/30 text-4xl font-bold ring-2 ring-white/20">
            z
          </span>
        )}
        {status && (
          <span
            title={status.label}
            className="absolute bottom-1 right-1 size-5 rounded-full border-[3px] border-[#0c1424]"
            style={{ background: status.color }}
          />
        )}
      </div>

      <div className="mt-6">
        <Greeting />
      </div>

      <p className="mt-3 min-h-6 text-sm text-foreground/60" aria-live="polite">
        {presence ? describe(presence, now) : ""}
      </p>

      <ul className="mt-7 flex justify-center gap-3">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              title={s.label}
              className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground/80 transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 hover:text-white hover:shadow-[0_0_22px_rgb(150 190 255/0.35)]"
            >
              <SocialIcon name={s.icon} className="size-5" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
