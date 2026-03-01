

# Implementation Plan: Fix All Missing Features and Issues

## 1. Fix RLS Policies (RESTRICTIVE to PERMISSIVE)

All RLS policies across all tables are currently RESTRICTIVE, which blocks anonymous INSERT operations for contact forms and newsletter signups. A new database migration will recreate all policies as PERMISSIVE (the PostgreSQL default).

**Tables affected:** `blog_posts`, `contact_submissions`, `faq_items`, `newsletter_subscribers`, `pages`, `user_roles`

**Migration approach:** Drop and recreate each policy without the RESTRICTIVE keyword (PostgreSQL defaults to PERMISSIVE).

---

## 2. Add Markdown Rendering to Blog Posts

The public blog post page (`src/pages/BlogPost.tsx`) currently splits content by newlines and renders plain text. The admin editor already has a `markdownToHtml` function.

**Changes:**
- Extract the `markdownToHtml` function into a shared utility (`src/lib/markdown.ts`)
- Use it in `BlogPost.tsx` with `dangerouslySetInnerHTML` (content is admin-authored, not user-generated)
- Update the admin blog editor to import from the shared utility

---

## 3. Wire Up Blog Page Newsletter Subscribe Button

The newsletter form in `Blog.tsx` (lines 157-163) has no `onClick` handler. 

**Changes:**
- Add state for the email input and a submit handler that inserts into `newsletter_subscribers` (same pattern as `NewsletterSection.tsx` and `Footer.tsx`)

---

## 4. Add Missing Privacy Policy and Terms of Service Pages

The footer links to `/privacy` and `/terms` but no routes or pages exist.

**Changes:**
- Create `src/pages/Privacy.tsx` with standard privacy policy content for a non-profit
- Create `src/pages/Terms.tsx` with standard terms of service content
- Add routes in `App.tsx`

---

## 5. Remove Hardcoded Email Fallback from is_admin()

The `is_admin()` function has a hardcoded email fallback (`inememmanuel@gmail.com`). This will be removed so admin access relies solely on the `user_roles` table.

**Changes:**
- Database migration to update `is_admin()` to only use `has_role(auth.uid(), 'admin')`

---

## 6. Fix Admin Login - Remove Public Signup Toggle

The admin login page has a toggle to create accounts, which is a security risk. Only existing admins should be able to create admin accounts.

**Changes:**
- Remove the signup toggle and signup flow from `AdminLogin.tsx`
- Add a "Forgot Password" link with `resetPasswordForEmail`
- Create a `/admin/reset-password` page for password reset completion

---

## 7. Enhance Admin Dashboard with Contact and Newsletter Stats

The admin dashboard is missing counts for contact submissions and newsletter subscribers.

**Changes:**
- Add queries for `contact_submissions` count and `newsletter_subscribers` count in `AdminDashboard.tsx`
- Add two new stat cards (Contact Messages, Subscribers)

---

## 8. Clean Up AdminPages Stat Fields

The admin pages editor (`AdminPages.tsx`) still has stat fields for the Hero and Mission sections that were removed from the frontend.

**Changes:**
- Remove `stat1_value`, `stat1_label`, `stat2_value`, `stat2_label`, `stat3_value`, `stat3_label` fields from the `home-hero` page definition
- Remove similar stat fields from the `home-mission` page definition

---

## 9. Add Open Graph Meta Tags for Social Sharing

Add OG meta tags to key pages for better social media sharing.

**Changes:**
- Add `og:title`, `og:description`, `og:image`, `og:url`, `og:type` meta tags to `Index.tsx`, `About.tsx`, `Blog.tsx`, `BlogPost.tsx`, and program pages

---

## Technical Details

### File Changes Summary

| File | Action |
|------|--------|
| `supabase/migrations/new.sql` | Fix RESTRICTIVE policies, remove hardcoded email from is_admin() |
| `src/lib/markdown.ts` | New shared markdown utility |
| `src/pages/BlogPost.tsx` | Add markdown rendering |
| `src/pages/admin/AdminBlogEditor.tsx` | Import shared markdown utility |
| `src/pages/Blog.tsx` | Wire newsletter subscribe button |
| `src/pages/Privacy.tsx` | New page |
| `src/pages/Terms.tsx` | New page |
| `src/App.tsx` | Add /privacy, /terms, /admin/reset-password routes |
| `src/pages/admin/AdminLogin.tsx` | Remove signup, add forgot password |
| `src/pages/admin/AdminResetPassword.tsx` | New page for password reset |
| `src/pages/admin/AdminDashboard.tsx` | Add contact/newsletter stats |
| `src/pages/admin/AdminPages.tsx` | Remove orphaned stat fields |
| `src/pages/Index.tsx` | Add OG meta tags |
| `src/pages/About.tsx` | Add OG meta tags |
| `src/pages/Blog.tsx` | Add OG meta tags |
| `src/pages/BlogPost.tsx` | Add OG meta tags |

