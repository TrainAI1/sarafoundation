import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, Users, Briefcase, Sparkles, Building2, ArrowRight, GraduationCap, Globe } from "lucide-react";

const headlineStats = [
  { value: "35", label: "Universities", icon: Building2 },
  { value: "763", label: "CAP Participants", icon: GraduationCap },
  { value: "52", label: "Women Trained", icon: Sparkles },
  { value: "11", label: "African Countries", icon: Globe },
  { value: "705", label: "People Referred for Placement", icon: Briefcase },
];

const pastProjects = [
  {
    icon: Briefcase,
    title: "EJP — Employment & Job Placement Pipeline (Public Sector)",
    summary: "Our public-sector placement work, including partnership with the Nigerian government on the Nigerian Jubilee Fellowship Placement (NJFP) Program — referring tech-trained graduates into government and partner roles.",
    impact: "Federal Government partnership · Tech graduates referred for placement",
  },
  {
    icon: GraduationCap,
    title: "CAP Cohorts 1 & 2 — Tech Hub Rollout",
    summary: "Stood up Career Advancement Program tech hubs across 35 partner universities, training 763 students in software, design, data and product over two cohorts.",
    impact: "763 students trained · 35 universities · 11 African countries",
  },
  {
    icon: Sparkles,
    title: "FLIP Fellowship — Cohort 1",
    summary: "Launched the Female Leadership Initiative Program with our first fellowship cohort — leadership coaching, technical mentorship and a Pan-African peer community for women in tech.",
    impact: "52 women supported · Pan-African cohort · Mentor-matched",
  },
  {
    icon: Briefcase,
    title: "EJP — Employment & Job Placement Pipeline",
    summary: "Connected qualified African tech talent with hiring partners across the continent. Together with placements from earlier cohorts, the program contributes to a cumulative total of 705 people referred for placement.",
    impact: "696 referred through EJP · 705 cumulative placements",
  },
  {
    icon: Users,
    title: "Alumni Build-up",
    summary: "Built and activated the Sara Foundation alumni network — graduates from CAP, FLIP and placement programs supporting one another through peer circles, mentorship, referrals and ongoing professional development.",
    impact: "Pan-African alumni network · Peer mentorship · Career referrals",
  },
  {
    icon: Building2,
    title: "University Partnership Network — 35 MoUs",
    summary: "Signed Memoranda of Understanding with 35 universities across Nigeria, Ghana, Kenya, South Africa, Uganda, Zambia, Togo, Cameroon and other African nations to embed industry-relevant tech tracks.",
    impact: "35 MoUs signed · 11 countries · Faculty co-design",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Past Projects & Impact Reports | Sara Foundation Africa</title>
        <meta name="description" content="Past projects and impact reports from Sara Foundation Africa: 35 universities, 763 CAP participants, 52 women trained, 11 African countries, 705 people referred for placement." />
        <link rel="canonical" href="https://sarafoundationafrica.com/projects" />
        <meta property="og:title" content="Past Projects & Impact Reports | Sara Foundation Africa" />
        <meta property="og:description" content="Milestones from the Sara Foundation Africa mobile app launch, CAP cohorts, FLIP Fellowship and EJP placement pipeline." />
        <meta property="og:url" content="https://sarafoundationafrica.com/projects" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Sara Foundation Africa — Past Projects & Impact Reports",
          url: "https://sarafoundationafrica.com/projects",
          about: pastProjects.map(p => ({ "@type": "Thing", name: p.title, description: p.summary })),
        })}</script>
      </Helmet>
      <Navbar />
      <main className="pt-24 md:pt-32">
        <section className="section-container pb-12">
          <span className="section-badge mb-4">Past Projects & Impact</span>
          <h1 className="section-title text-foreground mb-4 max-w-3xl">
            What we've <span className="gradient-text">shipped</span> and who we've reached.
          </h1>
          <p className="section-subtitle max-w-3xl">
            A snapshot of completed milestones — from our mobile app launch and CAP cohort rollouts to the FLIP
            Fellowship and our EJP placement pipeline. Numbers below are verified across our 2024–2025 reporting.
          </p>
        </section>

        <section className="section-container pb-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {headlineStats.map(({ icon: Icon, value, label }) => (
              <Card key={label} className="p-5 text-center">
                <div className="w-10 h-10 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-display font-bold text-foreground">{value}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{label}</div>
              </Card>
            ))}
          </div>
        </section>

        <section className="section-container pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastProjects.map(({ icon: Icon, ...p }) => (
              <Card key={p.title} className="p-6 hover:shadow-lg transition-shadow flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display font-bold text-xl mb-2 text-foreground">{p.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{p.summary}</p>
                <p className="text-xs font-semibold text-primary mb-4">{p.impact}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="section-container pb-20">
          <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">Read the full impact reports</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Detailed cohort data, financials and outcomes are published in our annual reports. Support what's working
              with a donation or partnership.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild size="lg"><Link to="/annual-reports">View Annual Reports <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/donation">Donate</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/partnership">Partner with us</Link></Button>
            </div>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}