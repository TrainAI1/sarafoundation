ALTER TABLE public.course_progress
ADD CONSTRAINT course_progress_user_id_course_id_key
UNIQUE (user_id, course_id);