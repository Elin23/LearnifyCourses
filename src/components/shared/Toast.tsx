import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";
export type ToastVariant = "success" | "error" | "warning" | "info";

export type ToastAction = {
    label: string;
    onClick: () => void;
};

export type ToastOptions = {
    title?: string;
    message: string;
    variant?: ToastVariant;
    duration?: number; 
    action?: ToastAction;
};

type ToastItem = ToastOptions & {
    id: string;
};

type ToastContextValue = {
    toast: (opts: ToastOptions) => void;
    dismiss: (id: string) => void;
    clear: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function uid() { return `${Date.now()}-${Math.random().toString(16).slice(2)}`;}

function iconFor(variant: ToastVariant) {
    switch (variant) {
        case "success":
            return CheckCircle2;
        case "error":
            return XCircle;
        case "warning":
            return AlertTriangle;
        default:
            return Info;
    }
}

function ringClasses(variant: ToastVariant) {
    switch (variant) {
        case "success":
            return "ring-1 ring-emerald-500/20";
        case "error":
            return "ring-1 ring-rose-500/20";
        case "warning":
            return "ring-1 ring-amber-500/20";
        default:
            return "ring-1 ring-sky-500/20";
    }
}

function iconClasses(variant: ToastVariant) {
    switch (variant) {
        case "success":
            return "text-emerald-400";
        case "error":
            return "text-rose-400";
        case "warning":
            return "text-amber-400";
        default:
            return "text-sky-400";
    }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<ToastItem[]>([]);

    const dismiss = useCallback((id: string) => {
        setItems((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const clear = useCallback(() => setItems([]), []);

    const toast = useCallback(
        (opts: ToastOptions) => {
            const id = uid();
            const t: ToastItem = {id, variant: opts.variant ?? "info", duration: opts.duration ?? 3500, title: opts.title, message: opts.message, action: opts.action,};
            setItems((prev) => [t, ...prev]);
            if ((t.duration ?? 0) > 0) {
                window.setTimeout(() => dismiss(id), t.duration);
            }
        },
        [dismiss]
    );

    const value = useMemo(() => ({ toast, dismiss, clear }), [toast, dismiss, clear]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className=" fixed z-50 right-4 top-4 flex w-[min(420px,calc(100vw-2rem))] flex-col gap-3" aria-live="polite" aria-relevant="additions removals">
                {items.map((t) => {
                    const VariantIcon = iconFor(t.variant ?? "info");
                    return (
                        <div key={t.id} className={` ${ringClasses(t.variant ?? "info")} ${t.variant === "error" ? "toast-shake" : ""} rounded-2xl border border-border bg-bg-main p-4 shadow-lg backdrop-blur`}>
                            <div className="flex items-start gap-3">
                                <span className={` mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-bg-secondary/60 ${iconClasses(t.variant ?? "info")}`}>
                                    <VariantIcon size={18} />
                                </span>

                                <div className="min-w-0 flex-1">
                                    {t.title && (
                                        <p className="text-sm font-semibold text-text-primary">
                                            {t.title}
                                        </p>
                                    )}
                                    <p className="text-sm text-text-secondary leading-relaxed">
                                        {t.message}
                                    </p>

                                    {t.action && (
                                        <button type="button" onClick={() => {
                                                t.action?.onClick();
                                                dismiss(t.id);
                                            }}
                                            className="mt-3 inline-flex items-center justify-center rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-primary hover:bg-bg-muted transition">
                                            {t.action.label}
                                        </button>
                                    )}
                                </div>

                                <button type="button" onClick={() => dismiss(t.id)}
                                    className="inline-flex h-9 w-9 items-center justify-center text-text-muted rounded-lg  hover:text-text-primary hover:bg-bg-muted transition" aria-label="Close">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error("useToast must be used within ToastProvider");
    }
    return ctx;
}
