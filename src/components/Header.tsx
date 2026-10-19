"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/likes", label: "Things I like" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname().replace(/\/$/, "");

  return (
    <header className="border-b border-foreground/10">
      <nav className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-5">
        <Link href="/" className="font-semibold tracking-tight">
          zilkcz
        </Link>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "font-medium text-foreground"
                      : "text-foreground/60 transition-colors hover:text-foreground"
                  }
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
