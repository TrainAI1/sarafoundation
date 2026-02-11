

# Admin Panel: Missing Features and Enhancement Plan

## What's Currently Working

- **Blog Management**: Create, edit, publish/unpublish, delete posts with categories, cover images, SEO preview
- **Page Editor**: Edit text/image fields for 17 page sections (hero, mission, impact, etc.)
- **Partners Manager**: Add/remove partners with logo uploads
- **Testimonials Manager**: Add/edit/remove testimonials with photos and ratings
- **Team Manager**: Core team and advisors with photos and bios
- **Site Settings**: General info, branding, contact, social links, newsletter config

## What's Missing (The Big Gaps)

### 1. Admin edits don't actually show on the website (CRITICAL)
This is the biggest issue. The admin saves data to the database, but the frontend pages (Hero, Testimonials, Partners, Footer, Team, etc.) all use **hardcoded data** -- they never fetch from the database. Saving in admin does nothing visible on the live site.

**Fix**: Every frontend section needs to fetch its content from the database and fall back to hardcoded defaults if nothing is saved yet.

Affected sections:
- HeroSection (hardcoded text and stats)
- MissionSection (hardcoded text and stats)
- ImpactSection (hardcoded stats)
- ProgramsSection (hardcoded descriptions)
- TestimonialsSection (hardcoded testimonial array)
- StrategicPartnersSection (hardcoded partner imports)
- CTASection (hardcoded text)
- FAQSection (hardcoded questions)
- NewsletterSection (hardcoded text)
- Footer (hardcoded contact info and social links)
- About page team section (hardcoded team data)
- Contact page (hardcoded contact info)

### 2. FAQ Management (Missing entirely)
The FAQ section on the homepage has hardcoded questions. There's no admin page to add, edit, reorder, or remove FAQ items.

### 3. SDG Section Management (Missing)
The SDG (Sustainable Development Goals) section is hardcoded with no admin control.

### 4. Navigation/Menu Editor (Missing)
No way to edit navigation links, reorder menu items, or add/remove pages from the nav bar -- a core Wix feature.

### 5. Media Library (Missing)
No central place to browse, search, and manage all uploaded images. Currently images are uploaded per-field with no overview.

### 6. Rich Text / Visual Blog Editor (Missing)
The blog editor is a plain textarea with markdown. A Wix-like editor would have a toolbar for bold, italic, headings, image insertion, links, etc.

### 7. Contact Form Submissions (Missing)
No way to view messages submitted through the contact form from the admin panel.

### 8. Newsletter Subscribers (Missing)
No admin view of newsletter signups or subscriber management.

### 9. Donation Page Content (Partially covered)
The page editor has fields for the donation page, but donation tiers/amounts and payment links are hardcoded.

### 10. Live Preview (Missing)
No way to preview changes before saving -- a key Wix feature. You save and hope it looks right.

### 11. Undo/Revision History (Missing)
No version history or ability to revert changes.

### 12. Drag-and-Drop Reordering (Missing)
Partners, testimonials, team members, and FAQ items can't be reordered by dragging.

### 13. Partnership Sub-pages (Missing from admin)
The School/Community, Organizations, and Sponsors partnership pages have hardcoded content with no admin control.

### 14. Programs Pages (Partially covered)
CAP and FLIP program pages have some admin fields but most content (phases, tracks, benefits, problems/solutions) is hardcoded.

---

## Implementation Plan

### Phase 1: Connect Admin to Frontend (Priority -- makes admin actually work)

**Create a shared hook** `usePageContent(slug)` that fetches page content from the database and returns it with fallback defaults. Then update every frontend section to use this hook.

Files to create:
- `src/hooks/usePageContent.ts` -- reusable hook

Files to update (connect to DB):
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/MissionSection.tsx`
- `src/components/sections/ImpactSection.tsx`
- `src/components/sections/ProgramsSection.tsx`
- `src/components/sections/TestimonialsSection.tsx`
- `src/components/sections/StrategicPartnersSection.tsx`
- `src/components/sections/CTASection.tsx`
- `src/components/sections/FAQSection.tsx`
- `src/components/sections/NewsletterSection.tsx`
- `src/components/layout/Footer.tsx`
- `src/pages/About.tsx` (team section)
- `src/pages/Contact.tsx` (contact info)

### Phase 2: Add Missing Admin Sections

- **FAQ Manager** (`src/pages/admin/AdminFAQ.tsx`) -- add/edit/remove/reorder FAQ items
- **Navigation Editor** (`src/pages/admin/AdminNavigation.tsx`) -- edit menu items and links
- **Media Library** (`src/pages/admin/AdminMedia.tsx`) -- browse all uploaded files in storage
- **Contact Submissions** (`src/pages/admin/AdminContacts.tsx`) -- view form submissions (requires new DB table `contact_submissions`)
- **Newsletter Subscribers** -- view subscriber list (requires new DB table `newsletter_subscribers`)

Database migration needed for:
- `contact_submissions` table (name, email, message, created_at)
- `newsletter_subscribers` table (email, subscribed_at)

### Phase 3: Enhanced Blog Editor

- Add a formatting toolbar (bold, italic, headings, lists, links, image insertion) above the content textarea
- Add live markdown preview panel beside the editor
- Add scheduled publishing (publish_at date field)
- Add tags support

### Phase 4: UX Improvements

- Add unsaved changes warning when navigating away
- Add "Preview on site" button that opens the relevant frontend page
- Add bulk actions for blog posts (bulk delete, bulk publish)
- Add search/filter to the page editor sections

### Technical Details

The `usePageContent` hook pattern:

```text
usePageContent("home-hero") returns:
  { data: Record<string, string>, loading: boolean }
  - Fetches from pages table where slug = "home-hero"
  - Returns content JSON merged with hardcoded defaults
  - Caches via React Query for performance
```

Admin layout update -- add new nav items:
- FAQ (under Content group)
- Media Library (new "Assets" group)
- Contact Submissions (new "Inbox" group)
- Navigation (under Settings group)

All new admin pages follow the existing pattern: fetch from `pages` table using a unique slug, edit in local state, save back to DB.

