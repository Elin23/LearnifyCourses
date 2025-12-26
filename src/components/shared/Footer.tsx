import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative  border-t border-border bg-bg-main">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative -translate-y-10 rounded-2xl border border-border bg-bg-secondary/50 p-6 backdrop-blur overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-16 left-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -bottom-16 right-10 h-72 w-72 rounded-full bg-cta/15 blur-3xl" />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h3 className="text-lg font-semibold text-text-primary">Ready to start learning?</h3>
              <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                Explore top-rated courses and build real projects step by step.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/courses" className=" inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white hover:bg-primary-hover transition">
                Browse Courses
              </Link>

              <Link to="/support" className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-5 text-sm font-medium text-text-primary hover:bg-bg-muted transition">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 opacity-[0.06] dark:opacity-[0.08]"
        style={{backgroundImage:"linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)", backgroundSize: "44px 44px",}}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 pb-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-text-primary font-secondary">
              Learnify
            </h3>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              Learn modern tech skills through practical courses designed for real-world projects and career growth.
            </p>

            {/* Social Media*/}
            <div className="mt-5 flex items-center gap-3">
              <a href="https://twitter.com/" target="_blank" rel="noreferrer" aria-label="Twitter"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-secondary/40 text-text-secondary hover:text-text-primary hover:bg-bg-muted transition">
                <Twitter size={18} />
              </a>

              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-secondary/40 text-text-secondary
                  hover:text-text-primary hover:bg-bg-muted transition">
                <Linkedin size={18} />
              </a>

              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-secondary/40 text-text-secondary hover:text-text-primary hover:bg-bg-muted transition">
                <Instagram size={18} />
              </a>

              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-secondary/40 text-text-secondary
                  hover:text-text-primary hover:bg-bg-muted transition">
                <Facebook size={18} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Explore</h4>
            <ul className="mt-4 space-y-3 text-sm text-text-secondary">
              <li>
                <Link to="/courses" className="hover:text-text-primary transition">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/instructions" className="hover:text-text-primary transition">
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-text-primary transition">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Account</h4>
            <ul className="mt-4 space-y-3 text-sm text-text-secondary">
              <li>
                <Link to="/my-courses" className="hover:text-text-primary transition">
                  My Courses
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-text-primary transition">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-text-primary transition">
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary">Support</h4>
            <ul className="mt-4 space-y-3 text-sm text-text-secondary">
              <li>
                <Link to="/support" className="hover:text-text-primary transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-text-primary transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-text-primary transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-text-muted"> © 2025 Learnify. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-text-muted">
            <Link to="/terms" className="hover:text-text-primary transition">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-text-primary transition">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
