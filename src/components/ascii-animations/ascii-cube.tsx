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

float hash21(vec2 p) {
  p = fract(p * vec2(233.34, 851.73));
  p += dot(p, p + 23.45);
  return fract(p.x * p.y);
}

mat3 rotY(float a) { float c=cos(a),s=sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }
mat3 rotX(float a) { float c=cos(a),s=sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }

vec2 iBox(vec3 ro, vec3 rd, vec3 b) {
  vec3 m = 1.0 / rd;
  vec3 n = m * ro;
  vec3 k = abs(m) * b;
  vec3 t1 = -n - k;
  vec3 t2 = -n + k;
  float tN = max(max(t1.x, t1.y), t1.z);
  float tF = min(min(t2.x, t2.y), t2.z);
  if (tN > tF || tF < 0.0) return vec2(-1.0);
  return vec2(tN, tF);
}

vec3 boxNormal(vec3 p, vec3 b) {
  vec3 d = abs(p) - b;
  vec3 s = sign(p);
  if (d.x > d.y && d.x > d.z) return vec3(s.x, 0.0, 0.0);
  if (d.y > d.z) return vec3(0.0, s.y, 0.0);
  return vec3(0.0, 0.0, s.z);
}

mat3 transp(mat3 m) {
  return mat3(
    m[0][0], m[1][0], m[2][0],
    m[0][1], m[1][1], m[2][1],
    m[0][2], m[1][2], m[2][2]
  );
}

void main() {
  float cellSize = min(u_resolution.x, u_resolution.y) / 280.0;
  vec2 cell = floor(gl_FragCoord.xy / cellSize);
  vec2 cellUV = fract(gl_FragCoord.xy / cellSize);

  vec2 cc = (cell + 0.5) * cellSize;
  vec2 p = (cc - u_resolution * 0.5) / min(u_resolution.x, u_resolution.y);

  // Orthographic ray looking along -Z
  vec3 ro = vec3(p, 2.0);
  vec3 rd = vec3(0.0, 0.0, -1.0);

  // Rotate ray into cube local space
  mat3 rot = rotX(u_time * 0.35) * rotY(u_time * 0.5);
  vec3 lro = rot * ro;
  vec3 lrd = rot * rd;

  vec3 b = vec3(0.32);
  vec2 t = iBox(lro, lrd, b);

  if (t.x < 0.0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  vec3 hit = lro + lrd * t.x;
  vec3 nLocal = boxNormal(hit, b);
  vec3 n = transp(rot) * nLocal;

  // Rotating key light
  float angle = u_time * 0.6;
  vec3 keyLight = normalize(vec3(sin(angle), 0.3, cos(angle)));

  float diffuse = dot(n, keyLight);
  float halfLambert = diffuse * 0.5 + 0.5;

  // Edge darkening — darken near cube edges for definition
  vec3 absHit = abs(hit) / b;
  float second = max(min(absHit.x, absHit.y), min(max(absHit.x, absHit.y), absHit.z));
  float edgeFactor = smoothstep(0.92, 1.0, second) * 0.25;

  // Rim darkening
  float facing = max(dot(n, vec3(0.0, 0.0, 1.0)), 0.0);
  float rimDark = pow(1.0 - facing, 2.0) * 0.35;

  float brightness = 1.0 - halfLambert + rimDark + edgeFactor;
  brightness = clamp(brightness, 0.05, 0.95);

  // Dither
  float noise = (hash21(cell + floor(u_time * 2.0)) - 0.5) * (1.0 / u_charCount);
  brightness = clamp(brightness + noise, 0.0, 1.0);

  float charIdx = floor(brightness * (u_charCount - 1.0));
  charIdx = clamp(charIdx, 0.0, u_charCount - 1.0);

  float atlasX = (charIdx + cellUV.x) / u_charCount;
  float atlasY = 1.0 - cellUV.y;
  float charAlpha = texture2D(u_charAtlas, vec2(atlasX, atlasY)).r;

  vec3 fgColor = vec3(0.09, 0.09, 0.09);
  gl_FragColor = vec4(fgColor, charAlpha);
}
`;

export default function AsciiCube() {
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

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const aPos = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const atlasCanvas = createCharAtlas();
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      atlasCanvas,
    );
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
