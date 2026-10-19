const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-foreground/10 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-semibold">
          zilkcz
        </a>
        <ul className="flex gap-5 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-foreground/70 hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
