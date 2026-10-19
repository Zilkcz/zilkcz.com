import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zilkcz.com"),
  title: { default: "zilkcz", template: "%s · zilkcz" },
  description: "Personal site and portfolio of zilkcz.",
  openGraph: {
    title: "zilkcz",
    description: "Personal site and portfolio of zilkcz.",
    url: "https://zilkcz.com",
    siteName: "zilkcz.com",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
