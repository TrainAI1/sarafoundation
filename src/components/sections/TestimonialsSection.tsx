import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Taiwo",
    role: "Full-Stack Developer",
    program: "CAP Tech Hub FUOYE, Nigeria",
    quote: "My journey with CAP Tech Hub as a Full-Stack Developer has been incredibly transformative. The hands-on sessions, structured learning pathway, and high-quality resources have strengthened my confidence and helped me build real technical depth. I now feel more prepared, more skilled, and more confident in pursuing real-world opportunities in tech.",
    rating: 5,
  },
  {
    id: 2,
    name: "Abubakar Samuel",
    role: "Engineering Student",
    program: "CAP Tech Hub Global, Togo",
    quote: "The CAP Tech Hub program has been an incredible journey for me. I learned so much about innovative tech solutions and gained hands-on experience that really boosted my confidence. The teamwork and collaborating with like-minded individuals sparked my creativity and pushed me to think outside the box.",
    rating: 5,
  },
  {
    id: 3,
    name: "Olamide Fasoranti",
    role: "UI/UX Designer",
    program: "FLIP Fellow, Cohort 1",
    quote: "The FLIP Fellowship challenged me to think differently about problem-solving and innovation. It pushed me beyond my comfort zone and helped me develop the confidence to create meaningful, real-world solutions. Through the program, I gained practical skills, valuable insights, and exposure to new perspectives.",
    rating: 5,
  },
  {
    id: 4,
    name: "Fathia",
    role: "200L Student, University of Ibadan",
    program: "CAP Tech Hub Cohort 2",
    quote: "Every expert session opened my eyes to something new. I've gained more practical knowledge in a few weeks than I had in my entire university journey so far.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 bg-secondary/50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-badge mb-6">
            <Star className="w-4 h-4" />
            Success Stories
          </span>
          <h2 className="section-title text-foreground mb-6">
            Hear From Our{" "}
            <span className="gradient-text">Community</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Real stories from alumni and members who've transformed their careers through our programs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card-modern p-8 md:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute -top-4 left-8 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6 pt-4">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8">
              "{current.quote}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                  {current.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-lg">{current.name}</p>
                  <p className="text-muted-foreground">{current.role}</p>
                  <p className="text-primary text-sm font-medium">{current.program}</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentIndex
                    ? "bg-primary w-8"
                    : "bg-border hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
