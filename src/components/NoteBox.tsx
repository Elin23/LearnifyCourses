import { AlertTriangle, CheckCircle2 } from "lucide-react";

type Props = {
  title: string;
  body: string;
  tone?: "info" | "warn";
};

export function NoteBox({ title, body, tone = "info" }: Props) {
  const icon = tone === "warn" ? (
      <AlertTriangle size={18} className="text-amber-400" />
    ) : (
      <CheckCircle2 size={18} className="text-primary" />
    );

  return (
    <div className=" rounded-2xl border border-border bg-bg-secondary/40 p-4 sm:p-5 min-w-0">
      <div className="flex items-start gap-3 min-w-0">
        <span className=" mt-0.5 shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-bg-main/40">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text-primary leading-snug wrap-break-word">
            {title}
          </p>
          <p className="mt-1 text-sm text-text-secondary leading-relaxed wrap-break-word whitespace-normal">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}
