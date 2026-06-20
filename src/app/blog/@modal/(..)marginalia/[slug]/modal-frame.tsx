"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MarginaliaModalFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  return (
    <div className="fixed inset-0 z-[90]">
      <motion.button
        type="button"
        aria-label="Close marginalia"
        onClick={() => router.back()}
        className="absolute inset-0 bg-foreground/55"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
      />
      <motion.aside
        role="dialog"
        aria-modal="true"
        data-scroll-root="true"
        className="absolute inset-y-0 right-0 flex w-full max-w-5xl flex-col overflow-y-auto border-l-2 border-foreground bg-background text-foreground shadow-2xl"
        initial={prefersReducedMotion ? false : { x: "100%" }}
        animate={{ x: 0 }}
        exit={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="sticky top-0 z-10 flex justify-end border-b-2 border-background/15 bg-foreground">
          <button
            type="button"
            aria-label="Close marginalia"
            onClick={() => router.back()}
            className="px-4 py-2 text-2xl leading-none text-background transition-colors hover:bg-accent hover:text-foreground"
          >
            x
          </button>
        </div>
        {children}
      </motion.aside>
    </div>
  );
}
