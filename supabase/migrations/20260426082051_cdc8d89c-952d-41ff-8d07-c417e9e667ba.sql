
-- Fix 1: Inactive FAQ items should not be public
DROP POLICY IF EXISTS "FAQ items are publicly readable" ON public.faq_items;
CREATE POLICY "FAQ items are publicly readable"
ON public.faq_items
FOR SELECT
USING (is_active = true OR is_admin());

-- Fix 2: Restrict storage.objects SELECT for site-assets
-- Public can still read individual files via direct URL (bucket is public),
-- but cannot LIST the bucket via the storage API anonymously.
DROP POLICY IF EXISTS "Public can view site assets" ON storage.objects;
CREATE POLICY "Admin can list site assets"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'site-assets' AND is_admin());
