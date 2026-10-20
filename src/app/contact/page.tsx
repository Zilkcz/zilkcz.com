import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import { socials } from "@/data/socials";

export const metadata: Metadata = { title: "Contact / Socials" };

export default function Contact() {
  return (
    <>
      <PageHeading title="Contact / Socials" lead="Find me around the internet." />
      <ul className="flex max-w-sm flex-col gap-3">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-foreground/10 bg-foreground/[0.04] px-5 py-3.5 transition-colors hover:border-foreground/30"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
