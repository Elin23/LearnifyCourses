import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { InstructionTopic } from "../data/instructions";

export function TopicsSidebar({
  topics,
  activeId,
  onSelect,
}: {
  topics: InstructionTopic[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return topics;
    return topics.filter(
      (t) =>
        t.label.toLowerCase().includes(s) ||
        t.summary.toLowerCase().includes(s)
    );
  }, [q, topics]);

  return (
    <div className="rounded-2xl border border-border bg-bg-main p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text-primary">Topics</p>
          <p className="mt-0.5 text-xs text-text-muted">
            Pick a topic to view the full instructions.
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-border bg-bg-secondary/50 px-2.5 py-1 text-xs text-text-secondary">
          {topics.length}
        </span>
      </div>
      <div className="mt-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"/>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search topics..."
            className=" h-11 w-full rounded-xl border border-border bg-bg-secondary/40 pl-10 pr-3 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition"
          />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {filtered.map((t) => {
          const isActive = t.id === activeId;
          return (
            <button key={t.id} type="button" onClick={() => onSelect(t.id)}
              className={` group relative w-full overflow-hidden rounded-2xl border border-border px-4 py-3 text-left transition
                ${isActive ? "bg-bg-secondary/70" : "bg-bg-main hover:bg-bg-muted"}`}>
              <span className={` absolute left-0 top-0 h-full w-1.5 ${isActive ? "bg-primary" : "bg-transparent group-hover:bg-primary/40"} transition`}
              />

              <div className="flex items-start gap-3">
                <span className={` mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl border border-border ${isActive ? "bg-primary/15 text-primary" : "bg-bg-secondary/50 text-text-secondary"} transition`}>
                  {t.icon}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className={`text-sm font-semibold ${isActive ? "text-text-primary" : "text-text-secondary"} line-clamp-1 `}>
                      {t.label}
                    </p>

                    <span className={` shrink-0 rounded-full px-2 py-0.5 text-[11px] border border-border ${isActive ? "bg-primary/10 text-primary" : "bg-bg-secondary/50 text-text-muted"} `}>
                      {t.sections.length} sections
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-text-muted line-clamp-2 leading-relaxed">
                    {t.summary}
                  </p>
                </div>
              </div>
              <div className={` pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition ${isActive ? "opacity-100" : ""}`}>
                <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl" />
              </div>
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div className="rounded-xl border border-border bg-bg-secondary/40 p-4 text-sm text-text-secondary">
            No topics matched your search.
          </div>
        )}
      </div>
    </div>
  );
}

export function TopicsMobileTabs({
  topics,
  activeId,
  onSelect,
}: {
  topics: InstructionTopic[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-bg-main p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-text-primary">Topics</p>
        <span className="rounded-full border border-border bg-bg-secondary/50 px-2.5 py-1 text-xs text-text-secondary">
          {topics.length}
        </span>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
        {topics.map((t) => {
          const isActive = t.id === activeId;
          return (
            <button key={t.id} type="button" onClick={() => onSelect(t.id)} className={` shrink-0 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition ${isActive ? "bg-bg-secondary/70 text-text-primary" : "bg-bg-main text-text-secondary"}`}>
              <span className={`${isActive ? "text-primary" : "text-text-muted"}`}>
                {t.icon}
              </span>
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
