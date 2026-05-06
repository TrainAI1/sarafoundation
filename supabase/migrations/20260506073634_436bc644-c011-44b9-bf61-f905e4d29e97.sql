ALTER TABLE public.gjp_applications
  ADD COLUMN IF NOT EXISTS interested_in_tech boolean NOT NULL DEFAULT true;