DROP POLICY IF EXISTS "Anyone can submit CAP application" ON public.cap_applications;
CREATE POLICY "Anyone can submit CAP application"
  ON public.cap_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    payment_status = 'pending'
    AND paid_amount = 0
    AND installments_completed = 0
    AND email IS NOT NULL AND length(email) <= 255
    AND full_name IS NOT NULL AND length(full_name) <= 200
    AND phone IS NOT NULL AND length(phone) <= 30
    AND country IS NOT NULL AND length(country) <= 100
    AND university IS NOT NULL AND length(university) <= 200
    AND payment_plan IN ('full','installments')
  );

DROP POLICY IF EXISTS "Anyone can submit FLIP application" ON public.flip_applications;
CREATE POLICY "Anyone can submit FLIP application"
  ON public.flip_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    payment_status = 'pending'
    AND paid_at IS NULL
    AND email IS NOT NULL AND length(email) <= 255
    AND first_name IS NOT NULL AND length(first_name) <= 100
    AND last_name IS NOT NULL AND length(last_name) <= 100
    AND country IS NOT NULL AND length(country) <= 100
    AND phone IS NOT NULL AND length(phone) <= 30
    AND preferred_track IS NOT NULL AND length(preferred_track) <= 50
    AND (payment_amount IS NULL OR payment_amount = 0)
    AND paystack_reference IS NULL
  );