import { useMemo, useState, useEffect } from "react";
import TitleComponent from "../components/shared/TitleComponent";
import CourseCard from "../components/shared/CourseCard";
import { Trophy } from "lucide-react";
import { courses } from "../data/courses";
import type { Course } from "../types/courses";
import Pagination from "../components/ui/Pagination";

export default function BestSellingCourses() {
  const bestSelling = useMemo(() => {
    return courses.filter((c) => (c.badges ?? []).includes("Best Seller"));
  }, []);

  const PAGE_SIZE = 3; 
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(bestSelling.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pagedCourses = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return bestSelling.slice(start, start + PAGE_SIZE);
  }, [bestSelling, page]);

  const handleAddToCart = (course: Course) => {
    const key = "cart";
    const raw = localStorage.getItem(key);
    const current: Array<{ id: string; qty: number }> = raw ? JSON.parse(raw) : [];

    const idx = current.findIndex((x) => x.id === course.id);
    if (idx >= 0) current[idx].qty += 1;
    else current.push({ id: course.id, qty: 1 });

    localStorage.setItem(key, JSON.stringify(current));
    window.dispatchEvent(new Event("storage"));
  };

  const onChangePage = (p: number) => {
    setPage(p);
    const el = document.getElementById("best-selling");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="best-selling" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg-main" />
        <div className="absolute -top-24 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 right-16 h-105 w-105 rounded-full bg-cta/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
          style={{ backgroundImage:"linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <TitleComponent
          badge={
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary/60 px-4 py-2 text-sm text-text-secondary backdrop-blur">
              <Trophy size={16} className="text-primary" />
              Best Courses
            </span>
          }
          title="Best-selling courses"
          description="Top picks loved by learners updated and designed for real progress." align="center" className="max-w-2xl"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pagedCourses.map((course) => (
            <CourseCard key={course.id} course={course} onAddToCart={handleAddToCart} />
          ))}
        </div>

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={onChangePage} siblingCount={1}/>
      </div>
    </section>
  );
}
