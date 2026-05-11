CREATE TABLE public.gjp_email_followups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recipients TEXT[] NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  due_at TIMESTAMP WITH TIME ZONE NOT NULL,
  auto_send BOOLEAN NOT NULL DEFAULT false,
  sent BOOLEAN NOT NULL DEFAULT false,
  sent_at TIMESTAMP WITH TIME ZONE,
  send_error TEXT,
  created_by UUID,
  set_status_after TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_gjp_followups_due ON public.gjp_email_followups (sent, due_at);

ALTER TABLE public.gjp_email_followups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view followups" ON public.gjp_email_followups
  FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admin can insert followups" ON public.gjp_email_followups
  FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "Admin can update followups" ON public.gjp_email_followups
  FOR UPDATE TO authenticated USING (is_admin());
CREATE POLICY "Admin can delete followups" ON public.gjp_email_followups
  FOR DELETE TO authenticated USING (is_admin());