// Values that go stale. Update them here and nowhere else.

/**
 * The competitive VALORANT map pool used by the veto calculator. When the pool
 * rotates, change both the maps and `asOf` (year-month); the calculator shows
 * the date. If the maps change, also update the calculator's example chances
 * in regions.ts.
 */
export const VALORANT_MAP_POOL = {
  asOf: "2025-09",
  maps: ["Ascent", "Bind", "Corrode", "Haven", "Icebox", "Lotus", "Sunset"],
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2025-09" → "September 2025". Fixed English names so server and client agree. */
export function formatAsOf(yearMonth: string): string {
  const m = /^(\d{4})-(\d{2})$/.exec(yearMonth);
  const month = m ? MONTHS[Number(m[2]) - 1] : undefined;
  if (!m || !month) throw new Error(`asOf must look like 2025-09, got "${yearMonth}"`);
  return `${month} ${m[1]}`;
}
