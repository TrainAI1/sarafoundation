import { GraduationCap } from "lucide-react";

const universities = [
  // Cohort 1
  { name: "University of Ilorin", country: "🇳🇬" },
  { name: "University of Lagos", country: "🇳🇬" },
  { name: "University of Abuja", country: "🇳🇬" },
  { name: "University of Ibadan", country: "🇳🇬" },
  { name: "Federal University of Technology, Akure", country: "🇳🇬" },
  { name: "Ajayi Crowther University", country: "🇳🇬" },
  { name: "Ahmadu Bello University, Zaria", country: "🇳🇬" },
  // Cohort 2
  { name: "Adeniran Ogunsanya College of Education", country: "🇳🇬" },
  { name: "American Caregiving University", country: "🇿🇦" },
  { name: "Babcock University", country: "🇳🇬" },
  { name: "Benue State University", country: "🇳🇬" },
  { name: "Cavendish University", country: "🇿🇲" },
  { name: "Evans University", country: "🇺🇬" },
  { name: "Federal Polytechnic Ilaro", country: "🇳🇬" },
  { name: "Federal University Lokoja", country: "🇳🇬" },
  { name: "Federal University of Oye Ekiti", country: "🇳🇬" },
  { name: "Gateway Polytechnic Saapade", country: "🇳🇬" },
  { name: "Kumasi Technical University", country: "🇬🇭" },
  { name: "Ladoke Akintola University of Technology", country: "🇳🇬" },
  { name: "Lagos State University", country: "🇳🇬" },
  { name: "Makerere University", country: "🇺🇬" },
  { name: "Micheal Okpara University of Agriculture", country: "🇳🇬" },
  { name: "Modibbo Adama University, Yola", country: "🇳🇬" },
  { name: "Mutesal Royal University", country: "🇺🇬" },
  { name: "Narok University", country: "🇰🇪" },
  { name: "National Open University of Nigeria", country: "🇳🇬" },
  { name: "Obafemi Awolowo University", country: "🇳🇬" },
  { name: "Polytechnic of Ibadan", country: "🇳🇬" },
  { name: "Global Wealth University", country: "🇹🇬" },
  { name: "University of Maiduguri", country: "🇳🇬" },
  { name: "University of Nigeria, Nsukka", country: "🇳🇬" },
  { name: "Asteven Energy Institute", country: "🇳🇬" },
];

export function PartnersSection() {
  // Double the list for seamless infinite scroll
  const doubled = [...universities, ...universities];

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 px-4">
          <span className="section-badge mb-6">
            <GraduationCap className="w-4 h-4" />
            Our University Partners
          </span>
          <h2 className="section-title text-foreground mb-4">
            Present in <span className="gradient-text">35+ African Universities</span>
          </h2>
          <p className="section-subtitle mx-auto">
            We have established CAP Tech Hubs across 7 countries, empowering students on campus.
          </p>
        </div>
      </div>

      {/* Scrolling ticker — row 1 (left) */}
      <div className="relative mb-4">
        <div className="flex animate-scroll-left gap-4 w-max">
          {doubled.map((uni, i) => (
            <div
              key={`a-${i}`}
              className="flex-shrink-0 inline-flex items-center gap-2.5 px-5 py-3 bg-card border border-border rounded-full hover:border-primary/30 transition-colors"
            >
              <span className="text-lg">{uni.country}</span>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {uni.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling ticker — row 2 (right) */}
      <div className="relative">
        <div className="flex animate-scroll-right gap-4 w-max">
          {[...doubled].reverse().map((uni, i) => (
            <div
              key={`b-${i}`}
              className="flex-shrink-0 inline-flex items-center gap-2.5 px-5 py-3 bg-card border border-border rounded-full hover:border-primary/30 transition-colors"
            >
              <span className="text-lg">{uni.country}</span>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {uni.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-container">
        <div className="text-center mt-10">
          <p className="text-muted-foreground text-sm">
            Across Nigeria 🇳🇬 · Ghana 🇬🇭 · Kenya 🇰🇪 · South Africa 🇿🇦 · Uganda 🇺🇬 · Zambia 🇿🇲 · Togo 🇹🇬
          </p>
        </div>
      </div>
    </section>
  );
}
