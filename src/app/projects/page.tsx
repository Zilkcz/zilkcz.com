import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Projects" };

export default function Projects() {
  return (
    <>
      <PageHeading title="Projects" lead="Things I've built." />
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </>
  );
}
