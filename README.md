# Utkrista Bhandary — AI-Assisted Software Developer | Portfolio

Personal portfolio website for **Utkrista Bhandary**, a BSc IT student in Thimi, Bhaktapur, Nepal, building practical software, data, and technology solutions using disciplined engineering and responsible AI-assisted development.

---

## Tech Stack

- **React 19** + **TypeScript** (Vite 6)
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Motion** (animation library)
- **Lucide React** (icon library)
- No backend, no database, no routing library — fully static SPA with hash-based anchor navigation

---

## Project Structure

```
├── public/
│   ├── favicon.svg                  # Minimal UB-initial SVG favicon
│   └── utkrista_bhandary.pdf        # Official CV (downloaded via nav button)
├── src/
│   ├── components/                   # All React components (sections, CMS admin, navbar)
│   ├── context/                      # AuthContext (prototype), PortfolioContentContext (CMS)
│   ├── data/                         # portfolioData.ts — all content managed here
│   ├── services/                     # contentRepository.ts (localStorage CMS), authService.ts (prototype auth)
│   └── index.css                     # Tailwind import + custom scrollbar + a11y styles
├── docs/
│   ├── portfolio-context.md          # Detailed AI-assistant context for this repository
│   └── deployment-checklist.md       # Pre-deployment verification steps
├── .env.example                      # Template for environment variables (var names only)
├── index.html                        # Single entry HTML with meta tags, favicon, fonts
├── vite.config.ts                    # Vite configuration
├── tsconfig.json / tsconfig.app.json # TypeScript configuration
└── package.json                      # Project manifest
```

---

## Getting Started

**Prerequisites:** Node.js 18+ and npm

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev
```

### Optional: Google Sign-In (Production)

The site runs in **prototype mode** by default — the Google Sign-In modal simulates authentication without sending any data to Google. To connect real Google OAuth 2.0:

1. Create an OAuth 2.0 Client ID in Google Cloud Console
2. Copy `.env.example` to `.env` and add your Client ID:
   ```
   VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   ```
3. Restart the dev server

**Important:** The current authentication is a client-side prototype only. Owner-only CMS features are protected only by this simulated auth — they are **not** production-secure.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run TypeScript type checking (alias for `typecheck`) |
| `npm run typecheck` | TypeScript strict type check (`tsc --noEmit`) |

---

## CMS & Authentication

This site includes a **client-side prototype CMS** for content management:

- **Owner access:** Sign in via the shield icon in the navbar; dashboard accessible at `#cms`
- **Content storage:** All CMS data is stored in the browser's `localStorage` under keys prefixed with `portfolio_content_` and `portfolio_cms_repository_v2`
- **Security:** Authentication is simulated client-side only — any user can sign in as "owner" by clicking the simulated prompt. This is documented as a prototype, not a production security mechanism.
- **CV management:** The CV download button serves `/utkrista_bhandary.pdf` from the public assets folder. CMS records versions but actual PDF updates require placing the file in `public/` and redeploying.

**See `docs/portfolio-context.md` for full details on data structure, authentication flow, and CMS capabilities.**

---

## Deployment

The site builds to a static `dist/` folder. Deploy to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, etc.).

```bash
npm run build
# Upload dist/ to your hosting provider
```

**Before deploying, review `docs/deployment-checklist.md`** for pre-deployment verification steps.

---

## Key Design Decisions

- **No routing library:** Navigation uses anchor links (`#work`, `#about`, etc.) and `scroll-margin-top` for offset. The CMS admin is accessed via `#cms`.
- **localStorage CMS:** Chosen for rapid prototyping without backend infrastructure. Clearly documented as prototype-only.
- **No `any` types in production components:** All admin components use proper typed state and props. The `any` in `ProfileEditorTab.handleChange` has been replaced with `keyof ProfileData`.
- **Reduced motion support:** Respects `prefers-reduced-motion: reduce` for accessibility.
- **Keyboard accessible:** All interactive elements have visible `:focus-visible` outlines.

---

## License

This is a personal portfolio project by Utkrista Bhandary. Third-party libraries retain their original licenses.
