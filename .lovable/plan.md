## Goal
Turn the admin from a single-role CMS into a multi-role operations console: granular roles, real analytics, audit trail, application workflows, and bulk operations.

## 1. Roles & permissions

Add two new app_role values: `editor`, `moderator` (existing: `admin`, `moderator`, `user`). Permissions:

| Area | admin | editor | moderator | viewer-only |
|---|---|---|---|---|
| Dashboard / Analytics | ✅ | ✅ | ✅ | read |
| Blog, Pages, FAQ, Partners, Testimonials, Team, Media | ✅ | ✅ | ❌ | ❌ |
| Site Settings, Site Health | ✅ | ❌ | ❌ | ❌ |
| Contacts, Newsletter, CAP/FLIP/GJP applications | ✅ | ❌ | ✅ | ❌ |
| User & role management, Audit log | ✅ | ❌ | ❌ | ❌ |

New DB helpers (SECURITY DEFINER): `can_edit_content()`, `can_moderate_submissions()`. RLS policies extended on content tables (allow editor) and submission tables (allow moderator) — admin keeps everything.

## 2. New tables

- `admin_audit_log` — actor_id, actor_email, action, entity, entity_id, summary, metadata jsonb, ip, created_at. Admin read-only.
- `application_notes` — application_type (cap/flip/gjp/contact), application_id, author_id, body, created_at. Admin + moderator manage; logged in audit log.
- Status/assignee columns added to `cap_applications` and `flip_applications` (mirrors `gjp_applications`): `applicant_status text default 'new'`, `status_notes text`, `status_updated_at timestamptz`, `assigned_to uuid references auth.users`. Trigger updates `status_updated_at` when status changes.

## 3. Dashboard rewrite (real data)

Replace AdminDashboard with a KPI console pulling from DB:
- KPI cards: contacts (24h / 7d / total), newsletter subs, applications by program with week-over-week deltas, donations stub.
- Charts (recharts): applications-over-time stacked area (CAP / FLIP / GJP, last 30 days), funnel by status (new → review → shortlist → accepted), contact submissions bar, top universities.
- Inbox preview: latest 5 contacts and 5 applications, with role-aware links.
- Quick actions filtered by current role.

## 4. New admin pages

- `/admin/users` — list auth users with role badges, assign/revoke roles (admin/editor/moderator), invite-by-email (creates pending invite row + magic link), uses `prevent_last_admin_*` triggers.
- `/admin/audit-log` — searchable, filter by actor/action/date; CSV export.

## 5. Workflow upgrades on application pages

For Contacts, CAP, FLIP, GJP, Newsletter:
- Multi-select rows + sticky bulk-action bar: change status, assign to user, export CSV, mark spam, delete.
- Advanced filter chips: status, date range, university/country, search.
- Per-row detail drawer: full record, internal notes thread (`application_notes`), status pipeline buttons (new / review / shortlisted / accepted / rejected), assignee dropdown.
- All mutations write to `admin_audit_log`.

## 6. Layout & auth

- `useAdmin()` returns `{ roles, isAdmin, canEditContent, canModerate, loading }`.
- `AdminLayout` filters sidebar groups by capability; non-permitted routes redirect to dashboard with toast.
- Header gains role badge + active-user count.

## 7. Technical details

- Migration in one batch: new enum value, helper functions, audit/notes tables (with grants + RLS), columns + triggers, complementary RLS policies for editor/moderator on existing tables.
- Audit log written via small helper hook `useAuditLog().log(action, entity, ...)` (client-side, but enforced by RLS that only admins read).
- Bulk operations done with `.in('id', ids)` updates wrapped in Promise.all where atomic isn't required.
- Stick to existing design tokens (`card-modern`, `bg-primary/10`, etc.) — no visual redesign.

I'll start with the migration, then ship all code in one pass once the schema is in.