import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
};

function range(start: number, end: number) {
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

export default function Pagination({currentPage,totalPages,onPageChange,siblingCount = 1,className = ""}: PaginationProps) {
  if (totalPages <= 1) return null;
  const safeCurrent = Math.min(Math.max(1, currentPage), totalPages);
  const showLeftDots = safeCurrent - siblingCount > 2;
  const showRightDots = safeCurrent + siblingCount < totalPages - 1;

  const pages: Array<number | "dots"> = [];
  pages.push(1);
  if (showLeftDots) pages.push("dots");

  const start = Math.max(2, safeCurrent - siblingCount);
  const end = Math.min(totalPages - 1, safeCurrent + siblingCount);
  range(start, end).forEach((p) => pages.push(p));

  if (showRightDots) pages.push("dots");
  if (totalPages > 1) pages.push(totalPages);

  const go = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages);
    if (next !== safeCurrent) onPageChange(next);
  };

  const base ="h-9 min-w-9 px-3 rounded-lg text-sm font-medium transition inline-flex items-center justify-center select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/35";
  const chip ="border border-border bg-bg-secondary text-text-primary hover:bg-bg-muted";
  const active ="border border-transparent bg-primary text-white hover:bg-primary-hover";
  const iconBtn ="border border-border bg-transparent text-text-primary hover:bg-bg-muted";
  const disabled = "opacity-50 pointer-events-none";

  return (
    <nav className={`mt-6 flex items-center justify-center gap-2 ${className}`}aria-label="Pagination" >
      <button type="button" className={`${base} ${iconBtn} ${safeCurrent === 1 ? disabled : ""}`} onClick={() => go(safeCurrent - 1)} aria-label="Previous page">
        <ChevronLeft size={18} />
      </button>

      <div className="flex items-center gap-2">
        {pages.map((p, idx) =>
          p === "dots" ? (
            <span key={`dots-${idx}`} className="px-2 text-text-muted select-none" aria-hidden="true">
              …
            </span>
          ) : (
            <button key={p} type="button" className={`${base} ${p === safeCurrent ? active : chip}`} onClick={() => go(p)} aria-current={p === safeCurrent ? "page" : undefined}>
              {p}
            </button>
          )
        )}
      </div>

      <button type="button" className={`${base} ${iconBtn} ${ safeCurrent === totalPages ? disabled : ""}`} onClick={() => go(safeCurrent + 1)} aria-label="Next page">
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}
