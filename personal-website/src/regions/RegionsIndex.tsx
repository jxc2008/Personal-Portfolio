import { REGIONS, t } from "./index";
import RegionTile from "./RegionTile";
import styles from "./RegionsIndex.module.css";

function listNames(names: string[]): string {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/** The home page map: one tile per region, in data order. */
export default function RegionsIndex() {
  const open = REGIONS.filter((r) => r.state === "open").map((r) => t(r.name));
  const charting = REGIONS.length - open.length;
  return (
    <section id="regions" className={styles.regions} aria-labelledby="regions-title">
      <div className={styles.head}>
        <h2 id="regions-title" className={styles.title}>
          The regions
        </h2>
        <p className={styles.intro}>
          Each region holds one part of my work.
          {open.length > 0 && ` ${listNames(open)} ${open.length === 1 ? "is" : "are"} open to explore.`}
          {charting > 0 && open.length > 0 && " The others are still being charted."}
        </p>
      </div>
      <ul className={styles.grid}>
        {REGIONS.map((r) => (
          <li key={r.slug}>
            <RegionTile region={r} />
          </li>
        ))}
      </ul>
    </section>
  );
}
