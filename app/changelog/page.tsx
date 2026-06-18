import type { Metadata } from "next";
import Link from "next/link";
import { getChangelog } from "@/lib/changelog";
import { getBuildInfo } from "@/lib/build-info";

export const metadata: Metadata = {
  title: "Changelog — Richer Every Day in Every Way",
  description: "Published changes for richereverydayineveryway.com.",
};

export default function ChangelogPage() {
  const entries = getChangelog();
  const b = getBuildInfo();

  return (
    <main className="changelog">
      <Link href="/" style={{ color: "var(--accent)" }}>
        ← Home
      </Link>
      <h1>Changelog</h1>
      <p className="lead">
        Published changes for Richer Every Day in Every Way. Currently running{" "}
        <strong>version {b.version}</strong> (build {b.commitShort}).
      </p>

      {entries.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>No changelog entries yet.</p>
      ) : (
        entries.map((entry) => (
          <article key={entry.version}>
            <time>{entry.date}</time>
            <h2>Version {entry.version}</h2>
            <ul>
              {entry.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </article>
        ))
      )}
    </main>
  );
}
