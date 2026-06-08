import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Users, Briefcase, Sparkles, Trophy, Building2, ArrowRight } from "lucide-react";

const projects = [
  {
    icon: GraduationCap,
    title: "CAP Tech Hubs",
    summary: "Operational tech hubs inside 35+ partner universities across 8 African countries, delivering structured training in software, design, data and product.",
    impact: "763+ students trained · 35+ universities · 8 countries",
    href: "/programs/cap",
  },
  {
    icon: Sparkles,
    title: "FLIP Fellowship",
    summary: "The Female Leadership Initiative Program supports African women in tech with mentorship, leadership coaching, peer community and funded opportunities.",
    impact: "Cohort-based · Mentor-matched · Pan-African",
    href: "/programs/flip",
  },
  {
    icon: Users,
    title: "WPTA — Women Professionals in Tech Africa",
    summary: "A continent-wide community supporting women already working in tech with peer circles, technical talks, salary benchmarking and senior-track mentorship.",
    impact: "Quarterly cohorts · Sponsored events",
    href: "/programs/flip",
  },
  {
    icon: Trophy,
    title: "WFTA — Women Founders in Tech Africa",
    summary: "Accelerator-style support for women building tech companies — investor introductions, founder masterminds, pitch prep and ecosystem partnerships.",
    impact: "Founder cohorts · Demo-day pipeline",
    href: "/programs/flip",
  },
  {
    icon: Briefcase,
    title: "Government Job Placement (GJP)",
    summary: "A 12-month paid placement program connecting NYSC graduates with public-sector tech roles across Nigerian ministries and agencies.",
    impact: "12-month placements · Paid roles · NYSC pipeline",
    href: "/programs/gjp",
  },
  {
    icon: Building2,
    title: "University Partnership Network",
    summary: "Memoranda of Understanding with universities across Nigeria, Ghana, Kenya, South Africa, Uganda, Zambia, Togo and Cameroon to embed industry-relevant tech tracks.",
    impact: "35+ MoUs signed · Faculty co-design",
    href: "/partnership/school-community",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Our Projects | Sara Foundation Africa</title>
        <meta name="description" content="Explore Sara Foundation Africa's projects: CAP Tech Hubs, FLIP Fellowship, WPTA, WFTA, Government Job Placement, and our university partnership network across 8 countries." />
        <link rel="canonical" href="https://sarafoundationafrica.com/projects" />
        <meta property="og:title" content="Our Projects | Sara Foundation Africa" />
        <meta property="og:description" content="Programs and initiatives building Africa's next generation of tech talent and women leaders." />
        <meta property="og:url" content="https://sarafoundationafrica.com/projects" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Sara Foundation Africa Projects",
          url: "https://sarafoundationafrica.com/projects",
          about: projects.map(p => ({ "@type": "Thing", name: p.title, description: p.summary })),
        })}</script>
      </Helmet>
      <Navbar />
      <main className="pt-24 md:pt-32">
        <section className="section-container pb-12">
          <span className="section-badge mb-4">Our Projects</span>
          <h1 className="section-title text-foreground mb-4 max-w-3xl">
            Concrete <span className="gradient-text">projects</span> changing African tech.
          </h1>
          <p className="section-subtitle max-w-3xl">
            Sara Foundation Africa runs a portfolio of education, fellowship, and placement projects across eight
            African countries. Each project below is live, measurable, and built in partnership with universities,
            industry, and government to move African talent into globally competitive tech careers.
          </p>
        </section>

        <section className="section-container pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(({ icon: Icon, ...p }) => (
              <Card key={p.title} className="p-6 hover:shadow-lg transition-shadow flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display font-bold text-xl mb-2 text-foreground">{p.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{p.summary}</p>
                <p className="text-xs font-semibold text-primary mb-4">{p.impact}</p>
                <Button asChild variant="outline" size="sm" className="w-fit">
                  <Link to={p.href}>Learn more <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </Card>
            ))}
          </div>
        </section>

        <section className="section-container pb-20">
          <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">Support a project</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Every project is funded by donations, sponsorships, and partnerships. Help us scale what's working.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild size="lg"><Link to="/donation">Donate</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/partnership">Partner with us</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/volunteer">Volunteer</Link></Button>
            </div>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}