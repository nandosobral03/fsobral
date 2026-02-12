import type { Metadata } from "next";
import {
  Roboto,
  Newsreader,
  Outfit,
  Plus_Jakarta_Sans,
} from "next/font/google";
import Nav from "../components/common/nav";
import DeferredAnalytics from "../components/common/deferred-analytics";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fsobral.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fernando Sobral",
    template: "%s | Fernando Sobral",
  },
  description:
    "Software engineer, writer, and builder of things on the internet.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Fernando Sobral",
  },
  twitter: {
    card: "summary",
  },
};

export const generateViewport = () => {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/google-font-display, @next/next/no-page-custom-font*/}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          as="style"
        />
        {/* eslint-disable-next-line @next/next/google-font-display, @next/next/no-page-custom-font*/}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          media="all"
          id="material-symbols-css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Fernando Sobral",
              url: siteUrl,
              sameAs: [
                "https://github.com/nandosobral03",
                "https://www.linkedin.com/in/fernando-sobral-2b100621b/",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`antialiased h-screen flex flex-col w-full overflow-y-scroll ${roboto.variable} ${newsreader.variable} ${outfit.variable} ${plusJakarta.variable}`}
      >
        <Nav />
        <main className="flex-1">
          {children}
          <DeferredAnalytics />
        </main>
      </body>
    </html>
  );
}
