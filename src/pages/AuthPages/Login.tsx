import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { setAuth } from "../../utils/auth";

export default function Login() {
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return form.email.trim().length > 4 && form.password.trim().length >= 6;
  }, [form]);

const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErr(null);
  if (!canSubmit) return;

  setLoading(true);
  try {
    await new Promise((r) => setTimeout(r, 600)); // just to stimulate loging process
    const fakeToken = `learnify_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    setAuth({
      token: fakeToken,
      user: { name: "Learnify User", email: form.email.trim() },
    });

    window.dispatchEvent(new Event("auth-change"));
    nav("/");
  } catch {
    setErr("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};


  const inputWrap = "group flex items-center gap-3 rounded-2xl border border-border bg-bg-main px-4 h-12 transition focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/15";

  const inputBase = "w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted";

  return (
    <section className="relative overflow-hidden bg-bg-main min-h-[70vh] md:min-h-[calc(100vh-80px)]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 left-16 h-105 w-105 rounded-full bg-cta/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
          style={{backgroundImage:"linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-md">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
            className="rounded-3xl border border-border bg-bg-secondary/70 p-6 sm:p-7 backdrop-blur">
            <h1 className="text-xl font-semibold text-text-primary">Login</h1>
            <p className="mt-1 text-sm text-text-muted">
              Don’t have an account?{" "}
              <Link to="/auth/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>

            {err && (
              <div className="mt-4 rounded-2xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-text-primary">
                {err}
              </div>
            )}

            <form onSubmit={onSubmit} className="mt-6 grid gap-4">
              <label className="grid gap-2">
                <span className="text-xs text-text-muted">Email</span>
                <div className={inputWrap}>
                  <Mail size={18} className="text-text-muted group-focus-within:text-primary transition"/>
                  <input value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} type="email" placeholder="you@example.com" className={inputBase} autoComplete="email"/>
                </div>
              </label>

              <label className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">Password</span>
                  <Link to="/auth/forgot-password" className="text-xs text-text-secondary hover:text-text-primary hover:underline transition">
                    Forgot?
                  </Link>
                </div>

                <div className={inputWrap}>
                  <Lock size={18} className="text-text-muted group-focus-within:text-primary transition"/>
                  <input value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                    type={show ? "text" : "password"} placeholder="enter your password" className={inputBase} autoComplete="current-password"/>
                  <button type="button" onClick={() => setShow((v) => !v)} className="grid h-9 w-9 place-items-center rounded-xl hover:bg-bg-muted transition" aria-label="Toggle password">
                    {show ? (
                      <EyeOff size={18} className="text-text-muted" />
                    ) : (
                      <Eye size={18} className="text-text-muted" />
                    )}
                  </button>
                </div>
              </label>

              <button disabled={!canSubmit || loading} className={`h-12 rounded-2xl text-sm font-medium transition bg-primary text-white cursor-pointer hover:bg-primary-hover ${(!canSubmit || loading) && "opacity-60 cursor-not-allowed"}`}>
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-xs text-text-muted">
                By continuing, you agree to{" "}
                <Link to="/terms" className="text-text-secondary hover:underline">
                  Terms
                </Link>{" "}
                &{" "}
                <Link to="/privacy" className="text-text-secondary hover:underline">
                  Privacy
                </Link>
                .
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
