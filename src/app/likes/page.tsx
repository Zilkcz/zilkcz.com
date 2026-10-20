import type { Metadata } from "next";
import MusicCard from "@/components/MusicCard";
import PageHeading from "@/components/PageHeading";
import { artists, games, music, others, shows } from "@/data/likes";

export const metadata: Metadata = { title: "things i like" };

const headingCls = "mb-3 text-sm font-medium tracking-wider text-foreground/50";

export default function Likes() {
  return (
    <>
      <PageHeading title="things i like" lead="a running list." />

      <section className="mb-12">
        <h2 className={headingCls}>Music</h2>
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3">
          {music.map((t) => (
            <MusicCard key={t.title} track={t} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className={headingCls}>Artists</h2>
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3">
          {artists.map((t) => (
            <MusicCard key={t.title} track={t} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className={headingCls}>Shows</h2>
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3">
          {shows.map((t) => (
            <MusicCard key={t.title} track={t} tall />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className={headingCls}>Games</h2>
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3">
          {games.map((t) => (
            <MusicCard key={t.title} track={t} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className={headingCls}>other</h2>
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3">
          {others.map((t) => (
            <MusicCard key={t.title} track={t} />
          ))}
        </div>
      </section>
    </>
  );
}
