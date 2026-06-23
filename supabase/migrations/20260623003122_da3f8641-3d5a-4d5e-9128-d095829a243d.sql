
-- 1. partner_codes table
CREATE TABLE public.partner_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  partner_name text NOT NULL,
  programs text[] NOT NULL DEFAULT ARRAY['cap','flip']::text[],
  max_uses integer,
  uses integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  expires_at timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_codes TO authenticated;
GRANT ALL ON public.partner_codes TO service_role;

ALTER TABLE public.partner_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage partner codes"
  ON public.partner_codes FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE TRIGGER partner_codes_updated_at
  BEFORE UPDATE ON public.partner_codes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2. Application columns
ALTER TABLE public.cap_applications
  ADD COLUMN IF NOT EXISTS partner_code text,
  ADD COLUMN IF NOT EXISTS partner_code_id uuid REFERENCES public.partner_codes(id),
  ADD COLUMN IF NOT EXISTS outstanding_commitment integer NOT NULL DEFAULT 0;

ALTER TABLE public.flip_applications
  ADD COLUMN IF NOT EXISTS partner_code text,
  ADD COLUMN IF NOT EXISTS partner_code_id uuid REFERENCES public.partner_codes(id),
  ADD COLUMN IF NOT EXISTS outstanding_commitment integer NOT NULL DEFAULT 0;

-- 3. Public validation RPC (security definer; returns the code row if valid)
CREATE OR REPLACE FUNCTION public.validate_partner_code(_code text, _program text)
RETURNS TABLE(id uuid, code text, partner_name text)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT pc.id, pc.code, pc.partner_name
  FROM public.partner_codes pc
  WHERE upper(trim(pc.code)) = upper(trim(_code))
    AND pc.active = true
    AND (pc.expires_at IS NULL OR pc.expires_at > now())
    AND (_program = ANY(pc.programs))
    AND (pc.max_uses IS NULL OR pc.uses < pc.max_uses)
  LIMIT 1
$$;

GRANT EXECUTE ON FUNCTION public.validate_partner_code(text, text) TO anon, authenticated;
