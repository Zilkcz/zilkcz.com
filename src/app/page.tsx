import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-[55vh] flex-col justify-center">
      <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">Hey, I&apos;m zilkcz.</h1>
      <p className="mt-5 max-w-lg text-lg text-foreground/60">
        This is a placeholder tagline, so make it yours.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/likes"
          className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
        >
          Things I like
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-medium transition-colors hover:border-foreground/50"
        >
          Contact / Socials
        </Link>
      </div>
    </div>
  );
}
