import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import EnterGate from "@/components/EnterGate";
import Footer from "@/components/Footer";
import Snow from "@/components/Snow";
import TitleTyper from "@/components/TitleTyper";
import "./globals.css";

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zilkcz.com"),
  title: { default: "zilkcz", template: "%s · zilkcz" },
  description: "personal site of zilkcz.",
  openGraph: {
    title: "zilkcz",
    description: "personal site of zilkcz.",
    url: "https://zilkcz.com",
    siteName: "zilkcz.com",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${comfortaa.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(sessionStorage.getItem("zilkcz-entered")==="1")document.documentElement.classList.add("entered")}catch(e){}',
          }}
        />
        <EnterGate />
        <Snow />
        <TitleTyper />
        <div className="relative z-10 flex min-h-screen flex-col">
          <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-16 pt-24">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
