export type LikeGroup = {
  title: string;
  items: string[];
};

// Spotify embeds, as "type/id" taken from open.spotify.com links.
export const spotify: string[] = [
  "album/6oeFFmSmQp8FvGlrClqMWe",
  "album/67qaM4rZLNIwFgGvgBY7Hv",
  "artist/0GxLVHGNIKWLyvtp2zIF9q",
  "artist/6BjL5fEswNzVzwx9wddLxi",
  "artist/0TvvDswOgvPbgSPK2RDf62",
  "artist/4F5j57znw5bPFjrZzXfDNt",
  "artist/2wvTwsc93H5xfsHE6QK1nl",
  "track/7l5d3IVBTgqI80IUIjOFOu",
  "track/1jycdp1IFRsqNw4CtieRbr",
];

// Placeholder content: replace with the things you actually like.
export const likes: LikeGroup[] = [
  { title: "Games", items: ["Add a game"] },
  { title: "Shows & Movies", items: ["Add a title"] },
  { title: "Other", items: ["Add anything else"] },
];
