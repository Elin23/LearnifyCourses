import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb, PlayCircle, Rocket, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "../assets/imgs/hero.png";
import { Counter } from "../components/ui/Counter";

const AUTH_KEYS = ["token", "access_token", "user"];
function isAuthedFromStorage() {
    return AUTH_KEYS.some((k) => {
        const v = localStorage.getItem(k);
        return v && v !== "null" && v !== "undefined" && v !== "";
    });
}

export default function Hero() {
    const [isAuthed, setIsAuthed] = useState<boolean>(() => isAuthedFromStorage());
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [glow, setGlow] = useState({ x: 50, y: 50 });

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;

        setTilt({ x: py * -2.5, y: px * 4.5 });
        setGlow({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    const onLeave = () => {
        setTilt({ x: 0, y: 0 });
        setGlow({ x: 50, y: 50 });
    };

    useEffect(() => {
        const sync = () => setIsAuthed(isAuthedFromStorage());
        window.addEventListener("storage", sync);
        return () => window.removeEventListener("storage", sync);
    }, []);

    const stats = useMemo(
        () => [
            { label: "Courses", value: 120, suffix: "+" },
            { label: "Students", value: 25, suffix: "K+" },
            { label: "Avg. Rating", value: 4.8, suffix: "/5" },
        ],
        []
    );

    return (
        <section className="relative overflow-hidden pt-3.75">
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-bg-main" />
                <div className="absolute -top-24 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
                <div className="absolute -bottom-24 left-16 h-105 w-105 rounded-full bg-cta/15 blur-3xl" />
                <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
                    style={{ backgroundImage: "linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)", backgroundSize: "44px 44px", }}/>
                </div>
            <div className="mx-auto max-w-6xl px-4">
                <div className="grid items-center gap-10 pb-14 pt-14 md:grid-cols-[1.1fr_0.9fr] md:pb-20 md:pt-20">
                    <div>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
                            className={`${"inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary/70 px-4 py-2 text-sm"} ${"text-text-secondary backdrop-blur"}`}>
                            <Sparkles size={16} className="text-primary" />
                            New paths for your learning journey
                        </motion.div>

                        <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}
                            className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-text-primary md:text-5xl font-secondary">
                            Learn skills that
                            <span className="text-primary"> actually move you forward</span>.
                        </motion.h1>

                        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.12 }}
                            className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
                            Practical courses, clear roadmaps, and hands-on projects — built to
                            help you learn faster and apply what you learn immediately.
                        </motion.p>
                        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.18 }} className="mt-6 flex flex-wrap items-center gap-3">
                            <Link to="/courses" className="group relative inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium bg-primary text-white transition hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 ring-offset-bg-main">
                                <span className="relative z-10">Browse Courses</span>
                                <ArrowRight size={18} className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5" />
                                <span className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-0 blur-xl transition group-hover:opacity-60"
                                    style={{ background: "radial-gradient(120px circle at 50% 50%, rgba(37,99,235,0.45), transparent 60%)" }} />
                            </Link>
                            {isAuthed ? (<Link to="/my-courses" className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium border border-border bg-bg-secondary/70 text-text-primary backdrop-blur transition hover:-translate-y-0.5 hover:bg-bg-muted hover:shadow-md
                                         hover:border-primary/40 active:translate-y-0 active:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ring-offset-bg-main">
                                <span>Continue Learning</span>
                                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                            </Link>
                            ) : (<Link to="/auth/register" className=" group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium border border-border bg-bg-secondary/70 text-text-primary backdrop-blur transition hover:-translate-y-0.5 hover:bg-bg-muted hover:shadow-md hover:border-primary/40
                                  active:translate-y-0 active:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ring-offset-bg-main">
                                <span>Create Account</span>
                                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                            </Link>
                            )}
                            <button type="button" className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-text-primary transition hover:bg-bg-muted hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 ring-offset-bg-main">
                                <PlayCircle size={20} className="text-primary transition-transform duration-200 group-hover:scale-[1.06]" />
                                <span>Watch preview</span>
                            </button>
                        </motion.div>
                        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }, }}
                            className="mt-8 grid max-w-md grid-cols-3 gap-3" >
                            {stats.map((s) => (
                                <motion.div key={s.label} variants={{ hidden: { opacity: 0, y: 14, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" }}}}
                                    whileHover={{ y: -3, scale: 1.01 }} transition={{ type: "spring", stiffness: 220, damping: 18 }}
                                    className="rounded-2xl border border-border bg-bg-secondary/70 p-4 backdrop-blur">
                                    <div className="text-lg font-semibold text-text-primary">
                                        {s.label === "Avg. Rating" ? (
                                            <Counter value={s.value} decimals={1} suffix={s.suffix} />
                                        ) : (
                                            <Counter value={s.value} suffix={s.suffix} />
                                        )}
                                    </div>

                                    <div className="text-xs text-text-muted">{s.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.08 }} className="relative flex justify-center md:justify-end" >
                        <div className="pointer-events-none absolute -top-20 right-10 h-72 w-72 rounded-full bg-primary/18 blur-3xl" />
                        <div className="pointer-events-none absolute bottom-0 right-40 h-64 w-64 rounded-full bg-cta/18 blur-3xl" />
                        <div className="relative" onMouseMove={onMove} onMouseLeave={onLeave}>
                            <motion.div style={{ rotateX: tilt.x, rotateY: tilt.y }} transition={{ type: "spring", stiffness: 110, damping: 18 }} className="relative transform-3d">
                                <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[36px] blur-2xl opacity-60 dark:opacity-35"
                                    style={{ background: `radial-gradient(220px circle at ${glow.x}% ${glow.y}%, rgba(79,70,229,0.28), transparent 60%)`}} />

                                <div className="pointer-events-none absolute inset-0 -z-10 rounded-4xl bg-primary/10 blur-2xl opacity-70 dark:opacity-40" />
                                <div className="pointer-events-none absolute -bottom-7 left-1/2 h-16 w-52 -translate-x-1/2 rounded-full bg-black/20 blur-2xl" />
                                <motion.img src={heroImg} alt="Books learning" draggable={false}
                                    className="relative h-75 sm:h-90 md:h-120 lg:h-130 select-none drop-shadow-[0_22px_35px_rgba(0,0,0,0.22)]" animate={{ y: [0, -9, 0], rotate: [0, -0.9, 0] }}
                                    transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }} />

                                <motion.div className="pointer-events-none absolute inset-0 rounded-[22px] bg-linear-to-r from-white/0 via-white/8 to-white/0 opacity-70 dark:opacity-35"
                                    animate={{ x: ["-120%", "120%"] }} transition={{ duration: 3.9, repeat: Infinity, ease: "easeInOut" }} />

                                <motion.div className="pointer-events-none absolute -left-6 top-14 hidden sm:block h-3 w-3 rounded-full bg-primary/70" animate={{ y: [0, -8, 0], x: [0, 5, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }} />
                                <motion.div className="pointer-events-none absolute right-6 top-24 hidden sm:block h-4 w-4 rounded-full bg-cta/70"
                                    animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                                    transition={{ duration: 3.9, repeat: Infinity, ease: "easeInOut" }} />

                                <div className="absolute left-0 top-10 hidden sm:block">
                                    <div className="flex items-center gap-2 rounded-2xl border border-border bg-bg-secondary/80 px-4 py-3 text-xs text-text-secondary backdrop-blur">
                                        <Lightbulb size={14} className="text-amber-300" />
                                        <span>Learn by doing</span>
                                    </div>
                                </div>
                                <div className="absolute right-0 bottom-16 hidden sm:block">
                                    <div className="flex items-center gap-2 rounded-2xl border border-border bg-bg-secondary/80 px-4 py-3 text-xs text-text-secondary backdrop-blur">
                                        <Rocket size={14} className="text-red-400" />
                                        <span>Build real projects</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
