-- Scope every staff/admin policy to authenticated so anon never evaluates admin helper functions
DROP POLICY IF EXISTS "Admins can read audit log" ON public.admin_audit_log;
CREATE POLICY "Admins can read audit log" ON public.admin_audit_log FOR SELECT TO authenticated USING (is_admin());
DROP POLICY IF EXISTS "Staff can insert audit entries" ON public.admin_audit_log;
CREATE POLICY "Staff can insert audit entries" ON public.admin_audit_log FOR INSERT TO authenticated WITH CHECK ((auth.uid() IS NOT NULL) AND (is_admin() OR can_edit_content() OR can_moderate_submissions()) AND (actor_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can delete notes" ON public.application_notes;
CREATE POLICY "Admins can delete notes" ON public.application_notes FOR DELETE TO authenticated USING (is_admin() OR (author_id = auth.uid()));
DROP POLICY IF EXISTS "Authors can edit own notes" ON public.application_notes;
CREATE POLICY "Authors can edit own notes" ON public.application_notes FOR UPDATE TO authenticated USING ((author_id = auth.uid()) OR is_admin());
DROP POLICY IF EXISTS "Staff can add notes" ON public.application_notes;
CREATE POLICY "Staff can add notes" ON public.application_notes FOR INSERT TO authenticated WITH CHECK ((is_admin() OR can_moderate_submissions()) AND (author_id = auth.uid()));
DROP POLICY IF EXISTS "Staff can read notes" ON public.application_notes;
CREATE POLICY "Staff can read notes" ON public.application_notes FOR SELECT TO authenticated USING (is_admin() OR can_moderate_submissions());

DROP POLICY IF EXISTS "Editors can manage blog posts" ON public.blog_posts;
CREATE POLICY "Editors can manage blog posts" ON public.blog_posts FOR ALL TO authenticated USING (can_edit_content()) WITH CHECK (can_edit_content());

DROP POLICY IF EXISTS "Moderators can update cap apps" ON public.cap_applications;
CREATE POLICY "Moderators can update cap apps" ON public.cap_applications FOR UPDATE TO authenticated USING (can_moderate_submissions());
DROP POLICY IF EXISTS "Moderators can view cap apps" ON public.cap_applications;
CREATE POLICY "Moderators can view cap apps" ON public.cap_applications FOR SELECT TO authenticated USING (can_moderate_submissions());

DROP POLICY IF EXISTS "Moderators can update contacts" ON public.contact_submissions;
CREATE POLICY "Moderators can update contacts" ON public.contact_submissions FOR UPDATE TO authenticated USING (can_moderate_submissions());
DROP POLICY IF EXISTS "Moderators can view contacts" ON public.contact_submissions;
CREATE POLICY "Moderators can view contacts" ON public.contact_submissions FOR SELECT TO authenticated USING (can_moderate_submissions());

DROP POLICY IF EXISTS "Editors can manage faq" ON public.faq_items;
CREATE POLICY "Editors can manage faq" ON public.faq_items FOR ALL TO authenticated USING (can_edit_content()) WITH CHECK (can_edit_content());

DROP POLICY IF EXISTS "Moderators can view flip apps" ON public.flip_applications;
CREATE POLICY "Moderators can view flip apps" ON public.flip_applications FOR SELECT TO authenticated USING (can_moderate_submissions());
DROP POLICY IF EXISTS "Moderators can update flip apps" ON public.flip_applications;
CREATE POLICY "Moderators can update flip apps" ON public.flip_applications FOR UPDATE TO authenticated USING (can_moderate_submissions());

DROP POLICY IF EXISTS "Moderators can view gjp apps" ON public.gjp_applications;
CREATE POLICY "Moderators can view gjp apps" ON public.gjp_applications FOR SELECT TO authenticated USING (can_moderate_submissions());
DROP POLICY IF EXISTS "Moderators can update gjp apps" ON public.gjp_applications;
CREATE POLICY "Moderators can update gjp apps" ON public.gjp_applications FOR UPDATE TO authenticated USING (can_moderate_submissions());

DROP POLICY IF EXISTS "Moderators can view newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Moderators can view newsletter" ON public.newsletter_subscribers FOR SELECT TO authenticated USING (can_moderate_submissions());

DROP POLICY IF EXISTS "Editors can manage pages" ON public.pages;
CREATE POLICY "Editors can manage pages" ON public.pages FOR ALL TO authenticated USING (can_edit_content()) WITH CHECK (can_edit_content());

DROP POLICY IF EXISTS "Admins manage partner codes" ON public.partner_codes;
CREATE POLICY "Admins manage partner codes" ON public.partner_codes FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Editors can manage partners" ON public.partners;
CREATE POLICY "Editors can manage partners" ON public.partners FOR ALL TO authenticated USING (can_edit_content()) WITH CHECK (can_edit_content());
DROP POLICY IF EXISTS "Admin can delete partners" ON public.partners;
CREATE POLICY "Admin can delete partners" ON public.partners FOR DELETE TO authenticated USING (is_admin());
DROP POLICY IF EXISTS "Admin can update partners" ON public.partners;
CREATE POLICY "Admin can update partners" ON public.partners FOR UPDATE TO authenticated USING (is_admin());
DROP POLICY IF EXISTS "Admin can insert partners" ON public.partners;
CREATE POLICY "Admin can insert partners" ON public.partners FOR INSERT TO authenticated WITH CHECK (is_admin());