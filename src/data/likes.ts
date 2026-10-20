export type Track = {
  title: string;
  artist?: string;
  kind: "Song" | "Single" | "EP" | "Artist" | "Show" | "Game" | "Other";
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
  { title: "salem_after_dark", kind: "Artist", image: "/likes/salem-after-dark.jpg" },
  { title: "guitarbf", kind: "Artist", image: "/likes/guitarbf.jpg" },
  { title: "schizocat", kind: "Artist", image: "/likes/schizocat.jpg" },
];

export const shows: Track[] = [
  { title: "Girls' Last Tour", kind: "Show", year: 2017, image: "/likes/girls-last-tour.jpg" },
  { title: "Attack on Titan", kind: "Show", year: 2013, image: "/likes/attack-on-titan.jpg" },
  { title: "Neon Genesis Evangelion", kind: "Show", year: 1995, image: "/likes/evangelion.jpg" },
  { title: "The Stranger by the Shore", kind: "Show", year: 2020, image: "/likes/stranger-by-the-shore.jpg" },
  { title: "Sasaki and Miyano", kind: "Show", year: 2022, image: "/likes/sasaki-and-miyano.jpg" },
  { title: "Takopi's Original Sin", kind: "Show", year: 2025, image: "/likes/takopis-original-sin.jpg" },
];

export const games: Track[] = [
  { title: "OneShot", kind: "Game", image: "/likes/oneshot.jpg" },
  { title: "ULTRAKILL", kind: "Game", image: "/likes/ultrakill.jpg" },
  { title: "Minecraft", kind: "Game", image: "/likes/minecraft.jpg" },
  { title: "BABBDI", kind: "Game", image: "/likes/babbdi.jpg" },
  { title: "Cry of Fear", kind: "Game", year: 2013, image: "/likes/cry-of-fear.jpg" },
  { title: "Friday Night Funkin'", kind: "Game", image: "/likes/fnf.jpg" },
];

export const others: Track[] = [
  { title: "volt", kind: "Other", image: "/likes/volt.jpg" },
];
