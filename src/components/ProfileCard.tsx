"use client";

import { useEffect, useState } from "react";
import Greeting from "@/components/Greeting";
import SocialIcon from "@/components/SocialIcon";
import { socials } from "@/data/socials";

const USER_ID = "1427412466014355456";
const API = `https://api.lanyard.rest/v1/users/${USER_ID}`;
const REFRESH_MS = 30_000;

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
  const game = p.activities.find((a) => [0, 1, 3, 5].includes(a.type));
  if (game) {
    const verb = game.type === 1 ? "streaming" : game.type === 3 ? "watching" : "playing";
    return `${verb} ${game.name}`;
  }
  const custom = p.activities.find((a) => a.type === 4);
  const text = [custom?.emoji?.name, custom?.state].filter(Boolean).join(" ");
  return text || STATUS[p.discord_status].label;
}

export default function ProfileCard() {
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
        // Offline, blocked or not tracked by Lanyard: the card just shows without a status.
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

  const user = presence?.discord_user;
  const status = presence ? STATUS[presence.discord_status] : null;
  const ext = user?.avatar?.startsWith("a_") ? "gif" : "png";
  const avatar =
    user?.avatar && !avatarFailed
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`
      : null;

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
            onError={() => setAvatarFailed(true)}
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
        {presence ? describe(presence) : ""}
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
