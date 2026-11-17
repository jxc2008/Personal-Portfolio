import { STAR_TWINKLE_GLSL } from "./effects/starTwinkle";
import { IMAGE_H, IMAGE_W, type ParallaxParams } from "./sceneMath";

const VERT = /* glsl */ `
attribute vec2 p;
varying vec2 vUv;
void main() { vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }
`;

// Ported from parallax-reference.html: depth displacement with one refinement
// step, depth gamma, cover-fit via uScale. Adds a two-texture crossfade for time
// of day and the night star twinkle.
const FRAG = /* glsl */ `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vUv;
uniform sampler2D uDepth, uImgA, uImgB;
uniform vec2 uMouse, uScale, uTexel;
uniform float uStrength, uFocus, uGamma, uMix, uTime;

vec3 scene(vec2 uv) {
  return mix(texture2D(uImgA, uv).rgb, texture2D(uImgB, uv).rgb, uMix);
}
float depthAt(vec2 uv) { return pow(texture2D(uDepth, uv).r, uGamma); }

${STAR_TWINKLE_GLSL}

void main() {
  vec2 uv = (vUv - 0.5) * uScale + 0.5;
  float d = depthAt(uv);
  vec2 off = uMouse * (d - uFocus) * uStrength;
  float d2 = depthAt(uv + off);                 // one refinement step reduces edge tearing
  off = uMouse * (mix(d, d2, 0.5) - uFocus) * uStrength;
  vec2 suv = uv + off;
  vec3 col = scene(suv);
  if (uTwinkle > 0.001) col = applyTwinkle(col, suv, d);
  gl_FragColor = vec4(col, 1.0);
}
`;

export interface RenderInput {
  pointer: [number, number];
  scale: [number, number];
  parallax: ParallaxParams;
  /** Texture keys bound as A and B. */
  a: string;
  b: string;
  mix: number;
  twinkle: number;
  time: number;
}

type Uniforms = Record<
  | "uDepth" | "uImgA" | "uImgB" | "uMouse" | "uScale" | "uTexel"
  | "uStrength" | "uFocus" | "uGamma" | "uMix" | "uTime" | "uTwinkle",
  WebGLUniformLocation | null
>;

/** Minimal WebGL1 renderer for the hero; owns its context and textures. */
export class DepthParallaxRenderer {
  readonly gl: WebGLRenderingContext;
  private prog: WebGLProgram;
  private buf: WebGLBuffer;
  private u: Uniforms;
  private textures = new Map<string, WebGLTexture>();
  private depth: WebGLTexture | null = null;

  /** Throws if WebGL is unavailable or the shader fails to build. */
  constructor(private canvas: HTMLCanvasElement) {
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: "default",
    });
    if (!gl) throw new Error("WebGL unavailable");
    this.gl = gl;

    const sh = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) throw new Error("createShader failed");
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || "shader compile failed");
      return s;
    };
    const prog = gl.createProgram();
    if (!prog) throw new Error("createProgram failed");
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) || "link failed");
    gl.useProgram(prog);
    this.prog = prog;

    const buf = gl.createBuffer();
    if (!buf) throw new Error("createBuffer failed");
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    this.buf = buf;

    const names = ["uDepth", "uImgA", "uImgB", "uMouse", "uScale", "uTexel", "uStrength", "uFocus", "uGamma", "uMix", "uTime", "uTwinkle"] as const;
    this.u = Object.fromEntries(names.map((n) => [n, gl.getUniformLocation(prog, n)])) as Uniforms;
    gl.uniform1i(this.u.uDepth, 0);
    gl.uniform1i(this.u.uImgA, 1);
    gl.uniform1i(this.u.uImgB, 2);
    gl.uniform2f(this.u.uTexel, 1 / IMAGE_W, 1 / IMAGE_H);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  }

  private upload(src: TexImageSource): WebGLTexture {
    const gl = this.gl;
    const t = gl.createTexture();
    if (!t) throw new Error("createTexture failed");
    gl.activeTexture(gl.TEXTURE3); // scratch unit, so bound units stay intact
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
    return t;
  }

  setDepth(src: TexImageSource) {
    if (this.depth) this.gl.deleteTexture(this.depth);
    this.depth = this.upload(src);
  }

  setImage(key: string, src: TexImageSource) {
    const old = this.textures.get(key);
    if (old) this.gl.deleteTexture(old);
    this.textures.set(key, this.upload(src));
  }

  hasImage(key: string) {
    return this.textures.has(key);
  }

  /** Free GPU memory for images no longer needed. */
  retainOnly(keys: Iterable<string>) {
    const keep = new Set(keys);
    this.textures.forEach((t, k) => {
      if (!keep.has(k)) {
        this.gl.deleteTexture(t);
        this.textures.delete(k);
      }
    });
  }

  resize(cssW: number, cssH: number, dpr: number) {
    const w = Math.max(1, Math.round(cssW * dpr));
    const h = Math.max(1, Math.round(cssH * dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    this.gl.viewport(0, 0, w, h);
  }

  /** Returns false if the textures it needs are not uploaded yet. */
  render(r: RenderInput): boolean {
    const gl = this.gl;
    const ta = this.textures.get(r.a);
    const tb = this.textures.get(r.b) ?? ta;
    if (!this.depth || !ta || !tb) return false;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.depth);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, ta);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, tb);
    gl.uniform2f(this.u.uScale, r.scale[0], r.scale[1]);
    gl.uniform2f(this.u.uMouse, r.pointer[0], r.pointer[1]);
    gl.uniform1f(this.u.uStrength, r.parallax.strength);
    gl.uniform1f(this.u.uFocus, r.parallax.focus);
    gl.uniform1f(this.u.uGamma, r.parallax.gamma);
    gl.uniform1f(this.u.uMix, tb === ta ? 0 : r.mix);
    gl.uniform1f(this.u.uTwinkle, r.twinkle);
    gl.uniform1f(this.u.uTime, r.time % 3600);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    return true;
  }

  dispose() {
    const gl = this.gl;
    this.textures.forEach((t) => gl.deleteTexture(t));
    this.textures.clear();
    if (this.depth) gl.deleteTexture(this.depth);
    gl.deleteBuffer(this.buf);
    gl.deleteProgram(this.prog);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  }
}
