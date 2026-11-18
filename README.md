# honestly.dating

Marketing site for **Honestly** (tagline: *Honestly just dating*), a non-profit,
transparent, community- and safety-first alternative to for-profit dating apps.
It explains the product and collects a waitlist signup (email **or** phone),
since the app is invite-only for now. Static (SSG), deployed to GitHub Pages.

- **SvelteKit 3 + Svelte 5**, prerendered to static HTML with
  `@sveltejs/adapter-static` (`prerender = true` in `src/routes/+layout.js`).
- **Brand tokens** (`src/lib/tokens.css`) mirror the Honestly app's design
  system: sky→mint gradient, periwinkle CTAs, slate-teal text, Rubik via
  `@fontsource` (self-hosted).

## Develop

```sh
npm install
npm run dev        # local dev server
npm run build      # static output -> build/
npm run preview    # serve the built site
npm run check      # svelte-check / type check
```

## Waitlist collection

The single contact field accepts **one** email **or** phone number (detected
and validated in `src/lib/contact.js`; submitted via `src/lib/waitlist.js`).

Collection target is configured at build time via `VITE_WAITLIST_ENDPOINT`:

- **Unset** → **stub mode**: the form validates and shows success without
  sending anywhere. Good for prototyping/preview.
- **Set** → the form POSTs each submission as a row to that endpoint.

### Current target: SheetDB → Google Sheet

Submissions are sent to a [SheetDB](https://sheetdb.io) sheet (each one becomes
a row in a Google Sheet). The endpoint is configured in two places (it's a
public URL that ships in the client bundle, so it isn't a secret):

- local dev/preview: `.env` (copy from `.env.example`)
- production: the `VITE_WAITLIST_ENDPOINT` env in
  `.github/workflows/deploy.yml`

**The Google Sheet's first row must contain these exact column headers** (the
payload keys SheetDB maps rows to):

| date | kind | contact | source | city | region | country | ip | useragent |
|------|------|---------|--------|------|--------|---------|----|-----------|

`source` distinguishes the hero waitlist (`marketing-waitlist`) from the
volunteer form (`volunteer`). To re-point the forms, change the URL in both
places above. To go back to stub mode, remove/blank the var.

### Approximate location

`city` / `region` / `country` / `ip` come from a coarse, best-effort IP lookup
done in the browser **at submit time** (`src/lib/location.js`, via geojs.io with
ipwho.is as fallback); `useragent` is the browser's `navigator.userAgent`. A
static site has no request headers to read, so this is the client-side
equivalent. It needs no permission prompt, can be blank (ad-blockers, timeouts,
failures never block the submission), and only runs when someone actually
submits — casual visitors aren't geolocated. If you later host on an edge
platform (Cloudflare/Netlify), you could instead derive location from real
request geo headers without a third-party call.

## Deploy

`build/` is plain static files. Host on anything (S3 + CloudFront, Netlify,
GitHub Pages, ...); nothing in it needs a server runtime. Asset paths are
relative, so the output works unchanged at a repo sub-path or a custom-domain
root (no `BASE_PATH` needed).

### GitHub Pages (automated)

`.github/workflows/deploy.yml` builds this site and publishes it to GitHub
Pages on every push to `main` (and via manual "Run workflow").

One-time setup: **repo Settings → Pages → Build and deployment → Source:
"GitHub Actions"**. The site then publishes at
`https://<owner>.github.io/<repo>/`.

**Custom domain** (e.g. `honestly.dating`): add a `static/CNAME` file containing
the domain, set it under repo Settings → Pages → Custom domain, and point DNS at
GitHub Pages. A `.nojekyll` file (in `static/`) is already shipped so Pages
serves the `_app/` directory.
