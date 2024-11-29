"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Divider from "./divider";

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="flex justify-between uppercase text-lg">
        <div className="contents font-medium font-serif w-fit whitespace-nowrap">
          <Link href="/" className="relative group px-4 py-2">
            <span className="block transition-opacity duration-300 font-semibold text-2xl">IPSUM</span>
          </Link>
        </div>

        <div className="flex font-semibold mr-4 font-sans">
          <Link href="/" className={`px-4 py-2 transition-colors duration-200 hover:scale-105 ${pathname === "/" ? "bg-foreground text-background" : "hover:bg-foreground/10"}`}>
            ABOUT ME
          </Link>
          <Link href="/proyects" className={`px-4 py-2 transition-colors duration-200 hover:scale-105 ${pathname === "/proyects" ? "bg-foreground text-background" : "hover:bg-foreground/10"}`}>
            PROYECTS
          </Link>
          <Link href="/blog" className={`px-4 py-2 transition-colors duration-200 hover:scale-105 ${pathname === "/blog" ? "bg-foreground text-background" : "hover:bg-foreground/10"}`}>
            BLOG
          </Link>
          <Link href="/#contact" className={`px-4 py-2 transition-colors duration-200 hover:scale-105 ${pathname === "/#contact" ? "bg-foreground text-background" : "hover:bg-foreground/10"}`}>
            CONTACT
          </Link>
        </div>
      </nav>
      <Divider />
    </>
  );
}
