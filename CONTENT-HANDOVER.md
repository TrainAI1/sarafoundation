# Sara Foundation Africa — Website Restructure Handover

Branch: `content-restructure` (local, not pushed). Build and typecheck pass.

---

## 1. What changed in the code

### Navigation and footer
- Main nav is now **Home · About Us · Our Work · Our Impact · Get Involved · News & Stories** with a **Donate** button.
- Existing URLs are preserved: Our Work groups `/programs/cap`, `/programs/flip`, `/programs/gjp` plus a new `/our-work` overview; Our Impact points at `/projects`; News & Stories points at `/blog`; Get Involved groups `/donation`, `/partnership`, `/volunteer`, `/contact`.
- Footer rebuilt as Explore / Get Involved / Contact columns plus a trust row: Transparency & Governance, Annual Reports, Safeguarding, Privacy, Cookies, Accessibility, Terms.

### New pages
| Route | Page |
|---|---|
| `/our-work` | Delivery model (Understand need → Design → Deliver → Support → Measure), access support, pathway cards |
| `/get-involved` | Donate / Partner / Volunteer routes, public-benefit statement |
| `/transparency` | Charity status, charitable purposes, trustees, policies, international delivery, annual reporting |
| `/accessibility` | Accessibility commitments and how to report a barrier |

### Rewritten pages and sections
- **Home** — new hero and three CTAs, "Why We Exist", three focus areas, three learning pathways, four labelled headline metrics with a *See Our Impact* CTA, "Real Learners. Real Journeys." featuring Akinlabi (CAP), Olamide (FLIP) and Eniola (EJP) with links to the LinkedIn evidence, revised FAQs. The duplicate "Work with Us" CTA band was removed from the homepage to keep the CTA hierarchy clean (the component file is still in the repo).
- **About Us** — new hero, our story, Who We Support, How We Work (six-point delivery model), Leadership & Governance with a link to Transparency. SDG, milestones and team content retained.
- **CAP** — new hero, Benefits to Participants, verified impact metrics, and a 10-project learner showcase. Learn/Build/Launch and the 80/20 model retained; "internship placement" language reworded as referrals.
- **FLIP** — new hero and copy, FLIP impact metrics, five capstone project cards. WPTA/WFTA, gender-gap and membership sections retained.
- **EJP** (`/programs/gjp`) — rewritten from a placement pipeline into the Education Journey Pathway: activities, a prominent "we do not guarantee employment" statement, and the 696 / 705 referral figures presented with context.
- **Our Impact** (`/projects`) — five-level impact hierarchy (Access, Learning Activity, Learning Outcomes, Inclusion & Community, Continued Journey), a dashboard grouped by CAP / FLIP / EJP with every metric defined, cross-cutting figures, and an annual impact report module.
- **Get Involved routes** — Volunteer rebuilt around the five role cards and the 60+ network; Donation hero carries the public-benefit statement; Partnership hero rewritten in charitable-purpose language.
- **SEO** — page-specific titles and meta descriptions, updated `index.html` defaults, `public/sitemap.xml` (four new URLs) and a fully rewritten `public/llms.txt`.
- **Accessibility** — skip-to-content link, `id="main-content"` landmarks, decorative images marked `aria-hidden`, descriptive link text and alt text.

### Claims removed or corrected
- Fabricated homepage testimonials (Chiamaka O., Amara N., Tunde A.) replaced with the three approved real stories.
- Invented hero marquee names and figures ("200+ Women in Tech", "500+ Alumni", "8 Countries") replaced with verified programme labels.
- **"85% Job Placement"** on the Partnership page removed — replaced with "1,600 scholarships provided".
- CAP stats corrected from "800+ students / 8 countries / 92% scholarship" to 763 learners / 11 countries / fully funded.
- FLIP stats corrected from "200+ members / 50+ mentors" to 57 women / 4 mentors / 93 conference attendees / 108 workshop attendances.
- Recruitment framing removed from CAP recognition, sponsor benefits, donation prompts and the EJP application meta description.

