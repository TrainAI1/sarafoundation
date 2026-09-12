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
import { usePageContent } from "@/hooks/usePageContent";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import { assetUrl } from "@/lib/assetUrl";
import volunteerHero from "@/assets/flip-women-presenting.jpg";
import volunteerWorkshop from "@/assets/community-workshop.jpg";
import volunteerSpeaker from "@/assets/tech-conference-speaker.jpg";
import volunteerCommunity from "@/assets/women-tech-leaders.jpg";
import volunteerForm from "@/assets/students-tech-lab.jpg";

const roleIcons: Record<string, typeof BookOpen> = {
  "Mentor": BookOpen,
  "Tech Trainer / Facilitator": GraduationCap,
  "Panellist / Speaker": Mic,
  "Knowledge & Expert Session Contributor": Users,
  "Student Ambassador": Users,
  "General Volunteer": Heart,
};

const benefitIcons: Record<string, typeof Heart> = {
  "Reduce barriers to learning": Heart,
  "Pan-African community": Globe,
  "Recognition": Users,
};

export default function Volunteer() {
  const { toast } = useToast();
  const { data: c } = usePageContent("volunteer-page", {
    hero_badge: "Volunteer",
    hero_headline_part1: "Join Our Community of 60+ Volunteers, Speakers, Trainers,",
    hero_headline_part2: "Facilitators and Mentors",
    hero_description:
      "Volunteers make our learning pathways possible. Whether you can mentor a learner for a few hours a month, facilitate a workshop, speak at a session or contribute expertise in another way, there is a role for you.",
    roles_headline: "Volunteer roles",
    roles: [
      { title: "Mentor", description: "Support learners through structured mentoring, feedback, reflection and knowledge-sharing. Typically 2–4 hours per month, fully virtual." },
      { title: "Tech Trainer / Facilitator", description: "Support educational resources, digital learning activities, virtual learning experiences and workshops for CAP and FLIP participants." },
      { title: "Panellist / Speaker", description: "Share professional knowledge and experience through our events, conferences and sessions." },
      { title: "Knowledge & Expert Session Contributor", description: "Host educational sessions and share technology expertise with learners and women interested in technology." },
      { title: "Student Ambassador", description: "Be a Sara Foundation ambassador at your university under our CAP Tech Hub initiative — champion the Foundation on campus, share learning opportunities and help peers take part." },
      { title: "General Volunteer", description: "Not sure which role fits yet? Tell us what you can offer and we will find a way for you to contribute." },
    ],
    benefits: [
      { title: "Reduce barriers to learning", text: "Help someone access education and participation they would otherwise miss." },
      { title: "Pan-African community", text: "Join volunteers and contributors supporting learners across 11 African countries." },
      { title: "Recognition", text: "Volunteer certificates, references and recognition at our showcases and conferences." },
    ],
    form_headline: "Become a volunteer",
    form_description: "We review applications weekly and reply within 7 business days.",
  });

  const roles = c.roles.map((r: { title: string; description: string }) => ({ ...r, icon: roleIcons[r.title] ?? Heart }));
  const benefits = c.benefits.map((b: { title: string; text: string }) => ({ ...b, icon: benefitIcons[b.title] ?? Heart }));
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
        <title>Volunteer &amp; Mentor | Sara Foundation Africa</title>
        <meta name="description" content="Volunteer as a mentor, trainer, facilitator, speaker or expert session contributor and help widen access to digital education and inclusion across Africa." />
        <link rel="canonical" href="https://sarafoundationafrica.com/volunteer" />
        <meta property="og:title" content="Volunteer with Sara Foundation Africa" />
        <meta property="og:description" content="Volunteer as a mentor, trainer, facilitator, speaker or expert session contributor and help widen access to digital education and inclusion across Africa." />
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
      <main id="main-content" className="pt-24 md:pt-32">
        <section className="section-container pb-12 md:pb-16">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <ScrollAnimation variant="slide-left">
              <div>
                <span className="section-badge mb-4">{c.hero_badge}</span>
                <h1 className="section-title text-foreground mb-4">
                  {c.hero_headline_part1}{" "}
                  <span className="gradient-text">{c.hero_headline_part2}</span>
                </h1>
                <p className="section-subtitle mx-0 mb-6">
                  {c.hero_description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" asChild>
                    <a href="#volunteer-form">Apply to volunteer</a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#volunteer-roles">See volunteer roles</a>
                  </Button>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation variant="slide-right">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={c.hero_image ? assetUrl(c.hero_image) : volunteerHero}
                  alt="A mentor supporting a learner during a Sara Foundation mentoring session"
                  className="w-full h-64 md:h-[26rem] object-cover"
                  loading="eager"
                  onError={(e) => { e.currentTarget.src = volunteerHero; }}
                />
              </div>
            </ScrollAnimation>
          </div>
        </section>

        <section id="volunteer-roles" className="section-container pb-16">
          <ScrollAnimation variant="fade-up">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="section-title text-foreground mb-3">{c.roles_headline}</h2>
              <p className="section-subtitle">Pick the way you would like to give your time. Every role is flexible and fully remote unless stated.</p>
            </div>
          </ScrollAnimation>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" staggerDelay={0.08}>
            {roles.map(({ icon: Icon, ...r }) => (
              <StaggerItem key={r.title} variant="scale-in">
                <Card className="card-modern p-6 h-full group hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{r.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{r.description}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <section className="section-container pb-16">
          <StaggerContainer className="grid sm:grid-cols-3 gap-4" staggerDelay={0.1}>
            {[
              { src: volunteerWorkshop, alt: "Volunteers facilitating a community learning workshop" },
              { src: volunteerSpeaker, alt: "A speaker addressing an audience at a Sara Foundation event" },
              { src: volunteerCommunity, alt: "Women in technology gathered at a Sara Foundation session" },
            ].map((img) => (
              <StaggerItem key={img.src} variant="fade-up">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-48 md:h-56 object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <section className="py-16 md:py-20 bg-foreground">
          <div className="section-container">
            <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
              {benefits.map(({ icon: Icon, title, text }) => (
                <StaggerItem key={title} variant="scale-in">
                  <div className="glass-card-dark p-6 md:p-7 text-center h-full">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/30 flex items-center justify-center mb-3">
                      <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="font-display font-bold text-white mb-1">{title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{text}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section id="volunteer-form" className="section-container py-16 md:py-24">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-stretch">
            <ScrollAnimation variant="slide-left" className="hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl h-full">
                <img
                  src={volunteerForm}
                  alt="Students working together in a technology lab"
                  loading="lazy"
                  className="w-full h-full min-h-[28rem] object-cover"
                />
              </div>
            </ScrollAnimation>
          <Card className="p-6 md:p-10">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">{c.form_headline}</h2>
            <p className="text-muted-foreground mb-6 text-sm">{c.form_description}</p>
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}