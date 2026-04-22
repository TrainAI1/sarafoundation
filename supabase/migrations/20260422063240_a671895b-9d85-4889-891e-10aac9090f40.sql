CREATE TABLE public.cap_applications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  country text NOT NULL,
  university text NOT NULL,
  year_of_study text NOT NULL,
  preferred_track text NOT NULL,
  specialization text,
  motivation text,
  referral_source text,
  payment_plan text NOT NULL DEFAULT 'full',
  payment_currency text,
  total_amount integer,
  paid_amount integer NOT NULL DEFAULT 0,
  installments_completed integer NOT NULL DEFAULT 0,
  payment_status text NOT NULL DEFAULT 'pending',
  paystack_reference text,
  paid_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.cap_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit CAP application"
ON public.cap_applications
FOR INSERT
TO public
WITH CHECK (
  payment_status = 'pending'
  AND paid_amount = 0
  AND installments_completed = 0
  AND email IS NOT NULL AND length(email) <= 255
  AND full_name IS NOT NULL AND length(full_name) <= 200
  AND phone IS NOT NULL AND length(phone) <= 30
  AND country IS NOT NULL AND length(country) <= 100
  AND university IS NOT NULL AND length(university) <= 200
  AND length(year_of_study) <= 30
  AND length(preferred_track) <= 50
  AND (specialization IS NULL OR length(specialization) <= 100)
  AND (motivation IS NULL OR length(motivation) <= 2000)
  AND (referral_source IS NULL OR length(referral_source) <= 100)
  AND payment_plan IN ('full', 'installments')
);

CREATE POLICY "Admin can view CAP applications"
ON public.cap_applications
FOR SELECT
TO authenticated
USING (is_admin());

CREATE POLICY "Admin can update CAP applications"
ON public.cap_applications
FOR UPDATE
TO authenticated
USING (is_admin());

CREATE POLICY "Admin can delete CAP applications"
ON public.cap_applications
FOR DELETE
TO authenticated
USING (is_admin());

CREATE INDEX idx_cap_applications_status ON public.cap_applications(payment_status, created_at DESC);
CREATE INDEX idx_cap_applications_reference ON public.cap_applications(paystack_reference);