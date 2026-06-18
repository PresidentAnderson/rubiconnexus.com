import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function SiteHeader() {
  return (
    <header className="site">
      <div className="wrap nav">
        <Link href="/" className="brand" aria-label="Rubicon Nexus">
          <span className="mark">RN</span> Rubicon Nexus
        </Link>
        <div className="links">
          <a href="/#what">What it does</a>
          <a href="/#how">How it works</a>
          <a href="/#uses">Use cases</a>
          <Link href="/changelog">Changelog</Link>
          <ThemeToggle />
          <a href="/#contact" className="cta">
            Join the list
          </a>
        </div>
      </div>
    </header>
  );
}
