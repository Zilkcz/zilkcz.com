import type { Metadata } from "next";
import MusicCard from "@/components/MusicCard";
import PageHeading from "@/components/PageHeading";
import { likes, music } from "@/data/likes";

export const metadata: Metadata = { title: "Things I like" };

const headingCls = "mb-3 text-sm font-medium uppercase tracking-wider text-foreground/50";

export default function Likes() {
  return (
    <>
      <PageHeading title="Things I like" lead="A running list." />

      <section className="mb-12">
        <h2 className={headingCls}>Music</h2>
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3">
          {music.map((t) => (
            <MusicCard key={t.title} track={t} />
          ))}
        </div>
      </section>

      <div className="grid gap-8 sm:grid-cols-2">
        {likes.map((group) => (
          <section key={group.title}>
            <h2 className={headingCls}>{group.title}</h2>
            <ul className="space-y-1.5">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
