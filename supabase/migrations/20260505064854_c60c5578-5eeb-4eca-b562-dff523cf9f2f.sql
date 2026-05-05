CREATE OR REPLACE FUNCTION public.get_gjp_status_by_email_appid(_email text, _app_id_prefix text)
RETURNS TABLE(full_name text, career_path text, payment_status text, applicant_status text, status_notes text, status_updated_at timestamp with time zone, created_at timestamp with time zone)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT g.full_name, g.career_path, g.payment_status, g.applicant_status,
         g.status_notes, g.status_updated_at, g.created_at
  FROM public.gjp_applications g
  WHERE lower(g.email) = lower(_email)
    AND substring(g.id::text, 1, 8) = lower(_app_id_prefix)
  ORDER BY g.created_at DESC
  LIMIT 1
$function$;