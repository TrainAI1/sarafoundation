import { ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { usePageContent } from "@/hooks/usePageContent";
import { assetUrl } from "@/lib/assetUrl";
import capHappyCoder from "@/assets/cap-happy-coder.jpg";
import youngDeveloper from "@/assets/young-developer.jpg";
import techEntrepreneurs from "@/assets/tech-entrepreneurs.jpg";
import studentsLabImg from "@/assets/students-tech-lab.jpg";
import capWomanLaptop from "@/assets/cap-woman-laptop.jpg";

type Project = {
  name: string;
  context: string;
  need: string | null;
  skills: string | null;
  output: string | null;
  support: string | null;
  nextStep: string | null;
  image?: string;
  link?: string;
  linkLabel?: string;
};

const projectFallbackImages = [
  capHappyCoder,
  youngDeveloper,
  techEntrepreneurs,
  studentsLabImg,
  capWomanLaptop,
];

const defaultProjects: Project[] = [
  {
    name: "ArtifyPro",
    context: "CAP Tech Hub project",
    need: "Empowering African creatives with modern digital portfolio tools.",
    skills: "UI/UX design, Front-end development and product management.",
    output: "Learner project presented through CAP Tech Hub activity.",
    support: "Supported by CAP project mentors.",
    nextStep: "Continued feature development and user feedback.",
    image: capHappyCoder,
    link: "https://www.linkedin.com/posts/sara-foundation_sarafoundation-captechhub-artifypro-activity-7452626779514732544-0BcX",
    linkLabel: "Watch project",
  },
  {
    name: "Campuslink",
    context: "CAP Tech Hub project",
    need: "Connecting university students across African campuses.",
    skills: "Product management and technical collaboration practised in a team setting.",
    output: "Campuslink app developed by a CAP learner project team.",
    support: "Team-based project work with CAP mentor oversight.",
    nextStep: "Continued product and technical learning.",
    image: youngDeveloper,
    link: "https://www.linkedin.com/posts/sara-foundation_sarafoundation-captechhub-cohortspotlight-activity-7462891845514219520-L8D4",
    linkLabel: "Watch story",
  },
  {
    name: "StudyPath AI",
    context: "CAP Tech Hub project",
    need: "Personalised study plan generation for campus students.",
    skills: "AI prompt engineering and web interface design.",
    output: "Learner project developed during CAP activity.",
    support: "Supported by CAP project mentors.",
    nextStep: "Refining recommendations based on learner testing.",
    image: techEntrepreneurs,
  },
  {
    name: "Oracle Traffic AI",
    context: "CAP Conference project",
    need: "Optimising urban traffic congestion in West African cities.",
    skills: "Data analysis and predictive modelling.",
    output: "Project presented at CAP Conference.",
    support: "Presented through CAP Conference activity.",
    nextStep: "Expanding data sources and testing prototype.",
    image: studentsLabImg,
  },
  {
    name: "Echonav",
    context: "CAP Conference project",
    need: "Navigation support and accessibility for visually impaired learners.",
    skills: "Mobile UI and assistive audio tech integration.",
    output: "Project presented at CAP Conference 2025.",
    support: "Presented through CAP Conference activity.",
    nextStep: "Community testing and feedback gathering.",
    image: capWomanLaptop,
    link: "https://www.linkedin.com/posts/sara-foundation_captechhubconference2025-techforgood-innovation-activity-7300539568489984000-gC-e",
    linkLabel: "See project",
  },
  {
    name: "Carpool AI",
    context: "CAP Conference project",
    need: "Safe, shared student transit matching for university campuses.",
    skills: "No-code workflow build and route optimization.",
    output: "Project presented at CAP Conference.",
    support: "Presented through CAP Conference activity.",
    nextStep: "Pilot rollout at selected campus hub.",
    image: capHappyCoder,
  },
  {
    name: "Hexcars",
    context: "CAP learner project",
    need: "Transparent automotive service listing platform.",
    skills: "Full-stack web development.",
    output: "Web application built by a CAP learner.",
    support: "Developed through CAP Tech Hub learning activity.",
    nextStep: "Enhancing user verification features.",
    image: youngDeveloper,
    link: "https://www.linkedin.com/posts/sara-foundation_captechhub-webdevelopment-fullstackdeveloper-activity-7244363803411279873-AW6B",
    linkLabel: "See project",
  },
  {
    name: "Shopping Cart",
    context: "CAP learner project",
    need: "E-commerce platform prototype for local artisans.",
    skills: "Full-stack development applied to an e-commerce use case.",
    output: "Shopping cart application built by a CAP learner.",
    support: "Developed through CAP Tech Hub learning activity.",
    nextStep: "Integrating payment gateway APIs.",
    image: techEntrepreneurs,
    link: "https://www.linkedin.com/posts/sara-foundation_fullstackdevelopment-captechhub-ecommercesolutions-activity-7247641276110557184-52gy",
    linkLabel: "See project",
  },
  {
    name: "Famconnect",
    context: "CAP learner project",
    need: "Community engagement board for extended family support.",
    skills: "Front-end web development and state management.",
    output: "Learner project developed during CAP activity.",
    support: "Supported by CAP project mentors.",
    nextStep: "User feedback and mobile responsiveness tuning.",
    image: studentsLabImg,
  },
  {
    name: "To-do List App",
    context: "CAP learner project",
    need: "Task and goal tracking utility for campus projects.",
    skills: "Web application development fundamentals.",
    output: "To-do list web app built by a CAP learner.",
    support: "Developed through CAP Tech Hub learning activity.",
    nextStep: "Adding local storage persistence and subtasks.",
    image: capWomanLaptop,
    link: "https://www.linkedin.com/posts/sara-foundation_project-spotlight-to-do-list-web-app-by-activity-7250183374852546561-x_vO",
    linkLabel: "See project",
  },
];

const Field = ({ label, value }: { label: string; value: string | null }) => {
  if (!value) return null;
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground/80 mt-1">{value}</dd>
    </div>
  );
};

