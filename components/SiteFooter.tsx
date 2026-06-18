import Link from "next/link";
import { getBuildInfo } from "@/lib/build-info";
import { network } from "@/lib/content";

export default function SiteFooter() {
  const b = getBuildInfo();
  const year = new Date().getFullYear();
  const ariaLabel = `Version ${b.version}, Build ${b.commitShort}, Branch ${b.branch}, Built ${b.builtLabel}`;

  return (
    <footer className="site">
      <div className="wrap">
        <div className="network-row">
          <h4>The Anderson Network</h4>
          <div className="net-links">
            {network.map((n) =>
              n.href ? (
                <a key={n.name} href={n.href} target="_blank" rel="noopener">
                  {n.name}
                </a>
              ) : (
                <span key={n.name}>{n.name}</span>
              )
            )}
          </div>
        </div>
        <div className="foot">
          <div>
            <div>© {year} Rubicon Nexus — an AXAI Innovations / King Legend venture</div>
            <div className="build-info" aria-label={ariaLabel}>
              <Link href="/changelog">Version {b.version}</Link>
              <span className="sep">|</span>
              <span title={b.commit}>Build {b.commitShort}</span>
              <span className="sep">|</span>
              <span>
                Branch{" "}
                <a href={b.deployHref} target="_blank" rel="noopener" title={b.deployHref}>
                  {b.branch}
                </a>
              </span>
              <span className="sep">|</span>
              <time dateTime={b.builtAt}>Built {b.builtLabel}</time>
            </div>
          </div>
          <div><a href="https://rubiconnexus.com">rubiconnexus.com</a></div>
        </div>
      </div>
    </footer>
  );
}
