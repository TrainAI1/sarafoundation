# Image Replacement Guide — Sara Foundation Africa site

Every AI-generated stock photo on the site is a static file in `src/assets/`. Because the code imports each one by its exact filename, **you can replace any of them by saving a new photo over the existing file with the exact same name** — no code changes needed, and it will show up everywhere that file is used (often several pages at once).

To replace one from the admin panel instead: go to `/admin/pages`, find the section that uses the image (see "Used on" below), and upload through the image field there — that overrides the file without touching the codebase at all.

For each slot below: what's wrong with the current one, where it shows up, the exact file to overwrite, and a ready-to-paste prompt for Antigravity (or any image generator/stock search).

---

## Highest priority — most obviously AI-generated

### 1. `src/assets/woman-founder-pitch.jpg`
**Problem:** garbled fake text on the presentation screen ("Startup Startup Pitch", nonsense chart labels) — a dead giveaway of AI generation.
**Used on:** FLIP capstone showcase, FLIP WFTA section, homepage hero marquee, admin hero-cards defaults.
**Prompt:** "Photorealistic editorial photo of a confident young African businesswoman pitching on stage at a startup/tech conference, mid-gesture speaking to an audience, a real-looking slide behind her with a simple bar chart and clean readable English text like 'Q3 Growth', warm stage lighting, shot on a DSLR, natural skin texture, no text distortion, 16:9."

### 2. `src/assets/graduates-celebration.jpg`
**Problem:** garbled fake banner text ("MIFCORIDMART TECH POWCOMFERO DEMS") behind the graduates — another dead giveaway.
**Used on:** homepage Impact Report section, EJP program image, Our Work page.
**Prompt:** "Photorealistic editorial photo of a diverse group of young African university graduates in blue graduation gowns and caps, holding certificates and small trophies, confetti falling, celebrating together indoors at a graduation ceremony, joyful candid expressions, any banner or screen in the background should be blank or generic (no text), shot on DSLR, natural lighting, 16:9."

---

## FLIP program images (replace all — every one currently shows the AI look: waxy skin, too-perfect symmetry)

### 3. `src/assets/women-tech-leaders.jpg`
**Used on:** FLIP hero (background + featured photo), FLIP initiatives, FLIP WPTA section, homepage programs card, admin defaults.
**Prompt:** "Photorealistic candid photo of three young African women in business-casual clothing collaborating around a laptop in a bright modern office or co-working space, genuine smiles, natural skin texture and asymmetry, documentary editorial style, shot on DSLR, soft natural light, 4:3 or square crop friendly."

### 4. `src/assets/women-coworking.jpg`
**Used on:** FLIP capstone showcase, FLIP gender-gap section, FLIP initiatives, About page.
**Prompt:** "Photorealistic candid photo of a small group of African women professionals working together at laptops in a co-working space, one pointing at a screen explaining something, natural office background with plants, documentary style, DSLR quality, natural light, no visible screen text needed."

### 5. `src/assets/cap-women-group.jpg`
**Used on:** homepage hero marquee, CAP for-schools section, FLIP initiatives.
**Prompt:** "Photorealistic candid photo of a group of young African women students sitting together indoors with laptops and notebooks, engaged in discussion, natural indoor lighting, casual university/coworking setting, documentary editorial photography, DSLR quality."

### 6. `src/assets/cap-woman-laptop.jpg`
**Used on:** CAP project showcase, CAP solutions section, FLIP capstone showcase.
**Prompt:** "Photorealistic portrait of a focused young African woman in business-casual attire working on a laptop in a bright office, wearing glasses, natural indoor window light, shallow depth of field, documentary editorial style, DSLR quality, natural skin texture."

### 7. `src/assets/cap-woman-braids.jpg`
**Used on:** FLIP capstone showcase, homepage hero marquee, admin defaults.
**Prompt:** "Photorealistic candid lifestyle photo of a young African woman with braided hair, smiling, sitting on a couch at home using a laptop, casual clothing, warm natural window light, documentary style, DSLR quality."

---

## Shared homepage / CAP images (also replace — reused across many pages)

### 8. `src/assets/students-tech-lab.jpg` and `src/assets/hero-students.jpg`
**Problem:** these two files are byte-identical duplicates of the same image right now.
**Used on:** `students-tech-lab.jpg` — CAP hero, CAP project showcase, FLIP capstone showcase, homepage Impact section, homepage Programs section, About/Blog/Our Work. `hero-students.jpg` — homepage hero fallback and the site's default social-share (og:image) photo on nearly every page.
**Action:** replace them with two **different** real photos so the site isn't showing the same picture everywhere.
**Prompt for `hero-students.jpg`:** "Photorealistic candid photo of a small diverse group of young African students smiling and looking at a laptop together outdoors on a university campus or in a bright library, natural daylight, documentary editorial style, DSLR quality, wide shot suitable for a website hero banner."
**Prompt for `students-tech-lab.jpg`:** "Photorealistic candid photo of young African students working at computers/laptops in a university computer lab or tech hub, focused and engaged, rows of desks visible, natural indoor lighting, documentary style, DSLR quality."

