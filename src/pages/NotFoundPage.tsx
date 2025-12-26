import { Link } from "react-router-dom";
import { motion, useReducedMotion, easeInOut } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function NotFoundPage() {
  const reduce = useReducedMotion();

  const floatAnim = reduce ? undefined : { y: [0, -10, 0], rotate: [0, -1.2, 0] };
  const floatTrans = reduce
    ? { duration: 0 }
    : { duration: 4.6, repeat: Infinity, ease: easeInOut };

  const scanAnim = reduce ? undefined : { x: ["-120%", "120%"] };
  const scanTrans = reduce
    ? { duration: 0 }
    : { duration: 3.8, repeat: Infinity, ease: easeInOut };

  const driftAnim = reduce ? undefined : { x: [0, 16, 0], y: [0, -10, 0] };
  const driftTrans = reduce
    ? { duration: 0 }
    : { duration: 6.2, repeat: Infinity, ease: easeInOut };

  return (
    <section className="relative min-h-screen overflow-hidden bg-bg-main">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg-main" />
        <div className="absolute -top-24 left-1/2 h-130 w-130-translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 left-16 h-105 w-105 rounded-full bg-cta/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
          style={{backgroundImage:"linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)", backgroundSize: "44px 44px", }}
        />
      </div>

      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.98, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.35, ease: easeInOut }}
          className="relative w-full max-w-xl">
          <motion.div className="pointer-events-none absolute -inset-12 -z-10 rounded-[40px] blur-3xl" animate={driftAnim} transition={driftTrans}
            style={{background: "radial-gradient(380px circle at 30% 40%, rgba(37,99,235,.18), transparent 60%), radial-gradient(320px circle at 70% 70%, rgba(245,158,11,.16), transparent 60%)",}}
          />
          <motion.div className="relative overflow-hidden rounded-3xl border border-border bg-bg-secondary/60 p-8 backdrop-blur" animate={floatAnim} transition={floatTrans}>
            <motion.div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-r from-white/0 via-white/10 to-white/0 opacity-60 dark:opacity-30" animate={scanAnim} transition={scanTrans}/>
            {!reduce && (
              <>
                <motion.span className="pointer-events-none absolute left-8 top-8 h-2.5 w-2.5 rounded-full bg-primary/80"
                  animate={{ y: [0, -8, 0], x: [0, 6, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: easeInOut }}
                />
                <motion.span className="pointer-events-none absolute right-10 top-12 h-3 w-3 rounded-full bg-cta/70"
                  animate={{ y: [0, 10, 0], x: [0, -6, 0] }}
                  transition={{ duration: 3.9, repeat: Infinity, ease: easeInOut }}
                />
              </>
            )}

            <div className="text-center">
              <div className="text-6xl font-semibold tracking-tight text-text-primary md:text-7xl" style={{ fontFamily: "var(--font-secondary)" }}>
                404
              </div>
              <div className="mt-3 text-base font-medium text-text-primary">
                This page doesn’t exist
              </div>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                The link might be broken or the page may have been moved.
              </p>
              <div className="mt-7 flex justify-center">
                <Link to="/" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium
                    bg-primary text-white hover:bg-primary-hover transition shadow-sm hover:shadow-md active:scale-[0.98]">
                  Go back home
                  <ArrowRight size={18} />
                </Link>
              </div>
              <div className="mt-7 h-2 w-full overflow-hidden rounded-full bg-bg-muted">
                <motion.div className="h-full rounded-full bg-primary" initial={{ x: "-60%", width: "40%" }} animate={reduce ? undefined : { x: ["-60%", "120%"] }}
                  transition={reduce ? { duration: 0 } : { duration: 2.4, repeat: Infinity, ease: easeInOut }}
                />
              </div>
              <div className="mt-3 text-xs text-text-muted">
                If you think this is a mistake, try refreshing or go home.
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