export function CAPProjectShowcase() {
  const { data: c } = usePageContent("cap-project-showcase", {
    badge: "Project Showcase",
    headline_main: "Evidence of",
    headline_highlight: "applied learning",
    description: "These are learner projects created during CAP activity. They are presented as evidence of applied learning, not as commercial businesses or start-ups.",
    projects: defaultProjects,
  });

  const projects = c.projects as Project[];

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">{c.badge}</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            {c.headline_main} <span className="gradient-text">{c.headline_highlight}</span>
          </h2>
          <p className="section-subtitle mx-auto">
            {c.description}
          </p>
        </div>

        <div className="px-4 lg:px-0">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
            aria-label="CAP learner projects"
          >
            <CarouselContent className="-ml-4">
              {projects.map((project, idx) => {
                const fallbackImg = projectFallbackImages[idx % projectFallbackImages.length];
                const imgSrc = project.image ? assetUrl(project.image) : fallbackImg;
                return (
                  <CarouselItem key={project.name} className="pl-4 basis-full md:basis-1/2">
                    <article className="card-modern overflow-hidden p-5 md:p-6 h-full flex flex-col">
                      <div className="mb-4 h-44 rounded-xl overflow-hidden shadow-sm bg-muted">
                        <img
                          src={imgSrc}
                          alt={`${project.name} project screenshot/photo`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = fallbackImg;
                          }}
                        />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                        {project.context}
                      </span>
                      <h3 className="font-display font-bold text-lg text-foreground mt-1 mb-4">{project.name}</h3>
                      <dl className="space-y-3 flex-1">
                        <Field label="Problem / learning need" value={project.need} />
                        <Field label="Skills applied" value={project.skills} />
                        <Field label="Project created" value={project.output} />
                        <Field label="Mentor or programme support" value={project.support} />
                        <Field label="Next learning step" value={project.nextStep} />
                      </dl>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 py-1.5 text-sm font-medium text-primary mt-5 hover:underline"
                        >
                          {project.linkLabel}: {project.name}
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
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
            Use the arrows or swipe to see all {projects.length} learner projects.
          </p>
        </div>
      </div>
    </section>
  );
}
