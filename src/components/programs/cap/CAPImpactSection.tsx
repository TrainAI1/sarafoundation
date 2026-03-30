import capManStudying from "@/assets/cap-man-studying.jpg";
import capWomanYellow from "@/assets/cap-woman-yellow.jpg";

const stats = [
  { value: "35+", label: "Universities", sub: "across Africa" },
  { value: "8", label: "Countries", sub: "Nigeria, Ghana, Uganda, Kenya, Zambia, Togo & more" },
  { value: "800+", label: "Students", sub: "in CAP Tech Hubs Database" },
  { value: "5,500+", label: "People Reached", sub: "via social media & sessions" },
  { value: "8", label: "Full-Time & Intern Job Offers", sub: "secured by CAP alumni in 2025" },
  { value: "6", label: "Expert Sessions", sub: "per Learn phase cohort" },
  { value: "92%", label: "Scholarship from Sara Foundation", sub: "" },
  { value: "2025", label: "Prestige Award Winner", sub: "London & South East England" },
];

export function CAPImpactSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">Our Impact</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            Proven Results. <span className="gradient-text">Growing Fast.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-4 gap-4 md:gap-6 px-4 lg:px-0 mb-8">
          {stats.slice(0, 4).map((stat) => (
            <div key={stat.label} className="card-modern p-5 md:p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold font-display text-primary mb-2">
                {stat.value}
              </div>
              <h3 className="font-display font-bold text-sm text-foreground mb-1">
                {stat.label}
              </h3>
              {stat.sub && (
                <p className="text-muted-foreground text-xs">{stat.sub}</p>
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-4 md:gap-6 px-4 lg:px-0">
          {stats.slice(4).map((stat) => (
            <div key={stat.label} className="card-modern p-5 md:p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold font-display text-primary mb-2">
                {stat.value}
              </div>
              <h3 className="font-display font-bold text-sm text-foreground mb-1">
                {stat.label}
              </h3>
              {stat.sub && (
                <p className="text-muted-foreground text-xs">{stat.sub}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
