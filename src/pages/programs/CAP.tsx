import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  GraduationCap, BookOpen, Rocket, Zap, ArrowRight,
  CheckCircle2, Users, Calendar, MapPin, Clock, Star
} from "lucide-react";

const phases = [
  {
    name: "Learn",
    icon: BookOpen,
    duration: "3 Months",
    description: "Build foundational tech skills through hands-on workshops, online courses, and mentorship sessions.",
    outcomes: [
      "Programming fundamentals",
      "Web development basics",
      "Problem-solving skills",
      "Tech industry awareness",
    ],
  },
  {
    name: "Build",
    icon: Rocket,
    duration: "3 Months",
    description: "Apply your skills by working on real-world projects with guidance from industry mentors.",
    outcomes: [
      "Portfolio projects",
      "Team collaboration",
      "Project management",
      "Technical documentation",
    ],
  },
  {
    name: "Launch",
    icon: Zap,
    duration: "3 Months",
    description: "Prepare for your tech career with job placement support, interview prep, and networking.",
    outcomes: [
      "Resume optimization",
      "Interview preparation",
      "Industry connections",
      "Career placement support",
    ],
  },
];

const benefits = [
  "Free program – no cost to participants",
  "Expert mentorship from industry professionals",
  "Hands-on project experience",
  "Networking with tech leaders",
  "Job placement support",
  "Certificate of completion",
  "Access to alumni network",
  "Internship opportunities",
];

const stats = [
  { value: "500+", label: "Students Trained" },
  { value: "50+", label: "Partner Universities" },
  { value: "85%", label: "Job Placement Rate" },
  { value: "9", label: "Months Duration" },
];

export default function ProgramCAP() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-accent blur-[100px] md:blur-[150px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="px-4 lg:px-0">
              <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 glass-card-dark rounded-full text-white/90 text-xs md:text-sm font-medium mb-4 md:mb-6">
                <GraduationCap className="w-3 h-3 md:w-4 md:h-4 text-accent" />
                9-Month Rotational Program
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Career Advancement Program (CAP)
              </h1>
              <p className="text-base md:text-xl text-white/70 leading-relaxed mb-6 md:mb-8">
                A comprehensive program implemented through CAP TECH CLUBS in African universities, 
                nurturing young Africans to become tech professionals and founders.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button variant="hero" size="lg" className="group">
                  Apply Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="heroSecondary" size="lg">
                  Download Brochure
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="glass-card-dark p-6 md:p-8 rounded-2xl md:rounded-3xl mx-4 lg:mx-0">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center p-2 md:p-4">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white mb-1 md:mb-2">{stat.value}</div>
                    <div className="text-white/60 text-xs md:text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Phases */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-4 md:mb-6">Program Structure</span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Three Phases to{" "}
              <span className="gradient-text">Transform Your Career</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Our structured 9-month program takes you from learning fundamentals 
              to launching your tech career.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {phases.map((phase, index) => (
              <div key={phase.name} className="card-modern p-5 md:p-8 relative overflow-hidden group">
                {/* Phase number */}
                <div className="absolute top-3 md:top-4 right-3 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {index + 1}
                </div>

                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <phase.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>

                <div className="inline-flex items-center gap-2 text-xs md:text-sm text-primary font-medium mb-2 md:mb-3">
                  <Clock className="w-3 h-3 md:w-4 md:h-4" />
                  {phase.duration}
                </div>

                <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-2 md:mb-3">
                  {phase.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 md:mb-6">
                  {phase.description}
                </p>

                <ul className="space-y-2 md:space-y-3">
                  {phase.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="px-4 lg:px-0">
              <span className="section-badge mb-4 md:mb-6">
                <Star className="w-4 h-4" />
                Why Join CAP
              </span>
              <h2 className="section-title text-foreground mb-4 md:mb-6">
                What You'll{" "}
                <span className="gradient-text-accent">Gain</span>
              </h2>
              <p className="section-subtitle mb-8 md:mb-10">
                CAP provides everything you need to kickstart your tech career, 
                completely free of charge.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-card rounded-lg md:rounded-xl border border-border/50">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                    <span className="text-xs md:text-sm text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative px-4 lg:px-0">
              <div className="aspect-square rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <div className="text-center p-6 md:p-8">
                  <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl">
                    <GraduationCap className="w-12 h-12 md:w-16 md:h-16 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-2">Join 500+ Alumni</h3>
                  <p className="text-muted-foreground text-sm">
                    Be part of our growing community of tech professionals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)]">
        <div className="section-container text-center px-4">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Ready to Start Your Tech Journey?
          </h2>
          <p className="text-white/70 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
            Applications are open for the next cohort. Take the first step towards your tech career.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button variant="hero" size="lg" className="group">
              Apply for CAP
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroSecondary" size="lg" asChild>
              <Link to="/contact">Have Questions?</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
