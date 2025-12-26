import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

type CounterProps = {
  value: number;
  suffix?: string;
  decimals?: number;
};

export function Counter({ value, suffix = "", decimals = 0 }: CounterProps) {
  const motionValue = useMotionValue(0);

  const rounded = useTransform(motionValue, (latest) =>
    latest.toFixed(decimals)
  );

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.6,
      ease: "easeOut",
    });

    return controls.stop;
  }, [value, motionValue]);

  return (
    <span>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
