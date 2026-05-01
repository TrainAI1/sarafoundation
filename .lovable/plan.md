# Plan: Hero header border + Govt Job Placement Program (GJP)

## 1. Hero header readability fix

In `src/components/sections/HeroSection.tsx`, the headline and subheadline sit directly under the transparent navbar on the homepage, making them hard to read.

Fix:
- Add a soft bottom border / divider on the navbar so the hero text edge is clearly separated from the header area.
- In `src/components/layout/Navbar.tsx`, when on the home page and not yet scrolled, switch from `bg-transparent` to a very light `bg-background/40 backdrop-blur-sm border-b border-border/30` so the logo + nav items are visible against the white hero, and there's a visible boundary between header and hero text.
- Keep scrolled state behavior unchanged.

No changes to hero typography or layout in this step.

## 2. New third program: "Govt Job Placement (GJP)"

A new flagship card on the homepage Programs section, a dedicated landing/info page, an application form page, a Paystack-backed ₦2,000 admin fee payment page, and a success page. Admin can view submissions in a new admin route.

### 2a. Database (migration)

New table `gjp_applications`:
- `id uuid pk default gen_random_uuid()`
- `full_name text not null` (≤200)
- `email text not null` (≤255)
- `whatsapp text not null` (≤30)
- `graduated boolean not null`
- `institution text` (≤200)
- `graduation_year text` (≤10)
- `nysc_completed boolean not null`
- `nysc_year text` (≤10)
- `career_path text not null` (≤150)
- `current_status text` (≤50) — e.g. unemployed / freelancing / part-time
- `state_of_residence text` (≤100)
- `is_cap_flip_alumnus boolean default false`
- `cap_flip_cohort text` (≤50)
- `referral_source text` (≤150)
- `additional_info text` (≤2000)
- `payment_status text not null default 'pending'`
- `payment_amount integer` (kobo, default 200000 = ₦2,000)
- `paystack_reference text`
- `paid_at timestamptz`
- `created_at timestamptz not null default now()`

RLS:
- Public INSERT with `payment_status='pending'` and length checks (mirroring `cap_applications`).
- Admin SELECT/UPDATE/DELETE via `is_admin()`.

### 2b. Edge functions

Two new functions modeled on the CAP versions:

- `supabase/functions/initialize-gjp-payment/index.ts` — fixed amount `200000` kobo (₦2,000), currency NGN, initializes Paystack, stores `paystack_reference`.
- `supabase/functions/verify-gjp-payment/index.ts` — verifies via Paystack, marks `payment_status='paid'`, sets `paid_at`, and triggers the existing `notify` function for admin email.

Both use `PAYSTACK_SECRET_KEY` (already configured) and `verify_jwt = false` (default).

### 2c. Frontend pages

New routes in `src/App.tsx`:
- `/programs/gjp` → `pages/programs/GJP.tsx`
- `/programs/gjp/apply` → `pages/programs/GJPApply.tsx`
- `/programs/gjp/payment` → `pages/programs/GJPPayment.tsx`
- `/programs/gjp/success` → `pages/programs/GJPSuccess.tsx`
- `/admin/gjp-applications` → `pages/admin/AdminGjpApplications.tsx`

`pages/programs/GJP.tsx` — landing page styled like `CAP.tsx`. Sections:
- Hero: "Exclusive Govt Job Placement Opportunity for NYSC Graduates — 500 Slots Only"
- Who can apply (graduate + NYSC completed)
- Why apply through Sara Foundation (500 of 30,000 priority slots)
- How it works (Apply → Shortlist → 1-week refresher training → Placement)
- Earnings note: up to ₦150,000/month, 12 months, Q3 2026 start
- Fee note: **₦2,000 admin/processing fee. Training and job referral are completely FREE.**
- Disclaimer: not 100% guaranteed
- CTA: "Apply Now" → `/programs/gjp/apply`

`pages/programs/GJPApply.tsx` — form using `react-hook-form` + `zod` (mirroring `FLIPApply.tsx`/`CAPApply.tsx`) capturing all fields above. On submit: insert into `gjp_applications` then navigate to `/programs/gjp/payment?id=<uuid>`.

`pages/programs/GJPPayment.tsx` — calls `initialize-gjp-payment`, opens Paystack inline (`@paystack/inline-js` pattern already in CAPPayment), shows ₦2,000 admin fee summary with copy: "This covers form processing/onboarding only. Training & referral are free."

`pages/programs/GJPSuccess.tsx` — verifies via `verify-gjp-payment` using `?reference=`, shows confirmation + next steps.

### 2d. Programs section on homepage

Update `src/components/sections/ProgramsSection.tsx`:
- Add third program object `gjp` with icon (e.g. `Briefcase`), title "Govt Job Placement (GJP)", subtitle "12-Month Paid Placement — 500 Slots", concise description, image (reuse `graduates-celebration.jpg`), `href: "/programs/gjp"`.
- Adjust grid from `lg:grid-cols-2` to `lg:grid-cols-3` with smaller padding so 3 cards fit; phases array: `Apply` / `Train` / `Placement`.

### 2e. Navbar Programs dropdown

In `src/components/layout/Navbar.tsx`, append to `programItems`:
```
{ title: "Govt Job Placement (GJP)", href: "/programs/gjp", description: "12-month paid placement for NYSC graduates" }
```

### 2f. Admin

- Add `pages/admin/AdminGjpApplications.tsx` modeled on `AdminCapApplications.tsx` — table view, search, payment status filter, CSV export.
- Add nav link in `pages/admin/AdminLayout.tsx`.

## Technical notes

- Paystack amount is in kobo: `200000` = ₦2,000.
- Currency is fixed NGN (no USD option for this program).
- Form validation with Zod, both client and DB-level (RLS length checks).
- `notify` edge function is already wired for similar submissions and can be reused with `type: "gjp_application"`.
- No changes to `client.ts` or `types.ts` (auto-regenerated after migration).

## Out of scope

- Any changes to existing CAP/FLIP payment flows.
- Email templating beyond reusing the existing `notify` function.
- Refund logic.
