
-- Contact form submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  topic TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admin can view submissions"
ON public.contact_submissions FOR SELECT
USING (is_admin());

CREATE POLICY "Admin can update submissions"
ON public.contact_submissions FOR UPDATE
USING (is_admin());

CREATE POLICY "Admin can delete submissions"
ON public.contact_submissions FOR DELETE
USING (is_admin());

-- Newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
ON public.newsletter_subscribers FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admin can view subscribers"
ON public.newsletter_subscribers FOR SELECT
USING (is_admin());

CREATE POLICY "Admin can update subscribers"
ON public.newsletter_subscribers FOR UPDATE
USING (is_admin());

CREATE POLICY "Admin can delete subscribers"
ON public.newsletter_subscribers FOR DELETE
USING (is_admin());

-- FAQ items table
CREATE TABLE public.faq_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "FAQ items are publicly readable"
ON public.faq_items FOR SELECT
USING (true);

CREATE POLICY "Admin can insert FAQ items"
ON public.faq_items FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Admin can update FAQ items"
ON public.faq_items FOR UPDATE
USING (is_admin());

CREATE POLICY "Admin can delete FAQ items"
ON public.faq_items FOR DELETE
USING (is_admin());

CREATE TRIGGER update_faq_items_updated_at
BEFORE UPDATE ON public.faq_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
