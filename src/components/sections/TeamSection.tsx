import { Linkedin, Twitter } from "lucide-react";

const advisors = [
  {
    name: "Dr. Amara Okonkwo",
    role: "Board Chair",
    bio: "Former Tech Executive with 20+ years in Silicon Valley",
    image: null,
  },
  {
    name: "Emmanuel Adeyemi",
    role: "Board Member",
    bio: "Venture Partner at leading African VC firm",
    image: null,
  },
  {
    name: "Grace Mwangi",
    role: "Board Member",
    bio: "Founder of multiple successful tech startups",
    image: null,
  },
  {
    name: "Kwame Asante",
    role: "Board Member",
    bio: "Policy advisor on African tech innovation",
    image: null,
  },
];

const leadership = [
  {
    name: "Sarah Adekunle",
    role: "Executive Director",
    bio: "Passionate about empowering the next generation of African tech leaders",
    image: null,
  },
  {
    name: "Michael Obi",
    role: "Program Director",
    bio: "Leading our flagship Career Advancement Program initiatives",
    image: null,
  },
  {
    name: "Fatima Hassan",
    role: "Community Lead",
    bio: "Building vibrant communities of women in African tech",
    image: null,
  },
];

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string | null;
}

function TeamMember({ name, role, bio, image }: TeamMemberProps) {
  return (
    <div className="card-elevated p-6 text-center group">
      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
        {image ? (
          <img src={image} alt={name} className="w-full h-full rounded-full object-cover" />
        ) : (
          <span className="text-3xl font-bold text-white">
            {name.split(' ').map(n => n[0]).join('')}
          </span>
        )}
      </div>
      <h4 className="font-display font-bold text-lg text-foreground">{name}</h4>
      <p className="text-primary font-medium text-sm mb-2">{role}</p>
      <p className="text-muted-foreground text-sm mb-4">{bio}</p>
      <div className="flex justify-center gap-3">
        <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
          <Linkedin className="w-4 h-4" />
        </a>
        <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
          <Twitter className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export function TeamSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-6">
            Our Team
          </span>
          <h2 className="section-title text-foreground mb-6">
            Meet the People Behind Our Mission
          </h2>
          <p className="section-subtitle mx-auto">
            Our dedicated team of advisors and leaders are committed to 
            transforming the African tech ecosystem.
          </p>
        </div>

        {/* Board of Advisors */}
        <div className="mb-16">
          <h3 className="font-display font-bold text-2xl text-center mb-8 text-foreground">
            Board of Advisors
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advisors.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div>
          <h3 className="font-display font-bold text-2xl text-center mb-8 text-foreground">
            Leadership Team
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {leadership.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
