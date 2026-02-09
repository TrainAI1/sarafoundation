import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Who can apply for the Career Advancement Program (CAP)?",
    answer: "CAP is open to university students across Africa who are passionate about technology. You don't need prior coding experience – just enthusiasm and commitment to learn. We currently have CAP Tech Hubs in 35+ universities across 7 countries.",
  },
  {
    question: "How much does it cost to join the programs?",
    answer: "Both CAP and FLIP are completely free for participants. We believe in removing barriers to tech education and career advancement.",
  },
  {
    question: "What is the time commitment for CAP?",
    answer: "CAP is a 9-month program divided into three phases: Learn (12 weekly expert sessions), Build (developing real MVPs), and Launch (showcasing projects to industry leaders). Participants typically dedicate 10-15 hours per week.",
  },
  {
    question: "What is FLIP and who is it for?",
    answer: "The Female Leadership Initiative Program (FLIP) is a membership-based program empowering women in tech through mentorship, networking, and opportunities. It includes the Women Professionals in Tech Africa (WPTA) and Women Founders in Tech Africa (WFTA) communities.",
  },
  {
    question: "How can organizations partner with Sara Foundation Africa?",
    answer: "We offer various partnership models including sponsorships, university collaborations, and corporate partnerships. Current partners include Scintilla Innovations, Farmily, ALX, KàdàràBrite, Train AI, and more.",
  },
  {
    question: "Do students get real-world opportunities?",
    answer: "Yes! Through our partnerships, CAP students have secured internships at Farmily, full-time job offers, and showcased projects like ArtifyPro and CampusLink at our Talent Showcase in partnership with Scintilla Africa.",
  },
  {
    question: "Which countries do you operate in?",
    answer: "We currently operate across 7 African countries: Nigeria, Ghana, Kenya, South Africa, Uganda, Zambia, and Togo, with 35+ university partners.",
  },
];

export function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-6">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </span>
          <h2 className="section-title text-foreground mb-6">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Have questions? We've got answers. If you don't find what you're looking for, 
            feel free to contact us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="card-modern px-6 border-none"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
