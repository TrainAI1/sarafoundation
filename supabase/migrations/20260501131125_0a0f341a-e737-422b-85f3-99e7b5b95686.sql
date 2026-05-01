
CREATE TABLE public.gjp_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  graduated BOOLEAN NOT NULL,
  institution TEXT,
  graduation_year TEXT,
  nysc_completed BOOLEAN NOT NULL,
  nysc_year TEXT,
  career_path TEXT NOT NULL,
  current_status TEXT,
  state_of_residence TEXT,
  is_cap_flip_alumnus BOOLEAN NOT NULL DEFAULT false,
  cap_flip_cohort TEXT,
  referral_source TEXT,
  additional_info TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_amount INTEGER DEFAULT 200000,
  paystack_reference TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.gjp_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit GJP application"
ON public.gjp_applications
FOR INSERT
TO public
WITH CHECK (
  payment_status = 'pending'
  AND email IS NOT NULL AND length(email) <= 255
  AND full_name IS NOT NULL AND length(full_name) <= 200
  AND whatsapp IS NOT NULL AND length(whatsapp) <= 30
  AND (institution IS NULL OR length(institution) <= 200)
  AND (graduation_year IS NULL OR length(graduation_year) <= 10)
  AND (nysc_year IS NULL OR length(nysc_year) <= 10)
  AND career_path IS NOT NULL AND length(career_path) <= 150
  AND (current_status IS NULL OR length(current_status) <= 50)
  AND (state_of_residence IS NULL OR length(state_of_residence) <= 100)
  AND (cap_flip_cohort IS NULL OR length(cap_flip_cohort) <= 50)
  AND (referral_source IS NULL OR length(referral_source) <= 150)
  AND (additional_info IS NULL OR length(additional_info) <= 2000)
);

CREATE POLICY "Admin can view GJP applications"
ON public.gjp_applications
FOR SELECT
TO authenticated
USING (is_admin());

CREATE POLICY "Admin can update GJP applications"
ON public.gjp_applications
FOR UPDATE
TO authenticated
USING (is_admin());

CREATE POLICY "Admin can delete GJP applications"
ON public.gjp_applications
FOR DELETE
TO authenticated
USING (is_admin());

CREATE INDEX idx_gjp_applications_created_at ON public.gjp_applications(created_at DESC);
CREATE INDEX idx_gjp_applications_payment_status ON public.gjp_applications(payment_status);
CREATE INDEX idx_gjp_applications_paystack_reference ON public.gjp_applications(paystack_reference);
