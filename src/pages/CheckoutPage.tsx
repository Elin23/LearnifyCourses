import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TitleComponent from "../components/shared/TitleComponent";
import {CreditCard, ArrowRight, Lock, ShoppingBag, PartyPopper, XCircle,} from "lucide-react";
import { courses } from "../data/courses";
import { motion, AnimatePresence } from "framer-motion";

const CART_KEY = "cart";
const MY_COURSES_KEY = "myCourses"; 

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

function readCartIds(): string[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);

    if (!Array.isArray(data)) return [];
    if (data.length === 0) return [];

    const first = data[0];

    if (typeof first === "string" || typeof first === "number") {
      return (data as unknown[]).map(normalizeId).filter(Boolean) as string[];
    }
    if (typeof first === "object" && first !== null) {
      return (data as any[]).map((x) => normalizeId(x?.id)).filter(Boolean) as string[];
    }

    return [];
  } catch {
    return [];
  }
}

function writeCartIds(ids: string[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("storage"));
}

function readIds(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data)
      ? ((data as unknown[]).map(normalizeId).filter(Boolean) as string[])
      : [];
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: string[]) {
  localStorage.setItem(key, JSON.stringify(ids));
  window.dispatchEvent(new Event("storage"));
}

type PayStatus = "idle" | "success" | "error";

