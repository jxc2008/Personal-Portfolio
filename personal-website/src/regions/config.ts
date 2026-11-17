// Values that go stale. Update them here and nowhere else.

/**
 * The competitive VALORANT map pool used by the veto calculator. When the pool
 * rotates, change the maps, `patch` and `asOf` (year-month); the calculator
 * shows "Map pool as of Patch <patch> (<Mon YYYY>)". If the maps change, also
 * update the calculator's example chances in regions.ts (a test checks they match).
 */
export const VALORANT_MAP_POOL = {
  patch: "13.08",
  asOf: "2026-10",
  maps: ["Abyss", "Bind", "Corrode", "Haven", "Lotus", "Summit", "Sunset"],
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-10" → "Oct 2026". Fixed English names so server and client agree. */
export function formatAsOf(yearMonth: string): string {
  const m = /^(\d{4})-(\d{2})$/.exec(yearMonth);
  const month = m ? MONTHS[Number(m[2]) - 1] : undefined;
  if (!m || !month) throw new Error(`asOf must look like 2026-10, got "${yearMonth}"`);
  return `${month} ${m[1]}`;
}

/** "as of Patch 13.08 (Oct 2026)". */
export function mapPoolLabel(pool: { patch: string; asOf: string } = VALORANT_MAP_POOL): string {
  if (!/^\d+\.\d{2}$/.test(pool.patch)) throw new Error(`patch must look like 13.08, got "${pool.patch}"`);
  return `as of Patch ${pool.patch} (${formatAsOf(pool.asOf)})`;
}
