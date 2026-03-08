-- Prevent deletion of the last admin role
CREATE OR REPLACE FUNCTION public.prevent_last_admin_deletion()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF OLD.role = 'admin' THEN
    IF (SELECT count(*) FROM public.user_roles WHERE role = 'admin' AND id != OLD.id) = 0 THEN
      RAISE EXCEPTION 'Cannot remove the last admin role. At least one admin must exist.';
    END IF;
  END IF;
  RETURN OLD;
END;
$$;

CREATE TRIGGER prevent_last_admin_delete
  BEFORE DELETE ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_last_admin_deletion();

-- Also prevent updating the last admin's role away from admin
CREATE OR REPLACE FUNCTION public.prevent_last_admin_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF OLD.role = 'admin' AND NEW.role != 'admin' THEN
    IF (SELECT count(*) FROM public.user_roles WHERE role = 'admin' AND id != OLD.id) = 0 THEN
      RAISE EXCEPTION 'Cannot change the last admin role. At least one admin must exist.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;