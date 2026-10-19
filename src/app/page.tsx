import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import Section from "@/components/Section";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="flex-1">
        <div className="mx-auto max-w-4xl px-6 pb-8 pt-24">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Hey, I&apos;m zilkcz.</h1>
          <p className="mt-5 max-w-xl text-lg text-foreground/70">
            I build things for the web. This is a placeholder tagline, so make it yours.
          </p>
          <a
            href="#projects"
            className="mt-8 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
          >
            See my work
          </a>
        </div>

        <Section id="about" title="About">
          <p className="max-w-2xl text-foreground/80">
            Write a few sentences about yourself here: what you do, what you care about, and what
            you&apos;re working on.
          </p>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <p className="text-foreground/80">
            Find me on{" "}
            <a className="underline" href="https://github.com/Zilkcz" target="_blank" rel="noreferrer">
              GitHub
            </a>
            .
          </p>
        </Section>
      </main>
      <Footer />
    </>
  );
}
