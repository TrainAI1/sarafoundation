

# Website Audit: Issues and Missing Functionalities

## SEO & Technical Issues

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| 1 | **No Google Analytics** | High | No tracking script in `index.html`. Cannot measure traffic, conversions, or user behavior. Needs a Measurement ID (G-XXXXXXXXXX) to implement. |
| 2 | **Duplicate meta tags** | Medium | `index.html` has `og:title`, `og:description`, `og:url`, and `og:image` hardcoded, but every page also sets these via `react-helmet-async`. This causes duplicate/conflicting tags in the `<head>`. The static ones in `index.html` should be removed so Helmet can manage them per-page. |
| 3 | **Missing Twitter/OG meta on BlogPost** | Medium | `BlogPost.tsx` sets title/description dynamically but lacks `og:image` (should use post cover image), `og:type` set to "article", and `twitter:card`. |
| 4 | **No `<main>` landmark on most pages** | Low | Only `Index.tsx` wraps content in `<main>`. Other pages (About, Contact, Donation, etc.) lack it, hurting accessibility. |
| 5 | **No `loading="lazy"` on most images** | Low | Only 2 files use lazy loading. All below-the-fold images across the site should have `loading="lazy"` for performance. |
| 6 | **Static sitemap may go stale** | Low | `public/sitemap.xml` is a static file and won't include new blog posts. The edge function generates a dynamic one, but the static file could be served instead if the edge function fails. Consider removing the static fallback or keeping it clearly up to date. |

## Broken Links & Placeholder Content

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| 7 | **Social media links are all `#`** | High | Footer social links (Facebook, Twitter, LinkedIn, Instagram, YouTube) all point to `#`. Contact page social links also point to `#`. These need real URLs. |
| 8 | **Team member social links are `#`** | Medium | `TeamSection.tsx` has LinkedIn and Twitter links for each team member all pointing to `#`. |
| 9 | **"Download Partnership Deck" links to `#`** | High | `Partnership.tsx` has a CTA button to download a partnership deck that goes nowhere. Needs a real PDF URL or should be removed. |
| 10 | **Fallback blog posts are not clickable** | Medium | `Blog.tsx` shows 5 hardcoded fallback posts with empty `slug: ""`. Clicking them would navigate to `/blog/` (broken route). They should either link to real content or be removed once DB posts exist. |

## Missing Functionalities

| # | Feature | Priority | Details |
|---|---------|----------|---------|
| 11 | **No actual donation/payment integration** | High | The Donation page shows donation tiers and a "Donate" button linking to external URLs (GoFundMe, etc.), but there's no integrated payment flow (Stripe, PayPal, etc.). |
| 12 | **No Google Analytics / tracking** | High | No way to measure site performance or conversions. |
| 13 | **No email notification on contact form submission** | Medium | Contact form saves to DB but doesn't send an email notification to the team. Admin must manually check the admin panel. |
| 14 | **No email notification on newsletter signup** | Medium | Same issue -- subscribers are saved to DB but no welcome email or confirmation is sent. |
| 15 | **No blog post sharing functionality** | Low | Blog posts have no social share buttons (Twitter, LinkedIn, Facebook, WhatsApp). |
| 16 | **No 404 page with navigation** | Low | `NotFound.tsx` is a bare page with no Navbar/Footer, making it a dead end with no branding. |
| 17 | **No cookie consent banner** | Medium | Required by GDPR/privacy regulations, especially since the site targets UK users. |
| 18 | **Admin has no "strategic partners" or "media" tables** | Low | `AdminPartners.tsx` exists but there's no `partners` or `strategic_partners` table in the DB schema. The partners shown on the homepage appear to be hardcoded. |

## UX Issues

| # | Issue | Severity |
|---|-------|----------|
| 19 | **Mobile menu doesn't close on route change automatically** | Low |
| 20 | **Contact page FAQ is hardcoded** | Low | The Contact page has its own FAQ separate from the admin-managed FAQ system. Should pull from DB. |
| 21 | **Donation page FAQ is hardcoded** | Low | Same issue as above. |
| 22 | **No loading/error states for page content** | Low | `usePageContent` silently falls back to defaults with no error indication if the DB is unreachable. |

## Recommended Priority Fixes

1. **Remove duplicate OG tags from `index.html`** -- quick fix, improves SEO immediately
2. **Add real social media URLs** -- replace all `#` placeholder links in Footer and Contact
3. **Fix or remove "Download Partnership Deck"** -- broken CTA damages credibility
4. **Improve NotFound page** -- add Navbar/Footer and proper branding
5. **Add Google Analytics** -- requires Measurement ID from you
6. **Add cookie consent banner** -- regulatory compliance
7. **Add email notifications for contact/newsletter** -- via a backend function

### Implementation Scope

Fixes 1-4 are straightforward code changes (single session). Fixes 5-7 require either user input (Analytics ID, social URLs) or new backend functions. I can implement all code-only fixes immediately once approved, and guide you on the ones needing external info.

