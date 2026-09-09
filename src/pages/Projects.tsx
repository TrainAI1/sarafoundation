import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  DoorOpen,
  BookOpen,
  TrendingUp,
  HeartHandshake,
  Compass,
  ArrowRight,
} from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { SuccessStoriesSection } from "@/components/sections/SuccessStoriesSection";
import { ImpactReportSection } from "@/components/sections/ImpactReportSection";
import { assetUrl } from "@/lib/assetUrl";
import techEntrepreneurs from "@/assets/tech-entrepreneurs.jpg";
import capGraduates from "@/assets/events/DSC_3409.jpg.asset.json";
import communityWorkshop from "@/assets/community-workshop.jpg";

const levelIcons = [DoorOpen, BookOpen, TrendingUp, HeartHandshake, Compass];

type Metric = { value: string; label: string; definition: string };

export default function Projects() {
  const { data: hero } = usePageContent("projects-hero", {
    badge: "Our Impact",
    headline: "Measuring What Changes",
    description:
      "We measure more than reach. We look at who benefits, what people learn, what barriers are reduced, how participation grows and how learners contribute to their communities.",
    image: "",
    cta_primary_label: "View Annual Reports",
    cta_secondary_label: "Donate",
  });

  const { data: levelsContent } = usePageContent("projects-levels", {
    badge: "Our Impact Hierarchy",
    headline: "Five levels of evidence",
    levels: [
      {
        number: "01",
        title: "Access",
        question: "Who participated and what barrier was reduced?",
        items_text:
          "763 CAP learners received fully funded access across Cohorts 1 and 2\n1,600 scholarships provided across pathways\n57 scholarships supporting women across FLIP fellowship and mentorship\nBursaries, subsidised places and fee waivers where funding allows",
      },
      {
        number: "02",
        title: "Learning Activity",
        question: "What did Sara Foundation Africa provide?",
        items_text:
          "47 knowledge and expert sessions across CAP and general programming\n3 FLIP workshops with 108 recorded attendances\n170 AI training places delivered with partner organisations\n2 Talent Showcases and 1 Demo Day\nMentoring, guided project support and learning resources",
      },
      {
        number: "03",
        title: "Learning Outcomes",
        question: "What changed?",
        items_text:
          "10 CAP learner projects completed and presented\n5 FLIP Fellowship Cohort 1 capstone projects completed\nMentor observations of project quality and progression\nMeasured completion rates, project evaluation and participant feedback.",
      },
      {
        number: "04",
        title: "Inclusion & Community",
        question: "Did participation, connection or contribution grow?",
        items_text:
          "Network of 60+ speakers, trainers, facilitators, mentors and volunteers\n3 CAP project mentors and 4 FLIP mentors supporting learners\nPeer learning, learner-led projects and knowledge-sharing\nParticipant retention and community engagement metrics.",
      },
      {
        number: "05",
        title: "Continued Journey",
        question: "What happened following the learning activity?",
        items_text:
          "705 referrals for placement opportunities across relevant historical activities and pathways\n696 candidates prepared and referred into the Nigerian Jubilee Fellows Programme candidate pool\nAlumni engagement, further learning and mentoring\nReferrals are not confirmed placements, and employment is never guaranteed",
      },
    ],
    image: "",
    image_caption_title: "A CAP Tech Hub digital skills session",
    image_caption_subtitle: "Evidence gathered directly from our programme activity",
  });

  const { data: dashboardContent } = usePageContent("projects-dashboard", {
    badge: "Impact Dashboard",
    headline: "Evidence by pathway",
    description:
      "Different metrics mean different things. People reached, learners trained, scholarships, workshop attendances and referrals are counted separately and are not unique individuals.",
    dashboard_groups: [
      {
        key: "cap",
        pathway: "CAP: Community Access & Participation Pathway",
        blurb: "Structured digital education, mentoring and practical learning for young people from underserved communities.",
        href: "/programs/cap",
      },
      {
        key: "flip",
        pathway: "FLIP: Female Learning & Inclusion Pathway",
        blurb: "Inclusive access to tech learning, mentoring and community for women.",
        href: "/programs/flip",
      },
      {
        key: "ejp",
        pathway: "EJP: Education Journey Pathway",
        blurb: "Continued learning through insight, work-readiness education, mentoring and referrals.",
        href: "/programs/gjp",
      },
    ],
    dashboard_metrics: [
      { pathway_key: "cap", value: "763", label: "CAP learners", definition: "Individuals who received fully funded access to practical digital learning across Cohorts 1 and 2." },
      { pathway_key: "cap", value: "35+", label: "Universities represented", definition: "Institutions represented among CAP learners. Not partnership agreements." },
      { pathway_key: "cap", value: "8", label: "African countries (CAP)", definition: "Countries reached by CAP activity. FLIP reaches 6 countries; together the Foundation reaches 11 unique countries." },
      { pathway_key: "cap", value: "23", label: "CAP expert sessions", definition: "Expert-led sessions delivered during 2024 and 2025." },
      { pathway_key: "cap", value: "100", label: "CAP Conference attendees", definition: "People who attended CAP Conference 1.0 in person." },
      { pathway_key: "cap", value: "10", label: "Learner projects", definition: "Projects created by learners as evidence of applied learning. Not commercial businesses." },
      { pathway_key: "cap", value: "2 + 1", label: "Talent Showcases and Demo Day", definition: "Events at which learners presented their project work." },
      { pathway_key: "cap", value: "3", label: "Project mentors", definition: "Mentors supporting active learner projects." },
      { pathway_key: "flip", value: "57", label: "Women participants", definition: "Women who participated across FLIP fellowship and mentorship programmes during 2024–2026." },
      { pathway_key: "flip", value: "57", label: "Scholarships", definition: "Scholarships supporting women's participation in FLIP activity." },
      { pathway_key: "flip", value: "108", label: "Workshop attendances", definition: "Recorded attendances across 3 workshops. Attendances are not unique individuals." },
      { pathway_key: "flip", value: "93", label: "FLIP Conference attendees", definition: "Women who attended FLIP Conference 1.0." },
      { pathway_key: "flip", value: "5", label: "Capstone projects", definition: "Capstone learning projects completed by FLIP Cohort 1 fellows." },
      { pathway_key: "flip", value: "4", label: "FLIP mentors", definition: "Mentors supporting FLIP participants." },
      { pathway_key: "flip", value: "6", label: "African countries (FLIP)", definition: "Countries reached by FLIP activity. Combined with CAP's 8, the Foundation reaches 11 unique countries." },
      { pathway_key: "ejp", value: "705", label: "Referrals for placement opportunities", definition: "Referrals recorded across relevant historical activities and pathways. Referrals are not confirmed placements." },
      { pathway_key: "ejp", value: "696", label: "Candidates referred to NJFP pool", definition: "Qualified candidates prepared and referred into the Nigerian Jubilee Fellows Programme candidate pool for 12-month paid placements hosted by other organisations." },
      { pathway_key: "ejp", value: "23", label: "Knowledge sessions", definition: "Knowledge and insight sessions delivered to participants." },
      { pathway_key: "ejp", value: "170", label: "AI training places", definition: "Training places delivered with partner organisations: 100 with Regamos Foundation and 70 through ALX Africa AI Essentials." },
    ],
    cross_cutting_headline: "Across all pathways",
    cross_cutting: [
      { value: "6,000+", label: "Community reach", definition: "People reached through our channels, events and community activity. Reach is not the same as learners trained." },
      { value: "11", label: "Unique African countries", definition: "Unique countries reached across all pathways: 8 through CAP and 6 through FLIP, with overlap." },
      { value: "1,600", label: "Scholarships provided", definition: "Fully funded and subsidised places provided across pathways. Not unique individuals." },
      { value: "47", label: "Knowledge and expert sessions", definition: "Total sessions delivered across CAP and general programming." },
      { value: "60+", label: "Speakers, trainers, facilitators, mentors and volunteers", definition: "People in our contributor and volunteer network." },
    ],
  });

  const { data: reportingContent } = usePageContent("projects-reporting", {
    cta_headline: "Help us reduce more barriers to learning",
  });

  const levels = levelsContent.levels.map((level: { number: string; title: string; question: string; items_text: string }, index: number) => ({
    ...level,
    items: level.items_text.split("\n").filter(Boolean),
    icon: levelIcons[index] ?? levelIcons[levelIcons.length - 1],
  }));
  const dashboardGroups = dashboardContent.dashboard_groups as { key: string; pathway: string; blurb: string; href: string }[];
  const dashboardMetrics = dashboardContent.dashboard_metrics as (Metric & { pathway_key: string })[];
  const dashboard = dashboardGroups.map((group) => ({
    ...group,
    metrics: dashboardMetrics.filter((m) => m.pathway_key === group.key),
  }));
  const crossCutting = dashboardContent.cross_cutting as Metric[];
  const heroImage = hero.image ? assetUrl(hero.image) : assetUrl(capGraduates);
  const levelsImage = levelsContent.image ? assetUrl(levelsContent.image) : communityWorkshop;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Our Impact | Sara Foundation Africa</title>
        <meta
          name="description"
          content="How we measure public benefit: access, learning activity, learning outcomes, inclusion and continued journeys across CAP, FLIP and EJP."
        />
        <link rel="canonical" href="https://sarafoundationafrica.com/projects" />
        <meta property="og:title" content="Our Impact | Sara Foundation Africa" />
        <meta
          property="og:description"
          content="Clearly labelled evidence of access, learning, inclusion and community participation across our pathways."
        />
        <meta property="og:url" content="https://sarafoundationafrica.com/projects" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-primary relative overflow-hidden">
          <div className="section-container px-4">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="text-left">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 mb-6">
                  {hero.badge}
                </span>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                  {hero.headline}
                </h1>
                <p className="text-base md:text-xl text-white/70 leading-relaxed mb-6 md:mb-8">
                  {hero.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <Button variant="hero" size="lg" className="group" asChild>
                    <Link to="/annual-reports">
                      {hero.cta_primary_label}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="heroSecondary" size="lg" asChild>
                    <Link to="/donation">{hero.cta_secondary_label}</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-4 lg:mx-0">
                <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={heroImage}
                    alt="Evidence of Sara Foundation Africa's impact gathered at a programme event"
                    className="w-full h-56 md:h-80 object-cover"
                    loading="eager"
                    onError={(e) => {
                      e.currentTarget.src = techEntrepreneurs;
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Five levels */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
              <span className="section-badge mb-4 md:mb-6">{levelsContent.badge}</span>
              <h2 className="section-title text-foreground mb-4 md:mb-6">{levelsContent.headline}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {levels.map((level) => (
                <article key={level.title} className="card-modern p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white font-bold text-sm">
                      {level.number}
                    </span>
                    <level.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-1">{level.title}</h3>
                  <p className="text-sm text-muted-foreground italic mb-4">{level.question}</p>
                  <ul className="space-y-2">
                    {level.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Image break */}
        <section className="relative">
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img
              src={levelsImage}
              alt={levelsContent.image_caption_title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = communityWorkshop;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <div className="section-container">
                <p className="text-white font-display font-bold text-lg md:text-2xl">
                  {levelsContent.image_caption_title}
                </p>
                <p className="text-white/70 text-sm md:text-base">
                  {levelsContent.image_caption_subtitle}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard */}
        <section className="py-16 md:py-24 bg-secondary/40">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
              <span className="section-badge mb-4 md:mb-6">{dashboardContent.badge}</span>
              <h2 className="section-title text-foreground mb-4 md:mb-6">{dashboardContent.headline}</h2>
              <p className="section-subtitle mx-auto">
                {dashboardContent.description}
              </p>
            </div>

            <div className="space-y-10 md:space-y-14">
              {dashboard.map((group) => (
                <div key={group.pathway}>
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5">
                    <div>
                      <h3 className="font-display font-bold text-xl md:text-2xl text-foreground">
                        {group.pathway}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{group.blurb}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={group.href}>Explore the pathway</Link>
                    </Button>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {group.metrics.map((metric) => (
                      <div key={metric.label} className="card-modern p-5 h-full">
                        <div className="text-3xl font-bold font-display text-primary mb-1">{metric.value}</div>
                        <h4 className="font-semibold text-sm text-foreground mb-2">{metric.label}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{metric.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-5">
                  {dashboardContent.cross_cutting_headline}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {crossCutting.map((metric) => (
                    <div key={metric.label} className="card-modern p-5 h-full">
                      <div className="text-3xl font-bold font-display text-accent mb-1">{metric.value}</div>
                      <h4 className="font-semibold text-sm text-foreground mb-2">{metric.label}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{metric.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Journeys — real learner stories, shared with the homepage section and
            fully admin-editable there (Home Page > Featured Success Stories). */}
        <SuccessStoriesSection id="journeys" linkToImpact={false} />

        {/* Annual impact reporting — fully admin-editable list (Home Page > Impact
            Reports Download Links), with a "Show more" toggle once there are more
            than a couple of reports. */}
        <ImpactReportSection id="annual-impact-reporting" />

        <section className="py-10 md:py-14">
          <div className="section-container max-w-4xl">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/annual-reports">
                  View annual reports
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/transparency">Transparency &amp; Governance</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-primary">
          <div className="section-container text-center max-w-3xl mx-auto px-4">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
              {reportingContent.cta_headline}
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/donation">Donate</Link>
              </Button>
              <Button variant="heroSecondary" size="lg" asChild>
                <Link to="/partnership">Partner with Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
