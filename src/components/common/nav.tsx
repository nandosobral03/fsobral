"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Divider from "./divider";
import { motion, AnimatePresence } from "motion/react";

export default function Nav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex flex-col md:flex-row justify-between uppercase text-lg">
        <div className="flex justify-end items-center">
          <motion.button className="md:hidden px-4 py-2" onClick={() => setIsMenuOpen(!isMenuOpen)} whileTap={{ scale: 0.95 }}>
            {isMenuOpen ? "✕" : "☰"}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="flex flex-col md:flex-row font-semibold md:mr-4 font-sans md:!flex"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <Divider />
    </>
  );
}
