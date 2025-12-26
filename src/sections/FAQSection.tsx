import { useState } from "react";
import { motion } from "framer-motion";
import TitleComponent from "../components/shared/TitleComponent";
import { HelpCircle, ChevronDown } from "lucide-react";

export default function FAQsSection() {
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    {
      q: "How fast do you reply?",
      a: "Usually within 24 hours on weekdays. During peak times it may take longer, but we always respond.",
    },
    {
      q: "Can I ask about a specific course?",
      a: "Yes. Add the course name and your purchase email (if any) so we can help faster.",
    },
    {
      q: "I can’t access my course. What should I do?",
      a: "Try logging out and in again, then check My Courses. If it still doesn’t show, contact support with your account email.",
    },
    {
      q: "Do you offer refunds?",
      a: "Refund policies depend on the course and purchase date. Check Terms & Privacy, or contact support for your order.",
    },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-bg-main to-transparent" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg-main" />
        <div className="absolute -top-32 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-32 left-24 h-105 w-105 rounded-full bg-cta/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
          style={{ backgroundImage:"linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <TitleComponent
          badge={
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary/60 px-4 py-2 text-sm text-text-secondary backdrop-blur">
              <HelpCircle size={16} className="text-primary" />
              FAQs
            </span>
          }
          title="Frequently asked questions" description="Quick answers to common questions about courses, access, and payments."
          align="center" className="max-w-2xl"
        />

        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }}
          className="mx-auto mt-10 max-w-3xl space-y-3"
        >
          {faqs.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <div key={f.q} className="rounded-2xl border border-border bg-bg-main overflow-hidden">
                <button type="button" onClick={() => setOpen(isOpen ? null : idx)}
                  className=" w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-bg-muted transition">
                  <span className="text-sm font-semibold text-text-primary">
                    {f.q}
                  </span>
                  <ChevronDown size={18} className={`shrink-0 text-text-muted transition ${ isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-text-secondary leading-relaxed">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
