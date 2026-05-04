# CLAUDE.md — BetterSanPablo.org

Authoritative guide for Claude Code when working on this repository.
The original base-template instructions are preserved in `CLAUDE.reference.md`.

> **Reference repo:** [BetterDasmariñas](https://github.com/Shuashuaa/BetterDasmarinas) —
> use it to validate UI patterns, component designs, and feature parity decisions.

---

## Commands

```bash
npm run dev          # Dev server at localhost:5173
npm run build        # TypeScript check + Vite production build
npm run lint         # ESLint check
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Prettier formatting
npm run dev:yaml     # Convert YAML to JSON, then start dev server
npm run setup        # Interactive setup for new installs
```

Pre-commit hook (`lint-staged`) runs ESLint + Prettier on staged files automatically.

---

## CRITICAL — Dual-Repo Sync Rule

The dev/preview server runs from the **git worktree**, not the main repo.

```
Main repo : C:\Users\Remil\Desktop\betterlocalgov\
Worktree  : C:\Users\Remil\Desktop\betterlocalgov\.claude\worktrees\blissful-lamport-f42157\
```

**Every file edit MUST be applied to BOTH locations.** After editing the main repo, sync with PowerShell:

```powershell
$main = "C:\Users\Remil\Desktop\betterlocalgov"
$wt   = "$main\.claude\worktrees\blissful-lamport-f42157"
Copy-Item "$main\src\path\to\File.tsx" "$wt\src\path\to\File.tsx" -Force
```

- Preview server (`mcp__Claude_Preview__preview_start "Dev Server (Vite)"`) → runs from **worktree**
- Git commits and `git push` → run from **main repo**
- Use Bash tool with `cd "C:\Users\Remil\Desktop\betterlocalgov"` for all git operations

---

## Architecture

React 19 · TypeScript · Vite · React Router · Tailwind CSS · i18next · YAML content system

### All Active Routes — `src/App.tsx`

| Path | Page Component | Notes |
|---|---|---|
| `/` | `Home` | Landing page with all sections |
| `/services` | `Services` | All service categories |
| `/services/:category` | `Services` | Category listing |
| `/services/:category/:documentSlug` | `Document` | Markdown service page |
| `/government` | `Government` | Gov overview |
| `/government/:category` | `Government` | Category listing |
| `/government/:category/:documentSlug` | `Document` | Markdown gov page |
| `/about` | `About` | City info + history snapshot |
| `/search` | `SearchPage` | Full-text search results |
| `/sitemap` | `Sitemap` | All portal routes listed |
| `/accessibility` | `Accessibility` | WCAG 2.1 AA statement |
| `/philippines/hotlines` | `Hotlines` | Emergency + local numbers |
| `/philippines/holidays` | `Holidays` | 2025 PH + local holidays |
| `/:lang/:documentSlug` | `Document` | Multilingual doc view |
| `/:documentSlug` | `Document` | Catch-all doc view |

---

## Home Page — `src/pages/Home.tsx`

Sections render in this fixed order (lazy-loaded via `Suspense`):

1. `HeroSection` — Headline, CTA buttons, quick chips, live search dropdown
2. `ServicesSection` (`variant="quick"`) — Top 6 quick-access service cards
3. `GovernmentActivitySection` — Government category cards grid
4. `HighlightsSection` — City photo showcase carousel
5. `StatsSection` — 6 key city statistics
6. `AboutSection` — Two-column: text + quick-fact cards
7. `LeadershipSection` — Mayor + Vice Mayor (navigate to `/government/departments/executive`)
8. `PlacesSection` — Top 4 tourist spots with images
9. `HistorySection` — Timeline of 8 milestones (1586–2025)
10. `ContactSection` — City Hall phone, address, hours, official website cards

All data lives in **`src/data/homeContent.ts`**. Edit that file to update any section content.

---

## Hero Search — `src/components/sections/Hero.tsx`

### Critical: overflow-hidden rule
`overflow-hidden` must **NOT** be on the `<section>` tag — it clips the dropdown.
The decorative background blobs are wrapped in their own `<div className="... overflow-hidden">`.

### How the search works
- Dropdown appears at ≥ 2 characters typed; shows up to 6 results
- Searches across: Quick Services + Service Categories + Government Categories
- Result badges: blue = Quick Service · green = Services · orange = Government
- Keyboard: `ArrowDown`/`ArrowUp` to navigate, `Enter` to go, `Escape` to close
- Clear (×) button resets the input
- Form submit → `/search?q=...` (the proper search page, NOT `/services?q=...`)
- "Try:" hint links below the search bar prefill common queries

---

## Content System

### Services — `content/services/`

1. **`src/data/services.yaml`** — Categories (`name`, `slug`, `icon`, `description`).
   `icon` must be a valid [Lucide React](https://lucide.dev) icon name.
2. **`content/services/{slug}/index.yaml`** — Pages list for the category.
3. **`content/services/{slug}/{page-slug}.md`** — Markdown for each service page.

**Adding a new service category:**
1. Add entry to `src/data/services.yaml`
2. Create `content/services/{slug}/index.yaml`
3. Add static import + mapping to `src/data/yamlLoader.ts` → `categoryIndexMap`

### Government — `content/government/`

1. **`src/data/government.yaml`** — Categories (`name`, `slug`, `icon`, `description`).
2. **`content/government/{slug}/index.yaml`** — Pages list.
3. **`content/government/{slug}/{page-slug}.md`** — Markdown for each page.

**Adding a new government category:**
1. Add entry to `src/data/government.yaml`
2. Create `content/government/{slug}/index.yaml`
3. Add static import + mapping to `src/data/yamlLoader.ts` → `govCategoryIndexMap`

### Nav exclusions — `src/data/navigation.ts`

```ts
const GOV_NAV_EXCLUDED = new Set(['transparency-documents', 'reports-and-statistics']);
```

These get their own top-level nav items (Transparency, Statistics dropdowns) and are
excluded from the Government dropdown. Do not remove this set.

### Companion JSON interpolation

A markdown file may have a `.json` sidecar (same slug, e.g. `executive.md` + `executive.json`).
Tokens like `{MAYOR}` in the markdown are replaced at load time.
Resolution order: JSON value → `VITE_<KEY>` env var → token unchanged.

---

## Navigation — `src/data/navigation.ts`

- `mainNavigation` — Desktop + mobile items with dynamic dropdowns
- `footerNavigation.mainSections` — Footer columns (About, Services, Government)
- `footerNavigation.socialLinks` — Social icons (currently Facebook)
- Government dropdown: driven from `government.yaml`, filtered by `GOV_NAV_EXCLUDED`
- Transparency/Statistics dropdowns: driven from `transparencyDocumentPages` / `reportsStatisticsPages`
- Home is explicitly the first desktop nav item (hardcoded `<Link to="/">`)

---

## Footer — `src/components/layout/Footer.tsx`

### Sections
1. **Brand column** — Logo on white pill, description, Facebook + GitHub icon buttons
2. **Nav columns** — About · Services · Government (external links get `↗` icon)
3. **Project Cost & Transparency band** — edit `PROJECT_COSTS` array in the file
4. **Visit counter** — using [countapi.xyz](https://api.countapi.xyz) (free, CORS-enabled)
5. **Badges** — Free & Open Source · Built by volunteers · Contribute on GitHub
6. **Bottom bar** — Copyright · Sitemap · Accessibility · Official City Site ↗

### Visit counter implementation

```ts
// Endpoint: https://api.countapi.xyz/hit/bettersanpablo.org/visits
// Session-guarded via sessionStorage key 'bsp_counted'
// Shows '—' gracefully if API is unreachable
```

### Project cost data

Edit `PROJECT_COSTS` array inside `Footer.tsx` to update displayed values:

```ts
const PROJECT_COSTS = [
  { label: 'Hosting', value: '₱0 / yr',   note: 'Cloudflare Pages (free tier)' },
  { label: 'Domain',  value: '₱840 / yr', note: 'bettersanpablo.org (~$15/yr)' },
  { label: 'Backend', value: '₱0 / yr',   note: 'No server — static site' },
  { label: 'Total',   value: '₱840 / yr', note: 'Funded by volunteers', highlight: true },
];
```

---

## Static Pages

| File | Route | Purpose |
|---|---|---|
| `src/pages/Sitemap.tsx` | `/sitemap` | All routes + external links |
| `src/pages/Accessibility.tsx` | `/accessibility` | WCAG 2.1 AA statement |
| `src/pages/Hotlines.tsx` | `/philippines/hotlines` | Emergency contact numbers |
| `src/pages/Holidays.tsx` | `/philippines/holidays` | 2025 holidays |
| `src/pages/About.tsx` | `/about` | City overview + history |
| `src/pages/Search.tsx` | `/search` | Full-text search with cards |

---

## Key Data File — `src/data/homeContent.ts`

| Export | Used in section |
|---|---|
| `SAN_PABLO_HERO` | HeroSection |
| `SAN_PABLO_QUICK_SERVICES` | ServicesSection + hero search index |
| `SAN_PABLO_FEATURED_HIGHLIGHTS` | HighlightsSection |
| `SAN_PABLO_ABOUT_PARAGRAPHS` | AboutSection |
| `SAN_PABLO_HISTORY_TIMELINE` | HistorySection |
| `SAN_PABLO_TOP_PLACES` | PlacesSection |
| `SAN_PABLO_CITY_STATS` | StatsSection |
| `SAN_PABLO_COCONUT_FESTIVAL` | AboutSection |
| `SAN_PABLO_CITY_LEADERSHIP` | LeadershipSection |

---

## UI Components — `src/components/ui/`

Always use these instead of raw HTML:

| Component | Notes |
|---|---|
| `Section` | Page section wrapper with container + padding |
| `Heading` | `level` prop: 1–4 |
| `Text` | Body paragraph |
| `Card` / `CardContent` | From `@bettergov/kapwa/card` |
| `ListItem` | Styled list item |
| `Breadcrumbs` | Page breadcrumb trail |
| `ScrollToTop` | Auto-scroll on route change |

### Card + Link pattern — always use this

```tsx
// ✅ CORRECT — Link wraps Card, entire card is clickable
<Link to={href} className="group block">
  <Card className="h-full group-hover:shadow-md transition-shadow">
    <CardContent>...</CardContent>
  </Card>
</Link>

// ❌ WRONG — Link nested inside CardContent (only that text area is clickable)
<Card>
  <CardContent>
    <Link to={href}>Click here</Link>
  </CardContent>
</Card>
```

---

## Assets

| File | Purpose |
|---|---|
| `src/assets/bettersanpablo-logo2.png` | Navbar + footer logo (active) |
| `src/assets/bettersanpablo-logo3.png` | Alternate/backup logo |
| `public/favicon.png` | Browser tab icon |

---

## Internationalization

- i18next + `HttpBackend` → translation files in `public/locales/{lang}/common.json`
- Detection order: `localStorage` → `navigator` → `htmlTag`
- Fallback language: `en`
- Supported languages defined in `src/types/index.ts` → `LanguageType`
- Active translations: `en` (complete) · `fil` (partial)

---

## Code Style

Enforced by Prettier:
- Single quotes, 2-space indent, trailing commas (ES5), semicolons, 80-char line width
- Arrow functions omit parens for single arguments
- No manual `import React` needed (React 19 JSX transform is active)

---

## San Pablo City — Verified Data

All content must come from verified sources. Accepted references:

| Source | URL |
|---|---|
| Official City Website | https://www.sanpablocity.gov.ph |
| PSA Census (POPCEN) | https://psa.gov.ph |
| Official Gazette | https://www.officialgazette.gov.ph |
| COMELEC results | https://comelec.gov.ph |
| COA Audit Reports | https://www.coa.gov.ph |
| Wikipedia (secondary only) | https://en.wikipedia.org |

### Key verified facts (do not change without a cited source)

- Population: **300,166** (2024 POPCEN)
- Land area: **197.56 km²**
- Barangays: **80**
- Classification: **1st Class Component City**, Province of Laguna
- City charter: Commonwealth Act No. 520, signed **May 7, 1940**; inaugurated **March 30, 1941**
- Mayor (2025–2028): **Arcadio "Najie" B. Gapangada Jr.** (70,822 votes)
- Vice Mayor: **Justin G. Colago**
- Congressional rep: **Loreto "Lorie" Amante**
- Seven Lakes: **Sampaloc, Palakpakin, Bunot, Pandin, Yambo, Muhikap, Calibato**
- Patron saint: **St. Paul the First Hermit** — feast day January 15
- Coco Festival: **January 9–15** annually (first held 1996; Guinness record 2025)
- City Hall: **Mabini Extension, San Pablo City, Laguna 4000**
- City Hall main line: **(049) 562-0111**
- PNP: **(049) 562-8765** · BFP: **(049) 562-4321** · CDRRMO: **0998 540 7171**
- FY 2022 revenue: **₱1.96 billion** · Expenditure: **₱1.747 billion** (COA)

---

## Environment Variables

```bash
VITE_GOVERNMENT_NAME=   # Displayed city name (e.g. "San Pablo City")
```

---

## Pending / Known Gaps

- [ ] Legislative content (ordinances, resolutions, committee hearings) — see BetterDasmariñas
- [ ] Interactive Leaflet.js city map on home page
- [ ] DTI CMCI / business climate profile page
- [ ] Infrastructure projects tracker page
- [ ] Filipino (`fil`) translation completion — `public/locales/fil/common.json`
- [ ] Self-hosted `/api/visits` counter (replaces third-party countapi.xyz)
- [ ] Privacy Policy (`/privacy`) and Terms of Use (`/terms`) pages
- [ ] Community Discord link (`/discord` is currently a placeholder)
- [ ] Barangay-level pages (individual barangay profiles)
