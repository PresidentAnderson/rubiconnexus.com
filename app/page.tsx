import JoinForm from "@/components/JoinForm";
import { capabilities, steps, useCases, networkBenefits, sources } from "@/lib/content";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <span className="pill"><span className="dot" /> Now building</span>
          <h1>Connect every <span className="grad">data point</span>.</h1>
          <p className="lead">
            Your data is scattered across people, systems and signals. Rubicon Nexus links those
            points into one living network — so intelligence and decisions flow in real time, not
            after the fact.
          </p>
          <div className="actions">
            <a className="btn btn-primary" href="#contact">Join the list</a>
            <a className="btn btn-ghost" href="#how">See how it works</a>
          </div>

          <div className="graph" aria-hidden="true">
            <svg viewBox="0 0 720 300" role="img">
              <defs>
                <linearGradient id="eg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#6d5cff" /><stop offset="1" stopColor="#22d3ee" />
                </linearGradient>
                <radialGradient id="hg"><stop offset="0" stopColor="#a855f7" /><stop offset="1" stopColor="#6d5cff" /></radialGradient>
              </defs>
              {sources.map((s) => (
                <line key={`e-${s.label}`} className="edge" x1="360" y1="150" x2={s.x} y2={s.y} />
              ))}
              {sources.map((s) => (
                <g key={`n-${s.label}`}>
                  <circle className="node" cx={s.x} cy={s.y} r="6" />
                  <text className="lbl" x={s.lx} y={s.ly}>{s.label}</text>
                </g>
              ))}
              <circle className="ping" cx="360" cy="150" r="4" />
              <circle className="node hub" cx="360" cy="150" r="16" />
              <text className="lbl" x="330" y="186" style={{ fill: "var(--ink)", fontWeight: 700 }}>NEXUS</text>
            </svg>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="eyebrow">The problem</div>
          <h2>Scattered signals, slow decisions.</h2>
          <p className="sub">Every team has the data it needs — it&apos;s just trapped in different tools, formats and heads. By the time the dots get connected by hand, the moment has passed.</p>
        </div>
      </section>

      <section className="block" id="what">
        <div className="wrap">
          <div className="eyebrow">What it does</div>
          <h2>One nexus for your data points.</h2>
          <p className="sub">Rubicon Nexus connects people, systems and signals into a single point of truth — then turns those connections into intelligence and action.</p>
          <div className="grid">
            {capabilities.map((c) => (
              <div className="card reveal" key={c.title}>
                <div className="ico">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block" id="how">
        <div className="wrap">
          <div className="eyebrow">How it works</div>
          <h2>From scattered points to a living network.</h2>
          <div className="grid-4">
            {steps.map((s) => (
              <div className="card reveal" key={s.num}>
                <div className="step">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block" id="uses">
        <div className="wrap">
          <div className="eyebrow">Built for</div>
          <h2>Wherever the dots need connecting.</h2>
          <div className="usecases">
            {useCases.map((u) => <span className="chip" key={u}>{u}</span>)}
          </div>
        </div>
      </section>

      <section className="cta-band" id="contact">
        <div className="wrap">
          <div className="join-panel">
            <h2>Become part of the nexus.</h2>
            <p className="sub">Join the list and we&apos;ll let you know the moment we go live.</p>
            <ul className="join-benefits">
              {networkBenefits.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <JoinForm />
            <p style={{ marginTop: 18, fontSize: "0.9rem", color: "var(--muted)" }}>
              Building something that should plug into the nexus? Email{" "}
              <a href="mailto:hello@rubiconnexus.com" style={{ color: "var(--accent)" }}>hello@rubiconnexus.com</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
