import { useEffect, useMemo, useState } from "react";
import { X, ShieldCheck } from "lucide-react";

type Props = {
  open: boolean;
  phone?: string;
  onClose: () => void;
  onVerified: () => void;
};

export default function VerifyPhoneModal({ open,phone, onClose, onVerified,}: Props) {
  const [code, setCode] = useState("");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setCode("");
    setErr(null);
  }, [open]);

  const canSubmit = useMemo(() => code.trim().length >= 4, [code]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const onSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setErr(null);

  if (!canSubmit) return;

  // this function to accept any code (temporarly)
  if (code.trim().length < 4) {
    setErr("Please enter the verification code.");
    return;
  }

  onVerified();
  onClose();
};
  return (
    <div className="fixed inset-0 z-60">
      <div className="absolute inset-0 bg-black/35 backdrop-blur-sm" onClick={onClose}/>
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-md rounded-3xl border border-border bg-bg-main shadow-xl">
          <div className="flex items-start justify-between gap-3 p-5">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <ShieldCheck size={18} />
                </span>
                <h3 className="text-base font-semibold text-text-primary">Verify phone number</h3>
              </div>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed"> Enter the verification code sent to{" "}
                <span className="text-text-primary font-medium wrap-break-word">{phone || "your phone"}</span>
                .
              </p>
            </div>

            <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-2xl hover:bg-bg-muted transition" aria-label="Close">
              <X size={18} className="text-text-muted" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="px-5 pb-5">
            {err && (
              <div className="mb-4 rounded-2xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-text-primary">
                {err}
              </div>
            )}
            <label className="grid gap-2">
              <span className="text-xs text-text-muted">Verification code</span>
              <input value={code} onChange={(e) => setCode(e.target.value)} inputMode="numeric" placeholder="ex: 123456"
                className="h-12 w-full rounded-2xl border border-border bg-bg-secondary/40 px-4 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition"/>
            </label>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button type="button" onClick={onClose} className="h-12 rounded-2xl border border-border text-sm font-medium text-text-primary hover:bg-bg-muted transition">
                Cancel
              </button>
              <button type="submit" disabled={!canSubmit} className={`h-12 rounded-2xl text-sm font-medium transition bg-primary text-white hover:bg-primary-hover ${!canSubmit && "opacity-60 cursor-not-allowed"}`}>
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
