import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  GraduationCap, ArrowRight, BookOpen, Users, Eye, Lightbulb,
  CheckCircle2, Globe, ClipboardList, HelpCircle, FileText
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import unilagLogo from "@/assets/logos/unilag.png";
import uonLogo from "@/assets/logos/uon.png";
import ashesiLogo from "@/assets/logos/ashesi.png";
import uctLogo from "@/assets/logos/uct.png";

const benefits = [
  {
    number: "01",
    icon: BookOpen,
    title: "Access to Resources",
    description: "Partnering with Sara Foundation Africa can provide universities with access to various resources such as research, reports, and data. These resources can help universities to stay up-to-date with the latest trends and developments in the tech industry in Africa.",
  },
  {
    number: "02",
    icon: Users,
    title: "Networking Opportunities",
    description: "Partnering with Sara Foundation Africa provides universities with the opportunity to connect with a network of tech professionals, entrepreneurs, and innovators across Africa, fostering collaboration and knowledge exchange.",
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Social Impact",
    description: "Partnering with Sara Foundation Africa provides universities with the opportunity to make a positive social impact. By supporting the organization's initiatives, universities can contribute to the growth of the tech industry in Africa and help to promote Diversity, Equity and Inclusion in technology.",
  },
  {
    number: "04",
    icon: Eye,
    title: "Institution Visibility",
    description: "Partnering with Sara Foundation Africa enhances your institution's visibility across the African tech ecosystem, positioning your university as a leader in tech education and innovation.",
  },
];

const partnerUniversities = [
  // Cohort 1
  { name: "University of Ilorin", country: "Nigeria", logo: null },
  { name: "University of Lagos", country: "Nigeria", logo: unilagLogo },
  { name: "University of Abuja", country: "Nigeria", logo: null },
  { name: "University of Ibadan", country: "Nigeria", logo: null },
  { name: "Federal University of Technology, Akure", country: "Nigeria", logo: null },
  { name: "Ajayi Crowther University", country: "Nigeria", logo: null },
  { name: "Ahmadu Bello University, Zaria", country: "Nigeria", logo: null },
  // Cohort 2
  { name: "Adeniran Ogunsanya College of Education", country: "Nigeria", logo: null },
  { name: "American Caregiving University", country: "South Africa", logo: null },
  { name: "Babcock University", country: "Nigeria", logo: null },
  { name: "Benue State University", country: "Nigeria", logo: null },
  { name: "Cavendish University", country: "Zambia", logo: null },
  { name: "Evans University", country: "Uganda", logo: null },
  { name: "Federal Polytechnic Ilaro", country: "Nigeria", logo: null },
  { name: "Federal University Lokoja", country: "Nigeria", logo: null },
  { name: "Federal University of Oye Ekiti", country: "Nigeria", logo: null },
  { name: "Gateway Polytechnic Saapade", country: "Nigeria", logo: null },
  { name: "Kumasi Technical University", country: "Ghana", logo: null },
  { name: "Ladoke Akintola University of Technology", country: "Nigeria", logo: null },
  { name: "Lagos State University", country: "Nigeria", logo: null },
  { name: "Makerere University", country: "Uganda", logo: null },
  { name: "Micheal Okpara University of Agriculture", country: "Nigeria", logo: null },
  { name: "Modibbo Adama University, Yola", country: "Nigeria", logo: null },
  { name: "Mutesal Royal University", country: "Uganda", logo: null },
  { name: "Narok University", country: "Kenya", logo: null },
  { name: "National Open University of Nigeria", country: "Nigeria", logo: null },
  { name: "Obafemi Awolowo University", country: "Nigeria", logo: null },
  { name: "Polytechnic of Ibadan", country: "Nigeria", logo: null },
  { name: "Global Wealth University", country: "Togo", logo: null },
  { name: "University of Maiduguri", country: "Nigeria", logo: null },
  { name: "University of Nigeria, Nsukka", country: "Nigeria", logo: null },
  { name: "Asteven Energy Institute", country: "Nigeria", logo: null },
];

const applicationSteps = [
  { step: "01", title: "Express Interest", description: "Fill out the partnership interest form on our website or contact us directly." },
  { step: "02", title: "Alignment Meeting", description: "We schedule a meeting to understand your institution's goals and how CAP can support them." },
  { step: "03", title: "MOU Signing", description: "Both parties sign a Memorandum of Understanding outlining roles and expectations." },
  { step: "04", title: "Hub Setup & Launch", description: "We work with your institution to set up the CAP Tech Hub and onboard students." },
];

const eligibilityCriteria = [
  "Accredited university or higher education institution in Africa",
  "Dedicated faculty sponsor or liaison for the partnership",
  "Space available on campus for tech club meetings and workshops",
  "Commitment to promoting Diversity, Equity, and Inclusion",
  "Willingness to share impact data and participate in reporting",
];

const whatYouGet = [
  { title: "CAP Tech Hub", description: "A fully equipped tech club on your campus with curated curriculum and resources." },
  { title: "Student Training", description: "Structured programs in software engineering, product management, data science, and more." },
  { title: "Mentorship Access", description: "Connect your students with industry professionals across Africa and beyond." },
  { title: "Faculty Development", description: "Workshops and resources for faculty to stay current with industry practices." },
  { title: "Career Support", description: "Internship placements, job readiness training, and employer introductions for students." },
  { title: "Community Events", description: "Hackathons, demo days, and networking events hosted at your institution." },
];

