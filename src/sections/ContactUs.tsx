import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import TitleComponent from "../components/shared/TitleComponent";
import { MessageCircle, Send, Mail,Headphones, HelpCircle, Clock3, ShieldCheck} from "lucide-react";
import { useToast } from "../components/shared/Toast";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email.trim());
}

export default function ContactUs() {
  const { toast } = useToast();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const validation = useMemo(() => {
    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    const errors: string[] = [];

    if (name.length < 2) errors.push("Please enter your full name.");
    if (!isValidEmail(email)) errors.push("Please enter a valid email address.");
    if (subject.length < 3) errors.push("Please enter a subject.");
    if (message.length < 10) errors.push("Your message should be at least 10 characters.");

    return {
      ok: errors.length === 0,
      errors,
    };
  }, [form]);

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validation.ok) {
      toast({
        variant: "error",
        title: "Please check your details",
        message: validation.errors[0], 
        duration: 3500,
      });
      return;
    }

    toast({
      variant: "success",
      title: "Message sent successfully",
      message:
        "Thanks! We received your message. Please expect our reply within 24 hours.",
      duration: 3500,
    });

    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <section className="relative overflow-hidden pt-12 pb-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-bg-main to-transparent" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg-main" />
        <div className="absolute -top-32 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-32 left-24 h-105 w-105 rounded-full bg-cta/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
          style={{ backgroundImage: "linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <TitleComponent
          badge={
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary/60 px-4 py-2 text-sm text-text-secondary backdrop-blur">
              <MessageCircle size={16} className="text-primary" />
              Contact us
            </span>
          }
          title="We’re here to help" description="Send your message and we’ll get back to you with the right guidance." align="center" className="max-w-2xl"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Left section */}
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.5 }} className="relative overflow-hidden rounded-2xl border border-border bg-bg-main p-6">
            <div className="pointer-events-none absolute -top-20 -left-16 h-64 w-64 rounded-full bg-primary/12 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-cta/12 blur-3xl" />

            <h3 className="text-lg font-semibold text-text-primary">
              Quick support, clear answers
            </h3>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
              Whether it’s courses, payments, or access issues — we’ll guide you step by step.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-bg-secondary/40 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                  <Clock3 size={16} className="text-primary" /> Response time
                </div>
                <p className="mt-1 text-xs text-text-muted">
                  Usually within 24h (weekdays)
                </p>
              </div>

              <div className="rounded-xl border border-border bg-bg-secondary/40 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                  <ShieldCheck size={16} className="text-primary" /> Safe & private
                </div>
                <p className="mt-1 text-xs text-text-muted">
                  Your data stays protected
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {[
                {
                  icon: <Mail size={18} />,
                  title: "Email us",
                  desc: "support@learnify.com",
                },
                {
                  icon: <Headphones size={18} />,
                  title: "Support",
                  desc: "We help with access & billing",
                },
                {
                  icon: <HelpCircle size={18} />,
                  title: "FAQs",
                  desc: "Find quick answers instantly",
                },
              ].map((x) => (
                <div
                  key={x.title}
                  className="flex items-start gap-3 rounded-xl border border-border bg-bg-secondary/40 p-4"
                >
                  <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    {x.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text-primary">
                      {x.title}
                    </p>
                    <p className="mt-1 text-xs text-text-secondary wrap-break-word">
                      {x.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.form initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }} onSubmit={onSubmit}
            className="rounded-2xl border border-border bg-bg-main p-6">
            <h3 className="text-lg font-semibold text-text-primary">Send a message</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="text-xs text-text-muted">Full name</label>
                <input name="name" value={form.name} onChange={onChange} type="text" placeholder="Your name" className="mt-2 h-11 w-full rounded-lg border border-border bg-bg-secondary/40 px-4 text-sm text-text-primary placeholder:text-text-muted outline-none
                    focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="text-xs text-text-muted">Email</label>
                <input name="email" value={form.email} onChange={onChange} type="email" placeholder="you@example.com" className="mt-2 h-11 w-full rounded-lg border border-border bg-bg-secondary/40 px-4 text-sm text-text-primary
                    placeholder:text-text-muted outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-text-muted">Subject</label>
                <input name="subject" value={form.subject} onChange={onChange} type="text" placeholder="How can we help?" className="mt-2 h-11 w-full rounded-lg border border-border bg-bg-secondary/40 px-4 text-sm text-text-primary placeholder:text-text-muted
                    outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-text-muted">Message</label>
                <textarea name="message" value={form.message} onChange={onChange}
                  rows={5} placeholder="Write your message..."  className="mt-2 w-full rounded-lg border border-border bg-bg-secondary/40 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none
                    focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition resize-none"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-text-muted">
                By sending, you agree to our{" "}
                <span className="text-text-secondary">support policy</span>.
              </p>

              <button type="submit" className="inline-flex h-11 items-center justify-center gap-2 hover:bg-primary-hover rounded-lg bg-primary px-5 text-sm font-medium text-white transition">
                <Send size={16} />
                Send
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
