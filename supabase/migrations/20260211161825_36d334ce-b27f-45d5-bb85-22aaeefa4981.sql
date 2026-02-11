
-- Helper function to check admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT coalesce(auth.email() = 'inememmanuel@gmail.com', false)
$$;

-- Pages table for editable page content
CREATE TABLE public.pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Anyone can read pages
CREATE POLICY "Pages are publicly readable"
ON public.pages FOR SELECT
USING (true);

-- Only admin can modify
CREATE POLICY "Admin can update pages"
ON public.pages FOR UPDATE
USING (public.is_admin());

CREATE POLICY "Admin can insert pages"
ON public.pages FOR INSERT
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete pages"
ON public.pages FOR DELETE
USING (public.is_admin());

-- Blog posts table
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL DEFAULT '',
  cover_image text,
  category text,
  author_name text NOT NULL DEFAULT 'Sara Foundation',
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read published posts
CREATE POLICY "Published posts are publicly readable"
ON public.blog_posts FOR SELECT
USING (published = true OR public.is_admin());

-- Only admin can modify
CREATE POLICY "Admin can insert posts"
ON public.blog_posts FOR INSERT
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update posts"
ON public.blog_posts FOR UPDATE
USING (public.is_admin());

CREATE POLICY "Admin can delete posts"
ON public.blog_posts FOR DELETE
USING (public.is_admin());

-- Auto-update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_pages_updated_at
BEFORE UPDATE ON public.pages
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
