import type { SocialIconName } from "@/components/SocialIcon";

export type Social = {
  label: string;
  href: string;
  icon: SocialIconName;
};

// Shown as round icon buttons on the profile card.
export const socials: Social[] = [
  { label: "Spotify", href: "https://open.spotify.com/artist/6qQ9ox7izMUsbxdaPJm1Yr", icon: "spotify" },
  { label: "Discord", href: "https://discord.com/users/1427412466014355456", icon: "discord" },
];
