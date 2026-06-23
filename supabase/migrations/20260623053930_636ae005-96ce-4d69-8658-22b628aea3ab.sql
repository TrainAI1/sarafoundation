GRANT INSERT ON public.cap_applications TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.cap_applications TO authenticated;
GRANT ALL ON public.cap_applications TO service_role;

GRANT INSERT ON public.flip_applications TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.flip_applications TO authenticated;
GRANT ALL ON public.flip_applications TO service_role;