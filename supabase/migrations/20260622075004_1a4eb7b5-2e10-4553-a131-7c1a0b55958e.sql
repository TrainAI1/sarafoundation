
-- Helper functions
CREATE OR REPLACE FUNCTION public.can_edit_content()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT coalesce(
    auth.uid() IS NOT NULL AND (
      public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
    ),
    false
  )
$$;

CREATE OR REPLACE FUNCTION public.can_moderate_submissions()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT coalesce(
    auth.uid() IS NOT NULL AND (
      public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')
    ),
    false
  )
$$;

-- Audit log
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  actor_email text,
  action text NOT NULL,
  entity text,
  entity_id text,
  summary text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS admin_audit_log_created_idx ON public.admin_audit_log (created_at DESC);
CREATE INDEX IF NOT EXISTS admin_audit_log_actor_idx ON public.admin_audit_log (actor_id);
GRANT SELECT, INSERT ON public.admin_audit_log TO authenticated;
GRANT ALL ON public.admin_audit_log TO service_role;
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read audit log" ON public.admin_audit_log FOR SELECT USING (public.is_admin());
CREATE POLICY "Staff can insert audit entries" ON public.admin_audit_log FOR INSERT WITH CHECK (
  auth.uid() IS NOT NULL AND (public.is_admin() OR public.can_edit_content() OR public.can_moderate_submissions()) AND actor_id = auth.uid()
);

-- Application notes
CREATE TABLE IF NOT EXISTS public.application_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_type text NOT NULL CHECK (application_type IN ('cap','flip','gjp','contact')),
  application_id uuid NOT NULL,
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  author_email text,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS application_notes_app_idx ON public.application_notes (application_type, application_id, created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.application_notes TO authenticated;
GRANT ALL ON public.application_notes TO service_role;
ALTER TABLE public.application_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff can read notes" ON public.application_notes FOR SELECT USING (public.is_admin() OR public.can_moderate_submissions());
CREATE POLICY "Staff can add notes" ON public.application_notes FOR INSERT WITH CHECK (
  (public.is_admin() OR public.can_moderate_submissions()) AND author_id = auth.uid()
);
CREATE POLICY "Authors can edit own notes" ON public.application_notes FOR UPDATE USING (author_id = auth.uid() OR public.is_admin());
CREATE POLICY "Admins can delete notes" ON public.application_notes FOR DELETE USING (public.is_admin() OR author_id = auth.uid());

-- Workflow columns
ALTER TABLE public.cap_applications
  ADD COLUMN IF NOT EXISTS applicant_status text NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS status_notes text,
  ADD COLUMN IF NOT EXISTS status_updated_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE public.flip_applications
  ADD COLUMN IF NOT EXISTS applicant_status text NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS status_notes text,
  ADD COLUMN IF NOT EXISTS status_updated_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE public.gjp_applications
  ADD COLUMN IF NOT EXISTS assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE OR REPLACE FUNCTION public.touch_application_status()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.applicant_status IS DISTINCT FROM OLD.applicant_status THEN
    NEW.status_updated_at = now();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS touch_cap_status ON public.cap_applications;
CREATE TRIGGER touch_cap_status BEFORE UPDATE ON public.cap_applications
  FOR EACH ROW EXECUTE FUNCTION public.touch_application_status();

DROP TRIGGER IF EXISTS touch_flip_status ON public.flip_applications;
CREATE TRIGGER touch_flip_status BEFORE UPDATE ON public.flip_applications
  FOR EACH ROW EXECUTE FUNCTION public.touch_application_status();

-- Editor / moderator complementary policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Editors can manage blog posts') THEN
    CREATE POLICY "Editors can manage blog posts" ON public.blog_posts FOR ALL
      USING (public.can_edit_content()) WITH CHECK (public.can_edit_content());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Editors can manage pages') THEN
    CREATE POLICY "Editors can manage pages" ON public.pages FOR ALL
      USING (public.can_edit_content()) WITH CHECK (public.can_edit_content());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Editors can manage faq') THEN
    CREATE POLICY "Editors can manage faq" ON public.faq_items FOR ALL
      USING (public.can_edit_content()) WITH CHECK (public.can_edit_content());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Editors can manage partners') THEN
    CREATE POLICY "Editors can manage partners" ON public.partners FOR ALL
      USING (public.can_edit_content()) WITH CHECK (public.can_edit_content());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Moderators can view contacts') THEN
    CREATE POLICY "Moderators can view contacts" ON public.contact_submissions FOR SELECT USING (public.can_moderate_submissions());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Moderators can update contacts') THEN
    CREATE POLICY "Moderators can update contacts" ON public.contact_submissions FOR UPDATE USING (public.can_moderate_submissions());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Moderators can view newsletter') THEN
    CREATE POLICY "Moderators can view newsletter" ON public.newsletter_subscribers FOR SELECT USING (public.can_moderate_submissions());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Moderators can view cap apps') THEN
    CREATE POLICY "Moderators can view cap apps" ON public.cap_applications FOR SELECT USING (public.can_moderate_submissions());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Moderators can update cap apps') THEN
    CREATE POLICY "Moderators can update cap apps" ON public.cap_applications FOR UPDATE USING (public.can_moderate_submissions());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Moderators can view flip apps') THEN
    CREATE POLICY "Moderators can view flip apps" ON public.flip_applications FOR SELECT USING (public.can_moderate_submissions());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Moderators can update flip apps') THEN
    CREATE POLICY "Moderators can update flip apps" ON public.flip_applications FOR UPDATE USING (public.can_moderate_submissions());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Moderators can view gjp apps') THEN
    CREATE POLICY "Moderators can view gjp apps" ON public.gjp_applications FOR SELECT USING (public.can_moderate_submissions());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Moderators can update gjp apps') THEN
    CREATE POLICY "Moderators can update gjp apps" ON public.gjp_applications FOR UPDATE USING (public.can_moderate_submissions());
  END IF;
END $$;

-- Admin user-management RPCs
CREATE OR REPLACE FUNCTION public.list_admin_users()
RETURNS TABLE(user_id uuid, email text, created_at timestamptz, last_sign_in_at timestamptz, roles text[])
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public, auth
AS $$
BEGIN
  IF NOT public.is_admin() THEN RAISE EXCEPTION 'Forbidden'; END IF;
  RETURN QUERY
    SELECT u.id, u.email::text, u.created_at, u.last_sign_in_at,
           COALESCE(array_agg(ur.role::text) FILTER (WHERE ur.role IS NOT NULL), ARRAY[]::text[])
    FROM auth.users u
    LEFT JOIN public.user_roles ur ON ur.user_id = u.id
    GROUP BY u.id, u.email, u.created_at, u.last_sign_in_at
    ORDER BY u.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.assign_user_role(_target_user uuid, _role app_role)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_admin() THEN RAISE EXCEPTION 'Forbidden'; END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (_target_user, _role)
    ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

CREATE OR REPLACE FUNCTION public.revoke_user_role(_target_user uuid, _role app_role)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_admin() THEN RAISE EXCEPTION 'Forbidden'; END IF;
  DELETE FROM public.user_roles WHERE user_id = _target_user AND role = _role;
END;
$$;
