import { Star } from "lucide-react";
import type { Testimonial } from "../../data/testimonials";

type Props = {
  t: Testimonial;
};

function clampRating(rating?: number) {
  const r = typeof rating === "number" ? rating : 0;
  return Math.max(0, Math.min(5, Math.floor(r)));
}

export default function TestimonialCard({ t }: Props) {
  const rating = clampRating(t.rating);
  const initial = t.name?.trim()?.[0]?.toUpperCase() ?? "U";

  return (
    <div className=" h-full rounded-2xl border border-border bg-bg-main p-5 transition hover:shadow-lg hover:-translate-y-0.5 flex flex-col">
      <div className="flex items-start gap-4">
        <div className="shrink-0 h-12 w-12 sm:h-12 sm:w-12 rounded-full border border-border bg-bg-secondary/60 overflow-hidden grid place-items-center backdrop-blur" aria-label={`${t.name} avatar`}>
          {t.avatar ? (
            <img src={t.avatar} alt={t.name} className="h-full w-full object-cover" loading="lazy"/>
          ) : (
            <span className="text-text-primary font-semibold">{initial}</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-text-primary leading-snug line-clamp-2">
                {t.name}
              </h4>

              {(t.role || t.company) && (
                <p className="mt-0.5 text-xs text-text-muted line-clamp-2">
                  {t.role}
                  {t.role && t.company ? " • " : ""}
                  {t.company}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1 sm:shrink-0 sm:justify-end">
              {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < rating;
                return (
                  <Star key={i} size={14} className={ filled  ? "text-amber-400 fill-amber-400" : "text-amber-200/30"}/>
                );
              })}
            </div>
          </div>
          <div className="mt-3 min-h-6">
            {t.course ? (
              <span className=" max-w-full px-3 py-1 inline-flex items-center rounded-full text-xs text-text-secondary border border-border bg-bg-secondary/50 backdrop-blur">
                <span className="truncate">{t.course}</span>
              </span>
            ) : (
              <span className="invisible">placeholder</span>
            )}
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-text-secondary leading-relaxed line-clamp-4 min-h-22">
        “{t.quote}”
      </p>
      <div className="mt-auto pt-4 flex items-center justify-between gap-3 text-xs text-text-muted">
        <span className="truncate">Former learner</span>
        <span className="inline-flex items-center gap-2 shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
          {rating}/5
        </span>
      </div>
    </div>
  );
}
