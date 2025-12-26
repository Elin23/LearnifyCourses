import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type DialogVariant = "confirm" | "success" | "error";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  variant?: DialogVariant;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  okText?: string;
  onConfirm?: () => void | Promise<void>;
  loading?: boolean;
  disableClose?: boolean;
};

export default function Dialog({open,onClose,variant = "confirm",title,message,confirmText = "Confirm",cancelText = "Cancel",okText = "OK",onConfirm,loading = false,disableClose = false,}: DialogProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (disableClose || loading) return;
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, disableClose, loading]);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => panelRef.current?.focus(), 0);
  }, [open]);

  if (!open) return null;

  const isConfirm = variant === "confirm";

  const headerTone =
    variant === "success"
      ? "text-green-700"
      : variant === "error"
      ? "text-red-700"
      : "text-text-primary";

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (disableClose || loading) return;
    onClose();
  };

  const handlePrimary = async () => {
    if (!isConfirm) {
      onClose();
      return;
    }
    if (!onConfirm) return;
    await onConfirm();
  };

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center px-4" onMouseDown={handleBackdropClick} role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" />
      <div ref={panelRef} tabIndex={-1} className="relative w-full max-w-md rounded-xl border border-border bg-bg-main p-5 shadow-lg outline-none">
        <h3 className={`text-base font-semibold ${headerTone}`}>{title}</h3>
        {message ? (
          <p className="mt-2 text-sm text-text-secondary leading-relaxed">
            {message}
          </p>
        ) : null}

        <div className="mt-5 flex gap-2 justify-end">
          <button type="button" onClick={onClose} disabled={loading || disableClose} className="h-10 rounded-lg border border-border px-4 text-sm font-medium text-text-primary hover:bg-bg-muted transition disabled:opacity-60 disabled:cursor-not-allowed">
            {isConfirm ? cancelText : okText}
          </button>

          <button type="button" onClick={handlePrimary} disabled={loading || (isConfirm && !onConfirm)} className="h-10 rounded-lg bg-primary px-4 text-sm font-medium text-white hover:bg-primary-hover transition disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? "Please wait..." : isConfirm ? confirmText : "Close"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
