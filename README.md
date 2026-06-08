# rubiconnexus.com

> **Where connections converge.** The branded landing page for Rubicon Nexus — the connection point where people, data and decisions meet.

## Live Site

- **Production:** https://rubiconnexus.com
- **Vercel:** https://rubiconnexus-com.vercel.app

## Overview

A fast, dependency-free static landing page. No build step, no framework — just hand-tuned HTML, CSS and a small amount of vanilla JS. It captures launch-list signups and is tuned for SEO and social sharing.

## Tech Stack

- Static HTML / CSS / vanilla JS (zero build)
- Self-hosted brand assets (favicon, OG image, PWA icons)
- HubSpot lead capture (Portal ID `43986063`) with graceful email fallback
- Vercel hosting with auto-deploy + security headers

## Project Structure

```
├── index.html              # Landing page (copy, styles, lead-capture JS)
├── 404.html                # Branded not-found page
├── favicon.svg             # Scalable favicon / brand mark
├── site.webmanifest        # PWA manifest
├── robots.txt              # Crawl directives + sitemap pointer
├── sitemap.xml             # Sitemap
├── vercel.json             # Hosting config: security headers, caching, clean URLs
├── assets/
│   ├── og-image.svg        # Source for the social share image (1200×630)
│   ├── og-image.png        # Rendered Open Graph / Twitter card image
│   ├── apple-touch-icon.png
│   ├── icon-192.png        # PWA icon
│   └── icon-512.png        # PWA icon
├── autonomy.defaults.yml   # Sovereign Autonomy Pack config
├── Makefile                # Autonomy commands
└── .github/workflows/      # Autonomous agent + PR review workflows
```

## Lead Capture

The signup form submits directly to HubSpot's client-side Forms API (no backend, no secrets). Until a HubSpot **form GUID** is configured, submissions fall back to a pre-filled email to `hello@rubiconnexus.com`, so **no lead is ever lost**.

To send signups straight into HubSpot:

1. In HubSpot, go to **Marketing → Forms** and create a form with an `email` field.
2. Copy the form's **GUID** (the id shown in the form's share/embed URL).
3. In [`index.html`](index.html), set:
   ```js
   var HUBSPOT_FORM_ID = "your-form-guid-here";
   ```
4. Commit and deploy. Submissions now post to
   `https://api.hsforms.com/submissions/v3/integration/submit/43986063/<form-guid>`.

## Brand Assets

The Open Graph image is generated from [`assets/og-image.svg`](assets/og-image.svg). To regenerate after editing the SVG (requires macOS Quick Look + ImageMagick):

```bash
qlmanage -t -s 1200 -o /tmp/og assets/og-image.svg
magick /tmp/og/og-image.svg.png -background '#0b1020' -flatten \
  -gravity center -crop 1200x630+0+0 +repage assets/og-image.png
```

## Local Preview

Any static file server works:

```bash
python3 -m http.server 4321
# then open http://localhost:4321
```

> Note: a custom `404.html` is only served by Vercel (and most production hosts), not by `python -m http.server`.

## Deployment

Auto-deploys to Vercel on push to `main`. To deploy manually:

```bash
vercel --prod
```

## Custom Domain

1. Vercel Dashboard → Project → Settings → Domains
2. Add `rubiconnexus.com`
3. Update DNS records as instructed

## Autonomous Development

This repo is also wired with the **Sovereign Autonomy Pack**, enabling AI agents to process labeled issues and open PRs automatically.

```bash
make autonomy.run agent=codex max_issues=3     # Codex agent
make autonomy.run agent=claude max_issues=1    # Claude agent (strategic)
make autonomy.help                             # Help
```

Required repo secrets (Settings → Secrets → Actions): `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`.

---

**Powered by [Sovereign Autonomy Pack](https://github.com/PresidentAnderson/sovereign-autonomy-pack)**

© 2026 AXAI Innovations
