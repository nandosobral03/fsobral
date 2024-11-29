"use client";

import { motion } from "motion/react";

const DURATION = 0.25;
const STAGGER = 0.025;

export default function LargeTitle({ children }: { children: React.ReactNode }) {
  const text = children?.toString() || "";
  const words = text.split(" ");

  return (
    <div className="flex flex-col items-end gap-4 my-8">
      {words.map((word, wordIndex) => (
        <motion.h1 key={wordIndex} initial="initial" whileHover="hovered" className="text-[15vw] font-semibold font-condensed text-end leading-[0.8] select-none relative overflow-hidden whitespace-nowrap">
          <div>
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
          <div className="absolute inset-0">
            {word.split("").map((l, i) => (
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
      ))}
    </div>
  );
}
