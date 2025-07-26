import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Roboto, Newsreader, Outfit, Roboto_Condensed } from "next/font/google";
import Nav from "../components/common/nav";
import "./globals.css";

// Preload Material Symbols
import Head from "next/head";

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

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fernando Sobral",
  description: "my own space in the internet",
  icons: {
    icon: "/favicon.svg",
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
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" as="style" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={`antialiased h-screen flex flex-col w-full overflow-y-scroll ${roboto.variable} ${newsreader.variable} ${outfit.variable} ${robotoCondensed.variable}`}>
        <Nav />
        <main className="flex-1">
          {children}
        <SpeedInsights />
        <Analytics />
        </main>
      </body>
    </html>
  );
}
