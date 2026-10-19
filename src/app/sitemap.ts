import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://zilkcz.com";
const paths = ["", "/about", "/projects", "/likes", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({
    url: base + p,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
