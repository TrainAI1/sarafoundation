-- Trigger-only functions: no direct execution by API roles
REVOKE ALL ON FUNCTION public.prevent_last_admin_deletion() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.prevent_last_admin_update() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.touch_application_status() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.touch_gjp_status() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- Admin-only functions: authenticated only (they also enforce is_admin() internally)
REVOKE ALL ON FUNCTION public.assign_user_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.assign_user_role(uuid, app_role) TO authenticated;
REVOKE ALL ON FUNCTION public.revoke_user_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.revoke_user_role(uuid, app_role) TO authenticated;
REVOKE ALL ON FUNCTION public.list_admin_users() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.list_admin_users() TO authenticated;

-- Role helpers: authenticated only
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
REVOKE ALL ON FUNCTION public.can_edit_content() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_edit_content() TO authenticated;
REVOKE ALL ON FUNCTION public.can_moderate_submissions() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_moderate_submissions() TO authenticated;

-- Public-facing functions keep anon access explicitly
GRANT EXECUTE ON FUNCTION public.validate_partner_code(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_cap_application_for_payment(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_gjp_status_by_email_appid(text, text) TO anon, authenticated;