import type { Metadata } from "next";
import {
  Roboto,
  Newsreader,
  Outfit,
  Plus_Jakarta_Sans,
} from "next/font/google";
import Nav from "../components/common/nav";
import OverscrollCreature from "../components/common/overscroll-creature";
import DeferredAnalytics from "../components/common/deferred-analytics";
import RouteTransitionProvider from "../components/common/route-transition-provider";
import { getBaseUrl, personJsonLd, site } from "@/lib/site";
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

const siteUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.defaultTitle,
    template: `%s | ${site.author}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: site.defaultTitle,
    description: site.description,
    siteName: site.author,
  },
  twitter: {
    card: "summary_large_image",
    title: site.defaultTitle,
    description: site.description,
  },
  icons: {
    icon: "/favicon.png",
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
  modal,
  children,
}: Readonly<{
  modal?: React.ReactNode;
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
            __html: JSON.stringify(personJsonLd(siteUrl)),
          }}
        />
      </head>
      <body
        className={`antialiased h-screen flex flex-col w-full overflow-y-scroll ${roboto.variable} ${newsreader.variable} ${outfit.variable} ${plusJakarta.variable}`}
      >
        <OverscrollCreature />
        <div className="page-backdrop relative z-[2] flex-1 flex flex-col">
          <Nav />
          <main className="flex-1">
            <RouteTransitionProvider>
              {children}
              {modal}
            </RouteTransitionProvider>
            <DeferredAnalytics />
          </main>
        </div>
      </body>
    </html>
  );
}
