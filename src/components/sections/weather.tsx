"use client";
import React, { useState, useEffect, ReactNode, useCallback, useMemo } from "react";

// --- Types ---

interface AsciiCanvasProps {
  width?: number;
  height?: number;
  children?: ReactNode;
  className?: string;
  scale?: number;
}

interface SunProps {
  radius?: number;
  centerX?: number;
  centerY?: number;
  sphereChars?: string[];
  highlightThreshold?: number;
  color?: string; // Not used in ASCII gen but maybe for styling later
}

interface RaysProps {
  centerX?: number;
  centerY?: number;
  innerRadius?: number;
  numBeams?: number;
  beamWidthRatio?: number; // 0 to 1 (e.g. 0.2 for 20% width)
  rotationSpeed?: number; // Multiplier relative to global angle
  density?: number; // Dithering factor (1 = solid, 3 = 1/3 pixels)
  charStrategy?: "directional" | "static" | "random";
}

type GridLayer = (x: number, y: number, w: number, h: number, angle: number) => string | null;

// --- Components ---

export const AsciiScene = ({ width = 90, height = 130, scale = 1.25, children }: AsciiCanvasProps) => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((a) => (a + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center p-6">
      <div className="relative w-full max-w-[350px] aspect-[9/16] frame bg-background rounded-[2rem] flex items-center justify-center font-mono overflow-hidden shadow-[10px_10px_0px_0px_var(--foreground)]">
        <div className="absolute inset-0 -top-10 flex items-center justify-center pointer-events-none opacity-100 overflow-hidden">
          <pre className={`text-[6px] leading-[5px] font-bold text-foreground whitespace-pre select-none text-center font-[family-name:monospace] scale-${Math.round(scale * 100) / 100}`.replace("scale-", "scale-[") + "]"}>
            <Renderer width={width} height={height} angle={angle}>
              {children}
            </Renderer>
          </pre>
        </div>
      </div>
    </div>
  );
};

const SceneContext = React.createContext<{
  registerLayer: (id: string, layer: GridLayer) => void;
  unregisterLayer: (id: string) => void;
} | null>(null);

const Renderer = ({ width, height, angle, children }: { width: number; height: number; angle: number; children: ReactNode }) => {
  const [layers, setLayers] = useState<Record<string, GridLayer>>({});

  // Use useCallback to stable reference for context value
  const registerLayer = useCallback((id: string, layer: GridLayer) => {
    setLayers((prev) => ({ ...prev, [id]: layer }));
  }, []);

  const unregisterLayer = useCallback((id: string) => {
    setLayers((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  // Memoize context value to prevent re-renders in consumers unless callbacks change
  const contextValue = useMemo(() => ({ registerLayer, unregisterLayer }), [registerLayer, unregisterLayer]);

  // Build frame
  let output = "";
  const layerIds = Object.keys(layers);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let char = " ";
      // Check layers in order (last one wins)
      for (const id of layerIds) {
        const layerChar = layers[id](x, y, width, height, angle);
        if (layerChar !== null) {
          char = layerChar;
        }
      }
      output += char;
    }
    output += "\n";
  }

  return (
    <SceneContext.Provider value={contextValue}>
      {children}
      {output}
    </SceneContext.Provider>
  );
};

// --- Child Components ---

export const Sun = ({ radius = 22, centerX, centerY, sphereChars = ["@", "%", "#", "*", "+", "=", "-", ":", ".", " "], highlightThreshold = 0.85 }: SunProps) => {
  const context = React.useContext(SceneContext);
  const id = React.useId();

  useEffect(() => {
    if (!context) return;

    const layer: GridLayer = (x, y, w, h, angle) => {
      const cx = centerX ?? w / 2;
      const cy = centerY ?? 24;

      // 1. Sun Sphere Logic
      const dx = x - cx;
      const dy = (y - cy) * 1.5;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const rad = (angle * Math.PI) / 180;
        const lightDir = {
          x: Math.sin(rad),
          y: Math.sin(rad + Math.PI / 4) * 0.5,
          z: Math.cos(rad),
        };

        // Sphere surface normal
        const z = Math.sqrt(radius * radius - dist * dist);
        const nx = dx / radius;
        const ny = dy / radius;
        const nz = z / radius;

        // Lighting calculation
        const illumination = nx * lightDir.x + ny * lightDir.y + nz * lightDir.z;

        if (illumination > highlightThreshold) {
          return " "; // Highlight
        } else {
          const textureIndex = Math.floor(((illumination + 1) / 2) * (sphereChars.length - 1));
          const charIndex = Math.max(0, Math.min(sphereChars.length - 1, textureIndex));
          return sphereChars[charIndex];
        }
      }
      return null; // Transparent
    };

    context.registerLayer(id, layer);
    return () => context.unregisterLayer(id);
  }, [context, id, radius, centerX, centerY, sphereChars, highlightThreshold]);

  return null;
};

export const Rays = ({ innerRadius = 22, centerX, centerY, numBeams = 24, beamWidthRatio = 0.2, density = 3, rotationSpeed = 1.0 }: RaysProps) => {
  const context = React.useContext(SceneContext);
  const id = React.useId();

  useEffect(() => {
    if (!context) return;

    const layer: GridLayer = (x, y, w, h, angle) => {
      const cx = centerX ?? w / 2;
      const cy = centerY ?? 24;
      const dx = x - cx;
      const dy = (y - cy) * 1.5;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= innerRadius) return null; // Don't draw over sun area (though Sun layer is usually on top)

      const rad = (angle * Math.PI) / 180;
      // Let's match previous logic:
      const rawAngle = Math.atan2(y - cy, x - cx);

      let normAngle = rawAngle - rad * rotationSpeed;
      while (normAngle < 0) normAngle += Math.PI * 2;
      normAngle = normAngle % (Math.PI * 2);

      const beamWidth = (Math.PI * 2) / numBeams;
      const beamOffset = normAngle % beamWidth;
      const inBeam = beamOffset < beamWidth * beamWidthRatio;

      // Full spread
      const isDownward = true;

      if (inBeam && isDownward) {
        const absCos = Math.abs(Math.cos(rawAngle));
        let rayChar = "|";
        if (absCos > 0.8) rayChar = "-";
        else if (absCos > 0.3) {
          rayChar = Math.cos(rawAngle) > 0 ? "\\" : "/";
        }

        if ((x + y) % density !== 0) {
          return rayChar;
        }
      }
      return null;
    };

    context.registerLayer(id, layer);
    return () => context.unregisterLayer(id);
  }, [context, id, innerRadius, centerX, centerY, numBeams, beamWidthRatio, density, rotationSpeed]);

  return null;
};

