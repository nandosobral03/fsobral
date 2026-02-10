"use client";

import { motion, AnimatePresence } from "motion/react";
import AsciiSphere from "@/components/ascii-animations/ascii-sphere";
import AsciiCube from "@/components/ascii-animations/ascii-cube";
import AsciiDonut from "@/components/ascii-animations/ascii-donut";
import AsciiDna from "@/components/ascii-animations/ascii-dna";
import { useState, useEffect } from "react";

const DURATION = 0.25;
const STAGGER = 0.025;

type AnimationType = "sphere" | "cube" | "donut" | "dna";

interface LargeTitleProps {
  children: React.ReactNode;
  alt?: string;
  animation?: AnimationType;
}

export default function LargeTitle({
  children,
  alt,
  animation = "sphere",
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
      case "donut":
        return <AsciiDonut />;
      case "dna":
        return <AsciiDna />;
      case "sphere":
      default:
        return <AsciiSphere />;
    }
  };

  return (
    <div className="flex items-center justify-end gap-6 md:gap-8 lg:gap-12 min-h-[calc(100svh-80px)] select-none relative overflow-hidden pr-6 md:pr-12 pb-6 border-b-[3px] border-foreground mx-4 mb-8">
      {/* Ghost text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span className="ghost-text text-[20vw] md:text-[15vw] whitespace-nowrap">
          SOFTWARE
        </span>
      </div>

      {/* Animation on the left — fills available space */}
      <div className="hidden md:flex flex-1 items-center justify-center h-[60vh]">
        {renderAnimation()}
      </div>

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
              className="text-[15vw] md:text-[8vw] font-semibold font-condensed text-end leading-[0.8] select-none relative overflow-hidden whitespace-nowrap max-w-full w-full"
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
        <motion.span
          className="meta-label text-foreground/50 mt-2 tracking-[0.2em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Software Engineer
        </motion.span>
      </div>

      {/* Monospace coordinates - bottom left */}
      <div className="absolute bottom-8 left-6 meta-label text-foreground/70">
        34.9011S / 56.1645W
      </div>

      {/* Scroll indicator - bottom center */}
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
    </div>
  );
}
