# Deployment Checklist

Run through every item before deploying to production.

---

## Pre-Deployment Verification

### Build & Type Check

- [ ] `npm run typecheck` passes with zero errors
- [ ] `npm run build` completes successfully to `dist/`
- [ ] No `any` types remain in components (search `src/` for `: any` or `as any`)

### Assets in `dist/`

- [ ] `dist/utkrista_bhandary.pdf` exists (CV file)
- [ ] `dist/favicon.svg` exists (UB favicon)
- [ ] `dist/index.html` loads without 404s on referenced assets

### AI Studio / Gemini Traces Removed

- [ ] No references to "AI Studio", "Gemini", "Google AI" in any source file
- [ ] No external tracking scripts or analytics unless explicitly added
- [ ] No `console.log` or `debugger` statements in production source (`src/`)
- [ ] No dicebear or other external user-data-leaking services in code

### Authentication

- [ ] CMS owner authentication is clearly documented as prototype/client-side only
- [ ] No claims of production security in documentation or comments
- [ ] Google Client ID is blank in `.env.example` (no secrets committed)

### Environment Variables

- [ ] `.env` is in `.gitignore` and not committed
- [ ] Only `VITE_GOOGLE_CLIENT_ID` is documented in `.env.example`
- [ ] No API keys, tokens, or secrets anywhere in committed files

---

## Hosting Provider Checklist

### URL & Domain

- [ ] Update `og:url` meta tag in `index.html` with production URL
- [ ] Update `<link rel="canonical">` in `index.html` with production URL
- [ ] Test all anchor links work (scroll to `#work`, `#about`, `#contact`, `#cms`)

### Assets & Performance

- [ ] Verify `utkrista_bhandary.pdf` downloads correctly from the hosted URL
- [ ] Verify `favicon.svg` loads in the browser tab
- [ ] Check page load time is acceptable (target: <3s on 3G)
- [ ] Bundle size warning is acknowledged (592KB JS includes Motion library — acceptable for SPA)

### Mobile & Accessibility

- [ ] Test on mobile viewport (320px+) — hamburger menu, drawer navigation
- [ ] Test keyboard navigation: Tab through all interactive elements
- [ ] Test `:focus-visible` outlines appear on keyboard focus
- [ ] Verify `prefers-reduced-motion` disables animations when enabled in OS

### Social / OG Tags

- [ ] Open Graph `og:title`, `og:description`, `og:type` render correctly in social previews
- [ ] Twitter Card meta tags render correctly (test at https://cards-dev.twitter.com/validator)

---

## Post-Deployment Verification

- [ ] Live URL loads and displays all content correctly
- [ ] Navbar CV download works and filename is `utkrista_bhandary.pdf`
- [ ] All project links (`#work` section) open correct GitHub repositories
- [ ] Contact section GitHub and LinkedIn links open correct profiles
- [ ] CMS login modal appears when clicking shield icon
- [ ] CMS dashboard renders at `#cms` after authentication
- [ ] No console errors in browser developer tools

---

## URLs to Update After Deployment

Replace `https://YOUR-DOMAIN.example` with your actual production URL:

1. `index.html` — `<meta property="og:url" content="https://YOUR-DOMAIN.example/">`
2. `index.html` — `<link rel="canonical" href="https://YOUR-DOMAIN.example/">`

---

*Last updated: 2026-09-15*
