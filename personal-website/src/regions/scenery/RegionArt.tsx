"use client";

// A region's banner and tile art: its key art image when it has one, laid over
// the drawn scenery. The scenery shows while the image loads and stays if the
// image fails, so a missing or broken file never leaves a blank banner.

import { useEffect, useRef, useState } from "react";
import type { Region } from "../types";
import Scenery from "./Scenery";
import styles from "./Scenery.module.css";

export default function RegionArt({ region, priority = false }: { region: Region; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // An image that failed before hydration never reaches onError; ask the element instead.
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <>
      <Scenery kind={region.scenery} />
      {region.art && !failed && (
        // Plain <img>: object-fit/object-position does the framing, and the file is already a sized WebP.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          className={styles.photo}
          src={region.art.src}
          alt=""
          aria-hidden="true"
          style={{ objectPosition: region.art.focus }}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          // @ts-expect-error -- React 18.2 types lack fetchPriority; the attribute is valid HTML.
          fetchpriority={priority ? "high" : undefined}
          onError={() => setFailed(true)}
          data-testid="region-key-art"
        />
      )}
    </>
  );
}
