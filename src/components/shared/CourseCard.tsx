import { ShoppingCart, ArrowRight } from "lucide-react";
import DynamicCourseImg from "./DynamicCourseImg";
import { useNavigate } from "react-router-dom";
import { useToast } from "./Toast";
import type { Course } from "../../types/courses";

type Props = {
  course: Course;
  onAddToCart?: (course: Course) => void;
  isPurchased?: boolean;
};

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CourseCard({ course, onAddToCart, isPurchased = false }: Props) {
  const oldPrice = course.pricing.oldPrice ?? 0;
  const newPrice = course.pricing.newPrice;
  const hasOldPrice = oldPrice > newPrice;

  const { toast } = useToast();
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  const isAuthed = !!token && token !== "null" && token !== "undefined";

  const handleAdd = () => {
    if (!isAuthed) {
      toast({
        variant: "error",
        title: "Login required",
        message: "You need to login first to add courses to your cart.",
        duration: 4500,
        action: { label: "Go to login", onClick: () => navigate("/auth/login") },
      });
      return;
    }

    onAddToCart?.(course);

    toast({
      variant: "success",
      title: "Added to cart",
      message: `"${course.title}" was added successfully.`,
      duration: 3000,
      action: { label: "View cart", onClick: () => navigate("/cart") },
    });
  };

  return (
    <div className="group h-full rounded-2xl border border-border bg-bg-main p-5 transition hover:shadow-lg hover:-translate-y-0.5 flex flex-col">
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <DynamicCourseImg title={course.title} size={72} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-text-primary leading-snug line-clamp-2 min-h-10">
            {course.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-text-secondary min-h-10">
            {course.shortDescription}
          </p>
        </div>
      </div>

      <div className="mt-4 text-xs text-text-muted min-h-12 flex flex-col justify-center gap-2">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate">
            Instructor:{" "}
            <span className="text-text-secondary font-medium">
              {course.instructor.name}
            </span>
          </span>

          <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-text-secondary">
            {course.meta.lessonsCount} lessons
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="truncate">
            Level:{" "}
            <span className="text-text-secondary font-medium">{course.level}</span>
          </span>

          <span className="shrink-0 rounded-full bg-bg-muted px-2 py-0.5 text-text-secondary">
            {course.language}
          </span>
        </div>
      </div>

      <div className="mt-4 min-h-9 flex items-end gap-2">
        <span className="text-lg font-semibold text-green-700">
          {formatMoney(newPrice, course.pricing.currency)}
        </span>

        <span className={`text-sm ${hasOldPrice ? "text-text-muted line-through" : "invisible"}`}>
          {formatMoney(oldPrice, course.pricing.currency)}
        </span>
      </div>

      <div className="mt-auto pt-4 flex gap-2">
        <a href={`/courses/${course.slug}`} className="flex-1 h-10 inline-flex items-center justify-center gap-2 rounded-lg border border-border text-sm font-medium text-text-primary hover:bg-bg-muted transition">
          Details
          <ArrowRight size={16} />
        </a>

        {isPurchased ? (
          <button type="button" onClick={() => navigate(`/courses/${course.slug}`)} className="flex-1 h-10 inline-flex items-center justify-center gap-2 rounded-lg bg-cta text-sm font-medium text-white hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-cta/30">
            Continue
            <ArrowRight size={16} />
          </button>
        ) : (
          <button type="button" onClick={handleAdd} className="flex-1 h-10 inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-white hover:bg-primary-hover transition focus:outline-none focus:ring-2 focus:ring-primary/30">
            <ShoppingCart size={16} />
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
