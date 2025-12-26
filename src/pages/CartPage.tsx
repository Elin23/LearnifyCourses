import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TitleComponent from "../components/shared/TitleComponent";
import { Trash2, ArrowRight } from "lucide-react";
import { courses } from "../data/courses";
import type { Course } from "../types/courses";

const CART_KEY = "cart";
function normalizeId(v: unknown): string | null {
  if (typeof v === "string" && v.trim()) return v.trim();
  if (typeof v === "number" && Number.isFinite(v)) return String(v);
  return null;
}

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function readCart(): string[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];

    const data = JSON.parse(raw);
    if (Array.isArray(data) && data.length > 0) {
      const first = data[0];

      if (typeof first === "string" || typeof first === "number") {
        return (data as unknown[])
          .map(normalizeId)
          .filter(Boolean) as string[];
      }
      if (typeof first === "object" && first !== null) {
        return (data as any[])
          .map((x) => normalizeId(x?.id))
          .filter(Boolean) as string[];
      }
    }

    return Array.isArray(data) ? [] : [];
  } catch {
    return [];
  }
}

function writeCart(ids: string[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("storage"));
}

export default function CartPage() {
  const [cart, setCart] = useState<string[]>(() => readCart());

  useEffect(() => {
    const onStorage = () => setCart(readCart());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const coursesById = useMemo(() => {
    return new Map(courses.map((c) => [String(c.id), c] as const));
  }, []);

  const rows = useMemo(() => {
    return cart
      .map((id) => coursesById.get(String(id)))
      .filter(Boolean) as Course[];
  }, [cart, coursesById]);

  const totalCount = rows.length;

  const totalPrice = useMemo(() => {
    return rows.reduce((acc, c) => acc + (Number(c.pricing?.newPrice) || 0), 0);
  }, [rows]);

  const currency = rows[0]?.pricing?.currency ?? "USD";

  const removeFromCart = (id: string | number) => {
    const sid = String(id);
    const next = cart.filter((x) => x !== sid);
    setCart(next);
    writeCart(next);
  };

  const clearCart = () => {
    setCart([]);
    writeCart([]);
  };

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg-main" />
        <div className="absolute -top-24 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 left-16 h-105 w-105 rounded-full bg-cta/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <TitleComponent title="Your cart" description="Review your selected courses before checkout." align="center" className="max-w-2xl" />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Left */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-bg-main overflow-hidden">
              <div className="flex items-center justify-between gap-3 p-5 border-b border-border">
                <h3 className="text-base font-semibold text-text-primary">
                  Added courses
                </h3>

                {rows.length > 0 && (
                  <button onClick={clearCart} className="text-sm text-text-muted hover:text-text-primary transition">
                    Clear cart
                  </button>
                )}
              </div>

              {rows.length === 0 ? (
                <div className="p-6">
                  <p className="text-sm text-text-secondary">Your cart is empty.</p>
                  <Link to="/courses" className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-white hover:bg-primary-hover transition">
                    Browse courses
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {rows.map((course) => (
                    <li key={course.id} className="p-5">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-text-primary line-clamp-2">
                            {course.title}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-4 sm:justify-end">
                          <p className="text-sm font-semibold text-text-primary">
                            {formatMoney(
                              Number(course.pricing?.newPrice) || 0,
                              course.pricing?.currency ?? "USD"
                            )}
                          </p>

                          <button onClick={() => removeFromCart(course.id)} className="rounded-lg border border-border px-4 text-sm font-medium text-text-primary inline-flex h-10 hover:bg-bg-muted transition items-center justify-center gap-2" aria-label={`Remove ${course.title}`}>
                            <Trash2 size={16} className="text-text-muted" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-border bg-bg-main p-5">
              <h3 className="text-base font-semibold text-text-primary">Summary</h3>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between text-text-secondary">
                  <span>Courses count</span>
                  <span className="font-semibold text-text-primary">{totalCount}</span>
                </div>

                <div className="flex items-center justify-between text-text-secondary">
                  <span>Total price</span>
                  <span className="font-semibold text-text-primary">
                    {formatMoney(totalPrice, currency)}
                  </span>
                </div>
              </div>

              <Link to="/checkout" className={`mt-6 inline-flex h-11 w-full items-center justify-center gap-2  rounded-lg bg-primary px-5 text-sm font-medium text-white hover:bg-primary-hover transition ${ rows.length === 0 ? "pointer-events-none opacity-50" : ""}`}>
                Continue to checkout
                <ArrowRight size={16} />
              </Link>

              <Link to="/courses" className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-lg border border-border text-sm font-medium text-text-primary hover:bg-bg-muted transition">
                Add more courses
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
