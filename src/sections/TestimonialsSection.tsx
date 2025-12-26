import { useMemo } from "react";
import TitleComponent from "../components/shared/TitleComponent";
import TestimonialCard from "../components/shared/TestimonialCard";
import { testimonials } from "../data/testimonials";
import { MessageSquareQuote } from "lucide-react";
import Slider from "../components/ui/Slider";

export default function TestimonialsSection() {
  const list = useMemo(() => testimonials, []);

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg-main" />
        <div className="absolute -top-24 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 right-16 h-105 w-105 rounded-full bg-cta/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
          style={{backgroundImage:"linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)", backgroundSize: "44px 44px",}}/>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <TitleComponent badge={
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary/60 px-4 py-2 text-sm text-text-secondary backdrop-blur">
              <MessageSquareQuote size={16} className="text-primary" />
              Testimonials
            </span>
          }
          title="What learners say"
          description="Real feedback from students who used our courses to build projects and grow their skills."
          align="center"
          className="max-w-2xl"
        />

        <Slider>
          {list.map((t: any) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </Slider>
      </div>
    </section>
  );
}
