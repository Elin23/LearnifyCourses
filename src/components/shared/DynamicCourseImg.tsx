import { useMemo } from "react";

type Props = {
  title: string;
  size?: number; 
};

function hashCode(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

export default function DynamicCourseImg({ title, size = 92 }: Props) {
  const seed = useMemo(() => hashCode(title), [title]);

  const a = seed % 360;
  const b = (seed * 7) % 360;

  const initials = useMemo(() => {
    const parts = title.split(" ").filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }, [title]);

  return (
    <div className="relative grid place-items-center rounded-full border border-border bg-bg-secondary/70 backdrop-blur"
      style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full"
        style={{ background: `conic-gradient(from ${a}deg, rgba(37,99,235,.28), rgba(245,158,11,.18), rgba(37,99,235,.16), rgba(34,197,94,.14), rgba(37,99,235,.28))`,}}
      />
      <div className="absolute inset-1.75 rounded-full bg-bg-main/60" />
      <div className="absolute rounded-full"
        style={{ width: size * 0.18, height: size * 0.18, top: size * 0.14, left: size * 0.14,background: `hsla(${b}, 90%, 60%, .25)`,}}/>
      <div className="absolute rounded-full"
        style={{ width: size * 0.12, height: size * 0.12, bottom: size * 0.16, right: size * 0.18, background: `hsla(${a}, 90%, 60%, .22)`,}}/>

      <div className="relative z-10 text-center px-2">
        <div className="text-[11px] leading-tight text-text-muted" style={{ letterSpacing: "0.18em" }}>
          COURSE
        </div>
        <div className="mt-1 text-sm font-semibold text-text-primary" style={{ fontFamily: "var(--font-secondary)" }}>
          {initials}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-tr from-white/0 via-white/10 to-white/0 opacity-60 dark:opacity-25" />
    </div>
  );
}
