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
uniform float u_charCount;

// Hash for per-cell dithering noise
float hash21(vec2 p) {
  p = fract(p * vec2(233.34, 851.73));
  p += dot(p, p + 23.45);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;

  // ASCII grid cell size in pixels
  float cellSize = min(u_resolution.x, u_resolution.y) / 140.0;
  vec2 cell = floor(gl_FragCoord.xy / cellSize);
  vec2 cellUV = fract(gl_FragCoord.xy / cellSize);

  // Sphere center of cell
  vec2 cellCenter = (cell + 0.5) * cellSize;
  vec2 centered = (cellCenter - u_resolution * 0.5) / min(u_resolution.x, u_resolution.y);

  float r = 0.42;
  float dist = length(centered);

  if (dist > r) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    return;
  }

  // Sphere normal
  float z = sqrt(r * r - dist * dist);
  vec3 normal = normalize(vec3(centered, z));

  // Rotating key light
  float angle = u_time * 0.6;
  vec3 keyLight = normalize(vec3(sin(angle), 0.3, cos(angle)));

  // Classic diffuse with half-Lambert wrap for smoother gradient
  float diffuse = dot(normal, keyLight);
  float halfLambert = diffuse * 0.5 + 0.5;

  // Rim darkening — edges get denser characters for sphere volume
  float facing = max(dot(normal, vec3(0.0, 0.0, 1.0)), 0.0);
  float rimDark = pow(1.0 - facing, 2.0) * 0.4;

  // Invert: shadow side = high brightness (dense @#%), lit side = low (sparse .-)
  float brightness = 1.0 - halfLambert + rimDark;
  brightness = clamp(brightness, 0.15, 0.95);

  // Dither: per-cell noise to break up banding between character levels
  float noise = (hash21(cell + floor(u_time * 2.0)) - 0.5) * (1.0 / u_charCount);
  brightness = clamp(brightness + noise, 0.0, 1.0);

  // Pick character from atlas based on brightness
  float charIdx = floor(brightness * (u_charCount - 1.0));
  charIdx = clamp(charIdx, 0.0, u_charCount - 1.0);

  // Sample the atlas: x maps across chars, y is within the char
  float atlasX = (charIdx + cellUV.x) / u_charCount;
  float atlasY = 1.0 - cellUV.y;
  float charAlpha = texture2D(u_charAtlas, vec2(atlasX, atlasY)).r;

  // Foreground color: #171717
  vec3 fgColor = vec3(0.09, 0.09, 0.09);

  gl_FragColor = vec4(fgColor, charAlpha);
}
`;

export default function AsciiSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    // Compile shaders
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, VERT);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, FRAG);
    gl.compileShader(fs);

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Fullscreen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Create character atlas texture
    const atlasCanvas = createCharAtlas();
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlasCanvas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uCharCount = gl.getUniformLocation(program, "u_charCount");
    const uCharAtlas = gl.getUniformLocation(program, "u_charAtlas");

    gl.uniform1f(uCharCount, CHARS.length);
    gl.uniform1i(uCharAtlas, 0);

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
      const t = (performance.now() - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      gl.deleteTexture(tex);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full select-none" />;
}
