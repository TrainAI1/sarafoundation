import { Linkedin, Twitter, Users2 } from "lucide-react";

const coreTeam = [
  { 
    name: "Kalu Sarah", 
    role: "Founder", 
    bio: "Leading professional with expertise in finance, technology, and strategy. Works in global fintech and has served as a global advisor to several foundations. On a mission to lead Africa-wide impact in SDG 5 and SDG 8." 
  },
  { 
    name: "Inem Emmanuel", 
    role: "Public Relations Specialist", 
    bio: "Helps brands connect with their audiences with years of experience in social media management, designs, marketing, and communications. Skilled in creating and executing PR strategies." 
  },
  { 
    name: "Emediong Joel", 
    role: "Program Manager", 
    bio: "Leads tech-driven initiatives such as CAP and FLIP to empower African youth and women. Champions inclusive programs that provide emerging talents with mentorship and opportunities in tech." 
  },
];

const advisors = [
  { 
    name: "Toby Nwanede", 
    role: "Startup Founder", 
    bio: "Partner at PIF; Founded Scintilla Innovations; Lead Marketing Consultant at Shoprite Nigeria." 
  },
  { 
    name: "Ayoola Ademoye", 
    role: "Business Analyst", 
    bio: "Over 12 years of experience; contributed to ACCA's success in Nigeria; Business Analyst at Jisc (UK)." 
  },
  { 
    name: "Dolapo Dahunsi", 
    role: "HR Professional", 
    bio: "People Operations & Immigration Specialist for West Africa at General Electric (GE); Co-founded Career Pinnacle." 
  },
  { 
    name: "Fisayo Adeyemi", 
    role: "Business Analyst", 
    bio: "Founder of Rayne Consults; 'The BA Influencer'; Director of Communications for IIBA Nigeria." 
  },
  { 
    name: "Ayodeji Babatunde", 
    role: "VC Investor", 
    bio: "Secured $2.3M for tech startups; founded VC Dialogues; Impact Officer for Global Shaper Community Atlanta." 
  },
];

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
}

function TeamMember({ name, role, bio }: TeamMemberProps) {
  const initials = name.split(' ').map(n => n[0]).join('');
  
  return (
    <div className="card-modern p-6 md:p-8 text-center group">
      <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-80 group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0.5 rounded-full bg-card flex items-center justify-center">
          <span className="text-xl md:text-2xl font-bold font-display gradient-text">
            {initials}
          </span>
        </div>
      </div>
      <h4 className="font-display font-bold text-base md:text-lg text-foreground">{name}</h4>
      <p className="text-primary font-medium text-xs md:text-sm mb-2">{role}</p>
      <p className="text-muted-foreground text-xs md:text-sm mb-4 md:mb-5 line-clamp-3">{bio}</p>
      <div className="flex justify-center gap-2">
        <a href="#" className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
          <Linkedin className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </a>
        <a href="#" className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
          <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </a>
      </div>
    </div>
  );
}

export function TeamSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-secondary/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">
            <Users2 className="w-4 h-4" />
            Our Team
          </span>
          <h2 className="section-title text-foreground mb-4 md:mb-6 text-balance">
            Meet the People Behind{" "}
            <span className="gradient-text">Our Mission</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Our dedicated team of leaders and advisors are committed to 
            transforming the African tech ecosystem.
          </p>
        </div>

        {/* Core Team */}
        <div className="mb-12 md:mb-16">
          <h3 className="font-display font-bold text-xl md:text-2xl text-center mb-8 md:mb-10 text-foreground">
            Core Team
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {coreTeam.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </div>
        </div>

        {/* Board of Advisors */}
        <div>
          <h3 className="font-display font-bold text-xl md:text-2xl text-center mb-8 md:mb-10 text-foreground">
            Board of Advisors
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
            {advisors.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
