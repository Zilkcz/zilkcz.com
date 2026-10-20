import type { Track } from "@/data/likes";
import Plank from "@/components/Plank";

export default function MusicCard({ track, tall = false }: { track: Track; tall?: boolean }) {
  const label = `${track.title}${track.artist ? ` by ${track.artist}` : ""}`;

  return (
    <figure tabIndex={0} aria-label={label} className="group outline-none">
      {/* Sleeve standing on the plank, its base sunk slightly into the top surface */}
      <div className="relative z-10 -mb-1.5 px-[13%] pt-7">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={track.image}
          alt=""
          width={tall ? 360 : 320}
          height={tall ? 480 : 320}
          loading="lazy"
          className={`block w-full object-cover ${tall ? "aspect-[3/4]" : "aspect-square"} shadow-[0_6px_8px_-4px_rgb(0_0_0/0.7)] transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:-rotate-1 group-focus:-translate-y-2 group-focus:-rotate-1`}
        />
      </div>
      <Plank />
      <figcaption className="mt-4 min-w-0 px-[13%]">
        <p className={`text-sm font-medium ${tall ? "line-clamp-2" : "truncate"}`}>{track.title}</p>
        {track.artist && <p className="truncate text-xs text-foreground/60">{track.artist}</p>}
      </figcaption>
    </figure>
  );
}
