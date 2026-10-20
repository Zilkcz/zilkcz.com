import { socials } from "@/data/socials";

export default function Footer() {
  return (
    <footer className="py-10 text-center text-sm text-foreground/50">
      <ul className="mb-4 flex justify-center gap-6">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      © 2026 zilkcz.com
    </footer>
  );
}
