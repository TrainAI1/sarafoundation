const capstones = [
  {
    number: "01",
    category: "Fintech",
    name: "Odugbayi Olamide",
    project: "BI-powered reconciliation performance tracker",
    angle: "Applying business intelligence to banking operations.",
    link: "https://www.linkedin.com/posts/sara-foundation_flipfellowship-capstoneproject-fintech-activity-7399130514781233152-qsfI",
  },
  {
    number: "02",
    category: "Fashion AI",
    name: "Anita Olang",
    project: "Personal AI stylist",
    angle: "Using AI to make wardrobe recommendations based on individual preferences.",
  },
  {
    number: "03",
    category: "EdTech",
    name: "Ann Eberechuku",
    project: "Schoollink Global",
    angle: "Designing a tracking solution for school marketing.",
  },
  {
    number: "04",
    category: "Creative AI",
    name: "Happiness Stephen",
    project: "Style Pick App",
    angle: "Supporting designers and tailors through AI-assisted style selection.",
  },
  {
    number: "05",
    category: "Customer Intelligence",
    name: "Stella Adetoyese",
    project: "AI-powered customer feedback intelligence system",
    angle: "Turning customer feedback into actionable service insights.",
  },
];

export function FLIPCapstoneShowcase() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">FLIP Fellowship 1.0 Capstones</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            Five capstone projects, <span className="gradient-text-accent">five learning journeys</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Capstone work completed by FLIP Cohort 1 fellows. These are learning projects and business
            models developed during the fellowship, presented as evidence of applied learning.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 lg:px-0">
          {capstones.map((item) => (
            <article key={item.number} className="card-modern p-6 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold text-accent">{item.number}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {item.category}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-1">{item.name}</h3>
              <p className="text-sm font-medium text-accent mb-3">{item.project}</p>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">{item.angle}</p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-accent mt-4 hover:underline"
                >
                  Read the capstone story for {item.name}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
