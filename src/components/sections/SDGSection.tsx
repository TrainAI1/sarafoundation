import { BookOpen, Users, Briefcase } from "lucide-react";

const sdgGoals = [
  {
    number: 4,
    icon: BookOpen,
    title: "Quality Education",
    description: "To ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
    color: "from-primary to-[hsl(240,80%,50%)]",
  },
  {
    number: 5,
    icon: Users,
    title: "Gender Equality",
    description: "To empower and uplift women entrepreneurs and professionals in technology, fostering a supportive community that encourages leadership, collaboration, and innovation.",
    color: "from-[hsl(240,80%,50%)] to-primary",
  },
  {
    number: 8,
    icon: Briefcase,
    title: "Decent Work & Economic Growth",
    description: "To foster a vibrant and collaborative tech community within African universities, driving innovation, skills development, and technology-driven solutions.",
    color: "from-primary to-accent",
  },
];

export function SDGSection() {
  return (
    <section className="py-0">
      {sdgGoals.map((goal) => (
        <div
          key={goal.number}
          className={`py-16 bg-gradient-to-r ${goal.color}`}
        >
          <div className="section-container text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
                <goal.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                SDG {goal.number}
              </h3>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                {goal.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
