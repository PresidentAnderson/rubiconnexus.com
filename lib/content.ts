// Rubicon Nexus — connect every data point.

export const capabilities: { icon: string; title: string; blurb: string }[] = [
  { icon: "🔗", title: "Connect", blurb: "Pull every data point — CRM, docs, email, files, APIs, sensors — into one connected graph. No more silos, no more guesswork." },
  { icon: "🧠", title: "Intelligence", blurb: "The nexus reads the relationships between points and surfaces what matters — patterns, risks and opportunities, in real time." },
  { icon: "⚡", title: "Act", blurb: "Turn connected signals into timely decisions and automated actions. Momentum, not reports." },
];

export const steps: { num: string; title: string; blurb: string }[] = [
  { num: "01", title: "Ingest", blurb: "Securely bring in data from your existing tools and sources." },
  { num: "02", title: "Connect", blurb: "Resolve and link points into one graph — a shared source of truth." },
  { num: "03", title: "Surface", blurb: "The nexus highlights the connections and signals that matter now." },
  { num: "04", title: "Act", blurb: "Route insight to the right people and trigger the right next step." },
];

export const useCases: string[] = [
  "Operations intelligence",
  "Customer 360",
  "Case & investigation work",
  "Research & discovery",
  "Risk & compliance",
  "Founder dashboards",
];

export const networkBenefits: string[] = [
  "Launch updates",
  "Early access",
  "Product notes",
  "Integration news",
];

export const sources: { label: string; x: number; y: number; lx: number; ly: number }[] = [
  { label: "CRM", x: 90, y: 60, lx: 40, ly: 48 },
  { label: "Docs", x: 640, y: 60, lx: 612, ly: 48 },
  { label: "Email", x: 70, y: 220, lx: 40, ly: 244 },
  { label: "Sensors", x: 660, y: 230, lx: 628, ly: 254 },
  { label: "People", x: 220, y: 40, lx: 196, ly: 28 },
  { label: "Apps", x: 510, y: 40, lx: 486, ly: 28 },
  { label: "Files", x: 200, y: 265, lx: 172, ly: 288 },
  { label: "APIs", x: 500, y: 265, lx: 478, ly: 288 },
];

// The King Legend / Anderson network — cross-reference footer.
export const network: { name: string; href?: string }[] = [
  { name: "King Legend Venture Studios", href: "https://richereverydayineveryway.com" },
  { name: "AXAI Innovations", href: "https://axai.ca" },
  { name: "Rubicon Nexus", href: "https://rubiconnexus.com" },
  { name: "Intent Network", href: "https://intentregistry.io" },
  { name: "Juge.ca", href: "https://juge.ca" },
  { name: "Judge911", href: "https://judge911.com" },
  { name: "LexChrono", href: "https://lexchrono.com" },
  { name: "Justice Sans Frontières", href: "https://justicesansfrontieres.ca" },
  { name: "PVT Hostel", href: "https://pvthostel.com" },
  { name: "Bunkmate", href: "https://bunkmate.app" },
  { name: "Impact Narrative Media", href: "https://impactnarrativemedia.com" },
  { name: "Impact Narrative Records", href: "https://impactnarrativerecords.com" },
  { name: "Koger", href: "https://koger.app" },
  { name: "Tribe Network", href: "https://tribe.network" },
];
