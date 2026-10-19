import type { Track } from "@/data/likes";

export default function MusicCard({ track }: { track: Track }) {
  const query = encodeURIComponent([track.title, track.artist].filter(Boolean).join(" "));
  const meta = [track.kind, track.year].filter(Boolean).join(" · ");

  return (
    <a
      href={`https://open.spotify.com/search/${query}`}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-4 rounded-xl border border-foreground/10 p-3 transition-colors hover:border-foreground/30"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={track.image}
        alt=""
        width={72}
        height={72}
        loading="lazy"
        className={`size-[72px] shrink-0 object-cover ${track.kind === "Artist" ? "rounded-full" : "rounded-lg"}`}
      />
      <div className="min-w-0">
        <p className="truncate font-medium">{track.title}</p>
        {track.artist && <p className="truncate text-sm text-foreground/60">{track.artist}</p>}
        <p className="mt-0.5 text-xs text-foreground/40">{meta}</p>
      </div>
    </a>
  );
}
