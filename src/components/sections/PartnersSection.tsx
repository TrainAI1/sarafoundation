import { GraduationCap } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const universities = [
  // Cohort 1
  { name: "University of Ilorin", country: "Nigeria", flag: "🇳🇬" },
  { name: "University of Lagos", country: "Nigeria", flag: "🇳🇬" },
  { name: "University of Abuja", country: "Nigeria", flag: "🇳🇬" },
  { name: "University of Ibadan", country: "Nigeria", flag: "🇳🇬" },
  { name: "Federal University of Technology, Akure", country: "Nigeria", flag: "🇳🇬" },
  { name: "Ajayi Crowther University", country: "Nigeria", flag: "🇳🇬" },
  { name: "Ahmadu Bello University, Zaria", country: "Nigeria", flag: "🇳🇬" },
  // Cohort 2
  { name: "Adeniran Ogunsanya College of Education", country: "Nigeria", flag: "🇳🇬" },
  { name: "American Caregiving University", country: "South Africa", flag: "🇿🇦" },
  { name: "Babcock University", country: "Nigeria", flag: "🇳🇬" },
  { name: "Benue State University", country: "Nigeria", flag: "🇳🇬" },
  { name: "Cavendish University", country: "Zambia", flag: "🇿🇲" },
  { name: "Evans University", country: "Uganda", flag: "🇺🇬" },
  { name: "Federal Polytechnic Ilaro", country: "Nigeria", flag: "🇳🇬" },
  { name: "Federal University Lokoja", country: "Nigeria", flag: "🇳🇬" },
  { name: "Federal University of Oye Ekiti", country: "Nigeria", flag: "🇳🇬" },
  { name: "Gateway Polytechnic Saapade", country: "Nigeria", flag: "🇳🇬" },
  { name: "Kumasi Technical University", country: "Ghana", flag: "🇬🇭" },
  { name: "Ladoke Akintola University of Technology", country: "Nigeria", flag: "🇳🇬" },
  { name: "Lagos State University", country: "Nigeria", flag: "🇳🇬" },
  { name: "Makerere University", country: "Uganda", flag: "🇺🇬" },
  { name: "Micheal Okpara University of Agriculture", country: "Nigeria", flag: "🇳🇬" },
  { name: "Modibbo Adama University, Yola", country: "Nigeria", flag: "🇳🇬" },
  { name: "Mutesal Royal University", country: "Uganda", flag: "🇺🇬" },
  { name: "Narok University", country: "Kenya", flag: "🇰🇪" },
  { name: "National Open University of Nigeria", country: "Nigeria", flag: "🇳🇬" },
  { name: "Obafemi Awolowo University", country: "Nigeria", flag: "🇳🇬" },
  { name: "Polytechnic of Ibadan", country: "Nigeria", flag: "🇳🇬" },
  { name: "Global Wealth University", country: "Togo", flag: "🇹🇬" },
  { name: "University of Maiduguri", country: "Nigeria", flag: "🇳🇬" },
  { name: "University of Nigeria, Nsukka", country: "Nigeria", flag: "🇳🇬" },
  { name: "Asteven Energy Institute", country: "Nigeria", flag: "🇳🇬" },
];

export function PartnersSection() {
  const doubled = [...universities, ...universities];

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="section-container">
        <ScrollAnimation variant="fade-up" className="text-center max-w-3xl mx-auto mb-10 md:mb-14 px-4">
          <span className="section-badge mb-6">
            <GraduationCap className="w-4 h-4" />
            Our University Partners
          </span>
          <h2 className="section-title text-foreground mb-4">
            Present in <span className="gradient-text">35 African Universities</span>
          </h2>
          <p className="section-subtitle mx-auto">
            We have established CAP Tech Hubs across 8 African countries, supporting young people on campus.
          </p>
        </ScrollAnimation>
      </div>

      {/* Scrolling ticker — row 1 (left) */}
      <div className="relative mb-4">
        <div className="flex animate-scroll-left gap-4 w-max">
          {doubled.map((uni, i) => (
            <div
              key={`a-${i}`}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"
            >
              <span className="text-lg" role="img" aria-label={`${uni.country} flag`}>{uni.flag}</span>
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
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"
            >
              <span className="text-lg" role="img" aria-label={`${uni.country} flag`}>{uni.flag}</span>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {uni.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-container">
        <ScrollAnimation variant="fade-in" className="text-center mt-10">
          <p className="text-muted-foreground text-sm">
            Across Nigeria 🇳🇬 · Ghana 🇬🇭 · Kenya 🇰🇪 · South Africa 🇿🇦 · Uganda 🇺🇬 · Zambia 🇿🇲 · Togo 🇹🇬
          </p>
        </ScrollAnimation>
      </div>
    </section>
  );
}
