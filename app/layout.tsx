import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});
const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rubiconnexus.com"),
  title: "Rubicon Nexus — Connect every data point",
  description:
    "Rubicon Nexus connects your scattered data points — people, systems and signals — into one living network, so intelligence and decisions flow in real time.",
  alternates: { canonical: "https://rubiconnexus.com" },
  openGraph: {
    title: "Rubicon Nexus — Connect every data point",
    description:
      "Connect scattered data points into one living network where intelligence and decisions flow in real time.",
    url: "https://rubiconnexus.com",
    siteName: "Rubicon Nexus",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "Rubicon Nexus" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`,
          }}
        />
      </head>
      <body>
        <div className="glow" />
        <SiteHeader />
        {children}
        <SiteFooter />
        <ScrollReveal />
      </body>
    </html>
  );
}
