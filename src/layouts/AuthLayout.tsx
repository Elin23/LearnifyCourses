import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/shared/Footer";
import ScrollToTop from "../components/shared/ScrollToTop";

export default function AuthLayout() {
  return (
    <section className="relative overflow-hidden bg-bg-main">
      <ScrollToTop/>  {/* to scroll to the top of new opened page */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 left-16 h-105 w-105 rounded-full bg-cta/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]" style={{
            backgroundImage:"linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>
      <div className="mx-auto grid h-full max-w-6xl grid-rows-[auto_1fr_auto] px-4">
        <header className="pt-5">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="flex items-center justify-between rounded-2xl border border-border bg-bg-secondary/60 px-4 py-3 backdrop-blur">
            <Link to="/" className="text-lg font-semibold tracking-tight text-text-primary" style={{ fontFamily: "var(--font-secondary)" }}>
              Learnify
            </Link>
            <div className="flex items-center gap-3">
              <Link to="/courses" className="text-sm text-text-secondary hover:text-text-primary transition">
                Browse courses
              </Link>
              <span className="hidden sm:inline text-text-muted">•</span>
              <Link to="/" className="hidden sm:inline text-sm text-text-secondary hover:text-text-primary transition">
                Back to home
              </Link>
            </div>
          </motion.div>
        </header>

        <main className="flex items-center justify-center md:pb-16">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="w-full">
            <Outlet />
          </motion.div>
        </main>

       <Footer/>
      </div>
    </section>
  );
}
