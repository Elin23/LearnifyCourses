import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TitleComponent from "../components/shared/TitleComponent";
import { CreditCard, ArrowRight, Lock, ShoppingBag } from "lucide-react";
import { courses } from "../data/courses";

type CartItem = { id: string; qty: number };

const CART_KEY = "cart";

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("storage"));
}

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>(() => readCart());
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const onStorage = () => setCart(readCart());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const coursesById = useMemo(
    () => new Map(courses.map((c) => [c.id, c])),
    []
  );

  const rows = useMemo(() => {
    return cart
      .map((item) => {
        const course = coursesById.get(item.id);
        if (!course) return null;
        return { item, course };
      })
      .filter(Boolean) as Array<{ item: CartItem; course: any }>;
  }, [cart, coursesById]);

  const totalCount = useMemo(
    () => cart.reduce((acc, x) => acc + (x.qty ?? 0), 0),
    [cart]
  );

  const subtotal = useMemo(() => {
    return rows.reduce((acc, r) => acc + r.course.pricing.newPrice * r.item.qty, 0);
  }, [rows]);

  const currency = rows[0]?.course?.pricing?.currency ?? "USD";

  const isCartEmpty = rows.length === 0;

  const onlyDigits = (s: string) => s.replace(/\D/g, "");
  const formatCard = (s: string) => {
    const d = onlyDigits(s).slice(0, 16);
    return d.replace(/(.{4})/g, "$1 ").trim();
  };
  const formatExpiry = (s: string) => {
    const d = onlyDigits(s).slice(0, 4);
    if (d.length <= 2) return d;
    return `${d.slice(0, 2)}/${d.slice(2)}`;
  };

  const isEmailValid = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  const canSubmit =
    !isCartEmpty &&
    fullName.trim().length >= 3 &&
    isEmailValid(email) &&
    onlyDigits(cardNumber).length === 16 &&
    expiry.length === 5 &&
    onlyDigits(cvc).length >= 3 &&
    !isSubmitting;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    writeCart([]);
    setCart([]);

    setIsSubmitting(false);

    navigate("/my-courses", { replace: true });
  };

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg-main" />
        <div className="absolute -top-24 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 left-16 h-105 w-105 rounded-full bg-cta/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
          style={{ backgroundImage: "linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)", backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <TitleComponent
          badge={
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary/60 px-4 py-2 text-sm text-text-secondary backdrop-blur">
              <CreditCard size={16} className="text-primary" />
              Checkout
            </span>
          }
          title="Secure checkout"
          description="Complete your payment and get instant access to your courses."
          align="center"
          className="max-w-2xl"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Left Payment form */}
          <form
            onSubmit={handlePay}
            className="lg:col-span-2 rounded-2xl border border-border bg-bg-main p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-text-primary">
                Payment details
              </h3>

              <span className="inline-flex items-center gap-2 text-xs text-text-muted">
                <Lock size={14} className="text-primary" />
                Encrypted
              </span>
            </div>

            {isCartEmpty && (
              <div className="mt-5 rounded-xl border border-border bg-bg-secondary/40 p-4 text-sm text-text-secondary">
                Your cart is empty. Please add courses before checkout.
                <div className="mt-3">
                  <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:underline">
                    Browse courses <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="text-xs text-text-muted">Full name</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text"
                  placeholder="Your name" className=" mt-2 h-11 w-full rounded-lg transition focus:border-primary/60 focus:ring-2 focus:ring-primary/15 placeholder:text-text-muted outline-none border border-border bg-bg-secondary/40 px-4 text-sm text-text-primary"/>
              </div>

              <div className="sm:col-span-1">
                <label className="text-xs text-text-muted">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com"
                  className="mt-2 h-11 w-full rounded-lg focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition placeholder:text-text-muted outline-none border border-border bg-bg-secondary/40 px-4 text-sm text-text-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-text-muted">Card number</label>
                <input value={cardNumber} onChange={(e) => setCardNumber(formatCard(e.target.value))} inputMode="numeric" placeholder="1234 5678 9012 3456"
                  className=" mt-2 h-11 w-full rounded-lg focus:border-primary/60 focus:ring-2 focus:ring-primary/15 placeholder:text-text-muted outline-none transition border border-border bg-bg-secondary/40 px-4 text-sm text-text-primary  "
                />
              </div>

              <div className="sm:col-span-1">
                <label className="text-xs text-text-muted">Expiry</label>
                <input value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} inputMode="numeric" placeholder="MM/YY"
                  className="mt-2 h-11 w-full rounded-lg focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition placeholder:text-text-muted outline-none border border-border bg-bg-secondary/40 px-4 text-sm text-text-primary"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="text-xs text-text-muted">CVC</label>
                <input value={cvc} onChange={(e) => setCvc(onlyDigits(e.target.value).slice(0, 4))} inputMode="numeric" placeholder="123"
                  className="mt-2 h-11 w-full rounded-lg px-4 text-sm text-text-primary border border-border focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition bg-bg-secondary/40 placeholder:text-text-muted outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-text-muted">
                By paying, you agree to our{" "}
                <Link to="/terms" className="text-text-secondary hover:underline">Terms</Link>{" "}and{" "}
                <Link to="/privacy" className="text-text-secondary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>

              <button type="submit" disabled={!canSubmit} className={`inline-flex h-11 items-center justify-center gap-2
                  rounded-lg bg-primary px-5 text-sm font-medium text-white hover:bg-primary-hover transition ${!canSubmit ? "opacity-50 pointer-events-none" : ""}`}>
                {isSubmitting ? "Processing..." : "Pay now"}
                <ArrowRight size={16} />
              </button>
            </div>
          </form>

          {/* Right */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-border bg-bg-main p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-text-primary">
                  Order summary
                </h3>
                <span className="inline-flex items-center gap-2 text-xs text-text-muted">
                  <ShoppingBag size={14} className="text-primary" />
                  {totalCount} items
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {rows.length === 0 ? (
                  <p className="text-sm text-text-secondary">
                    No items in your cart.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {rows.slice(0, 4).map(({ item, course }) => (
                      <li key={course.id} className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-sm text-text-primary line-clamp-2">
                            {course.title}
                          </p>
                          {/* <p className="mt-1 text-xs text-text-muted">
                            Qty: <span className="text-text-secondary font-medium">{item.qty}</span>
                          </p> */}
                        </div>
                        <p className="text-sm font-semibold text-text-primary shrink-0">
                          {formatMoney(course.pricing.newPrice * item.qty, course.pricing.currency)}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}

                {rows.length > 4 && (
                  <p className="text-xs text-text-muted">
                    + {rows.length - 4} more courses
                  </p>
                )}
              </div>

              <div className="mt-6 border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between text-text-secondary">
                  <span>Subtotal</span>
                  <span className="font-semibold text-text-primary">
                    {formatMoney(subtotal, currency)}
                  </span>
                </div>


                <div className="flex items-center justify-between text-text-secondary">
                  <span>Total</span>
                  <span className="text-base font-semibold text-text-primary">
                    {formatMoney(subtotal, currency)}
                  </span>
                </div>
              </div>

              <Link to="/cart"
                className=" mt-5 inline-flex h-11 w-full items-center justify-center rounded-lg border border-border text-sm font-medium text-text-primary hover:bg-bg-muted transition"
              >
                Back to cart
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
