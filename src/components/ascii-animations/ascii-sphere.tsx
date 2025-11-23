"use client";

import { useState, useEffect } from "react";

export default function AsciiSphere() {
  const [output, setOutput] = useState("");

  useEffect(() => {
    let angle = 0;
    let animationId: number;
    let lastFrameTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const width = 80;
    const height = 60;
    const radius = 30; // Adjusted to match cube scale better
    const centerX = width / 2;
    const centerY = height / 2;
    const sphereChars = ["@", "%", "#", "*", "+", "=", "-", ":", ".", " "];

    const renderFrame = (timestamp: number) => {
      if (timestamp - lastFrameTime >= frameInterval) {
        lastFrameTime = timestamp;

        angle = (angle + 1.5) % 360; // Faster speed
        const rad = (angle * Math.PI) / 180;

        // Rotating light source
        const lightDir = {
          x: Math.sin(rad),
          y: Math.sin(rad + Math.PI / 4) * 0.5,
          z: Math.cos(rad),
        };

        // Normalize light
        const len = Math.sqrt(lightDir.x * lightDir.x + lightDir.y * lightDir.y + lightDir.z * lightDir.z);
        const lx = lightDir.x / len;
        const ly = lightDir.y / len;
        const lz = lightDir.z / len;

        let frameOutput = "";

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            // Aspect ratio correction: y characters are taller than wide
            const dx = x - centerX;
            const dy = (y - centerY) * 1.5;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < radius) {
              // Calculate Z based on sphere equation: x^2 + y^2 + z^2 = r^2
              const z = Math.sqrt(radius * radius - dist * dist);

              // Surface normal (normalized)
              const nx = dx / radius;
              const ny = dy / radius;
              const nz = z / radius;

              // Diffuse lighting (dot product)
              const illumination = nx * lx + ny * ly + nz * lz;

              // Add dithering noise to break up banding
              const noise = (Math.random() - 0.5) * 0.15;

              if (illumination + noise > 0.9) {
                frameOutput += " ";
              } else {
                const val = (illumination + 1) / 2 + noise;
                const idx = Math.floor(val * (sphereChars.length - 1));
                frameOutput += sphereChars[Math.max(0, Math.min(sphereChars.length - 1, idx))];
              }
            } else {
              frameOutput += " ";
            }
          }
          frameOutput += "\n";
        }

        setOutput(frameOutput);
      }
      animationId = requestAnimationFrame(renderFrame);
    };

    animationId = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <pre className="font-mono text-[6px] leading-[5px] text-foreground whitespace-pre select-none">{output}</pre>;
}
