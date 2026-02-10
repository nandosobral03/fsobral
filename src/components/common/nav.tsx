"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const detailPages = ["blog", "projects", "marginalia"];

export default function Nav() {
  const fullPathname = usePathname() || "";
  const pathname = fullPathname.split("/")[1] || "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on a detail page (blog/[name] or projects/[name])
  const isDetailPage = fullPathname.split("/").length > 2 && detailPages.includes(pathname);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <div className={`${isDetailPage ? "bg-foreground text-background" : ""}`}>
      <nav aria-label="Main navigation" className={`flex flex-col md:flex-row justify-between uppercase text-sm border-b-[3px] border-foreground mx-4 ${isDetailPage ? "bg-foreground text-background" : ""}`}>
        <div className="flex justify-end items-center">
          <motion.button className="md:hidden px-4 py-2" onClick={() => setIsMenuOpen(!isMenuOpen)} whileTap={{ scale: 0.95 }} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
            {isMenuOpen ? "✕" : "☰"}
          </motion.button>
        </div>

        <AnimatePresence>
          {(!isMobile || isMenuOpen) && (
            <motion.div
              className="flex flex-col md:flex-row font-semibold font-sans md:flex!"
              initial={isMobile ? { opacity: 0, height: 0 } : false}
              animate={isMobile ? { opacity: 1, height: "auto" } : {}}
              exit={isMobile ? { opacity: 0, height: 0 } : {}}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/"
                aria-current={pathname === "" ? "page" : undefined}
                className={`px-4 py-2 transition-all duration-300 hover:scale-105 border-r-[3px] md:border-r-[3px] border-foreground last:border-r-0 relative overflow-hidden group ${
                  pathname === "" ? (isDetailPage ? "bg-background text-foreground" : "bg-foreground text-background") : isDetailPage ? "hover:bg-background/10" : "hover:bg-foreground/10"
                }`}
              >
                <span className="relative z-10">ABOUT ME</span>
              </Link>
              <Link
                href="/projects"
                aria-current={pathname === "projects" ? "page" : undefined}
                className={`px-4 py-2 transition-all duration-300 hover:scale-105 border-r-[3px] md:border-r-[3px] border-foreground last:border-r-0 relative overflow-hidden group ${
                  pathname === "projects" ? (isDetailPage ? "text-accent border-b-[3px] border-b-accent" : "bg-foreground text-background") : isDetailPage ? "hover:bg-background/10" : "hover:bg-foreground/10"
                }`}
              >
                <span className="relative z-10">PROJECTS</span>
              </Link>
              <Link
                href="/blog"
                aria-current={pathname === "blog" || pathname === "marginalia" ? "page" : undefined}
                className={`px-4 py-2 transition-all duration-300 hover:scale-105 border-r-[3px] md:border-r-[3px] border-foreground last:border-r-0 relative overflow-hidden group ${
                  pathname === "blog" || pathname === "marginalia" ? (isDetailPage ? "text-accent border-b-[3px] border-b-accent" : "bg-foreground text-background") : isDetailPage ? "hover:bg-background/10" : "hover:bg-foreground/10"
                }`}
              >
                <span className="relative z-10">BLOG</span>
              </Link>
              <Link
                href="/#contact"
                className={`px-4 py-2 transition-all duration-300 hover:scale-105 border-r-[3px] md:border-r-[3px] border-foreground last:border-r-0 relative overflow-hidden group ${
                  pathname === "#contact" ? (isDetailPage ? "bg-background text-foreground" : "bg-foreground text-background") : isDetailPage ? "hover:bg-background/10" : "hover:bg-foreground/10"
                }`}
              >
                <span className="relative z-10">CONTACT</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
