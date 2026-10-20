import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-foreground/10 bg-background/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center px-6 py-5">
        <Link href="/" className="font-semibold tracking-tight">
          zilkcz
        </Link>
      </div>
    </header>
  );
}
