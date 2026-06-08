## Google Ad Grants Audit — Status of each item

| # | Item | Status |
|---|---|---|
| 1 | Domain ownership (sarafoundationafrica.com, A → 185.158.133.1) | ✅ Pass |
| 2 | Mission statement on homepage + About page | ✅ Pass (Hero + MissionSection + About.tsx ~1.9k words) |
| 3 | Original content — About, Programs, Donate, Contact, Blog | ✅ Pass |
| 3 | Original content — **Projects, Volunteer, Annual Reports pages** | ❌ Missing |
| 4 | Navigation — Home / About / Programs / Blog / Contact / Donate | ✅ Pass; **Volunteer & Projects not in menu** |
| 5 | Functional Donate page (Paystack + crypto + GoFundMe) | ✅ Pass |
| 6 | HTTPS sitewide (Lovable hosting) | ✅ Pass |
| 7 | Mobile responsive | ✅ Pass |
| 8 | Speed (LCP fix already applied, lazy images) | ✅ Pass |
| 9 | Trust info (CAC #7980056, leadership, addresses, phone, email, Privacy, Terms) | ✅ Pass |
| 10 | No AdSense / affiliate ads | ✅ Pass |
| 11 | Recent activity (Blog + Impact Report) | ✅ Pass |
| 12 | Footer items (About, Contact, Privacy, Terms, Donate, Socials, Copyright) | ✅ Pass |

## Gaps to fix

Three dedicated pages are missing that Google Ad Grants reviewers look for:

1. **/projects** — overview of concrete projects (CAP Tech Hubs in 35+ universities, FLIP Fellowship, GJP placements, Talent Showcase, university partnerships). Aggregates existing program work into a "Projects" view distinct from program landing pages.
2. **/volunteer** — explains volunteer/mentor roles (program mentors, university ambassadors, content contributors, event volunteers) with a signup form that writes to a new `volunteer_applications` table (or reuses contact submissions table).
3. **/annual-reports** — index page listing 2024 and 2025 impact reports with download links (Drive URL already exists for 2025).

## Implementation

### New pages (each 400–600 words, full SEO Helmet, semantic H1, internal links, CTAs)

- `src/pages/Projects.tsx` — hero + grid of 6 project cards (CAP Tech Hubs, FLIP Fellowship, WPTA, WFTA, GJP, Talent Showcase) + impact metrics + CTA.
- `src/pages/Volunteer.tsx` — hero + 4 volunteer roles + benefits + form (name, email, role, skills, message) posting via existing `notify` edge function and inserting to `contact_submissions`.
- `src/pages/AnnualReports.tsx` — hero + report cards (2025 live, 2024 placeholder/coming soon) + download buttons.

### Routing & navigation

- `src/App.tsx` — add `/projects`, `/volunteer`, `/annual-reports` routes.
- `src/components/layout/Navbar.tsx` — add **Projects** and **Volunteer** to desktop + mobile menus.
- `src/components/layout/Footer.tsx` — add **Projects**, **Volunteer**, **Annual Reports** under Quick Links.

### SEO

- `public/sitemap.xml` — add the 3 new URLs.
- Per-page `<Helmet>` with unique title (<60 chars), description (<160 chars), canonical, og tags, JSON-LD (`WebPage` / `VolunteerRole` schema where applicable).

### Out of scope

- Performance/Lighthouse audits already addressed in prior SEO passes.
- No design system or branding changes — reuses existing tokens, glassmorphism, blue/cyan palette, ScrollAnimation.
- No backend schema changes unless needed for the Volunteer form (will reuse `contact_submissions` to keep this scoped).
