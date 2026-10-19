export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
};

// Placeholder content: replace with your own projects.
export const projects: Project[] = [
  {
    title: "Project One",
    description: "A short description of what this project does and why it matters.",
    tags: ["Next.js", "TypeScript"],
    href: "https://github.com/Zilkcz",
  },
  {
    title: "Project Two",
    description: "Another thing you built. Swap this out for something real.",
    tags: ["React", "Tailwind"],
  },
  {
    title: "Project Three",
    description: "One more card to show off the grid layout.",
    tags: ["Node.js"],
  },
];
