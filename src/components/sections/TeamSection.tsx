import { Linkedin, Twitter, Users2 } from "lucide-react";

const advisors = [
  { name: "Dr. Amara Okonkwo", role: "Board Chair", bio: "Former Tech Executive with 20+ years in Silicon Valley" },
  { name: "Emmanuel Adeyemi", role: "Board Member", bio: "Venture Partner at leading African VC firm" },
  { name: "Grace Mwangi", role: "Board Member", bio: "Founder of multiple successful tech startups" },
  { name: "Kwame Asante", role: "Board Member", bio: "Policy advisor on African tech innovation" },
];

const leadership = [
  { name: "Sarah Adekunle", role: "Executive Director", bio: "Passionate about empowering the next generation of African tech leaders" },
  { name: "Michael Obi", role: "Program Director", bio: "Leading our flagship Career Advancement Program initiatives" },
  { name: "Fatima Hassan", role: "Community Lead", bio: "Building vibrant communities of women in African tech" },
];

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
}

function TeamMember({ name, role, bio }: TeamMemberProps) {
  const initials = name.split(' ').map(n => n[0]).join('');
  
  return (
    <div className="card-modern p-8 text-center group">
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-80 group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0.5 rounded-full bg-card flex items-center justify-center">
          <span className="text-2xl font-bold font-display gradient-text">
            {initials}
          </span>
        </div>
      </div>
      <h4 className="font-display font-bold text-lg text-foreground">{name}</h4>
      <p className="text-primary font-medium text-sm mb-2">{role}</p>
      <p className="text-muted-foreground text-sm mb-5">{bio}</p>
      <div className="flex justify-center gap-2">
        <a href="#" className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
          <Linkedin className="w-4 h-4" />
        </a>
        <a href="#" className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
          <Twitter className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export function TeamSection() {
  return (
    <section className="py-24 md:py-32 bg-secondary/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-badge mb-6">
            <Users2 className="w-4 h-4" />
            Our Team
          </span>
          <h2 className="section-title text-foreground mb-6 text-balance">
            Meet the People Behind{" "}
            <span className="gradient-text">Our Mission</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Our dedicated team of advisors and leaders are committed to 
            transforming the African tech ecosystem.
          </p>
        </div>

        {/* Board of Advisors */}
        <div className="mb-16">
          <h3 className="font-display font-bold text-2xl text-center mb-10 text-foreground">
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
          <h3 className="font-display font-bold text-2xl text-center mb-10 text-foreground">
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
