"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const detailPages = ["blog", "projects", "marginalia"];

export default function Nav() {
  const fullPathname = usePathname() || "";
  const pathname = fullPathname.split("/")[1] || "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if we're on a detail page (blog/[name] or projects/[name])
  const isDetailPage = fullPathname.split("/").length > 2 && detailPages.includes(pathname);
  const usesDarkNav = isDetailPage || pathname === "contact";
  const dividerColor = usesDarkNav ? "border-background/15" : "border-foreground";

  return (
    <div className={`${usesDarkNav ? "bg-foreground text-background" : ""}`}>
      <nav aria-label="Main navigation" className={`uppercase text-sm border-b-2 ${dividerColor} ${usesDarkNav ? "bg-foreground text-background" : ""}`}>
        <div className="editorial-wrap flex flex-col md:flex-row md:justify-end">
        <div className="flex justify-end items-center">
          <motion.button className="md:hidden px-4 py-3 text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)} whileTap={{ scale: 0.95 }} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
            {isMenuOpen ? "✕" : "☰"}
          </motion.button>
        </div>

        <AnimatePresence>
          <motion.div
            className={`flex-col md:flex-row font-semibold font-sans md:flex ${isMenuOpen ? "flex" : "hidden md:flex"}`}
            initial={false}
            animate={isMenuOpen ? { opacity: 1, height: "auto" } : {}}
            transition={{ duration: 0.2 }}
          >
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                aria-current={pathname === "" ? "page" : undefined}
                className={`px-4 py-2 transition-all duration-300 hover:scale-105 border-r-2 md:border-r-2 ${dividerColor} last:border-r-0 relative overflow-hidden group ${
                  pathname === "" ? (usesDarkNav ? "bg-background text-foreground" : "text-foreground border-b-[3px] border-b-accent") : usesDarkNav ? "hover:bg-background/10" : "hover:bg-foreground/10"
                }`}
              >
                <span className="relative z-10">ABOUT ME</span>
              </Link>
              <Link
                href="/projects"
                onClick={() => setIsMenuOpen(false)}
                aria-current={pathname === "projects" ? "page" : undefined}
                className={`px-4 py-2 transition-all duration-300 hover:scale-105 border-r-2 md:border-r-2 ${dividerColor} last:border-r-0 relative overflow-hidden group ${
                  pathname === "projects" ? (usesDarkNav ? "text-accent border-b-2 border-b-accent" : "text-foreground border-b-[3px] border-b-accent") : usesDarkNav ? "hover:bg-background/10" : "hover:bg-foreground/10"
                }`}
              >
                <span className="relative z-10">PROJECTS</span>
              </Link>
              <Link
                href="/blog"
                onClick={() => setIsMenuOpen(false)}
                aria-current={pathname === "blog" || pathname === "marginalia" ? "page" : undefined}
                className={`px-4 py-2 transition-all duration-300 hover:scale-105 border-r-2 md:border-r-2 ${dividerColor} last:border-r-0 relative overflow-hidden group ${
                  pathname === "blog" || pathname === "marginalia" ? (usesDarkNav ? "text-accent border-b-2 border-b-accent" : "text-foreground border-b-[3px] border-b-accent") : usesDarkNav ? "hover:bg-background/10" : "hover:bg-foreground/10"
                }`}
              >
                <span className="relative z-10">BLOG</span>
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                aria-current={pathname === "contact" ? "page" : undefined}
                className={`px-4 py-2 transition-all duration-300 hover:scale-105 border-r-2 md:border-r-2 ${dividerColor} last:border-r-0 relative overflow-hidden group ${
                  pathname === "contact" ? (usesDarkNav ? "text-accent border-b-2 border-b-accent" : "text-foreground border-b-[3px] border-b-accent") : usesDarkNav ? "hover:bg-background/10" : "hover:bg-foreground/10"
                }`}
              >
                <span className="relative z-10">CONTACT</span>
              </Link>
          </motion.div>
        </AnimatePresence>
        </div>
      </nav>
    </div>
  );
}
