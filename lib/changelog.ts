import { readFileSync } from "node:fs";
import { join } from "node:path";

// The changelog is parsed from CHANGELOG.md at build time so the published page
// and the footer version can never drift apart again (single source of truth).

export type ChangelogEntry = {
  version: string;
  date: string;
  items: string[];
};

export function getChangelog(): ChangelogEntry[] {
  let raw = "";
  try {
    raw = readFileSync(join(process.cwd(), "CHANGELOG.md"), "utf8");
  } catch {
    return [];
  }

  const entries: ChangelogEntry[] = [];
  let current: ChangelogEntry | null = null;

  for (const line of raw.split("\n")) {
    // "## 1.3.0 — 2026-06-18"  (em dash, double-dash, or single dash)
    const header = line.match(/^##\s+(\S+)\s*(?:—|--|-)\s*(.+?)\s*$/);
    if (header) {
      if (current) entries.push(current);
      current = { version: header[1], date: header[2].trim(), items: [] };
      continue;
    }
    if (!current) continue;

    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      current.items.push(bullet[1].trim());
    } else if (line.trim() && current.items.length) {
      // Wrapped continuation of the previous bullet.
      current.items[current.items.length - 1] += " " + line.trim();
    }
  }
  if (current) entries.push(current);

  return entries;
}
