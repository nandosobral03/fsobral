"use client";

import { useState, useEffect } from "react";

export default function AsciiDna() {
  const [output, setOutput] = useState("");

  useEffect(() => {
    let offset = 0;
    let animationId: number;
    let lastFrameTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const width = 80;
    const height = 60;
    const waveLength = 15; // Vertical distance for one full twist
    const amplitude = 20; // Width of the helix
    const speed = 0.1; // Vertical scroll speed

    const shadeChars = ["@", "%", "#", "*", "+", "=", "-", ":", ".", " "];

    const renderFrame = (timestamp: number) => {
      if (timestamp - lastFrameTime >= frameInterval) {
        lastFrameTime = timestamp;

        offset -= speed;

        // Initialize grid
        const grid = Array(height)
          .fill(null)
          .map(() => Array(width).fill(" "));

        // Render DNA strands
        for (let y = 0; y < height; y++) {
          // Calculate phase based on Y position and current offset
          // The factor (y / waveLength) determines how many twists fit on screen
          const phase = y / waveLength + offset;

          // Calculate X positions for the two strands
          // sin(phase) gives -1 to 1. map to screen coordinates.
          const x1 = Math.floor(width / 2 + Math.sin(phase) * amplitude);
          const x2 = Math.floor(width / 2 + Math.sin(phase + Math.PI) * amplitude);

          // Z-depth for shading (simulated)
          // cos(phase) gives us "depth" - front vs back
          const z1 = Math.cos(phase);
          const z2 = Math.cos(phase + Math.PI);

          // Draw Base Pairs (Horizontal rungs)
          // Only draw every Nth line to look like rungs
          if (Math.floor(y) % 4 === 0) {
            const start = Math.min(x1, x2);
            const end = Math.max(x1, x2);
            for (let x = start; x <= end; x++) {
              if (x >= 0 && x < width) {
                // Shading for rungs depends on average depth?
                // Or just make them thinner chars
                grid[y][x] = "-";
              }
            }
          }

          // Draw Strands (Balls)
          if (x1 >= 0 && x1 < width) {
            // Shading based on Z (front is bright, back is dark)
            // z ranges -1 (back) to 1 (front)
            // map -1..1 to index 0..9
            // Front (1) -> Bright (" " or .) -> Index 8-9
            // Back (-1) -> Dark (@) -> Index 0-1
            // Wait, our previous logic: 1(bright/front) -> 9(" "), -1(dark) -> 0("@")
            const val = (z1 + 1) / 2;
            const idx = Math.floor(val * (shadeChars.length - 1));
            grid[y][x1] = shadeChars[Math.max(0, Math.min(shadeChars.length - 1, idx))];
            // Make strand slightly thicker
            if (x1 + 1 < width) grid[y][x1 + 1] = grid[y][x1];
          }

          if (x2 >= 0 && x2 < width) {
            const val = (z2 + 1) / 2;
            const idx = Math.floor(val * (shadeChars.length - 1));
            grid[y][x2] = shadeChars[Math.max(0, Math.min(shadeChars.length - 1, idx))];
            if (x2 + 1 < width) grid[y][x2 + 1] = grid[y][x2];
          }
        }

        // Convert grid to string
        const frameOutput = grid.map((row) => row.join("")).join("\n");

        setOutput(frameOutput);
      }
      animationId = requestAnimationFrame(renderFrame);
    };

    animationId = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <pre className="font-mono text-[6px] leading-[5px] text-foreground whitespace-pre select-none">{output}</pre>;
}
