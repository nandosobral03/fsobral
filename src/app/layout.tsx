import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/common/nav";

export const metadata: Metadata = {
  title: "Fernando Sobral",
  description: "My personal website and portfolio",
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
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
