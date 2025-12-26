import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type AboutCardProps = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export default function AboutCard({ icon: Icon, title, desc }: AboutCardProps) {
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: {opacity: 1,y: 0,transition: { duration: 0.4, ease: "easeOut" }}}}
      whileHover={{ y: -4 }} className=" group rounded-3xl border border-border bg-bg-secondary/60 p-6 backdrop-blur transition">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary transition-colors">
        <Icon size={22} />
      </div>
      <h3 className=" mt-4 text-lg font-semibold text-text-primary transition-colors duration-300 group-hover:text-primary " >
        {title}
      </h3>
      <p className="mt-2 text-sm text-text-secondary">
        {desc}
      </p>
    </motion.div>
  );
}
