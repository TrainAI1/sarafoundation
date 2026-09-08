import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { usePageContent } from "@/hooks/usePageContent";
import { assetUrl } from "@/lib/assetUrl";
import womanFounderPitch from "@/assets/woman-founder-pitch.jpg";
import capWomanLaptop from "@/assets/cap-woman-laptop.jpg";
import studentsLabImg from "@/assets/students-tech-lab.jpg";
import womenCoworking from "@/assets/women-coworking.jpg";
import capWomanBraids from "@/assets/cap-woman-braids.jpg";

const capstoneFallbackImages: Record<string, string> = {
  "01": womanFounderPitch,
  "02": capWomanLaptop,
  "03": studentsLabImg,
  "04": womenCoworking,
  "05": capWomanBraids,
};

const defaultCapstones = [
  {
    number: "01",
    category: "Fintech",
    name: "Odugbayi Olamide",
    project: "BI-powered reconciliation performance tracker",
    angle: "Applying business intelligence to banking operations.",
    image: womanFounderPitch,
    link: "https://www.linkedin.com/posts/sara-foundation_flipfellowship-capstoneproject-fintech-activity-7399130514781233152-qsfI",
  },
  {
    number: "02",
    category: "Fashion AI",
    name: "Anita Olang",
    project: "Personal AI stylist",
    angle: "Using AI to make wardrobe recommendations based on individual preferences.",
    image: capWomanLaptop,
  },
  {
    number: "03",
    category: "EdTech",
    name: "Ann Eberechuku",
    project: "Schoollink Global",
    angle: "Designing a tracking solution for school marketing.",
    image: studentsLabImg,
  },
  {
    number: "04",
    category: "Creative AI",
    name: "Happiness Stephen",
    project: "Style Pick App",
    angle: "Supporting designers and tailors through AI-assisted style selection.",
    image: womenCoworking,
  },
  {
    number: "05",
    category: "Customer Intelligence",
    name: "Stella Adetoyese",
    project: "AI-powered customer feedback intelligence system",
    angle: "Turning customer feedback into actionable service insights.",
    image: capWomanBraids,
  },
];

export function FLIPCapstoneShowcase() {
  const { data: c } = usePageContent("flip-capstone-showcase", {
    badge: "FLIP Fellowship 1.0 Capstones",
    headline_pre: "Five capstone projects,",
    headline_accent: "five learning journeys",
    description:
      "Capstone work completed by FLIP Cohort 1 fellows. These are learning projects and business " +
      "models developed during the fellowship, presented as evidence of applied learning.",
    capstones: defaultCapstones,
    footer_note: "Use the arrows or swipe to see all five capstone projects.",
  });

  const capstones = c.capstones as typeof defaultCapstones;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">{c.badge}</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            {c.headline_pre} <span className="gradient-text-accent">{c.headline_accent}</span>
          </h2>
          <p className="section-subtitle mx-auto">
            {c.description}
          </p>
        </div>

        <div className="px-4 lg:px-0">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
            aria-label="FLIP Fellowship Cohort 1 capstone projects"
          >
            <CarouselContent className="-ml-4">
              {capstones.map((item) => {
                const fallbackImg = capstoneFallbackImages[item.number] || womanFounderPitch;
                const imgSrc = item.image ? assetUrl(item.image) : fallbackImg;
                return (
                  <CarouselItem key={item.number} className="pl-4 basis-full md:basis-1/2">
                    <article className="card-modern overflow-hidden p-6 h-full flex flex-col">
                      <div className="mb-4 h-48 rounded-xl overflow-hidden shadow-sm bg-muted">
                        <img
                          src={imgSrc}
                          alt={`${item.name} - ${item.project}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = fallbackImg;
                          }}
                        />
                      </div>
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
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex items-center justify-center gap-3 mt-8">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
          <p className="text-center text-xs text-muted-foreground mt-4">
            {c.footer_note}
          </p>
        </div>
      </div>
    </section>
  );
}