const faqs = [
  { q: "How long does the partnership process take?", a: "From initial contact to hub launch, the process typically takes 4–6 weeks depending on institutional readiness and logistics." },
  { q: "Is there a cost for the university?", a: "No, there is no cost. Sara Foundation provides the program at no charge. We only require institutional support such as a liaison and meeting space." },
  { q: "Can multiple departments participate?", a: "Yes! We encourage cross-departmental participation. CAP is designed for students from any academic background interested in tech." },
  { q: "What is the minimum student count?", a: "We recommend a minimum of 20 students to form a viable hub, but we are flexible based on institutional context." },
  { q: "Does the partnership include online programs?", a: "Yes, many of our resources and sessions are available online, allowing hybrid participation for students." },
];

export default function SchoolCommunity() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>School & Community Partnerships – Sara Foundation Africa</title>
        <meta name="description" content="Partner with Sara Foundation to bring CAP Tech Hubs to your university. Access resources, student training, and faculty development." />
        <link rel="canonical" href="https://sarafoundation.lovable.app/partnership/school-community" />
      </Helmet>
      <Navbar />
      
      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-accent blur-[100px] md:blur-[150px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center px-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 glass-card-dark rounded-full text-white/90 text-sm font-medium mb-4 md:mb-6">
              <GraduationCap className="w-4 h-4 text-accent" />
              School Community Partnership
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Partner with Sara Foundation Africa
            </h1>
            <p className="text-base md:text-xl text-white/70 leading-relaxed mb-6 md:mb-8 max-w-3xl mx-auto">
              Partnering with Sara Foundation Africa can provide universities with access to talent pools, 
              networking opportunities, brand visibility, social impact, and valuable resources. We are 
              excited to work with universities to contribute to the growth of the tech industry in Africa 
              and promote Diversity, Equity and Inclusion in technology.
            </p>
            <p className="text-sm md:text-lg text-white/60 mb-6 md:mb-8 max-w-3xl mx-auto">
              The Career Advancement Program (CAP) is an initiative of Sara Foundation Africa aimed at 
              establishing tech clubs across African universities and providing development opportunities 
              for the next generation of tech founders and tech professionals.
            </p>
            <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/contact">
                Register Your Institution
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Campus Presence - Scrollable */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-4 md:mb-6">
              <Globe className="w-4 h-4" />
              Our Campus Presence
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Universities We <span className="gradient-text">Partner With</span>
            </h2>
            <p className="section-subtitle mx-auto">
              We collaborate with leading institutions across Africa to bring tech education to students.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
                {partnerUniversities.map((uni) => (
                  <div key={uni.name} className="flex-shrink-0 w-[200px] md:w-[240px] p-4 md:p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-3 overflow-hidden">
                      {uni.logo ? (
                        <img src={uni.logo} alt={uni.name} className="w-11 h-11 md:w-12 md:h-12 object-contain" />
                      ) : (
                        <GraduationCap className="w-7 h-7 text-primary" />
                      )}
                    </div>
                    <p className="font-semibold text-foreground text-sm md:text-base truncate">{uni.name}</p>
                    <p className="text-muted-foreground text-xs md:text-sm">{uni.country}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center text-muted-foreground text-xs mt-3">Scroll horizontally to see all {partnerUniversities.length} partner universities →</p>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-4 md:mb-6">
              <FileText className="w-4 h-4" />
              What You Get
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Partnership <span className="gradient-text">Deliverables</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Here's what your institution receives when you partner with us.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {whatYouGet.map((item) => (
              <div key={item.title} className="card-modern p-5 md:p-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-base md:text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-4 md:mb-6">
              <CheckCircle2 className="w-4 h-4" />
              Benefits
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Why You Should <span className="gradient-text">Partner with Us</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.number} className="card-modern p-6 md:p-8 flex flex-col sm:flex-row gap-4 md:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-base md:text-lg">
                    {benefit.number}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2 md:mb-3">
                    <benefit.icon className="w-5 h-5 text-primary" />
                    <h3 className="font-display font-bold text-lg md:text-xl text-foreground">{benefit.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="px-4 lg:px-0">
              <span className="section-badge mb-4 md:mb-6">
                <ClipboardList className="w-4 h-4" />
                Eligibility
              </span>
              <h2 className="section-title text-foreground mb-4 md:mb-6">
                Who Can <span className="gradient-text">Apply?</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We welcome applications from accredited institutions across Africa that share our commitment 
                to empowering the next generation of tech talent.
              </p>
              <ul className="space-y-3">
                {eligibilityCriteria.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-foreground text-sm md:text-base">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-4 lg:px-0">
              <div className="space-y-4">
                {applicationSteps.map((item) => (
                  <div key={item.step} className="card-modern p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-4 md:mb-6">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto px-4">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`} className="card-modern border-none px-5 md:px-6">
                  <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-foreground hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)]">
        <div className="section-container text-center px-4">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Ready to Bring Tech Education to Your Campus?
          </h2>
          <p className="text-white/70 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
            Join our network of partner universities and help shape the future of African tech talent.
          </p>
          <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
            <Link to="/contact">
              Register Your Institution
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
