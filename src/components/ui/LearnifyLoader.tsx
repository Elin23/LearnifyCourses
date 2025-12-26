type Props = {
  fullScreen?: boolean;
  text?: string;
};

export default function LearnifyLoader({fullScreen = true, text = "Learnify",}: Props) {
  const wrapper = fullScreen ? "fixed inset-0 z-[9999]" : "relative w-full min-h-[240px]";
  return (
    <div className={`${wrapper} overflow-hidden`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-bg-main to-transparent" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg-main" />
        <div className="absolute -top-32 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-32 left-24 h-105 w-105 rounded-full bg-cta/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
          style={{backgroundImage:"linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)", backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="grid h-full min-h-[inherit] place-items-center px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-end gap-0.5 select-none">
            {text.split("").map((ch, i) => (
              <span key={`${ch}-${i}`} className="learnify-letter font-secondary text-4xl sm:text-5xl font-semibold tracking-tight text-text-primary" style={{ animationDelay: `${i * 0.06}s` }}>
                {ch}
              </span>
            ))}
          </div>

          <div className="h-1 w-60 overflow-hidden rounded-full bg-border">
            <div className="learnify-line h-full w-[35%] rounded-full bg-primary" />
          </div>
          <p className="text-sm text-text-muted">Loading…</p>
        </div>
      </div>

      <style>{`
        .learnify-letter{
          animation: learnifyFloat 1.1s ease-in-out infinite;
          opacity: .95;
        }
        @keyframes learnifyFloat{
          0%, 100% { transform: translateY(0); opacity: .85; }
          50% { transform: translateY(-6px); opacity: 1; }
        }

        .learnify-line{
          animation: learnifyMove 1.05s ease-in-out infinite;
        }
        @keyframes learnifyMove{
          0% { transform: translateX(-70%); }
          100% { transform: translateX(260%); }
        }
      `}</style>
    </div>
  );
}
