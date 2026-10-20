import MusicCard from "@/components/MusicCard";
import Plank from "@/components/Plank";
import type { Track } from "@/data/likes";

export default function Shelf({ items, tall = false }: { items: Track[]; tall?: boolean }) {
  // Empty planks complete the last row so the board always runs edge to edge.
  const missing2 = (2 - (items.length % 2)) % 2;
  const missing3 = (3 - (items.length % 3)) % 3;
  const fillers = Math.max(missing2, missing3);

  return (
    <div className="shelf">
      {items.map((t) => (
        <MusicCard key={t.title} track={t} tall={tall} />
      ))}
      {Array.from({ length: fillers }, (_, i) => (
        <div
          key={`filler-${i}`}
          aria-hidden
          className={`${i < missing2 ? "block" : "hidden"} ${i < missing3 ? "sm:block" : "sm:hidden"}`}
        >
          <div className="px-[13%] pt-7">
            <div className={`invisible w-full ${tall ? "aspect-[3/4]" : "aspect-square"}`} />
          </div>
          <Plank />
        </div>
      ))}
    </div>
  );
}
