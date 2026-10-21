"use client";

import { useEffect, useState } from "react";

const USER_ID = "1427412466014355456";
const API = `https://api.lanyard.rest/v1/users/${USER_ID}`;
const REFRESH_MS = 30_000;

type Activity = {
  type: number;
  name: string;
  state?: string;
  details?: string;
  emoji?: { name?: string };
};

type Presence = {
  discord_status: "online" | "idle" | "dnd" | "offline";
  discord_user: { id: string; username: string; avatar: string | null; global_name?: string | null };
  activities: Activity[];
  listening_to_spotify: boolean;
  spotify: { song: string; artist: string } | null;
};

const STATUS = {
  online: { label: "online", color: "#3ba55d" },
  idle: { label: "idle", color: "#faa81a" },
  dnd: { label: "do not disturb", color: "#ed4245" },
  offline: { label: "offline", color: "#747f8d" },
} as const;

function describe(p: Presence): string {
  if (p.listening_to_spotify && p.spotify) return `listening to ${p.spotify.song} by ${p.spotify.artist}`;
  const game = p.activities.find((a) => a.type === 0 || a.type === 1 || a.type === 3 || a.type === 5);
  if (game) {
    const verb = game.type === 1 ? "streaming" : game.type === 3 ? "watching" : "playing";
    return `${verb} ${game.name}`;
  }
  const custom = p.activities.find((a) => a.type === 4);
  const text = [custom?.emoji?.name, custom?.state].filter(Boolean).join(" ");
  return text || STATUS[p.discord_status].label;
}

export default function DiscordStatus() {
  const [presence, setPresence] = useState<Presence | null>(null);
  const [avatarFailed, setAvatarFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await fetch(API, { signal: controller.signal });
        const json = await res.json();
        if (alive && json.success) setPresence(json.data as Presence);
      } catch {
        // Offline, blocked or not tracked by Lanyard: just stay hidden.
      }
    };

    load();
    const timer = window.setInterval(() => {
      if (!document.hidden) load();
    }, REFRESH_MS);
    return () => {
      alive = false;
      controller.abort();
      window.clearInterval(timer);
    };
  }, []);

  if (!presence) return <div className="min-h-14" aria-hidden />;

  const { discord_user: user } = presence;
  const status = STATUS[presence.discord_status];
  const name = user.global_name || user.username;
  const ext = user.avatar?.startsWith("a_") ? "gif" : "png";
  const avatar = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=128`
    : null;

  return (
    <div className="flex min-h-14 items-center gap-3" aria-live="polite">
      <div className="relative shrink-0">
        {avatar && !avatarFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatar}
            alt=""
            width={44}
            height={44}
            onError={() => setAvatarFailed(true)}
            className="size-11 rounded-full object-cover"
          />
        ) : (
          <span className="flex size-11 items-center justify-center rounded-full bg-foreground/10 text-lg font-semibold">
            {name.charAt(0)}
          </span>
        )}
        <span
          title={status.label}
          className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-[#0b1220]"
          style={{ background: status.color }}
        />
      </div>
      <div className="min-w-0">
        <p className="truncate font-semibold">{name}</p>
        <p className="truncate text-sm text-foreground/60">{describe(presence)}</p>
      </div>
    </div>
  );
}