export const Halo = ({
  radius,
  width = 1,
  speed = 0.5,
  segments = 12,
  fillRatio = 0.6,
  char,
  centerX,
  centerY,
}: {
  radius: number;
  width?: number;
  speed?: number;
  segments?: number;
  fillRatio?: number;
  char?: string;
  centerX?: number;
  centerY?: number;
}) => {
  const context = React.useContext(SceneContext);
  const id = React.useId();

  useEffect(() => {
    if (!context) return;

    const layer: GridLayer = (x, y, w, h, angle) => {
      const cx = centerX ?? w / 2;
      const cy = centerY ?? 24;
      const dx = x - cx;
      const dy = (y - cy) * 1.5;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist >= radius && dist <= radius + width) {
        const rad = (angle * Math.PI) / 180;
        const rawAngle = Math.atan2(y - cy, x - cx);

        const segmentWidth = (Math.PI * 2) / segments;
        let haloAngle = rawAngle - rad * speed;
        while (haloAngle < 0) haloAngle += Math.PI * 2;
        haloAngle = haloAngle % (Math.PI * 2);

        const inSegment = haloAngle % segmentWidth < segmentWidth * fillRatio;

        if (inSegment) {
          if (char) return char;

          const absCos = Math.abs(Math.cos(rawAngle));
          if (absCos > 0.7) return "-";
          else if (absCos < 0.3) return "|";
          else return "/";
        }
      }
      return null;
    };

    context.registerLayer(id, layer);
    return () => context.unregisterLayer(id);
  }, [context, id, radius, width, speed, segments, fillRatio, char, centerX, centerY]);

  return null;
};

// --- Default Export ---

export default function Weather() {
  return (
    <AsciiScene width={100} height={160} scale={1.35}>
      {/* Render order matters! Last one is on top */}

      {/* Rays Background */}
      <Rays innerRadius={30} density={3} />

      {/* Outer Halo */}
      <Halo radius={28} width={1} speed={-0.3} segments={16} fillRatio={0.3} char="." />

      {/* Inner Halo */}
      <Halo radius={23} width={3} speed={0.5} segments={24} fillRatio={0.6} />

      {/* Sun Foreground */}
      <Sun radius={22} />
    </AsciiScene>
  );
}
