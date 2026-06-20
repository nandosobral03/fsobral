"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import Nav from "./nav";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function scrollToHashTarget(hash: string) {
  const target = document.getElementById(decodeURIComponent(hash.slice(1)));

  if (target) {
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    window.scrollTo({
      behavior: "instant",
      top: Math.min(targetTop, maxScroll),
    });
  }
}

export default function DetailRouteFrame({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();
  const shouldRestoreScroll = useRef(true);
  const navTargetHash = useRef("");
  const [isOpen, setIsOpen] = useState(false);
  const [showStage, setShowStage] = useState(!prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const openTimer = window.setTimeout(() => setIsOpen(true), 70);
    const stageTimer = window.setTimeout(() => setShowStage(false), 980);

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(stageTimer);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const scrollY = window.scrollY;
    const { body } = document;
    const previousPosition = body.style.position;
    const previousTop = body.style.top;
    const previousWidth = body.style.width;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.position = previousPosition;
      body.style.top = previousTop;
      body.style.width = previousWidth;
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;

      if (shouldRestoreScroll.current) {
        window.scrollTo(0, scrollY);
      } else if (navTargetHash.current) {
        window.setTimeout(() => scrollToHashTarget(navTargetHash.current), 0);
        window.setTimeout(() => scrollToHashTarget(navTargetHash.current), 120);
      } else {
        window.scrollTo(0, 0);
      }
    };
  }, []);

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const anchor = event.target instanceof Element
      ? event.target.closest<HTMLAnchorElement>("nav a[href]")
      : null;

    if (!anchor || anchor.target && anchor.target !== "_self") {
      return;
    }

    const rawHref = anchor.getAttribute("href");

    if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) {
      return;
    }

    const url = new URL(rawHref, window.location.href);

    if (url.origin === window.location.origin) {
      shouldRestoreScroll.current = false;
      navTargetHash.current = url.hash;
    }
  };

  const isPresented = isOpen || Boolean(prefersReducedMotion);

  const panelState = isPresented
    ? {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        scale: 1,
        y: 0,
      }
    : {
        clipPath: "inset(11% 7% 8% 7%)",
        opacity: 0,
        scale: 0.93,
        y: 96,
      };

  return (
    <div className="fixed inset-0 z-[90] overflow-hidden bg-foreground">
      <motion.div
        data-scroll-root="true"
        onClickCapture={handleClickCapture}
        className="page-backdrop absolute inset-0 origin-[50%_68%] overflow-y-auto bg-background text-foreground shadow-2xl"
        initial={false}
        animate={panelState}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: EASE_OUT }}
      >
        <Nav />
        {label && showStage && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed left-[var(--margin)] right-[var(--margin)] top-[calc(var(--lh)*3)] z-50 border-2 border-background/15 bg-foreground px-[var(--lh)] py-[calc(var(--lh)*0.8)] text-background shadow-2xl md:left-1/2 md:right-auto md:w-[min(58rem,calc(100vw-var(--margin)*2))] md:-translate-x-1/2"
            initial={false}
            animate={{
              clipPath: isPresented
                ? ["inset(0% 48% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
                : "inset(0% 48% 0% 0%)",
              opacity: isPresented ? [0, 1, 1, 0] : 0,
              scale: isPresented ? [0.92, 0.98, 1, 1.03] : 0.92,
              y: isPresented ? [46, 0, 0, -12] : 46,
            }}
            transition={{ duration: 0.82, ease: EASE_OUT, times: [0, 0.22, 0.72, 1] }}
          >
            <div className="h-[3px] w-20 bg-accent" />
            <div className="display-title mt-4 text-3xl text-background md:text-5xl">
              {label}
            </div>
          </motion.div>
        )}
        {children}
      </motion.div>
    </div>
  );
}
