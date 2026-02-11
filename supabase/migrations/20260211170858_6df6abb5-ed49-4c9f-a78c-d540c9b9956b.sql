
-- Fix: restrict contact form INSERT to only allow specific columns (not is_read)
DROP POLICY "Anyone can submit contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    is_read = false
    AND first_name IS NOT NULL AND length(first_name) <= 100
    AND last_name IS NOT NULL AND length(last_name) <= 100
    AND email IS NOT NULL AND length(email) <= 255
    AND message IS NOT NULL AND length(message) <= 5000
  );

-- Fix: restrict newsletter INSERT with validation
DROP POLICY "Anyone can subscribe" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe"
  ON public.newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    is_active = true
    AND email IS NOT NULL AND length(email) <= 255
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  );
