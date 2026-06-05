
DROP POLICY IF EXISTS "Allow public inserts on flip applications" ON public.flip_applications;
DROP POLICY IF EXISTS "Allow authenticated inserts on flip applications" ON public.flip_applications;
DROP POLICY IF EXISTS "Allow all to submit applications" ON public.flip_applications;

ALTER TABLE public.flip_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit FLIP application"
ON public.flip_applications
FOR INSERT
WITH CHECK (
  payment_status = 'pending'
  AND paid_at IS NULL
  AND email IS NOT NULL AND length(email) <= 255
  AND first_name IS NOT NULL AND length(first_name) <= 100
  AND last_name IS NOT NULL AND length(last_name) <= 100
  AND country IS NOT NULL AND length(country) <= 100
  AND (state IS NULL OR length(state) <= 100)
  AND phone IS NOT NULL AND length(phone) <= 30
  AND age_range IS NOT NULL AND length(age_range) <= 30
  AND education IS NOT NULL AND length(education) <= 100
  AND (job_role IS NULL OR length(job_role) <= 150)
  AND experience IS NOT NULL AND length(experience) <= 50
  AND (interview_availability IS NULL OR length(interview_availability) <= 200)
  AND preferred_track IS NOT NULL AND length(preferred_track) <= 50
  AND (payment_currency IS NULL OR length(payment_currency) <= 10)
  AND (payment_amount IS NULL OR payment_amount = 0)
  AND paystack_reference IS NULL
);
