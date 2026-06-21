import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, BookOpen, Mic, GraduationCap, Heart, Globe } from "lucide-react";

const roles = [
  { icon: BookOpen, title: "Mentor", description: "Guide CAP and FLIP cohort members 1:1 in software, design, data, product, or career growth. Time commitment: 2–4 hours per month, fully virtual." },
  { icon: Users, title: "Student Ambassador", description: "Represent Sara Foundation on your campus, run tech-hub activities, and recruit cohort members. Open to students at our partner universities." },
  { icon: Mic, title: "Speaker", description: "Deliver keynote talks, fireside chats, or panel sessions at our showcases, demo days, and cohort events — share your career story and expertise." },
  { icon: GraduationCap, title: "Trainer", description: "Lead structured technical or soft-skill training for a CAP or FLIP cohort — workshops, bootcamps, or full curriculum tracks in your area of expertise." },
];

const benefits = [
  { icon: Heart, title: "Make real impact", text: "Directly support young Africans entering tech careers." },
  { icon: Globe, title: "Pan-African network", text: "Join a community of volunteers across 11 African countries." },
  { icon: Users, title: "Recognition", text: "Volunteer certificates, references, and recognition at our annual showcase." },
];

export default function Volunteer() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", role: "", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.role || !form.message) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert({
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      topic: `Volunteer: ${form.role}`,
      message: form.message,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
      return;
    }
    supabase.functions.invoke("notify", { body: { type: "volunteer", data: { role: form.role } } }).catch(() => {});
    toast({ title: "Thank you!", description: "We've received your application and will be in touch shortly." });
    setForm({ firstName: "", lastName: "", email: "", role: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Volunteer with Sara Foundation Africa</title>
        <meta name="description" content="Volunteer as a mentor, student ambassador, speaker or trainer with Sara Foundation Africa. Help us empower African tech talent across 11 countries." />
        <link rel="canonical" href="https://sarafoundationafrica.com/volunteer" />
        <meta property="og:title" content="Volunteer with Sara Foundation Africa" />
        <meta property="og:description" content="Join our volunteer network across 11 African countries as a mentor, student ambassador, speaker or trainer." />
        <meta property="og:url" content="https://sarafoundationafrica.com/volunteer" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Volunteer with Sara Foundation Africa",
          url: "https://sarafoundationafrica.com/volunteer",
          description: "Volunteer opportunities supporting African tech education and women's leadership.",
        })}</script>
      </Helmet>
      <Navbar />
      <main className="pt-24 md:pt-32">
        <section className="section-container pb-12">
          <span className="section-badge mb-4">Volunteer</span>
          <h1 className="section-title text-foreground mb-4 max-w-3xl">
            Give your time. <span className="gradient-text">Change a life.</span>
          </h1>
          <p className="section-subtitle max-w-3xl">
            Volunteers are the engine of Sara Foundation Africa. Whether you're a senior engineer who can mentor for a
            few hours a month, a student who can champion us on campus, a designer who loves nonprofit work, or someone
            who simply wants to help at events — there is a role for you.
          </p>
        </section>

        <section className="section-container pb-16">
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-6">Volunteer roles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {roles.map(({ icon: Icon, ...r }) => (
              <Card key={r.title} className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{r.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{r.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="section-container pb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center p-6">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-container pb-24">
          <Card className="p-6 md:p-10 max-w-2xl mx-auto">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">Apply to volunteer</h2>
            <p className="text-muted-foreground mb-6 text-sm">We review applications weekly and reply within 7 business days.</p>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="role">Preferred role</Label>
                <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                  <SelectTrigger id="role"><SelectValue placeholder="Select a role" /></SelectTrigger>
                  <SelectContent>
                    {roles.map(r => <SelectItem key={r.title} value={r.title}>{r.title}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message">Tell us about yourself & your skills</Label>
                <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
              </div>
              <Button type="submit" size="lg" disabled={submitting} className="w-full">
                {submitting ? "Submitting..." : "Submit application"}
              </Button>
            </form>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}