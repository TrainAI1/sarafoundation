import { ExternalLink } from "lucide-react";

type Project = {
  name: string;
  context: string;
  need: string | null;
  skills: string | null;
  output: string | null;
  support: string | null;
  nextStep: string | null;
  link?: string;
  linkLabel?: string;
};

const projects: Project[] = [
  {
    name: "ArtifyPro",
    context: "CAP Tech Hub project",
    need: null,
    skills: null,
    output: "Learner project presented through CAP Tech Hub activity.",
    support: "Supported by CAP project mentors.",
    nextStep: null,
    link: "https://www.linkedin.com/posts/sara-foundation_sarafoundation-captechhub-artifypro-activity-7452626779514732544-0BcX",
    linkLabel: "Watch project",
  },
  {
    name: "Campuslink",
    context: "CAP Tech Hub project",
    need: null,
    skills: "Product management and technical collaboration practised in a team setting.",
    output: "Campuslink app developed by a CAP learner project team.",
    support: "Team-based project work with CAP mentor oversight.",
    nextStep: "Continued product and technical learning.",
    link: "https://www.linkedin.com/posts/sara-foundation_sarafoundation-captechhub-cohortspotlight-activity-7462891845514219520-L8D4",
    linkLabel: "Watch story",
  },
  {
    name: "StudyPath AI",
    context: "CAP Tech Hub project",
    need: null,
    skills: null,
    output: "Learner project developed during CAP activity.",
    support: "Supported by CAP project mentors.",
    nextStep: null,
  },
  {
    name: "Oracle Traffic AI",
    context: "CAP Conference project",
    need: null,
    skills: null,
    output: "Project presented at CAP Conference.",
    support: "Presented through CAP Conference activity.",
    nextStep: null,
  },
  {
    name: "Echonav",
    context: "CAP Conference project",
    need: null,
    skills: null,
    output: "Project presented at CAP Conference 2025.",
    support: "Presented through CAP Conference activity.",
    nextStep: null,
    link: "https://www.linkedin.com/posts/sara-foundation_captechhubconference2025-techforgood-innovation-activity-7300539568489984000-gC-e",
    linkLabel: "See project",
  },
  {
    name: "Carpool AI",
    context: "CAP Conference project",
    need: null,
    skills: null,
    output: "Project presented at CAP Conference.",
    support: "Presented through CAP Conference activity.",
    nextStep: null,
  },
  {
    name: "Hexcars",
    context: "CAP learner project",
    need: null,
    skills: "Full-stack web development.",
    output: "Web application built by a CAP learner.",
    support: "Developed through CAP Tech Hub learning activity.",
    nextStep: null,
    link: "https://www.linkedin.com/posts/sara-foundation_captechhub-webdevelopment-fullstackdeveloper-activity-7244363803411279873-AW6B",
    linkLabel: "See project",
  },
  {
    name: "Shopping Cart",
    context: "CAP learner project",
    need: null,
    skills: "Full-stack development applied to an e-commerce use case.",
    output: "Shopping cart application built by a CAP learner.",
    support: "Developed through CAP Tech Hub learning activity.",
    nextStep: null,
    link: "https://www.linkedin.com/posts/sara-foundation_fullstackdevelopment-captechhub-ecommercesolutions-activity-7247641276110557184-52gy",
    linkLabel: "See project",
  },
  {
    name: "Famconnect",
    context: "CAP learner project",
    need: null,
    skills: null,
    output: "Learner project developed during CAP activity.",
    support: "Supported by CAP project mentors.",
    nextStep: null,
  },
  {
    name: "To-do List App",
    context: "CAP learner project",
    need: null,
    skills: "Web application development fundamentals.",
    output: "To-do list web app built by a CAP learner.",
    support: "Developed through CAP Tech Hub learning activity.",
    nextStep: null,
    link: "https://www.linkedin.com/posts/sara-foundation_project-spotlight-to-do-list-web-app-by-activity-7250183374852546561-x_vO",
    linkLabel: "See project",
  },
];

const Field = ({ label, value }: { label: string; value: string | null }) => (
  <div>
    <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</dt>
    <dd className="text-sm text-foreground/80 mt-1">
      {value ?? (
        <span className="text-xs text-muted-foreground italic">[CONTENT REQUIRED: {label.toLowerCase()}]</span>
      )}
    </dd>
  </div>
);

export function CAPProjectShowcase() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">Project Showcase</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            Evidence of <span className="gradient-text">applied learning</span>
          </h2>
          <p className="section-subtitle mx-auto">
            These are learner projects created during CAP activity. They are presented as evidence of applied
            learning, not as commercial businesses or start-ups.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 lg:px-0">
          {projects.map((project) => (
            <article key={project.name} className="card-modern p-5 md:p-6 h-full flex flex-col">
              <div
                className="mb-4 flex h-32 items-center justify-center rounded-xl border border-dashed border-border bg-secondary/60 px-3 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                role="img"
                aria-label={`Image placeholder for the ${project.name} project`}
              >
                [ASSET REQUIRED: {project.name} project image]
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
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary mt-5 hover:underline"
                >
                  {project.linkLabel}: {project.name}
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
