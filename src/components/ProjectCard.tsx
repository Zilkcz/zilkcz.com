import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const body = (
    <>
      <h2 className="font-medium">{project.title}</h2>
      <p className="mt-2 text-sm text-foreground/60">{project.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag} className="rounded-full bg-foreground/10 px-2.5 py-0.5 text-xs">
            {tag}
          </li>
        ))}
      </ul>
    </>
  );
  const cls =
    "block rounded-xl border border-foreground/10 bg-foreground/[0.04] p-5 backdrop-blur-sm transition-colors hover:border-foreground/30";
  return project.href ? (
    <a href={project.href} target="_blank" rel="noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}
