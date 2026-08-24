import { GraduationCap, Crown, Network, Users, DollarSign, Megaphone, Star } from "lucide-react";

const benefits = [
  {
    icon: GraduationCap,
    title: "Skill Development and Capacity Building",
    description: "Access to training and resources to enhance your technical and business skills.",
  },
  {
    icon: Crown,
    title: "Leadership Development and Empowerment",
    description: "Programs designed to prepare women for leadership roles in the tech industry.",
  },
  {
    icon: Network,
    title: "Networking and Community Access",
    description: "Connect with a vibrant network of professionals and industry experts.",
  },
  {
    icon: Users,
    title: "Mentorship and Development Resources",
    description: "Pair with experienced mentors and access curated development materials.",
  },
  {
    icon: DollarSign,
    title: "Access to Funding and Investment",
    description: "Support opportunities for founders to connect with investors and funding.",
  },
  {
    icon: Megaphone,
    title: "Advocacy, Visibility and Policy Impact",
    description: "Amplify your voice and contribute to policy changes for women in tech.",
  },
];

export function FLIPBenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">
            <Star className="w-4 h-4" />
            Membership Benefits
          </span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            What You'll <span className="gradient-text-accent">Gain</span>
          </h2>
          <p className="section-subtitle mx-auto">
            We provide comprehensive support and access to benefits that empower women to succeed 
            in the tech industry, drive innovation, and contribute to economic and social progress across Africa.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 lg:px-0">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="card-modern p-5 md:p-6 group">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-accent flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <benefit.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="font-display font-bold text-sm md:text-base text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
