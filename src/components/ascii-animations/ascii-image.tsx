"use client";

import { useRef, useEffect } from "react";

const CHARS = " .:-=+*#%@";

function createCharAtlas(): HTMLCanvasElement {
  const size = 64;
  const cols = CHARS.length;
  const canvas = document.createElement("canvas");
  canvas.width = size * cols;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = `bold ${size * 0.85}px ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let i = 0; i < cols; i++) {
    ctx.fillText(CHARS[i], i * size + size / 2, size / 2);
  }

  return canvas;
}

const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_charAtlas;
uniform sampler2D u_image;
uniform float u_charCount;
uniform float u_opacity;
uniform float u_density;
uniform vec2 u_imageSize;
uniform float u_rotate;

float hash21(vec2 p) {
  p = fract(p * vec2(233.34, 851.73));
  p += dot(p, p + 23.45);
  return fract(p.x * p.y);
}

void main() {
  // ASCII grid cell size based on density
  float cellSize = min(u_resolution.x, u_resolution.y) / u_density;
  vec2 cell = floor(gl_FragCoord.xy / cellSize);
  vec2 cellUV = fract(gl_FragCoord.xy / cellSize);

  // Map cell to image UV with aspect-ratio-aware fitting
  vec2 totalCells = floor(u_resolution / cellSize);
  vec2 cellCenter = (cell + 0.5) / totalCells;

  // Compute aspect ratios
  float canvasAspect = u_resolution.x / u_resolution.y;
  float imageAspect = u_imageSize.x / u_imageSize.y;

  // Fit image within canvas (cover)
  vec2 imageUV;
  if (canvasAspect > imageAspect) {
    // Canvas is wider — fit to width, crop height
    float scale = imageAspect / canvasAspect;
    imageUV.x = cellCenter.x;
    imageUV.y = (cellCenter.y - 0.5) * scale + 0.5;
  } else {
    // Canvas is taller — fit to height, crop width
    float scale = canvasAspect / imageAspect;
    imageUV.x = (cellCenter.x - 0.5) * scale + 0.5;
    imageUV.y = cellCenter.y;
  }

  // Discard cells outside image bounds
  if (imageUV.x < 0.0 || imageUV.x > 1.0 || imageUV.y < 0.0 || imageUV.y > 1.0) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    return;
  }

  // Apply rotation around center if angle is set
  if (abs(u_rotate) > 0.01) {
    float cosR = cos(u_rotate);
    float sinR = sin(u_rotate);
    float imgAspect = u_imageSize.x / u_imageSize.y;
    // Scale up so rotated image still covers the viewport
    float coverScale = abs(cosR) + abs(sinR);
    // Convert to aspect-correct space so rotation doesn't warp
    vec2 centered = imageUV - 0.5;
    centered.x *= imgAspect;
    centered *= coverScale;
    vec2 rotated = vec2(
      centered.x * cosR + centered.y * sinR,
      -centered.x * sinR + centered.y * cosR
    );
    rotated.x /= imgAspect;
    imageUV = rotated + 0.5;
  }

  // Re-check bounds after rotation
  if (imageUV.x < 0.0 || imageUV.x > 1.0 || imageUV.y < 0.0 || imageUV.y > 1.0) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    return;
  }

  // Sample image (flip Y since WebGL origin is bottom-left)
  vec4 texColor = texture2D(u_image, vec2(imageUV.x, 1.0 - imageUV.y));

  // Convert to grayscale using luminance weights
  float brightness = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

  // Invert: dark areas of image → dense chars (@#%), light areas → sparse (. :)
  brightness = 1.0 - brightness;

  // Boost contrast so mid-tones (skin) use denser characters
  brightness = smoothstep(0.0, 0.7, brightness);
  brightness = pow(brightness, 0.6);

  // Dithering noise — temporal + spatial layers, scaled by darkness
  float timeBase = u_time * 0.4;
  float t = fract(timeBase);
  t = t * t * (3.0 - 2.0 * t);
  float n1 = hash21(cell + floor(timeBase));
  float n2 = hash21(cell + floor(timeBase) + 1.0);
  float temporalNoise = (mix(n1, n2, t) - 0.5) * (3.0 / u_charCount);

  float spatialNoise = (hash21(cell * 1.73 + 0.5) - 0.5) * (1.5 / u_charCount);

  // Only dither where there's actual darkness — light areas stay clean
  float ditherMask = smoothstep(0.05, 0.3, brightness);
  brightness = clamp(brightness + (temporalNoise + spatialNoise) * ditherMask, 0.0, 1.0);

  // Pick character from atlas
  float charIdx = floor(brightness * (u_charCount - 1.0));
  charIdx = clamp(charIdx, 0.0, u_charCount - 1.0);

  float atlasX = (charIdx + cellUV.x) / u_charCount;
  float atlasY = 1.0 - cellUV.y;
  float charAlpha = texture2D(u_charAtlas, vec2(atlasX, atlasY)).r;

  // Foreground color: #171717
  vec3 fgColor = vec3(0.09, 0.09, 0.09);

  gl_FragColor = vec4(fgColor, charAlpha * u_opacity);
}
`;

interface AsciiImageProps {
  src: string;
  opacity?: number;
  density?: number;
  className?: string;
  /** Rotation angle in degrees */
  rotateAngle?: number;
}

export default function AsciiImage({
  src,
  opacity = 0.08,
  density = 120,
  className,
  rotateAngle = 0,
}: AsciiImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    // Load image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      // Compile shaders
      const vs = gl.createShader(gl.VERTEX_SHADER)!;
      gl.shaderSource(vs, VERT);
      gl.compileShader(vs);
      if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        console.error("AsciiImage vertex shader error:", gl.getShaderInfoLog(vs));
        return;
      }

      const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
      gl.shaderSource(fs, FRAG);
      gl.compileShader(fs);
      if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        console.error("AsciiImage fragment shader error:", gl.getShaderInfoLog(fs));
        return;
      }

      const program = gl.createProgram()!;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("AsciiImage program link error:", gl.getProgramInfoLog(program));
        return;
      }
      gl.useProgram(program);

      // Fullscreen quad
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW
      );

      const aPos = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      // Character atlas texture (unit 0)
      const atlasCanvas = createCharAtlas();
      const atlasTex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, atlasTex);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        atlasCanvas
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      // Image texture (unit 1)
      const imageTex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, imageTex);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        img
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      // Set uniforms
      const uTime = gl.getUniformLocation(program, "u_time");
      const uRes = gl.getUniformLocation(program, "u_resolution");
      const uCharCount = gl.getUniformLocation(program, "u_charCount");
      const uCharAtlas = gl.getUniformLocation(program, "u_charAtlas");
      const uImage = gl.getUniformLocation(program, "u_image");
      const uOpacity = gl.getUniformLocation(program, "u_opacity");
      const uDensity = gl.getUniformLocation(program, "u_density");
      const uImageSize = gl.getUniformLocation(program, "u_imageSize");

      const uRotate = gl.getUniformLocation(program, "u_rotate");

      gl.uniform1f(uCharCount, CHARS.length);
      gl.uniform1i(uCharAtlas, 0);
      gl.uniform1i(uImage, 1);
      gl.uniform1f(uOpacity, opacity);
      gl.uniform1f(uDensity, density);
      gl.uniform1f(uRotate, (rotateAngle * Math.PI) / 180);
      gl.uniform2f(uImageSize, img.naturalWidth, img.naturalHeight);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      };

      resize();
      const observer = new ResizeObserver(resize);
      observer.observe(canvas);

      const start = performance.now();
      const render = () => {
        // Skip rendering when hidden (e.g. CSS display:none at breakpoints)
        if (canvas.offsetParent === null) {
          rafRef.current = requestAnimationFrame(render);
          return;
        }
        const t = (performance.now() - start) / 1000;
        gl.uniform1f(uTime, t);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        rafRef.current = requestAnimationFrame(render);
      };

      rafRef.current = requestAnimationFrame(render);

      // Cleanup stored for unmount
      canvas.dataset.cleanup = "true";
      const cleanup = () => {
        cancelAnimationFrame(rafRef.current);
        observer.disconnect();
        gl.deleteTexture(atlasTex);
        gl.deleteTexture(imageTex);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(buf);
      };

      // Store cleanup on the ref for the effect's return
      (canvas as unknown as { _cleanup: () => void })._cleanup = cleanup;
    };

    return () => {
      cancelAnimationFrame(rafRef.current);
      const c = canvas as unknown as { _cleanup?: () => void };
      c._cleanup?.();
    };
  }, [src, opacity, density, rotateAngle]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "w-full h-full select-none"}
    />
  );
}