---

## 2. Placeholders you need to fill

These are live on the site as clearly labelled placeholders — nothing was invented.

**`/transparency`**
- `[CONTENT REQUIRED: UK legal form and registration status]`
- `[CONTENT REQUIRED: Charity registration number]`
- `[CONTENT REQUIRED: Public register link]`
- `[CONTENT REQUIRED: Trustee names, roles, relevant experience and governance responsibilities]`
- `[CONTENT REQUIRED]` against Safeguarding, Conflicts of Interest, Financial Controls / Anti-Fraud, Complaints, Cookies and Volunteer Code of Conduct policy documents
- `[CONTENT REQUIRED: Description of Nigeria operating / delivery partner relationship]`
- `[CONTENT REQUIRED: Annual accounts]`

**`/accessibility`**
- `[CONTENT REQUIRED: Accessibility conformance statement and date of last review]`

**`/projects` (Our Impact)**
- `[DATA TO CONFIRM: completion rates, assessment results and participant-reported confidence]`
- `[DATA TO CONFIRM: retention and repeat-participation figures]`
- `[CONTENT REQUIRED: link to future annual and impact reports]`

**`/programs/gjp` (EJP)**
- `[DATA TO CONFIRM: verified continued-journey outcomes and participant consent]`

**CAP project showcase** — each of the ten project cards shows `[CONTENT REQUIRED: …]` for any of *problem / learning need*, *skills applied*, *next learning step* that we do not have on record. ArtifyPro, StudyPath AI, Oracle Traffic AI, Carpool AI and Famconnect need the most. Five projects have no evidence link yet.

---

## 3. Content held in Supabase — needs editing through the admin panel

The code sets defaults, but where a row exists in `page_content` the database value wins and will override the new copy. Check and update these keys in **Admin → Pages**:

| Key | What to update |
|---|---|
| `home-hero` | headline_1/2/3, subheadline, cta_primary ("Donate"), cta_secondary ("Explore Our Work"), cta_tertiary ("Partner with Us") — note `cta_tertiary` is a new field |
| `home-mission` | badge "Why We Exist", new headline and description |
| `home-impact` | now uses `reach_*`, `scholarships_*`, `learners_*`, `ai_*` — the old `students_*`, `universities_*`, `countries_*`, `fellows_*`, `partners_*`, `community_*` keys are no longer read |
| `home-cta` | new headline, description, "Donate" / "Partner with Us" |
| `site-settings` | unchanged, but confirm addresses and social links |

Also review in the admin panel:
- **FAQs** — homepage FAQs are hardcoded and were rewritten, but any DB-held FAQs still carry old "guaranteed jobs" / "completely free" framing.
- **Testimonials** — check every published testimonial has documented consent and does not imply guaranteed employment.
- **Blog posts** — categories changed to Learner Stories, Project Showcases, Programme Updates, Impact & Learning, Partnerships, Governance & News. Existing posts are tagged with the old categories (Programs, Women in Tech, Career, Industry…) and will not appear under any filter until re-tagged.
- **Team** — confirm which listed people are trustees versus staff or advisers, for the Transparency page.

---

## 4. Assets still needed

Existing programme photography was reused throughout. Authentic images are still needed for: CAP Demo Day, CAP Talent Showcases, CAP Conference, FLIP Conference, FLIP workshops, AI training activity, and the individual learner project cards. No stock photography was added.

---

## 5. Suggested next steps

1. Review the branch diff: `git diff main...content-restructure`
2. Run it locally (`npm install && npm run dev`) and walk the journey: Home → Our Work → CAP → Our Impact → Get Involved.
3. Fill the placeholders above, especially the governance ones.
4. Update the Supabase `page_content` rows and re-tag blog posts.
5. Merge and deploy.