export default function Checkout() {
  const navigate = useNavigate();

  const [cartIds, setCartIds] = useState<string[]>(() => readCartIds());

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [payStatus, setPayStatus] = useState<PayStatus>("idle");
  const [payErrorMsg, setPayErrorMsg] = useState("Payment failed. Please try again.");

  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    cardNumber: false,
    expiry: false,
    cvc: false,
  });

  useEffect(() => {
    const onStorage = () => setCartIds(readCartIds());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const coursesById = useMemo(() => {
    return new Map(courses.map((c) => [String(c.id), c] as const));
  }, []);

  const selectedCourses = useMemo(() => {
    return cartIds
      .map((id) => coursesById.get(String(id)))
      .filter(Boolean) as Array<(typeof courses)[number]>;
  }, [cartIds, coursesById]);

  const totalCount = selectedCourses.length;

  const subtotal = useMemo(() => {
    return selectedCourses.reduce(
      (acc, c) => acc + (Number(c.pricing?.newPrice) || 0),
      0
    );
  }, [selectedCourses]);

  const currency = selectedCourses[0]?.pricing?.currency ?? "USD";
  const isCartEmpty = selectedCourses.length === 0;

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

  const fieldErrors = useMemo(() => {
    const errs: Record<string, string> = {};

    if (fullName.trim().length < 3) {
      errs.fullName = "Please enter your full name (min 3 characters).";
    }
    if (!isEmailValid(email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (onlyDigits(cardNumber).length !== 16) {
      errs.cardNumber = "Card number must be 16 digits.";
    }
    if (expiry.length !== 5) {
      errs.expiry = "Expiry must be in MM/YY format.";
    }
    const cvcLen = onlyDigits(cvc).length;
    if (cvcLen < 3 || cvcLen > 4) {
      errs.cvc = "CVC must be 3–4 digits.";
    }

    return errs;
  }, [fullName, email, cardNumber, expiry, cvc]);

  const canSubmit =
    !isCartEmpty &&
    Object.keys(fieldErrors).length === 0 &&
    !isSubmitting;

  const showErr = (key: keyof typeof touched) => {
    return (submitted || touched[key]) && Boolean((fieldErrors as any)[key]);
  };

  const inputClass = (key: keyof typeof touched) =>
    `mt-2 h-11 w-full rounded-lg outline-none border bg-bg-secondary/40 px-4 text-sm transition
     focus:ring-2 placeholder:text-text-muted text-text-primary
     ${
       showErr(key)
         ? "border-error/60 focus:ring-error/15 focus:border-error/60"
         : "border-border focus:ring-primary/15 focus:border-primary/60"
     }`;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!canSubmit) return;

    setIsSubmitting(true);
    setPayStatus("idle");
    setPayErrorMsg("Payment failed. Please try again.");

    try {
      await new Promise((r) => setTimeout(r, 700));

      // add purchased courses to myCourses (no duplicates)
      const purchased = readIds(MY_COURSES_KEY);
      const nextPurchased = Array.from(new Set([...purchased, ...cartIds]));
      writeIds(MY_COURSES_KEY, nextPurchased);
      writeCartIds([]);
      setCartIds([]);

      setPayStatus("success");

      setTimeout(() => {
        navigate("/my-courses", { replace: true });
      }, 1400);
    } catch (err: any) {
      setPayErrorMsg(err?.message || "Payment failed. Please try again.");
      setPayStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeOverlay = () => setPayStatus("idle");

  return (
    <section className="relative overflow-hidden py-24">
      <AnimatePresence>
        {payStatus !== "idle" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" >
            <motion.div initial={{ scale: 0.92, y: 18, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.98, y: 8, opacity: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} className="w-full max-w-md rounded-3xl bg-bg-secondary p-8 text-center shadow-xl border border-border"
            >
              {payStatus === "success" ? (
                <>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
                    <PartyPopper size={26} className="text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-text-primary">
                    Payment successful
                  </h2>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">
                    You now have instant access to your courses.
                  </p>
                  <p className="mt-4 text-xs text-text-muted">
                    Redirecting to My Courses...
                  </p>
                </>
              ) : (
                <>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-error/15">
                    <XCircle size={26} className="text-error" />
                  </div>
                  <h2 className="text-2xl font-semibold text-text-primary">
                    Payment failed
                  </h2>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">
                    {payErrorMsg}
                  </p>

                  <div className="mt-6 flex flex-col gap-2">
                    <button type="button" onClick={closeOverlay} className="h-11 rounded-2xl bg-primary text-white text-sm font-medium hover:bg-primary-hover transition" >
                      Try again
                    </button>
                    <Link to="/cart" onClick={closeOverlay} className="h-11 rounded-2xl border border-border inline-flex items-center justify-center text-sm font-medium text-text-primary hover:bg-bg-muted transition">
                      Back to cart
                    </Link>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg-main" />
        <div className="absolute -top-24 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 left-16 h-105 w-105 rounded-full bg-cta/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
          style={{ backgroundImage: "linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
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
          title="Secure checkout" description="Complete your payment and get instant access to your courses." align="center"
          className="max-w-2xl"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Left form */}
          <form onSubmit={handlePay} className="lg:col-span-2 rounded-2xl border border-border bg-bg-main p-6">
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
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} onBlur={() => setTouched((p) => ({ ...p, fullName: true }))} type="text"
                  placeholder="Your name" className={inputClass("fullName")}
                />
                {showErr("fullName") && (
                  <p className="mt-2 text-xs text-error">{fieldErrors.fullName}</p>
                )}
              </div>

              <div className="sm:col-span-1">
                <label className="text-xs text-text-muted">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => setTouched((p) => ({ ...p, email: true }))} type="email"
                  placeholder="you@example.com"
                  className={inputClass("email")}
                />
                {showErr("email") && (
                  <p className="mt-2 text-xs text-error">{fieldErrors.email}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-text-muted">Card number</label>
                <input value={cardNumber} onChange={(e) => setCardNumber(formatCard(e.target.value))} onBlur={() => setTouched((p) => ({ ...p, cardNumber: true }))} inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  className={inputClass("cardNumber")}
                />
                {showErr("cardNumber") && (
                  <p className="mt-2 text-xs text-error">{fieldErrors.cardNumber}</p>
                )}
              </div>

              <div className="sm:col-span-1">
                <label className="text-xs text-text-muted">Expiry</label>
                <input value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} onBlur={() => setTouched((p) => ({ ...p, expiry: true }))}
                  inputMode="numeric" placeholder="MM/YY"
                  className={inputClass("expiry")}
                />
                {showErr("expiry") && (
                  <p className="mt-2 text-xs text-error">{fieldErrors.expiry}</p>
                )}
              </div>

              <div className="sm:col-span-1">
                <label className="text-xs text-text-muted">CVC</label>
                <input value={cvc} onChange={(e) => setCvc(onlyDigits(e.target.value).slice(0, 4))} onBlur={() => setTouched((p) => ({ ...p, cvc: true }))} inputMode="numeric"
                  placeholder="123"
                  className={inputClass("cvc")}
                />
                {showErr("cvc") && (
                  <p className="mt-2 text-xs text-error">{fieldErrors.cvc}</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-text-muted">
                By paying, you agree to our{" "}
                <Link to="/terms" className="text-text-secondary hover:underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-text-secondary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>

              <button
                type="submit"
                disabled={!canSubmit}
                className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-white hover:bg-primary-hover transition ${
                  !canSubmit ? "opacity-50 pointer-events-none" : ""
                }`}
              >
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
                {selectedCourses.length === 0 ? (
                  <p className="text-sm text-text-secondary">No items in your cart.</p>
                ) : (
                  <ul className="space-y-3">
                    {selectedCourses.slice(0, 4).map((course) => (
                      <li key={course.id} className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-sm text-text-primary line-clamp-2">{course.title}</p>
                        </div>
                        <p className="text-sm font-semibold text-text-primary shrink-0">
                          {formatMoney(Number(course.pricing?.newPrice) || 0, course.pricing?.currency ?? "USD")}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}

                {selectedCourses.length > 4 && (
                  <p className="text-xs text-text-muted">
                    + {selectedCourses.length - 4} more courses
                  </p>
                )}
              </div>

              <div className="mt-6 border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between text-text-secondary">
                  <span>Total</span>
                  <span className="text-base font-semibold text-text-primary">
                    {formatMoney(subtotal, currency)}
                  </span>
                </div>
              </div>

              <Link to="/cart"
                className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-lg border border-border text-sm font-medium text-text-primary hover:bg-bg-muted transition">
                Back to cart
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
