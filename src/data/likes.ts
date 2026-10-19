export type LikeGroup = {
  title: string;
  items: string[];
};

export type Track = {
  title: string;
  artist?: string;
  kind: "Song" | "Single" | "EP" | "Artist";
  year?: number;
  image: string;
};

// Cover art lives in public/likes/. Titles are copied exactly from Spotify.
export const music: Track[] = [
  { title: "4,732 messages..", artist: "salem_after_dark", kind: "Single", year: 2026, image: "/likes/messages.jpg" },
  { title: "Entry Logs (1-6)", artist: "Jaydes Archive", kind: "EP", year: 2024, image: "/likes/entry-logs.jpg" },
  { title: "rooooobbed", artist: "lungskull", kind: "Song", year: 2021, image: "/likes/rooooobbed.jpg" },
  { title: "heartsick", artist: "Lei", kind: "EP", year: 2021, image: "/likes/heartsick.jpg" },
  { title: "foreign", artist: "lungskull", kind: "Song", year: 2020, image: "/likes/foreign.jpg" },
  { title: "met you at the party", artist: "lungskull", kind: "Song", year: 2021, image: "/likes/met-you-at-the-party.jpg" },
];

export const artists: Track[] = [
  { title: "*67", kind: "Artist", image: "/likes/star67.jpg" },
  { title: "5L", kind: "Artist", image: "/likes/5l.jpg" },
  { title: "wifiskeleton", kind: "Artist", image: "/likes/wifiskeleton.jpg" },
  { title: "salem_after_dark", kind: "Artist", image: "/likes/messages.jpg" },
];

// Placeholder content: replace with the things you actually like.
export const likes: LikeGroup[] = [
  { title: "Games", items: ["Add a game"] },
  { title: "Shows & Movies", items: ["Add a title"] },
  { title: "Other", items: ["Add anything else"] },
];
