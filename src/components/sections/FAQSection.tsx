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
    answer: "CAP is open to university students across Africa who are passionate about technology. You don't need prior coding experience – just enthusiasm and commitment to learn.",
  },
  {
    question: "How much does it cost to join the programs?",
    answer: "Both CAP and FLIP are completely free for participants. We believe in removing barriers to tech education and career advancement.",
  },
  {
    question: "What is the time commitment for CAP?",
    answer: "CAP is a 9-month program divided into three phases. Participants typically dedicate 10-15 hours per week to workshops, mentorship sessions, and project work.",
  },
  {
    question: "How can organizations partner with Sara Foundation Africa?",
    answer: "We offer various partnership models including sponsorships, university collaborations, and corporate partnerships. Contact our partnership team to explore opportunities.",
  },
  {
    question: "Do you offer certificates upon completion?",
    answer: "Yes! All CAP graduates receive a certificate of completion. FLIP members also receive recognition for completing specific training modules and milestones.",
  },
  {
    question: "Which countries do you operate in?",
    answer: "We currently operate in over 10 African countries including Nigeria, Ghana, Kenya, South Africa, and more. We're continuously expanding our reach.",
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