### 9. `src/assets/tech-entrepreneurs.jpg`
**Used on:** homepage hero marquee, Mission section, CAP project showcase, admin defaults.
**Prompt:** "Photorealistic candid photo of a diverse group of young African tech entrepreneurs standing together in a modern office/demo-day setting, confident and relaxed body language, natural light, documentary editorial style, DSLR quality."

### 10. `src/assets/community-workshop.jpg`
**Used on:** Mission section fallback, About, Contact.
**Prompt:** "Photorealistic candid photo of a community digital-skills workshop in Africa, a facilitator at the front and attendees seated at tables with laptops or notebooks, engaged expressions, natural indoor lighting, documentary editorial style, DSLR quality."

### 11. `src/assets/cap-happy-coder.jpg`
**Used on:** homepage hero marquee, CAP for-students section, admin defaults.
**Prompt:** "Photorealistic candid photo of a young African student smiling while looking at code on a laptop screen, genuine happy expression, casual setting, natural light, documentary style, DSLR quality."

### 12. `src/assets/young-developer.jpg`
**Used on:** homepage hero marquee, CAP project showcase, admin defaults.
**Prompt:** "Photorealistic candid photo of a young African developer coding on a laptop, focused expression, headphones optional, casual modern workspace, natural window light, documentary editorial style, DSLR quality."

---

## Other pages (still AI-generated — same reused image library, lower priority but worth doing for consistency)

### 13. `src/assets/mentorship-session.jpg`
**Used on:** Donation page, Get Involved page, and now also the EJP/GJP hero (just added).
**Prompt:** "Photorealistic candid photo of an African mentor and a younger mentee sitting together, mentor pointing at a laptop screen or notebook explaining something, warm supportive body language, natural indoor light, documentary editorial style, DSLR quality."

### 14. `src/assets/partnership-meeting.jpg`
**Used on:** Partnership page hero.
**Prompt:** "Photorealistic candid photo of a diverse business meeting around a table, African and international professionals shaking hands or discussing a partnership, natural office light, documentary editorial style, DSLR quality."

### 15. `src/assets/tech-conference.jpg`
**Used on:** About, Blog, Partnership.
**Prompt:** "Photorealistic candid photo of an audience at an African tech conference, people seated watching a stage, engaged expressions, venue lighting, documentary editorial style, DSLR quality."

### 16. `src/assets/tech-conference-speaker.jpg`
**Used on:** Blog, Partnership.
**Prompt:** "Photorealistic candid photo of an African speaker presenting on stage at a tech conference with a microphone, confident posture, stage lighting, documentary editorial style, DSLR quality, no readable text required on any screen behind them."

---

## Currently unused in code (optional — only do these if you plan to use them somewhere)

- `src/assets/cap-classroom.jpg`
- `src/assets/cap-man-studying.jpg`
- `src/assets/cap-woman-smiling.jpg`
- `src/assets/cap-woman-yellow.jpg`

These four files exist in the asset library but nothing in the code currently references them, so replacing them has no visible effect unless you wire them into a page later.

---

## Not AI-generated — leave these alone

- Everything in `src/assets/events/` and `src/assets/news/` — real camera photos from actual Sara Foundation Africa events (filenames like `DSC_3133-3.jpg`), pulled in through Lovable's asset system.
- `src/assets/logos/`, `src/assets/partners/`, `src/assets/team/` — real logos and headshots.

---

## What I already fixed in code (no image needed from you yet)

- **CAP Impact section** and **FLIP Impact section** on the program pages were flat, unanimated stat grids with no photo — I rebuilt both to match the rest of the site (scroll-in animation, a real event photo from your own archive: `DSC_3145.jpg` for CAP, `DSC_3379.jpg` for FLIP). You can swap either photo from `/admin/pages` → CAP Program / FLIP Program → "Impact Evidence & Numbers" / "Impact Numbers" → Images.
- **EJP/GJP hero** had no image and no CMS control at all — it's now a proper split hero (headline + two buttons on one side, a real photo on the other, defaulting to `mentorship-session.jpg`), editable from `/admin/pages` → EJP Pathway → "Overview & Referral Pathway" → Images.
- Every other hero on the site (homepage, CAP, FLIP) already had both a real image slot and a working CTA button — confirmed and left as-is.
- Swept the codebase for leftover lorem ipsum, console.logs, TODOs and dead code — found none.
