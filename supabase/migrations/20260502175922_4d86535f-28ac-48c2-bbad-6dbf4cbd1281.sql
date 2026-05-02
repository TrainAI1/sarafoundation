-- 1. Add status tracking columns
ALTER TABLE public.gjp_applications
  ADD COLUMN IF NOT EXISTS applicant_status text NOT NULL DEFAULT 'submitted',
  ADD COLUMN IF NOT EXISTS status_notes text,
  ADD COLUMN IF NOT EXISTS status_updated_at timestamptz NOT NULL DEFAULT now();

-- 2. Constrain to known values
ALTER TABLE public.gjp_applications
  DROP CONSTRAINT IF EXISTS gjp_applications_applicant_status_check;
ALTER TABLE public.gjp_applications
  ADD CONSTRAINT gjp_applications_applicant_status_check
  CHECK (applicant_status IN ('submitted','under_review','shortlisted','training','placed','rejected','withdrawn'));

-- 3. Auto-update status_updated_at when applicant_status changes
CREATE OR REPLACE FUNCTION public.touch_gjp_status()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.applicant_status IS DISTINCT FROM OLD.applicant_status THEN
    NEW.status_updated_at = now();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_touch_gjp_status ON public.gjp_applications;
CREATE TRIGGER trg_touch_gjp_status
BEFORE UPDATE ON public.gjp_applications
FOR EACH ROW
EXECUTE FUNCTION public.touch_gjp_status();

-- 4. Public status lookup (email + reference). Returns nothing if mismatch.
CREATE OR REPLACE FUNCTION public.get_gjp_status_by_email_ref(_email text, _reference text)
RETURNS TABLE (
  full_name text,
  career_path text,
  payment_status text,
  applicant_status text,
  status_notes text,
  status_updated_at timestamptz,
  created_at timestamptz
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT g.full_name, g.career_path, g.payment_status, g.applicant_status,
         g.status_notes, g.status_updated_at, g.created_at
  FROM public.gjp_applications g
  WHERE lower(g.email) = lower(_email)
    AND g.paystack_reference = _reference
  LIMIT 1
$$;

GRANT EXECUTE ON FUNCTION public.get_gjp_status_by_email_ref(text, text) TO anon, authenticated;