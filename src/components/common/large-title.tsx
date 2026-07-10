"use client";

import { motion, AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import CircularText from "@/components/common/circular-text";
import HeroDatumLine from "@/components/common/hero-datum-line";
import SisyphusEffortVector from "@/components/common/sisyphus-effort-vector";
import ThinkerThoughtAnnotation from "@/components/common/thinker-thought-annotation";
import { useState, useEffect, useSyncExternalStore, useCallback } from "react";

const AsciiSphere = dynamic(
  () => import("@/components/ascii-animations/ascii-sphere"),
  { ssr: false },
);
const AsciiCube = dynamic(
  () => import("@/components/ascii-animations/ascii-cube"),
  { ssr: false },
);
const AsciiImage = dynamic(
  () => import("@/components/ascii-animations/ascii-image"),
  { ssr: false },
);

const MD_BREAKPOINT = 768;

const subscribe = (cb: () => void) => {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
};

function useIsDesktop() {
  return useSyncExternalStore(
    subscribe,
    () => window.innerWidth >= MD_BREAKPOINT,
    () => true,
  );
}

const DURATION = 0.25;
const STAGGER = 0.025;

type AnimationType = "sphere" | "cube";
type ArtworkGraphic = "creation-datum" | "sisyphus-effort" | "thinker-annotation";

function ArtworkOverlay({
  graphic,
  layer,
}: {
  graphic?: ArtworkGraphic;
  layer: "behind" | "front";
}) {
  switch (graphic) {
    case "creation-datum":
      return <HeroDatumLine layer={layer} />;
    case "sisyphus-effort":
      return <SisyphusEffortVector layer={layer} />;
    case "thinker-annotation":
      return <ThinkerThoughtAnnotation layer={layer} />;
    default:
      return null;
  }
}

interface LargeTitleProps {
  children: React.ReactNode;
  alt?: string;
  animation?: AnimationType;
  backgroundImage?: string;
  backgroundImageFallback?: { desktop?: string; mobile?: string };
  backgroundImageOpacity?: number;
  backgroundImageContrast?: number;
  variant?: "hero" | "page";
  textClassName?: string;
  subtitle?: string;
  description?: string;
  primaryAction?: { href: string; label: string };
  secondaryAction?: { href: string; label: string };
  artworkGraphic?: ArtworkGraphic;
}

export default function LargeTitle({
  children,
  alt,
  animation = "sphere",
  backgroundImage,
  backgroundImageFallback,
  backgroundImageOpacity = 1.0,
  backgroundImageContrast = 0,
  variant = "hero",
  textClassName,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  artworkGraphic,
}: LargeTitleProps) {
  const text = children?.toString() || "";
  const words = text.split(" ");
  const altWords = alt?.split(" ") || words;
  const isDesktop = useIsDesktop();
  const [showScroll, setShowScroll] = useState(true);
  const [isAsciiReady, setIsAsciiReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowScroll(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAsciiReady = useCallback(() => {
    setIsAsciiReady(true);
  }, []);

  const renderAnimation = () => {
    switch (animation) {
      case "cube":
        return <AsciiCube />;
      case "sphere":
      default:
        return <AsciiSphere />;
    }
  };

  const isHero = variant === "hero";

  const content = (
    <>
      {/* Ghost text (hero only, hidden when backgroundImage is used) */}
      {isHero && !backgroundImage && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <span className="ghost-text text-[20vw] md:text-[15vw] whitespace-nowrap">
            SOFTWARE
          </span>
        </div>
      )}

      {/* Animation on the left (only when no backgroundImage) */}
      {!backgroundImage && (
        <div
          className={`hidden md:flex items-center justify-center ${isHero ? "flex-1 h-[60vh]" : "flex-1 h-[50vh]"}`}
        >
          {renderAnimation()}
        </div>
      )}

      {/* Title text */}
      <div className="flex flex-col items-end gap-4 flex-1 min-w-0 overflow-hidden">
        <h1 className="sr-only">{text}</h1>
        <div className="flex w-full flex-col items-end" aria-hidden="true">
        {words.map((word, wordIndex) => {
          const altWord = altWords[wordIndex] || word;
          const lengthDiff = altWord.length - word.length;

          return (
            <motion.div
              key={wordIndex}
              initial="initial"
              whileHover="hovered"
              className={`display-title text-end select-none relative overflow-hidden whitespace-nowrap max-w-full w-full ${textClassName ?? (isHero ? "text-[15vw] md:text-[8vw]" : "text-[15vw] xl:text-[12rem]")}`}
            >
              <div className="relative">
                {word.split("").map((l, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      initial: { y: 0 },
                      hovered: { y: "-100%" },
                    }}
                    transition={{
                      duration: DURATION,
                      ease: "easeInOut",
                      delay: STAGGER * i,
                    }}
                    className="inline-block"
                  >
                    {l}
                  </motion.span>
                ))}
              </div>
              <div
                className="absolute inset-0 whitespace-nowrap"
                style={{ left: `-${lengthDiff > 0 ? lengthDiff * 0.5 : 0}em` }}
              >
                {altWord.split("").map((l, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      initial: { y: "100%" },
                      hovered: { y: 0 },
                    }}
                    transition={{
                      duration: DURATION,
                      ease: "easeInOut",
                      delay: STAGGER * i,
                    }}
                    className="inline-block"
                  >
                    {l}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
        </div>
        <div className="flex items-center gap-3 mt-2">
          <motion.span
            className="h-[2px] w-12 bg-accent/50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "right" }}
          />
          <motion.span
            className="meta-label paper-halo text-[var(--ink-blue)] tracking-[0.2em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {subtitle ?? (isHero ? "Software Engineer" : alt || text)}
          </motion.span>
        </div>
        {description && (
          <div className="max-w-xl text-right">
            <p className="editorial-copy paper-halo text-sm font-medium text-foreground md:text-base">
              {description}
            </p>
            {(primaryAction || secondaryAction) && (
              <div className="mt-3 flex flex-wrap justify-end gap-2">
                {secondaryAction && (
                  <Link
                    href={secondaryAction.href}
                    className="meta-label paper-halo border border-foreground/45 px-3 py-2 text-foreground transition-colors hover:border-foreground"
                  >
                    {secondaryAction.label}
                  </Link>
                )}
                {primaryAction && (
                  <Link
                    href={primaryAction.href}
                    className="meta-label border border-foreground bg-foreground px-3 py-2 text-background transition-colors hover:border-accent hover:bg-accent hover:text-foreground"
                  >
                    {primaryAction.label}
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Monospace coordinates - bottom left (hero only) */}
      {isHero && (
        <div className="absolute bottom-8 left-6 meta-label text-foreground/70">
          34.9011S / 56.1645W
        </div>
      )}

      {/* Scroll indicator - bottom center (hero only) */}
      {isHero && (
        <AnimatePresence>
          {showScroll && (
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 meta-label text-foreground/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>scroll</span>
              <motion.span
                className="block w-px h-4 bg-foreground/30"
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Circular text - bottom right (hero only) */}
      {isHero && (
        <div className="absolute bottom-4 right-4 hidden md:block">
          <CircularText
            text="CODE / CREATE / SHIP / REPEAT / "
            spinDuration={20}
            onHover="slowDown"
            radius={55}
            className="!w-[120px] !h-[120px] text-foreground !text-[0.85rem] !font-semibold "
          />
        </div>
      )}
    </>
  );

  if (backgroundImage) {
    const minHeight = isHero
      ? "min-h-[46svh] md:min-h-[76svh]"
      : "min-h-[clamp(20rem,42svh,34rem)]";

    return (
      <div className={`relative ${minHeight} select-none ${isHero ? "mb-8" : ""}`}>
        {/* Full-bleed ASCII background — only mount the active breakpoint */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <ArtworkOverlay graphic={artworkGraphic} layer="behind" />
          {(backgroundImageFallback?.desktop || backgroundImageFallback?.mobile) && (
            <picture
              className={`absolute inset-0 transition-opacity duration-500 ${
                isAsciiReady ? "opacity-0" : "opacity-80"
              }`}
            >
              {backgroundImageFallback?.desktop && (
                <source media="(min-width: 768px)" srcSet={backgroundImageFallback.desktop} />
              )}
              <img
                src={backgroundImageFallback.mobile ?? backgroundImageFallback.desktop}
                alt=""
                className={`h-full w-full select-none ${
                  isHero ? "object-cover" : "object-contain object-left-bottom"
                }`}
              />
            </picture>
          )}
          {isDesktop ? (
            <AsciiImage
              src={backgroundImage}
              opacity={backgroundImageOpacity}
              density={300}
              fallbackSrc={backgroundImageFallback?.desktop}
              fitHeight={!isHero}
              alignLeft={!isHero}
              contrast={backgroundImageContrast}
              onReady={handleAsciiReady}
            />
          ) : (
            <AsciiImage
              src={backgroundImage}
              opacity={backgroundImageOpacity}
              density={120}
              rotateAngle={isHero ? 30 : 0}
              fallbackSrc={backgroundImageFallback?.mobile}
              fitHeight={!isHero}
              alignLeft={!isHero}
              contrast={backgroundImageContrast}
              onReady={handleAsciiReady}
            />
          )}
          <ArtworkOverlay graphic={artworkGraphic} layer="front" />
        </div>
        {/* Content with normal margins */}
        <div className={`editorial-wrap relative z-10 flex items-center justify-end gap-6 md:gap-8 lg:gap-12 ${minHeight} overflow-hidden pb-6 border-b-2 border-foreground`}>
          {content}
        </div>
      </div>
    );
  }

  if (!isHero) {
    return (
      <div className="editorial-wrap flex items-center justify-end gap-6 md:gap-8 lg:gap-12 min-h-[clamp(20rem,42svh,34rem)] my-8 select-none relative overflow-hidden border-b-2 border-foreground pb-6">
        {content}
      </div>
    );
  }

  return (
    <div className="editorial-wrap flex items-center justify-end gap-6 md:gap-8 lg:gap-12 min-h-[46svh] md:min-h-[76svh] select-none relative overflow-hidden pb-6 border-b-2 border-foreground mb-8">
      {content}
    </div>
  );
}
