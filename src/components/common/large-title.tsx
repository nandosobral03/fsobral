"use client";

import { motion } from "motion/react";
import AsciiSphere from "@/components/ascii-animations/ascii-sphere";
import AsciiCube from "@/components/ascii-animations/ascii-cube";
import AsciiDonut from "@/components/ascii-animations/ascii-donut";
import AsciiDna from "@/components/ascii-animations/ascii-dna";

const DURATION = 0.25;
const STAGGER = 0.025;

type AnimationType = "sphere" | "cube" | "donut" | "dna";

interface LargeTitleProps {
  children: React.ReactNode;
  alt?: string;
  animation?: AnimationType;
}

export default function LargeTitle({ children, alt, animation = "sphere" }: LargeTitleProps) {
  const text = children?.toString() || "";
  const words = text.split(" ");
  const altWords = alt?.split(" ") || words;

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
    <div className="flex items-center justify-end gap-6 md:gap-8 lg:gap-12 my-16 select-none relative overflow-hidden">
      {/* ASCII Animation on the left */}
      <div className="hidden md:flex flex-shrink-0 overflow-hidden items-center justify-end w-[150px] lg:w-[250px] xl:w-[300px]">{renderAnimation()}</div>

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
              className="text-[15vw] xl:text-[12rem] font-semibold font-condensed text-end leading-[0.8] select-none relative overflow-hidden whitespace-nowrap max-w-full w-full"
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
    </div>
  );
}
