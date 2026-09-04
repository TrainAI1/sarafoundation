import { BookOpen, Users, Briefcase } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { usePageContent } from "@/hooks/usePageContent";

// Icons are code, not admin-editable content — kept in a local lookup keyed by SDG number.
const sdgIcons: Record<number, typeof BookOpen> = {
  4: BookOpen,
  5: Users,
  8: Briefcase,
};

const defaultSdgGoals = [
  {
    number: 4,
    title: "Quality Education",
    description: "To ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
    color: "bg-primary",
  },
  {
    number: 5,
    title: "Gender Equality",
    description: "To empower and uplift women entrepreneurs and professionals in technology, fostering a supportive community that encourages leadership, collaboration, and innovation.",
    color: "bg-[hsl(240,80%,50%)]",
  },
  {
    number: 8,
    title: "Decent Work & Economic Growth",
    description: "To foster a vibrant and collaborative tech community within African universities, driving innovation, skills development, and technology-driven solutions.",
    color: "bg-primary",
  },
];

export function SDGSection() {
  const { data: c } = usePageContent("home-sdg", {
    sdg_goals: defaultSdgGoals,
  });

  const sdgGoals = (c.sdg_goals as typeof defaultSdgGoals).map((goal) => ({
    ...goal,
    icon: sdgIcons[goal.number] ?? BookOpen,
  }));

  return (
    <section className="py-12 md:py-16 bg-primary">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-4">
          {sdgGoals.map((goal, index) => (
            <ScrollAnimation key={goal.number} variant="fade-up" delay={index * 0.1}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm mb-4 md:mb-6">
                  <goal.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
                  SDG {goal.number}
                </h3>
                <p className="text-sm md:text-base text-white/80 leading-relaxed">
                  {goal.description}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
