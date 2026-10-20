import Link from "next/link";
import { pages } from "@/data/nav";

export default function Home() {
  return (
    <div className="flex min-h-[55vh] flex-col justify-center">
      <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">hey, i&apos;m zilkcz.</h1>
      <p className="mt-5 max-w-lg text-lg text-foreground/60">
        this is a placeholder tagline, so make it yours.
      </p>
      <nav aria-label="Pages" className="mt-10 grid gap-3 sm:grid-cols-2">
        {pages.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group rounded-2xl border border-foreground/10 bg-foreground/[0.04] px-6 py-5 backdrop-blur-sm transition-colors hover:border-foreground/30 hover:bg-foreground/[0.08]"
          >
            <span className="flex items-center justify-between text-lg font-medium">
              {p.label}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
            <span className="mt-1 block text-sm text-foreground/60">{p.blurb}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
