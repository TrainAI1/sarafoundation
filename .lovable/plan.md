

# FLIP Fellowship Application + Payment Flow

Build a beautiful, on-site enrollment experience that replaces the Google Form link. Applicants fill a multi-step native form, then pay ₦1,000 (NGN) or $1 (USD) via Paystack. Only after payment confirmation are they marked as enrolled and emailed a confirmation.

## User Flow

```text
[Join FLIP button]
      ↓
[/programs/flip/apply]
  Step 1: Personal Info     (email, names, country, state, phone)
  Step 2: Background        (age range, education, job role, experience)
  Step 3: Commitment        (5hrs/week, interview availability, track)
      ↓
[Review & Submit]  → application saved (status: pending_payment)
      ↓
[/programs/flip/payment?app=:id]
  Choose currency: NGN ₦1,000  |  USD $1
  → Paystack inline checkout opens
      ↓
[Paystack callback → verify-flip-payment edge function]
  Verify with Paystack API → mark application paid → send confirmation email
      ↓
[/programs/flip/success]  "You're officially enrolled!"
```

## What Gets Built

### 1. New Page: `src/pages/programs/FLIPApply.tsx`
Multi-step wizard matching site UI (uses existing `Card`, `Button`, `Input`, `Select`, `RadioGroup`, `Progress` components and the accent gradient). Features:
- Progress bar (Step X of 3)
- Per-step validation with `react-hook-form` + `zod`
- Back/Next navigation, data preserved between steps
- Mobile-first (single column, large touch targets)
- Final review screen before submission

Form fields (mirrors the Google Form):
- Email, First Name, Last Name, Country, State, Phone (WhatsApp)
- Age range (dropdown), Highest education (radio), Current job role
- Years of experience (radio), Can commit 5hrs/week (yes/no)
- Interview availability (text), Preferred track (No-Code / Code / Tech-preneur)

### 2. New Page: `src/pages/programs/FLIPPayment.tsx`
- Shows submitted summary
- Currency selector card: **₦1,000 (Nigeria)** or **$1 (Global)**
- "Pay Now" button → opens Paystack inline popup (`@paystack/inline-js`)
- On success → calls `verify-flip-payment` edge function → redirects to success page
- On failure → friendly retry message

### 3. New Page: `src/pages/programs/FLIPSuccess.tsx`
Celebration screen with confirmation, next steps, WhatsApp community link, and "Back to FLIP" CTA.

### 4. Database (1 new table)
```sql
flip_applications (
  id uuid PK,
  email, first_name, last_name, country, state, phone,
  age_range, education, job_role, experience,
  commitment boolean, interview_availability, preferred_track,
  payment_status text default 'pending',  -- pending | paid | failed
  payment_currency text,                   -- NGN | USD
  payment_amount integer,                  -- in kobo/cents
  paystack_reference text,
  created_at, paid_at
)
```
RLS: public INSERT (with field validation), admin SELECT/UPDATE/DELETE — same pattern as `contact_submissions`.

### 5. Edge Functions
- **`initialize-flip-payment`** — Creates a Paystack transaction, returns `access_code` + `reference` for inline checkout. Validates application exists and is unpaid.
- **`verify-flip-payment`** — Called after checkout. Verifies reference with Paystack API, updates `payment_status = 'paid'`, sets `paid_at`, sends confirmation email via existing `notify` function pattern.

### 6. Admin Dashboard
New section in `AdminLayout` sidebar: **"FLIP Applications"** (`/admin/flip-applications`)
- Table listing all applications with payment status badges (Pending / Paid / Failed)
- Filter by status, search by email/name
- Click row → detail drawer with full submission + payment reference
- Export CSV button

### 7. Wire Up Existing Buttons
Replace external Google Form links in:
- `FLIPHeroSection.tsx` "Join FLIP" → `/programs/flip/apply`
- `FLIPCTASection.tsx` "Become a Member" → `/programs/flip/apply`
- `Contact.tsx` "Join FLIP Fellowship" → `/programs/flip/apply`

### 8. Routes added in `App.tsx`
- `/programs/flip/apply`
- `/programs/flip/payment`
- `/programs/flip/success`
- `/admin/flip-applications`

## Required Secret

To process real payments I need your **Paystack Secret Key** (starts with `sk_live_…` or `sk_test_…`).

How to get it:
1. Sign in to dashboard.paystack.com
2. Settings → API Keys & Webhooks
3. Copy the **Secret Key**

Paystack accepts both NGN (₦1,000) and USD ($1) — single integration covers both. I'll request it after you approve this plan.

## Email Notifications

For the "you're enrolled" confirmation email, the project currently uses the `notify` edge function for server-side logging only. I'll extend it (or add a lightweight send) using the existing pattern. If you want a real branded email delivered to the applicant, I'll set up Lovable's built-in email system as part of this work — no external account needed.

## Out of Scope (won't change)

- Existing CAP enrollment Google Form stays as-is unless you ask
- Floating Donate button, design system, color palette unchanged
- No changes to other forms or pages

