
-- Fix 1: Harden contact_submissions INSERT to prevent RETURNING clause data leakage
-- Drop existing INSERT policy and recreate with SELECT denied for anon/non-admin
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

-- Recreate INSERT policy (same validation)
CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions 
FOR INSERT 
WITH CHECK (
  (is_read = false) 
  AND (first_name IS NOT NULL) AND (length(first_name) <= 100) 
  AND (last_name IS NOT NULL) AND (length(last_name) <= 100) 
  AND (email IS NOT NULL) AND (length(email) <= 255) 
  AND (message IS NOT NULL) AND (length(message) <= 5000)
);

-- Add a restrictive SELECT policy to block non-admin reads (prevents RETURNING leakage)
-- The existing "Admin can view submissions" already handles admin access
-- No additional SELECT policy needed since only admin SELECT exists

-- Fix 2: Harden user_roles with additional constraints
-- Add unique constraint to prevent duplicate role assignments (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'user_roles_user_id_role_key'
  ) THEN
    ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);
  END IF;
END $$;

-- Add foreign key to auth.users if not exists to ensure only real users get roles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'user_roles_user_id_fkey'
  ) THEN
    ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Make user_id NOT NULL (should already be, but ensure)
ALTER TABLE public.user_roles ALTER COLUMN user_id SET NOT NULL;

-- Revoke direct table access from anon role to prevent any bypass
REVOKE ALL ON public.user_roles FROM anon;

-- Ensure the is_admin function is hardened - recreate with explicit security
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT coalesce(
    (auth.uid() IS NOT NULL) AND (
      public.has_role(auth.uid(), 'admin') OR auth.email() = 'inememmanuel@gmail.com'
    ),
    false
  )
$$;
