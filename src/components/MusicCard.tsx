import type { Track } from "@/data/likes";

const vinyl = {
  background:
    "repeating-radial-gradient(circle at center, #151515 0 2px, #202020 2px 3px)",
} as const;

function Disc({ image, className = "" }: { image: string; className?: string }) {
  return (
    <div
      aria-hidden
      className={`aspect-square rounded-full shadow-lg ${className}`}
      style={vinyl}
    >
      <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_30deg,transparent_0_20%,rgb(255_255_255/0.12)_25%,transparent_30%_70%,rgb(255_255_255/0.12)_75%,transparent_80%)]" />
      <div
        className="absolute inset-[31%] rounded-full bg-cover bg-center ring-1 ring-black/40"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-[48.5%] rounded-full bg-background" />
    </div>
  );
}

export default function MusicCard({ track }: { track: Track }) {
  const meta = [track.kind, track.year].filter(Boolean).join(" · ");
  const label = `${track.title}${track.artist ? ` by ${track.artist}` : ""}`;

  return (
    <figure tabIndex={0} aria-label={label} className="group outline-none">
      {track.kind === "Artist" ? (
        <div className="w-[72%]">
          <Disc
            image={track.image}
            className="relative transition-transform duration-700 motion-safe:group-hover:rotate-[200deg] motion-safe:group-focus:rotate-[200deg]"
          />
        </div>
      ) : (
        <div className="relative">
          <Disc
            image={track.image}
            className="absolute left-0 top-0 w-[72%] translate-x-[14%] transition-transform duration-500 ease-out group-hover:translate-x-[40%] group-focus:translate-x-[40%] motion-safe:group-hover:rotate-[160deg] motion-safe:group-focus:rotate-[160deg]"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={track.image}
            alt=""
            width={320}
            height={320}
            loading="lazy"
            className="relative z-10 aspect-square w-[72%] rounded-sm object-cover shadow-xl ring-1 ring-black/10 transition-transform duration-300 group-hover:-translate-y-1 group-focus:-translate-y-1"
          />
        </div>
      )}
      <figcaption className="mt-3 w-[72%] min-w-0">
        <p className="truncate text-sm font-medium">{track.title}</p>
        {track.artist && <p className="truncate text-xs text-foreground/60">{track.artist}</p>}
        <p className="mt-0.5 text-[11px] uppercase tracking-wide text-foreground/40">{meta}</p>
      </figcaption>
    </figure>
  );
}
