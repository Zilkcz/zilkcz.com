import PageHeading from "@/components/PageHeading";
import Shelf from "@/components/Shelf";
import { artists, games, music, others, shows } from "@/data/likes";

const headingCls = "mb-3 text-sm font-medium tracking-wider text-foreground/50";

export default function Home() {
  return (
    <>
      <div className="mb-20">
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">hey, i&apos;m zilkcz.</h1>
        <p className="mt-5 max-w-lg text-lg text-foreground/60">
          this is a placeholder tagline, so make it yours.
        </p>
      </div>

      <PageHeading title="things i enjoy" />

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
