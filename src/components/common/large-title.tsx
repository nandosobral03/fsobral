"use client";

import { motion, AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import CircularText from "@/components/common/circular-text";
import { useState, useEffect } from "react";

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

const DURATION = 0.25;
const STAGGER = 0.025;

type AnimationType = "sphere" | "cube";

interface LargeTitleProps {
  children: React.ReactNode;
  alt?: string;
  animation?: AnimationType;
  backgroundImage?: string;
  variant?: "hero" | "page";
}

export default function LargeTitle({
  children,
  alt,
  animation = "sphere",
  backgroundImage,
  variant = "hero",
}: LargeTitleProps) {
  const text = children?.toString() || "";
  const words = text.split(" ");
  const altWords = alt?.split(" ") || words;
  const [showScroll, setShowScroll] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowScroll(false), 3000);
    return () => clearTimeout(timer);
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

      {/* Animation on the left */}
      {!backgroundImage && (
        <div
          className={`hidden md:flex items-center justify-center ${isHero ? "flex-1 h-[60vh]" : "flex-1 h-[50vh]"}`}
        >
          {renderAnimation()}
        </div>
      )}

      {/* Title text */}
      <div className="flex flex-col items-end gap-4 flex-1 min-w-0 overflow-hidden">
        {words.map((word, wordIndex) => {
          const altWord = altWords[wordIndex] || word;
          const lengthDiff = altWord.length - word.length;

          return (
            <motion.h1
              key={wordIndex}
              initial="initial"
              whileHover="hovered"
              className={`font-semibold font-condensed text-end leading-[0.95] select-none relative overflow-hidden whitespace-nowrap max-w-full w-full ${isHero ? "text-[15vw] md:text-[8vw]" : "text-[15vw] xl:text-[12rem]"}`}
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
            </motion.h1>
          );
        })}
        {isHero && (
          <div className="flex items-center gap-3 mt-2">
            <motion.span
              className="h-[2px] w-12 bg-accent/50"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              style={{ transformOrigin: "right" }}
            />
            <motion.span
              className="meta-label text-foreground/50 tracking-[0.2em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Software Engineer
            </motion.span>
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
            text="CODE • CREATE • SHIP • REPEAT • "
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
    return (
      <div className="relative min-h-[calc(100svh-80px)] select-none mb-8">
        {/* Full-bleed ASCII background — mobile (rotated, low density) */}
        <div className="absolute inset-0 pointer-events-none md:hidden">
          <AsciiImage
            src={backgroundImage}
            opacity={1.0}
            density={120}
            rotateAngle={30}
          />
        </div>
        {/* Full-bleed ASCII background — desktop */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <AsciiImage src={backgroundImage} opacity={1.0} density={300} />
        </div>
        {/* Content with normal margins */}
        <div className="relative flex items-center justify-end gap-6 md:gap-8 lg:gap-12 min-h-[calc(100svh-80px)] overflow-hidden pr-6 md:pr-12 pb-6 border-b-[3px] border-foreground mx-4">
          {content}
        </div>
      </div>
    );
  }

  if (!isHero) {
    return (
      <div className="flex items-center justify-end gap-6 md:gap-8 lg:gap-12 min-h-[50vh] my-16 px-6 md:px-12 select-none relative overflow-hidden">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-6 md:gap-8 lg:gap-12 min-h-[calc(100svh-80px)] select-none relative overflow-hidden pr-6 md:pr-12 pb-6 border-b-[3px] border-foreground mx-4 mb-8">
      {content}
    </div>
  );
}
