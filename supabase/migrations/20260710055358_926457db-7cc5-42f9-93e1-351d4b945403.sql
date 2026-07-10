
CREATE OR REPLACE FUNCTION public.get_cap_application_for_payment(_id uuid)
RETURNS TABLE(
  id uuid,
  email text,
  full_name text,
  payment_status text,
  payment_plan text,
  payment_currency text,
  paid_amount integer,
  installments_completed integer,
  preferred_track text,
  partner_code text,
  partner_code_id uuid
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT c.id, c.email, c.full_name, c.payment_status, c.payment_plan,
         c.payment_currency, c.paid_amount, c.installments_completed,
         c.preferred_track, c.partner_code, c.partner_code_id
  FROM public.cap_applications c
  WHERE c.id = _id
  LIMIT 1
$$;

REVOKE ALL ON FUNCTION public.get_cap_application_for_payment(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_cap_application_for_payment(uuid) TO anon, authenticated;
