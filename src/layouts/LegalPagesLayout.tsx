import TitleComponent from "../components/shared/TitleComponent";
import { FileText } from "lucide-react";
import type { LegalSection } from "../data/legal";

type Props = {
  title: string;
  description: string;
  sections: LegalSection[];
};

export default function LegalPagesLayout({ title, description, sections }: Props) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg-main" />
        <div className="absolute -top-32 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-32 left-24 h-105 w-105 rounded-full bg-cta/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
          style={{ backgroundImage: "linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)", backgroundSize: "44px 44px",}}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <TitleComponent
          badge={
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary/60 px-4 py-2 text-sm text-text-secondary backdrop-blur">
              <FileText size={16} className="text-primary" />
              Legal
            </span>
          }
          title={title} description={description} align="center" className="max-w-2xl"
        />

        <div className="mx-auto mt-10 max-w-3xl space-y-5">
          {sections.map((s) => (
            <div key={s.id} className="rounded-3xl border border-border bg-bg-main p-5 sm:p-6">
              <h3 className="text-base font-semibold text-text-primary">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed wrap-break-word">
                {s.body}
              </p>

              {s.bullets?.length ? (
                <ul className="mt-4 space-y-2 text-sm text-text-secondary leading-relaxed">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 min-w-0">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70 shrink-0" />
                      <span className="min-w-0 wrap-break-word">{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          <div className="rounded-3xl border border-border bg-bg-secondary/50 p-5 sm:p-6">
            <p className="text-sm font-semibold text-text-primary">Need help?</p>
            <p className="mt-2 text-sm text-text-secondary">If you have questions about these policies, please contact Support. </p>
          </div>
        </div>
      </div>
    </section>
  );
}
