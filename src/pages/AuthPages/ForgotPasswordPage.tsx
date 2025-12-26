import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);


  const [email, setEmail] = useState("");
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };


  const canSubmit = useMemo(() => {
    return isValidEmail(email.trim());
  }, [email]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setErr(null);

    if (!isValidEmail(email.trim())) {
      setErr("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      setDone(true);
    } catch {
      setErr("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  const inputWrap ="group flex items-center gap-3 rounded-2xl border border-border bg-bg-main px-4 h-12 transition focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/15";
  const inputBase ="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted";

  return (
    <section className="relative overflow-hidden bg-bg-main min-h-[60vh] md:min-h-[calc(100vh-80px)]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 left-16 h-105 w-105 rounded-full bg-cta/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
          style={{ backgroundImage: "linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)", backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-md">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
            className="rounded-3xl border border-border bg-bg-secondary/70 p-6 sm:p-7 backdrop-blur">
            <h1 className="text-xl font-semibold text-text-primary">
              Forgot password
            </h1>
            <p className="mt-1 text-sm text-text-muted leading-relaxed">
              Enter your email and we’ll send you a reset link.
            </p>

            {err && (
              <div className="mt-4 rounded-2xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-text-primary">
                {err}
              </div>
            )}

            {done ? (
              <div className="mt-6 rounded-2xl border border-border bg-bg-main/50 p-4">
                <p className="text-sm font-semibold text-text-primary">
                  Check your inbox
                </p>
                <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                  If an account exists for <span className="text-text-primary font-medium">{email.trim()}</span>,
                  you’ll receive a reset link shortly.
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  <Link to="/auth/login" className=" h-12 rounded-2xl border border-border inline-flex items-center justify-center text-sm font-medium text-text-primary hover:bg-bg-muted transition">
                    Back to login
                  </Link>
                  <button type="button" onClick={() => {setDone(false); setEmail("");}} className=" h-12 rounded-2xl inline-flex items-center justify-center text-sm font-medium text-white bg-primary hover:bg-primary-hover transition">
                    Send again
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                <label className="grid gap-2">
                  <span className="text-xs text-text-muted">Email</span>
                  <div className={inputWrap}>
                    <Mail size={18} className="text-text-muted group-focus-within:text-primary transition"/>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" className={inputBase} autoComplete="email"/>
                  </div>
                </label>

                <button disabled={!canSubmit || loading} className={`h-12 rounded-2xl text-sm font-medium transition bg-primary text-white hover:bg-primary-hover",
                    ${(!canSubmit || loading) && "opacity-60 cursor-not-allowed"}`}
                >
                  {loading ? "Sending..." : "Send reset link"}
                </button>

                <p className="text-center text-xs text-text-muted leading-relaxed">
                  Remembered it?{" "}
                  <Link to="/auth/login" className="text-text-secondary hover:underline">
                    Back to login
                  </Link>
                </p>
                {submitted && !isValidEmail(email) && (
                  <p className="text-xs text-error mt-1 flex justify-center">
                    Please enter a valid email address
                  </p>
                )}

              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
