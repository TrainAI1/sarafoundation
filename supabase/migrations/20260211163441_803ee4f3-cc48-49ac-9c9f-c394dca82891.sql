
-- Create storage bucket for admin uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets', 'site-assets', true);

-- Allow anyone to view uploaded images
CREATE POLICY "Public can view site assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-assets');

-- Only admin can upload
CREATE POLICY "Admin can upload site assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'site-assets' AND public.is_admin());

-- Only admin can update
CREATE POLICY "Admin can update site assets"
ON storage.objects FOR UPDATE
USING (bucket_id = 'site-assets' AND public.is_admin());

-- Only admin can delete
CREATE POLICY "Admin can delete site assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'site-assets' AND public.is_admin());
