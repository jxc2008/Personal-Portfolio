import Link from "next/link";
import { paletteVars, t } from "./index";
import { REGION_FONT } from "./fonts";
import RegionArt from "./scenery/RegionArt";
import type { Region } from "./types";
import themes from "./themes.module.css";
import styles from "./RegionTile.module.css";

/** A window onto a region: its scenery, name and one line. Used on the home page and in the travel strip. */
export default function RegionTile({ region, size = "tall" }: { region: Region; size?: "tall" | "wide" }) {
  return (
    <Link
      href={`/regions/${region.slug}`}
      className={`${themes.theme} ${REGION_FONT[region.slug]} ${styles.tile} ${styles[size]}`}
      data-region={region.slug}
      style={paletteVars(region)}
    >
      <span className={styles.art}>
        <RegionArt region={region} variant="tile" />
      </span>
      {/* A grid sibling of the art rather than a child, so it can overlay the art or,
          on small phone tiles, sit below it. */}
      <span className={styles.name} data-part="name">
        {t(region.name)}
      </span>
      <span className={styles.short}>{t(region.short)}</span>
      <span className={styles.state}>{region.state === "open" ? "Open" : "Being charted"}</span>
    </Link>
  );
}
