import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Nav from "../components/common/nav";
import "./globals.css";

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
      <body className="antialiased h-screen flex flex-col w-full overflow-y-scroll">
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
