import { useMemo } from "react";
import CourseCard from "../components/shared/CourseCard";
import { courses } from "../data/courses";
import { getPurchasedCourseIds } from "../utils/purchases";

export default function MyCourses() {
  const purchasedIds = useMemo(() => getPurchasedCourseIds(), []);
  const myCourses = useMemo(() => {
    const set = new Set(purchasedIds);
    return courses.filter((c) => set.has(c.id));
  }, [purchasedIds]);

  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-bg-main to-transparent" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg-main" />
        <div className="absolute -top-32 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-32 left-24 h-105 w-105 rounded-full bg-cta/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
          style={{ backgroundImage:"linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)", backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-semibold font-secondary text-text-primary">
            My Courses
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Access your purchased courses anytime.
          </p>
        </div>

        <div className="mt-10">
          {myCourses.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-2xl border border-border bg-bg-secondary/45 backdrop-blur p-6 text-center text-text-secondary">
              You don’t have any purchased courses yet.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {myCourses.map((course) => (
                <CourseCard key={course.id} course={course} isPurchased />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
