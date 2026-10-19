import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import { likes } from "@/data/likes";

export const metadata: Metadata = { title: "Things I like" };

export default function Likes() {
  return (
    <>
      <PageHeading title="Things I like" lead="A running list." />
      <div className="grid gap-8 sm:grid-cols-2">
        {likes.map((group) => (
          <section key={group.title}>
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-foreground/50">
              {group.title}
            </h2>
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
