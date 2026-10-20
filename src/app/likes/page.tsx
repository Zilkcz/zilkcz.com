import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Shelf from "@/components/Shelf";
import { artists, games, music, others, shows } from "@/data/likes";

export const metadata: Metadata = { title: "things i like" };

const headingCls = "mb-3 text-sm font-medium tracking-wider text-foreground/50";

export default function Likes() {
  return (
    <>
      <PageHeading title="things i like" lead="a running list." />

      <section className="mb-12">
        <h2 className={headingCls}>music</h2>
        <Shelf items={music} />
      </section>

      <section className="mb-12">
        <h2 className={headingCls}>artists</h2>
        <Shelf items={artists} />
      </section>

      <section className="mb-12">
        <h2 className={headingCls}>shows</h2>
        <Shelf items={shows} tall />
      </section>

      <section className="mb-12">
        <h2 className={headingCls}>games</h2>
        <Shelf items={games} />
      </section>

      <section className="mb-12">
        <h2 className={headingCls}>other</h2>
        <Shelf items={others} />
      </section>
    </>
  );
}
