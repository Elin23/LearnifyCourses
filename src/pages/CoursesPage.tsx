import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { courses } from "../data/courses";
import Tabs from "../components/ui/Tabs";
import CourseCard from "../components/shared/CourseCard";
import Pagination from "../components/ui/Pagination";


const PAGE_SIZE = 6;

export default function CoursesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(courses.map((c) => c.category)));
    return ["all", ...unique];
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    return courses.filter((c) => {
      const matchCategory =
        category === "all" || c.category === category;

      const matchQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q);

      return matchCategory && matchQuery;
    });
  }, [query, category]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const pagedCourses = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const handleCategoryChange = (id: string) => {
    setCategory(id);
    setPage(1);
  };

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg-main" />
        <div className="absolute -top-32 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-32 right-10 h-105 w-105 rounded-full bg-cta/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.06] dark:opacity-[0.1]"
          style={{
            backgroundImage:"linear-gradient(to right, rgba(148,163,184,.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.3) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-text-primary">
            Explore our courses
          </h1>
          <p className="mt-3 text-text-secondary">
            Learn new skills, build real projects, and grow your career.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search size={18} className=" absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary z-20 pointer-events-none" />

            <input value={query} onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search courses..."
              className=" w-full h-12 rounded-2xl pl-11 pr-4 border border-border bg-bg-secondary/50 backdrop-blur text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 "
            />
          </div>
        </div>

        <Tabs activeId={category} onChange={handleCategoryChange}
          items={categories.map((c) => ({
            id: c,
            label: c === "all" ? "All" : c,
            content: null,
          }))}
        />

        {pagedCourses.length === 0 ? (
          <div className="text-center py-20 text-text-muted">
            No courses found.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pagedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </section>
  );
}
