import Greeting from "@/components/Greeting";
import PageHeading from "@/components/PageHeading";
import Shelf from "@/components/Shelf";
import { artists, games, music, others, shows } from "@/data/likes";

const headingCls = "mb-3 text-sm font-medium tracking-wider text-foreground/50";

export default function Home() {
  return (
    <>
      <div className="mb-20">
        <Greeting />
      </div>

      <PageHeading title="things i enjoy" />

      <section className="mb-12">
        <h3 className={headingCls}>music</h3>
        <Shelf items={music} />
      </section>

      <section className="mb-12">
        <h3 className={headingCls}>artists</h3>
        <Shelf items={artists} />
      </section>

      <section className="mb-12">
        <h3 className={headingCls}>shows</h3>
        <Shelf items={shows} tall />
      </section>

      <section className="mb-12">
        <h3 className={headingCls}>games</h3>
        <Shelf items={games} />
      </section>

      <section className="mb-12">
        <h3 className={headingCls}>other</h3>
        <Shelf items={others} />
      </section>
    </>
  );
}
