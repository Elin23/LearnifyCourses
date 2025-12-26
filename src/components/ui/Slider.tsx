import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useMotionValue, animate } from "framer-motion";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

type SliderProps = {
  children: React.ReactNode;
  perViewMobile?: number;
  perViewDesktop?: number;
  desktopBreakpoint?: number;
  gapMobile?: number;
  gapDesktop?: number;
  autoplayMs?: number;
};

export default function Slider({children, perViewMobile = 1,perViewDesktop = 3, desktopBreakpoint = 768,gapMobile = 16,gapDesktop = 24,autoplayMs = 2800,}: SliderProps) {

  const items = useMemo(() => {
    return (Array.isArray(children) ? children : [children]).flat().filter(Boolean);
  }, [children]);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [viewportW, setViewportW] = useState(0);
  const [perView, setPerView] = useState(perViewMobile);
  const isPausedRef = useRef(false);

  const x = useMotionValue(0);
  const GAP = perView === perViewMobile ? gapMobile : gapDesktop;

  const clones = Math.min(items.length, perView * 2);

  const extended = useMemo(() => {
    if (items.length === 0) return [];
    const head = items.slice(0, clones);
    const tail = items.slice(-clones);
    return [...tail, ...items, ...head];
  }, [items, clones]);

  const [idx, setIdx] = useState(clones);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerView(w < desktopBreakpoint ? perViewMobile : perViewDesktop);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, [desktopBreakpoint, perViewDesktop, perViewMobile]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.getBoundingClientRect().width;
      setViewportW(w);
    };

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    measure();
    return () => ro.disconnect();
  }, []);

  const slideW =
    viewportW > 0 ? (viewportW - GAP * (perView - 1)) / perView : 0;

  useEffect(() => {
    if (!slideW) return;
    const step = slideW + GAP;
    x.set(-idx * step);
  }, [slideW, GAP]);

  useEffect(() => {
    const nextClones = Math.min(items.length, perView * 2);
    const safeClones = nextClones;

    setIdx(safeClones);

    if (!slideW) return;
    const step = slideW + GAP;
    x.set(-(safeClones * step));
  }, [perView, items.length]);

  const goTo = (nextIdx: number, opts?: { instant?: boolean }) => {
    if (!slideW) return;

    const step = slideW + GAP;
    const targetX = -nextIdx * step;

    if (opts?.instant) {
      x.set(targetX);
      setIdx(nextIdx);
      return;
    }

    const controls = animate(x, targetX, {
      duration: 0.55,
      ease: "easeInOut",
    });

    controls.then(() => {
      const realStart = clones;
      const realEnd = clones + items.length - 1;

      let fixed = nextIdx;

      if (nextIdx > realEnd) {
        fixed = realStart + (nextIdx - realEnd - 1);
        x.set(-fixed * step);
      } else if (nextIdx < realStart) {
        fixed = realEnd - (realStart - nextIdx - 1);
        x.set(-fixed * step);
      }

      setIdx(fixed);
    });
  };

  const next = () => goTo(idx + 1);
  const prev = () => goTo(idx - 1);

  useEffect(() => {
    if (items.length <= perView) return;

    const id = window.setInterval(() => {
      if (isPausedRef.current) return;
      next();
    }, autoplayMs);

    return () => window.clearInterval(id);
  }, [idx, perView, items.length, slideW, autoplayMs]);

  const pageCount = Math.max(1, Math.ceil(items.length / perView));
  const activePage = clamp(
    Math.floor((idx - clones) / perView),
    0,
    pageCount - 1
  );

  const jumpPage = (page: number) => {
    const target = clones + page * perView;
    goTo(target);
  };

  const centerIndex = perView === 1 ? idx : idx + 1;

  return (
    <div className="relative mt-10">
      <button type="button" onClick={prev} className=" hidden md:grid absolute left-0 top-1/2 -translate-y-1/2 h-11 w-11 place-items-center rounded-full border border-border bg-bg-main/70 text-text-primary hover:bg-bg-muted transition z-20" aria-label="Previous">
        <ChevronLeft size={18} />
      </button>

      <button type="button" onClick={next}
        className=" hidden md:grid absolute right-0 top-1/2 -translate-y-1/2 h-11 w-11 place-items-center rounded-full border border-border bg-bg-main/70  text-text-primary hover:bg-bg-muted transition z-20" aria-label="Next">
        <ChevronRight size={18} />
      </button>

      <div className="relative md:px-14" onMouseEnter={() => (isPausedRef.current = true)} onMouseLeave={() => (isPausedRef.current = false)}>
        <div ref={viewportRef} className="relative overflow-hidden">
          <motion.div className="flex" style={{ x, gap: `${GAP}px` }} drag="x" dragConstraints={{ left: -Infinity, right: Infinity }} onDragStart={() => (isPausedRef.current = true)}
            onDragEnd={(_, info) => {
              const threshold = 60;
              if (info.offset.x < -threshold) next();
              else if (info.offset.x > threshold) prev();
              else goTo(idx);
              isPausedRef.current = false;
            }}>
            {extended.map((node: any, i: number) => {
              const isCenter = i === centerIndex;
              return (
                <motion.div key={`slide-${i}`} className="shrink-0"
                  style={{ width: slideW }}
                  animate={{
                    scale: isCenter ? 1.02 : 0.98,
                    opacity: isCenter ? 1 : 0.72,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}>
                  <div className={`transition ${isCenter ? "drop-shadow-[0_18px_30px_rgba(0,0,0,0.18)]" : "opacity-95"} `}>
                    <div className={` rounded-3xl ${isCenter ? "ring-1 ring-primary/30" : ""}`}>
                      {node}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {pageCount > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button key={i} type="button" onClick={() => jumpPage(i)} className={` h-2.5 rounded-full transition ${i === activePage ? "w-7 bg-primary" : "w-2.5 bg-border hover:bg-text-muted"}`} aria-label={`Go to page ${i + 1}`}/>
          ))}
        </div>
      )}

      {/* mobile arrows */}
      <div className="mt-5 flex items-center justify-center gap-2 md:hidden">
        <button type="button" onClick={prev} className="  h-11 w-11 grid place-items-center rounded-full  border border-border bg-bg-main/70 backdrop-blur text-text-primary hover:bg-bg-muted transition">
          <ChevronLeft size={18} />
        </button>

        <button type="button" onClick={next} className="h-11 w-11 grid place-items-center rounded-full border border-border bg-bg-main/70 backdrop-blur text-text-primary hover:bg-bg-muted transition">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
