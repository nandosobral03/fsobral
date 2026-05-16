"use client";

import { useState, useEffect, useCallback } from "react";

type GameState = "idle" | "waiting" | "reeling" | "mashing" | "complete" | "failed";

interface Barrier {
  position: number;
  passed: boolean;
  mashesRequired: number;
}

export default function FishingGame() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [progress, setProgress] = useState(0);
  const [fishProgress, setFishProgress] = useState(0);
  const [barriers, setBarriers] = useState<Barrier[]>([]);
  const [currentBarrier, setCurrentBarrier] = useState<number | null>(null);
  const [mashCount, setMashCount] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const generateBarriers = useCallback(() => {
    const barrierCount = Math.floor(Math.random() * 2) + 1; // 1-2 barriers
    const newBarriers: Barrier[] = [];

    for (let i = 0; i < barrierCount; i++) {
      newBarriers.push({
        position: (i + 1) * (100 / (barrierCount + 1)),
        passed: false,
        mashesRequired: Math.floor(Math.random() * 3) + 3, // 3-5 mashes
      });
    }

    return newBarriers;
  }, []);

  const startGame = () => {
    setGameState("waiting");
    setProgress(0);
    setFishProgress(0);
    setCurrentBarrier(null);
    setMashCount(0);
    setIsHolding(false);
    setIsShaking(false);

    const newBarriers = generateBarriers();
    setBarriers(newBarriers);

    const randomWait = Math.random() * 2000 + 1000; // 1-3 seconds

    setTimeout(() => {
      setGameState("reeling");
    }, randomWait);
  };

  const resetGame = () => {
    setGameState("idle");
    setProgress(0);
    setFishProgress(0);
    setBarriers([]);
    setCurrentBarrier(null);
    setMashCount(0);
    setIsHolding(false);
    setIsShaking(false);
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 100);
  };

  const handleMouseDown = () => {
    if (gameState === "reeling") {
      setIsHolding(true);
    } else if (gameState === "mashing") {
      setMashCount((prev) => prev + 1);
      triggerShake();
    }
  };

  const handleMouseUp = () => {
    if (gameState === "reeling") {
      setIsHolding(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameState === "reeling" && isHolding) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1;

          const nextBarrier = barriers.find((b) => !b.passed && newProgress >= b.position);
          if (nextBarrier) {
            setCurrentBarrier(barriers.indexOf(nextBarrier));
            setGameState("mashing");
            setMashCount(0);
            return nextBarrier.position;
          }

          if (newProgress >= 100) {
            setGameState("complete");
            return 100;
          }

          return newProgress;
        });
      }, 50);
    }

    return () => clearInterval(interval);
  }, [gameState, isHolding, barriers]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if ((gameState === "reeling" || gameState === "mashing") && progress > 10) {
      interval = setInterval(() => {
        setFishProgress((prev) => {
          const newFishProgress = prev + 0.7;

          if (newFishProgress >= progress - 3) {
            setGameState("failed");
            return progress;
          }

          return Math.min(newFishProgress, 95);
        });
      }, 50);
    }

    return () => clearInterval(interval);
  }, [gameState, progress]);

  useEffect(() => {
    if (gameState === "mashing" && currentBarrier !== null) {
      const requiredMashes = barriers[currentBarrier].mashesRequired;

      if (mashCount >= requiredMashes) {
        const newBarriers = [...barriers];
        newBarriers[currentBarrier].passed = true;
        setBarriers(newBarriers); // eslint-disable-line react-hooks/set-state-in-effect -- game state machine
        setCurrentBarrier(null);
        setGameState("reeling");
        triggerShake();
      }

      const timeout = setTimeout(() => {
        if (mashCount < requiredMashes) {
          setGameState("failed");
        }
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [mashCount, currentBarrier, barriers, gameState]);

  const getPromptText = () => {
    switch (gameState) {
      case "idle":
        return "Click to Fish";
      case "waiting":
        return "Wait...";
      case "reeling":
        return "Hold to reel";
      case "mashing":
        const required = currentBarrier !== null ? barriers[currentBarrier].mashesRequired : 0;
        return `Click quickly! (${mashCount}/${required})`;
      case "complete":
        return "Caught!";
      case "failed":
        return "Lost it";
      default:
        return "";
    }
  };

  return (
    <div className="bg-foreground text-background p-4 flex flex-col gap-2 w-full h-48">
      <span className="text-balance text-start font-bold font-condensed">Fishing Minigame</span>

      <div className="flex flex-col items-center gap-6 grow justify-center">
        {gameState === "idle" && (
          <button onClick={startGame} className="px-4 py-2 bg-background text-foreground rounded hover:bg-background/90 transition-colors font-medium">
            {getPromptText()}
          </button>
        )}

        {gameState === "waiting" && <div className="text-background/70">{getPromptText()}</div>}

        {(gameState === "reeling" || gameState === "mashing") && (
          <div
            className={`w-full max-w-md cursor-pointer select-none transition-transform duration-100 ${isShaking ? "animate-pulse transform scale-105" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className={`text-center mb-3 font-medium transition-all duration-100 ${gameState === "mashing" ? "text-accent animate-bounce" : ""}`}>{getPromptText()}</div>

            <div className="space-y-2 mb-4">
              <div className={`relative w-full h-6 bg-background/20 rounded-full border-2 border-dashed border-background/30 transition-all duration-100 ${isShaking ? "transform -translate-x-1 shadow-lg border-accent" : ""}`}>
                <div className="h-full bg-background rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />

                {barriers.map((barrier, index) => (
                  <div key={index}>
                    <div
                      className={`absolute top-0 w-0.5 h-full transition-all duration-100 ${barrier.passed ? "bg-emerald-700" : currentBarrier === index && isShaking ? "bg-accent animate-pulse transform scale-150" : "bg-accent"}`}
                      style={{ left: `${barrier.position}%` }}
                    />

                    {!barrier.passed && progress < barrier.position && (
                      <div
                        className={`absolute -top-4 transform -translate-x-1/2 text-xs text-accent font-medium transition-all duration-100 ${currentBarrier === index && gameState === "mashing" ? "animate-bounce" : ""}`}
                        style={{ left: `${barrier.position}%` }}
                      >
                        {barrier.mashesRequired}×
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className={`relative w-full h-3 bg-background/10 rounded-full transition-all duration-100 ${isShaking ? "transform translate-x-1" : ""}`}>
                <div className="h-full bg-accent rounded-full transition-all duration-100" style={{ width: `${fishProgress}%` }} />
                <div className="absolute inset-0 flex items-center justify-end pr-2 pointer-events-none">
                  <div className="text-xs text-accent/60">Fish escaping...</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(gameState === "complete" || gameState === "failed") && (
          <div className="text-center">
            <div className={`text-lg font-medium mb-3 ${gameState === "complete" ? "text-emerald-700" : "text-accent"}`}>{getPromptText()}</div>
            <button onClick={resetGame} className="px-4 py-2 bg-background/20 text-background rounded hover:bg-background/30 transition-colors font-medium">
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
