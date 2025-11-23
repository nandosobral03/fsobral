"use client";

import { useState, useEffect } from "react";

export default function AsciiDonut() {
  const [output, setOutput] = useState("");

  useEffect(() => {
    let A = 0;
    let B = 0;
    let animationId: number;
    let lastFrameTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const width = 80;
    const height = 60;
    const R1 = 15; // Radius of the tube
    const R2 = 30; // Radius from center to tube center
    const K2 = 150; // Distance from viewer
    const K1 = (width * K2 * 3) / (8 * (R1 + R2)); // Projection scale factor

    const shadeChars = ["@", "%", "#", "*", "+", "=", "-", ":", ".", " "];

    const renderFrame = (timestamp: number) => {
      if (timestamp - lastFrameTime >= frameInterval) {
        lastFrameTime = timestamp;

        A += 0.04; // Rotation around X axis
        B += 0.02; // Rotation around Z axis

        const cA = Math.cos(A),
          sA = Math.sin(A);
        const cB = Math.cos(B),
          sB = Math.sin(B);

        // Initialize buffers
        const b = new Array(width * height).fill(" ");
        const zBuffer = new Array(width * height).fill(0);

        // Theta goes around the cross-sectional circle of the torus
        for (let theta = 0; theta < 2 * Math.PI; theta += 0.07) {
          const ct = Math.cos(theta),
            st = Math.sin(theta);

          // Phi goes around the center of revolution of the torus
          for (let phi = 0; phi < 2 * Math.PI; phi += 0.02) {
            const cp = Math.cos(phi),
              sp = Math.sin(phi);

            // Calculate 3D coordinates before projection
            const circleX = R2 + R1 * ct;
            const circleY = R1 * st;

            // 3D coordinates after rotation
            const x = circleX * (cB * cp + sA * sB * sp) - circleY * cA * sB;
            const y = circleX * (sB * cp - sA * cB * sp) + circleY * cA * cB;
            const z = K2 + cA * circleX * sp + circleY * sA;
            const ooz = 1 / z; // One over z

            // 2D screen coordinates
            const xp = Math.floor(width / 2 + K1 * ooz * x);
            const yp = Math.floor(height / 2 - K1 * ooz * y * 0.6); // 0.6 aspect ratio correction

            // Luminance (L) range -sqrt(2) to +sqrt(2)
            const L = cp * ct * sB - cA * ct * sp - sA * st + cB * (cA * st - ct * sA * sp);

            if (L > 0) {
              if (xp >= 0 && xp < width && yp >= 0 && yp < height) {
                const idx = xp + yp * width;
                if (ooz > zBuffer[idx]) {
                  zBuffer[idx] = ooz;
                  // Normalize L roughly to -1..1
                  const normL = L / Math.sqrt(2);

                  // If very bright, use empty space for specular
                  if (normL > 0.9) {
                    b[idx] = " ";
                  } else {
                    const val = (normL + 1) / 2; // 0..1
                    const charIdx = Math.floor(val * (shadeChars.length - 1));
                    b[idx] = shadeChars[Math.max(0, Math.min(shadeChars.length - 1, charIdx))];
                  }
                }
              }
            }
          }
        }

        // Convert buffer to string
        let frameOutput = "";
        for (let k = 0; k < width * height; k++) {
          frameOutput += k % width === width - 1 ? "\n" : b[k];
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
