import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import { likes, spotify } from "@/data/likes";

export const metadata: Metadata = { title: "Things I like" };

const headingCls = "mb-3 text-sm font-medium uppercase tracking-wider text-foreground/50";

export default function Likes() {
  return (
    <>
      <PageHeading title="Things I like" lead="A running list." />

      <section className="mb-12">
        <h2 className={headingCls}>Music</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {spotify.map((path) => (
            <iframe
              key={path}
              src={`https://open.spotify.com/embed/${path}`}
              title={`Spotify ${path.split("/")[0]}`}
              width="100%"
              height="152"
              loading="lazy"
              allow="encrypted-media"
              className="rounded-xl border-0"
            />
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
