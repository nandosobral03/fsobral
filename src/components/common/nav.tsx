"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Nav() {
  const pathname = usePathname()?.split("/")[1] || "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <>
      <nav className="flex flex-col md:flex-row justify-between uppercase text-lg border-b-[3px] border-foreground mx-4">
        <div className="flex justify-end items-center">
          <motion.button className="md:hidden px-4 py-2" onClick={() => setIsMenuOpen(!isMenuOpen)} whileTap={{ scale: 0.95 }}>
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
                className={`px-4 py-2 transition-all duration-300 hover:scale-105 border-r-[3px] md:border-r-[3px] border-foreground last:border-r-0 relative overflow-hidden group ${
                  pathname === "" ? "bg-foreground text-background" : "hover:bg-foreground/10"
                }`}
              >
                <span className="relative z-10">ABOUT ME</span>
              </Link>
              <Link
                href="/projects"
                className={`px-4 py-2 transition-all duration-300 hover:scale-105 border-r-[3px] md:border-r-[3px] border-foreground last:border-r-0 relative overflow-hidden group ${
                  pathname === "projects" ? "bg-foreground text-background" : "hover:bg-foreground/10"
                }`}
              >
                <span className="relative z-10">PROJECTS</span>
              </Link>
              <Link
                href="/blog"
                className={`px-4 py-2 transition-all duration-300 hover:scale-105 border-r-[3px] md:border-r-[3px] border-foreground last:border-r-0 relative overflow-hidden group ${
                  pathname === "blog" ? "bg-foreground text-background" : "hover:bg-foreground/10"
                }`}
              >
                <span className="relative z-10">BLOG</span>
              </Link>
              <Link
                href="/favorites"
                className={`px-4 py-2 transition-all duration-300 hover:scale-105 border-r-[3px] md:border-r-[3px] border-foreground last:border-r-0 relative overflow-hidden group ${
                  pathname === "favorites" ? "bg-foreground text-background" : "hover:bg-foreground/10"
                }`}
              >
                <span className="relative z-10">FAVORITES</span>
              </Link>
              <Link
                href="/#contact"
                className={`px-4 py-2 transition-all duration-300 hover:scale-105   border-foreground relative overflow-hidden group ${pathname === "#contact" ? "bg-foreground text-background" : "hover:bg-foreground/10"}`}
              >
                <span className="relative z-10">CONTACT</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
