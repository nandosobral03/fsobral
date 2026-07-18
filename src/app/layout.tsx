import type { Metadata } from "next";
import {
  Newsreader,
  Outfit,
  Plus_Jakarta_Sans,
} from "next/font/google";
import Nav from "../components/common/nav";
import OverscrollCreature from "../components/common/overscroll-creature";
import DeferredAnalytics from "../components/common/deferred-analytics";
import RouteTransitionProvider from "../components/common/route-transition-provider";
import MotionProvider from "../components/common/motion-provider";
import { getBaseUrl, personJsonLd, site } from "@/lib/site";
import "./globals.css";

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd(siteUrl)),
          }}
        />
      </head>
      <body
        className={`antialiased min-h-screen flex flex-col w-full ${newsreader.variable} ${outfit.variable} ${plusJakarta.variable}`}
      >
        <MotionProvider>
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
        </MotionProvider>
      </body>
    </html>
  );
}
