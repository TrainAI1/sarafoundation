
ALTER TABLE public.cap_applications
  ADD COLUMN IF NOT EXISTS gender text,
  ADD COLUMN IF NOT EXISTS date_of_birth date,
  ADD COLUMN IF NOT EXISTS education_level text,
  ADD COLUMN IF NOT EXISTS course_of_study text,
  ADD COLUMN IF NOT EXISTS referral_source_other text;

-- Update RLS check policy to also allow 'waiver' plan (waiver path also goes via edge function w/ service role, but keep consistent)
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
  AND payment_plan = ANY (ARRAY['full'::text, 'installments'::text])
);
