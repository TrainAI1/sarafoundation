
-- Drop dependent policy first
DROP POLICY IF EXISTS "Anyone can submit GJP application" ON public.gjp_applications;

-- Drop payment-related columns
ALTER TABLE public.gjp_applications
  DROP COLUMN IF EXISTS payment_status,
  DROP COLUMN IF EXISTS payment_amount,
  DROP COLUMN IF EXISTS paystack_reference,
  DROP COLUMN IF EXISTS paid_at;

-- Add NYSC call-up number (optional)
ALTER TABLE public.gjp_applications
  ADD COLUMN IF NOT EXISTS nysc_number text;

-- Recreate status lookup RPCs without payment fields
DROP FUNCTION IF EXISTS public.get_gjp_status_by_email_ref(text, text);
DROP FUNCTION IF EXISTS public.get_gjp_status_by_email_appid(text, text);

CREATE OR REPLACE FUNCTION public.get_gjp_status_by_email_appid(_email text, _app_id_prefix text)
RETURNS TABLE(full_name text, career_path text, applicant_status text, status_notes text, status_updated_at timestamp with time zone, created_at timestamp with time zone)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT g.full_name, g.career_path, g.applicant_status,
         g.status_notes, g.status_updated_at, g.created_at
  FROM public.gjp_applications g
  WHERE lower(g.email) = lower(_email)
    AND substring(g.id::text, 1, 8) = lower(_app_id_prefix)
  ORDER BY g.created_at DESC
  LIMIT 1
$function$;

-- Recreate public INSERT RLS policy
CREATE POLICY "Anyone can submit GJP application"
ON public.gjp_applications
FOR INSERT
TO public
WITH CHECK (
  applicant_status = 'submitted'
  AND full_name IS NOT NULL AND length(full_name) <= 200
  AND email IS NOT NULL AND length(email) <= 255
  AND whatsapp IS NOT NULL AND length(whatsapp) <= 30
  AND career_path IS NOT NULL AND length(career_path) <= 150
  AND (institution IS NULL OR length(institution) <= 200)
  AND graduation_year IS NOT NULL
  AND graduation_year IN ('2022','2023','2024','2025','2026')
  AND (nysc_year IS NULL OR length(nysc_year) <= 10)
  AND (nysc_number IS NULL OR length(nysc_number) <= 50)
  AND (current_status IS NULL OR length(current_status) <= 50)
  AND (state_of_residence IS NULL OR length(state_of_residence) <= 100)
  AND (cap_flip_cohort IS NULL OR length(cap_flip_cohort) <= 50)
  AND (referral_source IS NULL OR length(referral_source) <= 150)
  AND (additional_info IS NULL OR length(additional_info) <= 2000)
  AND (tech_skills_rating IS NULL OR length(tech_skills_rating) <= 1000)
);
