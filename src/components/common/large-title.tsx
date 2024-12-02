"use client";

import { motion } from "motion/react";

const DURATION = 0.25;
const STAGGER = 0.025;

export default function LargeTitle({ children, alt }: { children: React.ReactNode; alt?: string }) {
  const text = children?.toString() || "";
  const words = text.split(" ");
  const altWords = alt?.split(" ") || words;

  return (
    <div className="flex flex-col items-end gap-4 my-16 overflow-x-auto select-none">
      {words.map((word, wordIndex) => {
        const altWord = altWords[wordIndex] || word;
        const lengthDiff = altWord.length - word.length;

        return (
          <motion.h1 key={wordIndex} initial="initial" whileHover="hovered" className="text-[15vw] font-semibold font-condensed text-end leading-[0.8] select-none relative overflow-hidden whitespace-nowrap max-w-full w-full">
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
            <div className="absolute inset-0 whitespace-nowrap" style={{ left: `-${lengthDiff > 0 ? lengthDiff * 0.5 : 0}em` }}>
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
    </div>
  );
}
