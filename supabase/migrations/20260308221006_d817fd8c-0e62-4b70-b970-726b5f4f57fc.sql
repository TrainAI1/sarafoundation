-- Create partners table
CREATE TABLE public.partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  website_url text,
  category text NOT NULL DEFAULT 'strategic',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Public can read active partners
CREATE POLICY "Partners are publicly readable"
  ON public.partners FOR SELECT
  USING (is_active = true OR is_admin());

-- Admin can insert
CREATE POLICY "Admin can insert partners"
  ON public.partners FOR INSERT
  WITH CHECK (is_admin());

-- Admin can update
CREATE POLICY "Admin can update partners"
  ON public.partners FOR UPDATE
  USING (is_admin());

-- Admin can delete
CREATE POLICY "Admin can delete partners"
  ON public.partners FOR DELETE
  USING (is_admin());

-- Auto-update updated_at
CREATE TRIGGER update_partners_updated_at
  BEFORE UPDATE ON public.partners
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Seed with current hardcoded strategic partners
INSERT INTO public.partners (name, category, sort_order) VALUES
  ('Scintilla Innovations', 'strategic', 1),
  ('Farmily', 'strategic', 2),
  ('ALX', 'strategic', 3),
  ('KàdàràBrite', 'strategic', 4),
  ('Train AI', 'strategic', 5),
  ('Nanaade', 'strategic', 6),
  ('Platform Hub', 'strategic', 7);