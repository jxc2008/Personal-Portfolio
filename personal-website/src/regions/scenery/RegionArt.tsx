"use client";

// A region's banner and tile art: its key art image when it has one, laid over
// the drawn scenery. The scenery shows while the image loads and stays if the
// image fails, so a missing or broken file never leaves a blank banner.

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { KeyArt, Region } from "../types";
import Scenery from "./Scenery";
import styles from "./Scenery.module.css";

/** "banner" loads first and shades behind the region's title and lede; "tile" lazy-loads and shades behind the name. */

/** A hole is fully clear out to this multiple of the box's half-size (past its corners)... */
const HOLE_CLEAR = 1.5;
/** ...then feathers back to full darkening by this multiple, so it has no visible edge. */
const HOLE_EDGE = 2.4;

/**
 * A mask for the darkening layer with a soft hole over each `unshaded` keep-clear box, so
 * those parts of the art keep their original colour. Each hole is a gradient in the
 * image's own coordinates (percentages of the full image), and the mask is sized and
 * placed over the image's cover-cropped rectangle with mask-size/mask-position (--iw/--ih
 * in Scenery.module.css, from the art container's size), so it follows the subject at
 * every size. Container units stay out of the gradient itself: Chrome resolves them
 * against the viewport inside mask images.
 */
function unshadedMask(art: KeyArt): CSSProperties | undefined {
  const holes = art.keepClear?.filter((b) => b.unshaded) ?? [];
  if (holes.length === 0) return undefined;
  const [px, py] = art.focus.split(" ").map((v) => parseFloat(v) / 100);
  const clearAt = Math.round((HOLE_CLEAR / HOLE_EDGE) * 100);
  const pct = (v: number) => `${(v * 100).toFixed(2)}%`;
  const image = holes
    .map((b) => {
      const cx = (b.x[0] + b.x[1]) / 2;
      const cy = (b.y[0] + b.y[1]) / 2;
      const rx = ((b.x[1] - b.x[0]) / 2) * HOLE_EDGE;
      const ry = ((b.y[1] - b.y[0]) / 2) * HOLE_EDGE;
      return `radial-gradient(ellipse ${pct(rx)} ${pct(ry)} at ${pct(cx)} ${pct(cy)}, transparent ${clearAt}%, #000 100%)`;
    })
    .join(", ");
  const each = (v: string) => holes.map(() => v).join(", ");
  const size = each("var(--iw) var(--ih)");
  const position = each(`calc((100cqw - var(--iw)) * ${px}) calc((100cqh - var(--ih)) * ${py})`);
  const many = holes.length > 1;
  return {
    ["--art-ar" as string]: art.aspect ?? 16 / 9,
    WebkitMaskImage: image,
    maskImage: image,
    WebkitMaskSize: size,
    maskSize: size,
    WebkitMaskPosition: position,
    maskPosition: position,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    ...(many ? { WebkitMaskComposite: "source-in", maskComposite: "intersect" } : {}),
  };
}
export type ArtVariant = "banner" | "tile";

export default function RegionArt({ region, variant, onFail }: { region: Region; variant: ArtVariant; onFail?: () => void }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const banner = variant === "banner";

  useEffect(() => {
    // An image that failed before hydration never reaches onError; ask the element instead.
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  useEffect(() => {
    if (failed) onFail?.();
  }, [failed, onFail]);

  const showArt = Boolean(region.art) && !failed;
  return (
    <>
      <Scenery kind={region.scenery} />
      {showArt && region.art && (
        <>
          {/* Plain <img>: object-fit/object-position does the framing, and the file is already a sized WebP. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            className={styles.photo}
            src={region.art.src}
            alt=""
            aria-hidden="true"
            style={{ objectPosition: region.art.focus }}
            loading={banner ? "eager" : "lazy"}
            decoding="async"
            // @ts-expect-error -- React 18.2 types lack fetchPriority; the attribute is valid HTML.
            fetchpriority={banner ? "high" : undefined}
            onError={() => setFailed(true)}
            data-testid="region-key-art"
          />
          {/* Only over key art: the drawn scenery is painted to sit behind text already. */}
          <span
            className={styles.scrim}
            data-variant={variant}
            aria-hidden="true"
            data-testid="region-art-scrim"
            style={unshadedMask(region.art)}
          />
        </>
      )}
    </>
  );
}
