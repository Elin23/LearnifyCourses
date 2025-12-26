import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame, animate, useTransform } from "framer-motion";
import TitleComponent from "../components/shared/TitleComponent";

type Props = {
  items?: string[];
  speedDegPerSec?: number;
  pauseAfterClickMs?: number;
};

function wrapAngle180(deg: number) {
  return ((deg + 180) % 360 + 360) % 360 - 180;
}
function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}
function smooth01(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

function useMedia(query: string) {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatch(m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, [query]);

  return match;
}

type LabelProps = {
  label: string;
  index: number;
  baseAngle: number;
  radius: number;
  offsetDeg: any;
  onFocus: (idx: number) => void;
  visibleWindowDeg: number;
  highlightWindowDeg: number;
  ringGap: number;
  badgePadX: number;
  badgePadY: number;
};

function DomainLabel({label, index, baseAngle, radius, offsetDeg, onFocus, visibleWindowDeg, highlightWindowDeg, ringGap}: LabelProps) {
  const theta = useTransform(offsetDeg, (v: number) => baseAngle + v);
  const distToCenter = useTransform(theta, (d: number) => wrapAngle180(d - -90));

  const visibility = useTransform(distToCenter, (dist: number) => {
    const a = Math.abs(dist);
    return smooth01(1 - a / visibleWindowDeg);
  });

  const highlight = useTransform(distToCenter, (dist: number) => {
    const a = Math.abs(dist);
    return smooth01(1 - a / highlightWindowDeg);
  });

  const posAngle = useTransform(distToCenter, (dist: number) => -90 + dist);

  const ringOffset = useTransform(highlight, (h: number) => {
    const base = index % 2 === 0 ? -ringGap : ringGap;
    return base * (1 - h);
  });

  const x = useTransform([posAngle, ringOffset], ([ang, ro]) => {
    const a = ang as number;
    const r = radius + (ro as number);
    const rad = (a * Math.PI) / 180;
    return radius + Math.cos(rad) * r;
  });

  const y = useTransform([posAngle, ringOffset], ([ang, ro]) => {
    const a = ang as number;
    const r = radius + (ro as number);
    const rad = (a * Math.PI) / 180;
    return radius + Math.sin(rad) * r;
  });

  const scale = useTransform([visibility, highlight], ([v, h]) => {
    const vv = v as number;
    const hh = h as number;
    return (0.9 + vv * 0.08) + hh * 0.12;
  });

  const opacity = useTransform([visibility, highlight], ([v, h]) => {
    const vv = v as number;
    const hh = h as number;
    return 0.22 + vv * 0.55 + hh * 0.18;
  });

  const zIndex = useTransform([highlight, visibility], ([h, v]) => {
    const hh = h as number;
    const vv = v as number;
    return Math.floor(vv * 20 + hh * 60);
  });

  const bgOpacity = useTransform(highlight, (h: number) => 0.08 + h * 0.72); // 0.08..0.80
  const glowOpacity = useTransform(highlight, (h: number) => h * 0.35);

  const boxShadow = useTransform(glowOpacity, (g: number) => {
    return `0 10px 30px rgba(99,102,241,${g})`;
  });

  const color = useTransform(highlight, (h: number) =>
    h > 0.02 ? "var(--color-text-primary)" : "var(--color-text-secondary)"
  );

  const filter = useTransform([visibility, highlight], ([v, h]) => {
    const vv = v as number;
    const hh = h as number;
    const blur = (1 - vv) * 1.1 * (1 - hh);
    return `blur(${blur.toFixed(2)}px)`;
  });

  const pointerEvents = useTransform(visibility, (v) => (v > 0.25 ? "auto" : "none"));
  const fontWeight = useTransform(highlight, (h: number) => (h > 0.6 ? 700 : h > 0.25 ? 600 : 500));

  return (
    <motion.button type="button" onClick={() => onFocus(index)}
      className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap focus:outline-none select-none"
      style={{ left: 0, top: 0, x, y, scale, opacity, zIndex, pointerEvents, filter, transition: "filter 220ms ease",}}
    >
      <motion.span className="absolute left-1/2 top-6 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" aria-hidden
        style={{ opacity: bgOpacity, boxShadow}}/>

      <motion.span className="relative text-sm"
        style={{ color, fontWeight: fontWeight as any, transition: "color 220ms ease, font-weight 220ms ease",}}>
        {label}
      </motion.span>
    </motion.button>
  );
}

export default function DynamicDomansDisplay({items, speedDegPerSec = 7, pauseAfterClickMs = 950}: Props) {
  const domains = useMemo(
    () =>
      items ?? ["Cyber Security","AI & Machine Learning","DevOps","Game Development","Cloud Computing",],
    [items]
  );

  const offsetDeg = useMotionValue(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const isMobile = useMedia("(max-width: 640px)");
  const isTablet = useMedia("(max-width: 1024px)");

  const [radius, setRadius] = useState(220);
  const pausedUntil = useRef<number>(0);

  const visibleWindowDeg = isMobile ? 55 : isTablet ? 65 : 78;
  const highlightWindowDeg = isMobile ? 26 : isTablet ? 24 : 22;
  const ringGap = isMobile ? 18 : isTablet ? 14 : 12;

  const badgePadX = isMobile ? 14 : 18;
  const badgePadY = isMobile ? 8 : 10;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const factor = isMobile ? 0.42 : isTablet ? 0.38 : 0.34;
      const r = Math.floor(w * factor);
      setRadius(Math.max(isMobile ? 140 : 170, Math.min(isMobile ? 230 : 320, r)));
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [isMobile, isTablet]);

  const baseAngles = useMemo(() => {
    const n = Math.max(1, domains.length);
    const step = 360 / n;
    return Array.from({ length: n }, (_, i) => i * step);
  }, [domains.length]);

  useAnimationFrame((t, delta) => {
    if (t < pausedUntil.current) return;
    const next = offsetDeg.get() + (speedDegPerSec * delta) / 1000;
    offsetDeg.set(((next % 360) + 360) % 360);
  });

  const focusIndex = (idx: number) => {
    const current = offsetDeg.get();
    const want = -90;
    const base = baseAngles[idx];
    const diff = wrapAngle180(want - (base + current));

    pausedUntil.current = performance.now() + pauseAfterClickMs;

    animate(offsetDeg, current + diff, {
      duration: 0.65,
      ease: "easeInOut",
    });
  };

  return (
    <section className="relative overflow-hidden py-12 sm:py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg-main" />
        <div className="absolute -top-24 left-1/2 h-105 w-105 sm:h-130 sm:w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 left-8 sm:left-16 h-80 w-[320px] sm:h-105 sm:w-105 rounded-full bg-cta/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <TitleComponent  title="Domains we teach" description="A focused rotation of learning paths." align="center" className="max-w-2xl"/>
        <div ref={wrapRef} className="relative mt-2 sm:mt-6">
          <div className="relative mx-auto h-85 sm:h-105 w-full max-w-4xl">
            <div className="absolute left-1/2 top-[68%] sm:top-[66%] -translate-x-1/2 -translate-y-1/2">
              <div className="relative" style={{ width: radius * 2, height: radius }}>
                <svg className="absolute inset-0 pointer-events-none" width={radius * 2} height={radius} viewBox={`0 0 ${radius * 2} ${radius}`}>
                  <path d={`M 0 ${radius} A ${radius} ${radius} 0 0 1 ${radius * 2} ${radius}`} fill="none"  stroke="rgba(148,163,184,.5)" strokeWidth="1"/>
                </svg>

                {domains.map((label, i) => (
                  <DomainLabel key={label} label={label} index={i} baseAngle={baseAngles[i]} radius={radius} offsetDeg={offsetDeg} onFocus={focusIndex} visibleWindowDeg={visibleWindowDeg}
                    highlightWindowDeg={highlightWindowDeg} ringGap={ringGap} badgePadX={badgePadX} badgePadY={badgePadY}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
