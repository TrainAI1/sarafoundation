CREATE POLICY "Anyone can submit GJP application"
ON public.gjp_applications
FOR INSERT
TO public
WITH CHECK (
  payment_status = 'pending'
  AND applicant_status = 'submitted'
  AND full_name IS NOT NULL AND length(full_name) <= 200
  AND email IS NOT NULL AND length(email) <= 255
  AND whatsapp IS NOT NULL AND length(whatsapp) <= 30
  AND career_path IS NOT NULL AND length(career_path) <= 150
  AND (institution IS NULL OR length(institution) <= 200)
  AND (graduation_year IS NULL OR length(graduation_year) <= 10)
  AND (nysc_year IS NULL OR length(nysc_year) <= 10)
  AND (current_status IS NULL OR length(current_status) <= 50)
  AND (state_of_residence IS NULL OR length(state_of_residence) <= 100)
  AND (cap_flip_cohort IS NULL OR length(cap_flip_cohort) <= 50)
  AND (referral_source IS NULL OR length(referral_source) <= 150)
  AND (additional_info IS NULL OR length(additional_info) <= 2000)
);