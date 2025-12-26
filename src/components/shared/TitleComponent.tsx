import { motion } from "framer-motion";
import type { ReactNode } from "react";

type TitleProps = {
  badge?: ReactNode;          
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  descClassName?: string;
};

export default function TitleComponent({badge,title,description,align = "center",className = "",titleClassName = "",descClassName = ""}: TitleProps) {
    const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className={`${alignment} ${className}`}>
      {badge ? <div className={align === "center" ? "flex justify-center" : ""}>{badge}</div> : null}
      <h2 className={`mt-3 text-3xl font-semibold tracking-tight text-text-primary md:text-4xl font-secondary ${titleClassName}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-3 text-base leading-relaxed text-text-secondary ${descClassName}`}>
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
