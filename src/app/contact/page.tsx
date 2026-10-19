import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <>
      <PageHeading title="Contact" />
      <p className="text-foreground/80">
        Find me on{" "}
        <a className="underline" href="https://github.com/Zilkcz" target="_blank" rel="noreferrer">
          GitHub
        </a>
        .
      </p>
    </>
  );
}
