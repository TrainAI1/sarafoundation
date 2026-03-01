
-- Fix RESTRICTIVE RLS policies to PERMISSIVE across all tables
-- and remove hardcoded email from is_admin()

-- ==================== blog_posts ====================
DROP POLICY IF EXISTS "Published posts are publicly readable" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin can insert posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin can update posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin can delete posts" ON public.blog_posts;

CREATE POLICY "Published posts are publicly readable" ON public.blog_posts FOR SELECT USING ((published = true) OR is_admin());
CREATE POLICY "Admin can insert posts" ON public.blog_posts FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admin can update posts" ON public.blog_posts FOR UPDATE USING (is_admin());
CREATE POLICY "Admin can delete posts" ON public.blog_posts FOR DELETE USING (is_admin());

-- ==================== contact_submissions ====================
DROP POLICY IF EXISTS "Admin can view submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admin can update submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admin can delete submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

CREATE POLICY "Admin can view submissions" ON public.contact_submissions FOR SELECT USING (is_admin());
CREATE POLICY "Admin can update submissions" ON public.contact_submissions FOR UPDATE USING (is_admin());
CREATE POLICY "Admin can delete submissions" ON public.contact_submissions FOR DELETE USING (is_admin());
CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions FOR INSERT WITH CHECK (
  (is_read = false) AND (first_name IS NOT NULL) AND (length(first_name) <= 100)
  AND (last_name IS NOT NULL) AND (length(last_name) <= 100)
  AND (email IS NOT NULL) AND (length(email) <= 255)
  AND (message IS NOT NULL) AND (length(message) <= 5000)
);

-- ==================== faq_items ====================
DROP POLICY IF EXISTS "FAQ items are publicly readable" ON public.faq_items;
DROP POLICY IF EXISTS "Admin can insert FAQ items" ON public.faq_items;
DROP POLICY IF EXISTS "Admin can update FAQ items" ON public.faq_items;
DROP POLICY IF EXISTS "Admin can delete FAQ items" ON public.faq_items;

CREATE POLICY "FAQ items are publicly readable" ON public.faq_items FOR SELECT USING (true);
CREATE POLICY "Admin can insert FAQ items" ON public.faq_items FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admin can update FAQ items" ON public.faq_items FOR UPDATE USING (is_admin());
CREATE POLICY "Admin can delete FAQ items" ON public.faq_items FOR DELETE USING (is_admin());

-- ==================== newsletter_subscribers ====================
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admin can view subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admin can update subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admin can delete subscribers" ON public.newsletter_subscribers;

CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscribers FOR INSERT WITH CHECK (
  (is_active = true) AND (email IS NOT NULL) AND (length(email) <= 255)
  AND (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::text)
);
CREATE POLICY "Admin can view subscribers" ON public.newsletter_subscribers FOR SELECT USING (is_admin());
CREATE POLICY "Admin can update subscribers" ON public.newsletter_subscribers FOR UPDATE USING (is_admin());
CREATE POLICY "Admin can delete subscribers" ON public.newsletter_subscribers FOR DELETE USING (is_admin());

-- ==================== pages ====================
DROP POLICY IF EXISTS "Pages are publicly readable" ON public.pages;
DROP POLICY IF EXISTS "Admin can insert pages" ON public.pages;
DROP POLICY IF EXISTS "Admin can update pages" ON public.pages;
DROP POLICY IF EXISTS "Admin can delete pages" ON public.pages;

CREATE POLICY "Pages are publicly readable" ON public.pages FOR SELECT USING (true);
CREATE POLICY "Admin can insert pages" ON public.pages FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admin can update pages" ON public.pages FOR UPDATE USING (is_admin());
CREATE POLICY "Admin can delete pages" ON public.pages FOR DELETE USING (is_admin());

-- ==================== user_roles ====================
DROP POLICY IF EXISTS "Admins can view roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;

CREATE POLICY "Admins can view roles" ON public.user_roles FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert roles" ON public.user_roles FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update roles" ON public.user_roles FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete roles" ON public.user_roles FOR DELETE USING (is_admin());

-- ==================== Remove hardcoded email from is_admin() ====================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT coalesce(
    (auth.uid() IS NOT NULL) AND public.has_role(auth.uid(), 'admin'),
    false
  )
$$;
