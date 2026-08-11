-- Split public-read policies so anonymous visitors never evaluate is_admin()
DROP POLICY IF EXISTS "Published posts are publicly readable" ON public.blog_posts;
CREATE POLICY "Published posts are publicly readable" ON public.blog_posts FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Admins can view all posts" ON public.blog_posts FOR SELECT TO authenticated USING (is_admin());

DROP POLICY IF EXISTS "FAQ items are publicly readable" ON public.faq_items;
CREATE POLICY "FAQ items are publicly readable" ON public.faq_items FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Admins can view all FAQ items" ON public.faq_items FOR SELECT TO authenticated USING (is_admin());

DROP POLICY IF EXISTS "Partners are publicly readable" ON public.partners;
CREATE POLICY "Partners are publicly readable" ON public.partners FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Admins can view all partners" ON public.partners FOR SELECT TO authenticated USING (is_admin());

GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT SELECT ON public.faq_items TO anon, authenticated;
GRANT SELECT ON public.partners TO anon, authenticated;