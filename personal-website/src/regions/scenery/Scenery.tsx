// Banner art for each region, drawn as SVG from seeded geometry. Colours come
// from the region's CSS tokens (--s-*), so light and dark themes repaint them.
// Groups with --d move with the pointer (see RegionPage); deeper layers move more.

import { useId, type CSSProperties, type ReactNode } from "react";
import type { SceneryKey } from "../types";
import { polyline, prng, randomWalks, ridgeHeights, ridgeLine, ridgePath, threeBody, VIEW_H, VIEW_W } from "./geometry";
import styles from "./Scenery.module.css";

const depth = (d: number) => ({ ["--d" as string]: d }) as CSSProperties;
const fill = (v: string) => ({ fill: `var(${v})` });
const stroke = (v: string, width = 1) => ({ fill: "none", stroke: `var(${v})`, strokeWidth: width });

function useSvgId() {
  return useId().replace(/[^a-zA-Z0-9]/g, "");
}

/** `anchor` picks which side survives when a narrow frame (a phone, a tall tile) crops the scene. */
function Frame({ children, anchor = "xMid" }: { children: ReactNode; anchor?: "xMid" | "xMax" }) {
  return (
    <svg className={styles.svg} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio={`${anchor}YMax slice`} aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

// ─── VALORANT Ridge: layered ridgelines at altitude, strata on the near ridge ───
const RIDGES = [
  { seed: 11, base: 470, amp: 170, d: 2 },
  { seed: 23, base: 545, amp: 170, d: 4 },
  { seed: 37, base: 620, amp: 150, d: 7 },
  { seed: 41, base: 705, amp: 130, d: 11 },
  { seed: 53, base: 815, amp: 80, d: 16 },
].map((r) => ({ ...r, h: ridgeHeights(r.seed, r.base, r.amp) }));
const STARS = (() => {
  const rand = prng(7);
  return Array.from({ length: 70 }, () => ({ x: rand() * VIEW_W, y: rand() * 430, r: 0.6 + rand() * 1.3, o: 0.35 + rand() * 0.65 }));
})();

function Ridge() {
  const id = useSvgId();
  const near = RIDGES[3];
  return (
    <Frame>
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--s-sky-top)" }} />
          <stop offset="0.55" style={{ stopColor: "var(--s-sky-mid)" }} />
          <stop offset="1" style={{ stopColor: "var(--s-sky-low)" }} />
        </linearGradient>
        <radialGradient id={`${id}glow`} cx="0.72" cy="0.62" r="0.5">
          <stop offset="0" style={{ stopColor: "var(--s-glow)", stopOpacity: 0.85 }} />
          <stop offset="1" style={{ stopColor: "var(--s-glow)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={`${id}mist`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--s-mist)", stopOpacity: 0 }} />
          <stop offset="0.6" style={{ stopColor: "var(--s-mist)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--s-mist)", stopOpacity: 0 }} />
        </linearGradient>
        <clipPath id={`${id}near`}>
          <path d={ridgePath(near.h)} />
        </clipPath>
      </defs>
      <rect width={VIEW_W} height={VIEW_H} fill={`url(#${id}sky)`} />
      <g className={styles.stars}>
        {STARS.map((s, i) => (
          <circle key={i} cx={s.x.toFixed(1)} cy={s.y.toFixed(1)} r={s.r.toFixed(2)} style={{ ...fill("--s-star"), opacity: s.o }} />
        ))}
      </g>
      <rect width={VIEW_W} height={VIEW_H} fill={`url(#${id}glow)`} />
      {RIDGES.map((r, i) => (
        <g key={r.seed} className={styles.layer} style={depth(r.d)}>
          <path d={ridgePath(r.h)} style={fill(`--s-ridge-${i + 1}`)} />
          {i === 1 && <rect x={-48} y={560} width={VIEW_W + 96} height={170} fill={`url(#${id}mist)`} />}
          {i === 3 && (
            <g clipPath={`url(#${id}near)`}>
              {[18, 40, 66, 96, 130].map((dy) => (
                <path key={dy} d={ridgeLine(near.h, dy)} style={stroke("--s-contour", 1.2)} />
              ))}
            </g>
          )}
        </g>
      ))}
    </Frame>
  );
}

// ─── Trading Floor: a fan of price paths over ruled ledger paper on felt ───
const FAN: [number, number] = [760, 600];
const WALKS = randomWalks(5, 36, 80, FAN[0], FAN[1], 11, 9);
const REALISED = randomWalks(19, 1, 80, FAN[0], FAN[1], 11, 9)[0];

function Ledger() {
  const id = useSvgId();
  return (
    <Frame anchor="xMax">
      <defs>
        <linearGradient id={`${id}felt`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" style={{ stopColor: "var(--s-sky-top)" }} />
          <stop offset="1" style={{ stopColor: "var(--s-sky-low)" }} />
        </linearGradient>
        <pattern id={`${id}rule`} width="40" height="36" patternUnits="userSpaceOnUse">
          <path d="M0,35.5 H40" style={stroke("--s-contour", 1)} />
        </pattern>
      </defs>
      <rect width={VIEW_W} height={VIEW_H} fill={`url(#${id}felt)`} />
      <rect width={VIEW_W} height={VIEW_H} fill={`url(#${id}rule)`} />
      <path d="M140,0 V900" style={stroke("--s-contour", 1.5)} />
      <g className={styles.layer} style={depth(4)}>
        {WALKS.map((d, i) => (
          <path key={i} d={d} style={{ ...stroke("--s-ridge-2", 1.2), opacity: 0.5 }} />
        ))}
      </g>
      <g className={styles.layer} style={depth(8)}>
        <path d={REALISED} style={stroke("--s-glow", 2.6)} />
        <circle cx={FAN[0]} cy={FAN[1]} r={6} style={fill("--s-glow")} />
      </g>
    </Frame>
  );
}

// ─── Piano Hall: a lit stage and the long edge of a keyboard ───
const KEY_W = VIEW_W / 52;
const BLACK = [1, 1, 0, 1, 1, 1, 0]; // black key after each white key, C to B
const MOTES = (() => {
  const rand = prng(3);
  return Array.from({ length: 40 }, () => ({ x: 560 + rand() * 520, y: 80 + rand() * 520, r: 0.8 + rand() * 1.8, o: 0.25 + rand() * 0.6 }));
})();

function Hall() {
  const id = useSvgId();
  return (
    <Frame>
      <defs>
        <linearGradient id={`${id}hall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--s-sky-top)" }} />
          <stop offset="1" style={{ stopColor: "var(--s-sky-low)" }} />
        </linearGradient>
        <linearGradient id={`${id}beam`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--s-glow)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--s-glow)", stopOpacity: 0.04 }} />
        </linearGradient>
      </defs>
      <rect width={VIEW_W} height={VIEW_H} fill={`url(#${id}hall)`} />
      <g className={styles.layer} style={depth(3)}>
        <polygon points="760,0 840,0 1180,720 420,720" fill={`url(#${id}beam)`} />
        {MOTES.map((m, i) => (
          <circle key={i} cx={m.x.toFixed(1)} cy={m.y.toFixed(1)} r={m.r.toFixed(2)} style={{ ...fill("--s-glow"), opacity: m.o }} />
        ))}
      </g>
      <g className={styles.layer} style={depth(9)}>
        <rect x={-48} y={690} width={VIEW_W + 96} height={210} style={fill("--s-ridge-4")} />
        {Array.from({ length: 52 }, (_, i) => (
          <rect key={i} x={i * KEY_W + 1} y={720} width={KEY_W - 2} height={180} rx={3} style={fill("--s-ridge-1")} />
        ))}
        {Array.from({ length: 51 }, (_, i) =>
          BLACK[i % 7] ? (
            <rect key={i} x={(i + 1) * KEY_W - KEY_W * 0.3} y={720} width={KEY_W * 0.6} height={108} rx={2} style={fill("--s-ridge-5")} />
          ) : null,
        )}
      </g>
    </Frame>
  );
}

// ─── Far Shore: a sun on the horizon over rows of waves ───
const ISLAND = ridgeHeights(71, 505, 60, 6);
const SUN_X = 1190; // far enough right to stay whole on a phone-width crop

function Shore() {
  const id = useSvgId();
  return (
    <Frame anchor="xMax">
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--s-sky-top)" }} />
          <stop offset="1" style={{ stopColor: "var(--s-sky-low)" }} />
        </linearGradient>
        <pattern id={`${id}waves`} width="80" height="40" patternUnits="userSpaceOnUse">
          {[36, 26, 16].map((r) => (
            <g key={r}>
              <path d={`M${40 - r},40 A${r},${r} 0 0 1 ${40 + r},40`} style={stroke("--s-contour", 1.4)} />
              <path d={`M${-r},20 A${r},${r} 0 0 1 ${r},20 M${80 - r},20 A${r},${r} 0 0 1 ${80 + r},20`} style={stroke("--s-contour", 1.4)} />
            </g>
          ))}
        </pattern>
      </defs>
      <rect width={VIEW_W} height={VIEW_H} fill={`url(#${id}sky)`} />
      <g className={styles.layer} style={depth(2)}>
        <circle cx={SUN_X} cy={470} r={96} style={fill("--s-glow")} />
      </g>
      <g className={styles.layer} style={depth(4)}>
        <path d={`M0,560 ${ridgeLine(ISLAND, 0, 360, 0).replace("M", "L")} L360,560 Z`} transform="translate(1320 0)" style={fill("--s-ridge-2")} />
      </g>
      <g className={styles.layer} style={depth(8)}>
        <rect x={-48} y={560} width={VIEW_W + 96} height={340} style={fill("--s-ridge-4")} />
        <rect x={-48} y={560} width={VIEW_W + 96} height={340} fill={`url(#${id}waves)`} />
        {[0, 1, 2, 3].map((k) => (
          <rect key={k} x={SUN_X - 70 + k * 12} y={584 + k * 26} width={140 - k * 24} height={5} rx={2.5} style={{ ...fill("--s-glow"), opacity: 0.7 - k * 0.14 }} />
        ))}
      </g>
    </Frame>
  );
}

// ─── The Lab: the figure-eight three-body orbit on blueprint grid ───
const ORBIT = threeBody(1);
const DRIFT = threeBody(3.2, 0.012);
const ORBIT_C: [number, number, number] = [1160, 470, 355];

function Orbits() {
  const id = useSvgId();
  const [cx, cy, s] = ORBIT_C;
  const bodies = [0, 1, 2].map((i) => ORBIT[i][0]);
  return (
    <Frame anchor="xMax">
      <defs>
        <pattern id={`${id}grid`} width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M0,0.5 H100 M0.5,0 V100" style={stroke("--s-contour", 1.2)} />
          <path d="M0,20.5 H100 M0,40.5 H100 M0,60.5 H100 M0,80.5 H100 M20.5,0 V100 M40.5,0 V100 M60.5,0 V100 M80.5,0 V100" style={{ ...stroke("--s-contour", 0.6), opacity: 0.5 }} />
        </pattern>
      </defs>
      <rect width={VIEW_W} height={VIEW_H} style={fill("--s-sky-top")} />
      <rect width={VIEW_W} height={VIEW_H} fill={`url(#${id}grid)`} />
      <g className={styles.layer} style={depth(4)}>
        {DRIFT.map((trail, i) => (
          <path key={i} d={polyline(trail, cx, cy, s)} style={{ ...stroke("--s-ridge-2", 1), opacity: 0.45 }} />
        ))}
      </g>
      <g className={styles.layer} style={depth(7)}>
        <path d={polyline(ORBIT[0], cx, cy, s)} style={stroke("--s-glow", 2.2)} />
        {bodies.map(([x, y], i) => (
          <circle key={i} cx={(cx + x * s).toFixed(1)} cy={(cy - y * s).toFixed(1)} r={11} style={fill("--s-glow")} />
        ))}
      </g>
    </Frame>
  );
}

const SCENES: Record<SceneryKey, () => JSX.Element> = { ridge: Ridge, ledger: Ledger, hall: Hall, shore: Shore, orbits: Orbits };

export default function Scenery({ kind }: { kind: SceneryKey }) {
  const Scene = SCENES[kind];
  return <Scene />;
}
