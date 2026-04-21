-- Create flip_applications table
CREATE TABLE public.flip_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  country TEXT NOT NULL,
  state TEXT,
  phone TEXT NOT NULL,
  age_range TEXT NOT NULL,
  education TEXT NOT NULL,
  job_role TEXT,
  experience TEXT NOT NULL,
  commitment BOOLEAN NOT NULL DEFAULT false,
  interview_availability TEXT,
  preferred_track TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_currency TEXT,
  payment_amount INTEGER,
  paystack_reference TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  paid_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.flip_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an application (with validation)
CREATE POLICY "Anyone can submit FLIP application"
ON public.flip_applications
FOR INSERT
TO public
WITH CHECK (
  payment_status = 'pending'
  AND email IS NOT NULL AND length(email) <= 255
  AND first_name IS NOT NULL AND length(first_name) <= 100
  AND last_name IS NOT NULL AND length(last_name) <= 100
  AND country IS NOT NULL AND length(country) <= 100
  AND (state IS NULL OR length(state) <= 100)
  AND phone IS NOT NULL AND length(phone) <= 30
  AND length(age_range) <= 30
  AND length(education) <= 100
  AND (job_role IS NULL OR length(job_role) <= 200)
  AND length(experience) <= 50
  AND (interview_availability IS NULL OR length(interview_availability) <= 500)
  AND length(preferred_track) <= 50
);

-- Admin policies
CREATE POLICY "Admin can view FLIP applications"
ON public.flip_applications
FOR SELECT
TO authenticated
USING (is_admin());

CREATE POLICY "Admin can update FLIP applications"
ON public.flip_applications
FOR UPDATE
TO authenticated
USING (is_admin());

CREATE POLICY "Admin can delete FLIP applications"
ON public.flip_applications
FOR DELETE
TO authenticated
USING (is_admin());

-- Index for admin lookups
CREATE INDEX idx_flip_apps_status ON public.flip_applications(payment_status, created_at DESC);
CREATE INDEX idx_flip_apps_reference ON public.flip_applications(paystack_reference);