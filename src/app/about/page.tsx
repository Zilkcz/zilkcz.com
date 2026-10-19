import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <>
      <PageHeading title="About" />
      <div className="max-w-xl space-y-4 text-foreground/80">
        <p>
          Write a few sentences about yourself here: what you do, what you care about, and what
          you&apos;re working on.
        </p>
      </div>
    </>
  );
}
