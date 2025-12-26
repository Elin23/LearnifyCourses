import { motion } from "framer-motion";
import aboutImg from "../assets/imgs/about-learning.png"
import { GraduationCap, Rocket, Users } from "lucide-react";
import { aboutCards } from "../data/about";
import AboutCard from "../components/AboutCard";
import TitleComponent from "../components/shared/TitleComponent";

export default function AboutUs() {
    return (
        <section className="relative overflow-hidden pt-12 pb-24">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-bg-main to-transparent" />
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-bg-main" />
                <div className="absolute -top-32 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
                <div className="absolute -bottom-32 left-24 h-105 w-105 rounded-full bg-cta/15 blur-3xl" />
                <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
                    style={{ backgroundImage: "linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)", backgroundSize: "44px 44px", }} />
            </div>
            <div className="mx-auto max-w-6xl px-4">
               <TitleComponent badge={ <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary/60 px-4 py-2 text-sm text-text-secondary backdrop-blur"> 
                                       <GraduationCap size={16} className="text-primary" />About Learnify</span>}
                title="Education designed for real progress"  align="center" className="max-w-2xl"
                description="Learnify focuses on clarity, practice, and confidence helping learners grow without overwhelm."/>
                <motion.div initial="hidden"  whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
                    className="mt-10 grid gap-6 md:grid-cols-3">
                    {aboutCards.map((item) => (
                        <AboutCard key={item.key} icon={item.icon} title={item.title} desc={item.desc}/>
                    ))}
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-14 grid gap-10 md:grid-cols-2">
                    <div>
                        <h3 className="text-2xl font-semibold text-text-primary">
                            Built for learners, not platforms
                        </h3>
                        <p className="mt-3 max-w-md text-text-secondary">
                            Every detail is designed around how people actually learn —
                            with guidance, clarity, and real-world context.
                        </p>
                        <ul className="mt-6 space-y-4">
                            {[
                                { icon: <Users size={18} />, text: "Supportive learning experience" },
                                { icon: <GraduationCap size={18} />, text: "From beginner to confident builder" },
                                { icon: <Rocket size={18} />, text: "Skills you can actually use" },
                            ].map((x) => (
                                <li key={x.text} className="flex items-center gap-3 text-sm text-text-secondary">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/15 text-primary">
                                        {x.icon}
                                    </span>
                                    {x.text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.55 }}
                        className="relative flex justify-center md:justify-end">

                        <div className="pointer-events-none absolute -top-10 right-8 h-64 w-64 rounded-full bg-primary/18 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-10 right-24 h-56 w-56 rounded-full bg-cta/18 blur-3xl" />
                        <div className="relative overflow-hidden rounded-[28px] border border-border/70">
                            <div className="pointer-events-none absolute -bottom-6 left-1/2 h-14 w-56 -translate-x-1/2 rounded-full bg-black/15 blur-2xl" />
                            <motion.img src={aboutImg} alt="Book and pupples" draggable={false} className=" block h-70 w-90 object-cover sm:h-80 sm:w-105 md:h-90 md:w-130" animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}/>
                            <motion.div className="pointer-events-none absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 opacity-60 dark:opacity-25"
                                animate={{ x: ["-120%", "120%"] }}
                                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}/>
                        </div>
                        <motion.div className="pointer-events-none absolute -left-2 top-10 hidden sm:block h-3 w-3 rounded-full bg-primary/70"
                            animate={{ y: [0, -8, 0], x: [0, 6, 0] }}
                            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}/>
                        <motion.div className="pointer-events-none absolute right-4 bottom-10 hidden sm:block h-4 w-4 rounded-full bg-cta/70" animate={{ y: [0, 9, 0], x: [0, -6, 0] }}
                            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
