import * as React from "react";
import type { LucideIcon } from "lucide-react";

type TabItem = {
  id: string;
  label: string;
  icon?: LucideIcon;
  disabled?: boolean;
  content: React.ReactNode;
};

type TabsProps = {
  items: TabItem[];
  defaultActiveId?: string;
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
};

function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

function firstEnabledId(items: TabItem[]) {
  return items.find((i) => !i.disabled)?.id ?? items[0]?.id ?? "";
}

export default function Tabs({items, defaultActiveId, activeId, onChange,className = ""}: TabsProps) {
  const isControlled = typeof activeId === "string";

  const initial = React.useMemo(() => {
    const start = defaultActiveId ?? activeId ?? firstEnabledId(items);
    return items.some((t) => t.id === start && !t.disabled)
      ? start
      : firstEnabledId(items);
  }, [items, defaultActiveId, activeId]);

  const [internal, setInternal] = React.useState(initial);
  const currentId = isControlled ? (activeId as string) : internal;

  const currentTab = items.find((t) => t.id === currentId) ?? items[0];

  const setActive = (id: string) => {
    const t = items.find((x) => x.id === id);
    if (!t || t.disabled) return;
    if (!isControlled) setInternal(id);
    onChange?.(id);
  };

  return (
    <section className={cx("w-full", className)}>
      <div className="md:flex md:justify-center">
        <div role="tablist" className={cx( "mb-6 flex items-center gap-2 overflow-x-auto flex-nowrap px-1", "[-webkit-overflow-scrolling:touch] scroll-smooth", "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden", "md:overflow-x-visible md:flex-wrap md:justify-center md:rounded-3xl md:border md:border-border md:bg-bg-secondary/60 md:p-2")}>
          {items.map((t) => {
            const active = t.id === currentId;
            const Icon = t.icon;

            return (
              <button key={t.id} role="tab" aria-selected={active} onClick={() => setActive(t.id)} disabled={t.disabled}
                className={cx( "shrink-0 inline-flex items-center gap-2 whitespace-nowrap", "rounded-2xl px-4 py-2 text-sm font-medium border", "transition duration-200", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                  active
                    ? "bg-primary/10 text-primary border-primary shadow-sm"
                    : "bg-bg-secondary text-text-secondary border-border hover:bg-bg-muted",
                  t.disabled && "opacity-40 pointer-events-none"
                )}
              >
                {Icon && <Icon size={16} className={cx(active ? "text-primary" : "text-text-muted")} />}
                <span className="leading-none">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
