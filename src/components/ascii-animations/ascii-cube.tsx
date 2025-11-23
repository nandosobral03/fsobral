"use client";

import { useState, useEffect } from "react";

export default function AsciiCube() {
  const [output, setOutput] = useState("");

  useEffect(() => {
    let angleX = 0;
    let angleY = 0;
    let animationId: number;
    let lastFrameTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const width = 80;
    const height = 60;
    const cubeSize = 25;
    // Aspect ratio correction for characters (height is usually larger than width)
    const yAspect = 1.5;

    // Light direction (normalized)
    const lightDir = { x: 0.5, y: -0.5, z: 1.0 };
    const len = Math.sqrt(lightDir.x * lightDir.x + lightDir.y * lightDir.y + lightDir.z * lightDir.z);
    const lx = lightDir.x / len;
    const ly = lightDir.y / len;
    const lz = lightDir.z / len;

    const shadeChars = ["@", "%", "#", "*", "+", "=", "-", ":", ".", " "];

    const renderFrame = (timestamp: number) => {
      if (timestamp - lastFrameTime >= frameInterval) {
        lastFrameTime = timestamp;

        angleX = (angleX + 1.5) % 360;
        angleY = (angleY + 1.0) % 360;

        const radX = (angleX * Math.PI) / 180;
        const radY = (angleY * Math.PI) / 180;
        const cx = Math.cos(radX);
        const sx = Math.sin(radX);
        const cy = Math.cos(radY);
        const sy = Math.sin(radY);

        // We define the rotation matrix M that transforms World -> Local Cube Space.
        // Ray Origin in World: (nx, ny, 0)
        // Ray Direction in World: (0, 0, 1)
        // Local = Rx^T * Ry^T * World
        // M = Rx^T * Ry^T

        // Columns of Ry^T are [cy, 0, sy], [0, 1, 0], [-sy, 0, cy]
        // M * Col0 = Rx^T * [cy, 0, sy]^T = [cy, sx*sy, cx*sy]^T
        const m00 = cy;
        const m10 = sx * sy;
        const m20 = cx * sy;

        // M * Col1 = Rx^T * [0, 1, 0]^T = [0, cx, -sx]^T
        const m01 = 0;
        const m11 = cx;
        const m21 = -sx;

        // M * Col2 = Rx^T * [-sy, 0, cy]^T = [-sy, sx*cy, cx*cy]^T
        // This is also the transformed Ray Direction (since world dir is 0,0,1)
        const m02 = -sy;
        const m12 = sx * cy;
        const m22 = cx * cy;

        // Ray Direction in Local Space
        const rdx = m02;
        const rdy = m12;
        const rdz = m22;

        // Inverse direction for Slab intersection (handle near-zero)
        const eps = 1e-9;
        const invRdx = 1.0 / (Math.abs(rdx) < eps ? eps : rdx);
        const invRdy = 1.0 / (Math.abs(rdy) < eps ? eps : rdy);
        const invRdz = 1.0 / (Math.abs(rdz) < eps ? eps : rdz);

        let frameOutput = "";

        for (let y = 0; y < height; y++) {
          // Normalized screen coordinates centered at (0,0)
          const ny = ((y - height / 2) * yAspect) / cubeSize;

          for (let x = 0; x < width; x++) {
            const nx = (x - width / 2) / cubeSize;

            // Ray Origin in Local Space: M * (nx, ny, 0)
            const rox = nx * m00 + ny * m01;
            const roy = nx * m10 + ny * m11;
            const roz = nx * m20 + ny * m21;

            // Slab Intersection with Unit Cube [-1, 1]
            // Check X slabs
            let t1 = (-1 - rox) * invRdx;
            let t2 = (1 - rox) * invRdx;
            let tMin = Math.min(t1, t2);
            let tMax = Math.max(t1, t2);

            // Check Y slabs
            t1 = (-1 - roy) * invRdy;
            t2 = (1 - roy) * invRdy;
            tMin = Math.max(tMin, Math.min(t1, t2));
            tMax = Math.min(tMax, Math.max(t1, t2));

            // Check Z slabs
            t1 = (-1 - roz) * invRdz;
            t2 = (1 - roz) * invRdz;
            tMin = Math.max(tMin, Math.min(t1, t2));
            tMax = Math.min(tMax, Math.max(t1, t2));

            if (tMin < tMax) {
              // Intersection found. We want the closest face to the camera.
              // Since ray is (0,0,1) (towards +Z), and viewer is "at +infinity" looking back?
              // Actually, with (0,0,1) direction, t corresponds to World Z.
              // Standard painter's algorithm: draw object with largest Z last?
              // Or if we just want the surface "in front" for an orthographic projection:
              // If we look from +Z towards -Z, we see the face with MAX Z.
              // So we take t = tMax.
              const t = tMax;

              // Intersection point in Local Space
              const ix = rox + t * rdx;
              const iy = roy + t * rdy;
              const iz = roz + t * rdz;

              // Determine normal based on which face was hit (closest to +/- 1)
              const ax = Math.abs(ix);
              const ay = Math.abs(iy);
              const az = Math.abs(iz);

              let nxLoc = 0,
                nyLoc = 0,
                nzLoc = 0;
              if (ax > ay && ax > az) nxLoc = Math.sign(ix);
              else if (ay > az) nyLoc = Math.sign(iy);
              else nzLoc = Math.sign(iz);

              // Transform Normal to World: N_w = M^T * N_loc
              // M^T rows are columns of M:
              // Row0: m00, m10, m20
              // Row1: m01, m11, m21
              // Row2: m02, m12, m22
              const nwx = m00 * nxLoc + m10 * nyLoc + m20 * nzLoc;
              const nwy = m01 * nxLoc + m11 * nyLoc + m21 * nzLoc;
              const nwz = m02 * nxLoc + m12 * nyLoc + m22 * nzLoc;

              // Calculate illumination (Dot product with Light Dir)
              const dot = nwx * lx + nwy * ly + nwz * lz;

              if (dot > 0.9) {
                frameOutput += " ";
              } else {
                // Map [-1, 1] to texture index
                // 1 (bright) -> index 9 (space)
                // -1 (dark) -> index 0 (@)
                const val = (dot + 1) / 2;
                const idx = Math.floor(val * (shadeChars.length - 1));
                frameOutput += shadeChars[Math.max(0, Math.min(shadeChars.length - 1, idx))];
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
