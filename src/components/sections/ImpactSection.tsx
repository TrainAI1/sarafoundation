import { TrendingUp, Users, Globe, Award, Building, GraduationCap } from "lucide-react";
import impactLecture from "@/assets/impact-lecture.jpg";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import { usePageContent } from "@/hooks/usePageContent";



export function ImpactSection() {
  const { data: c } = usePageContent("home-impact", {
    students_value: "763+", students_desc: "Across 2 cohorts in CAP Tech Hub",
    universities_value: "35+", universities_desc: "Partner institutions across Africa",
    countries_value: "8", countries_desc: "Nigeria, Ghana, Kenya, Uganda & more",
    fellows_value: "21", fellows_desc: "Women empowered in Cohort 1",
    partners_value: "10+", partners_desc: "Scintilla, Farmily, Train AI & more",
    community_value: "5,250+", community_desc: "People reached across Africa via social media",
  });

  const impactStats = [
    { icon: Users, value: c.students_value, label: "Students Trained", description: c.students_desc },
    { icon: GraduationCap, value: c.universities_value, label: "Universities", description: c.universities_desc },
    { icon: Globe, value: c.countries_value, label: "Countries", description: c.countries_desc },
    { icon: Award, value: c.fellows_value, label: "FLIP Fellows", description: c.fellows_desc },
    { icon: Building, value: c.partners_value, label: "Key Partners", description: c.partners_desc },
    { icon: TrendingUp, value: c.community_value, label: "Community Reach", description: c.community_desc },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-foreground via-foreground/95 to-[hsl(240,20%,15%)] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-primary blur-[200px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-accent blur-[200px]" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center mb-12 md:mb-16">
          <ScrollAnimation variant="slide-left">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-4 py-2 glass-card-dark rounded-full text-white/90 text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4 text-accent" />
                Our Impact
              </span>
              <h2 className="section-title text-white mb-6">
                Making a Difference{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">
                  Across Africa
                </span>
              </h2>
              <p className="text-lg text-white/60 leading-relaxed mx-auto lg:mx-0">
                Since our founding, we've been committed to creating measurable impact 
                in African tech communities.
              </p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation variant="slide-right">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={impactLecture} 
                alt="African tech conference with diverse attendees"
                className="w-full h-56 md:h-72 object-cover"
              />
            </div>
          </ScrollAnimation>
        </div>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6" staggerDelay={0.08}>
          {impactStats.map((stat) => (
            <StaggerItem key={stat.label} variant="scale-in">
              <div className="glass-card-dark p-4 md:p-6 text-center group hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white font-medium text-xs md:text-sm mb-1">{stat.label}</div>
                <div className="text-white/50 text-xs hidden sm:block">{stat.description}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
