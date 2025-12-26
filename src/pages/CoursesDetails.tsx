import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sparkles, ShieldCheck, Layers, Clock, Users, Star, BadgeCheck, BookOpen, Lock, PlayCircle } from "lucide-react";
import { courses } from "../data/courses";
import DynamicCourseImg from "../components/shared/DynamicCourseImg";
import { useToast } from "../components/shared/Toast";
import { generateAutoSessions } from "../utils/courseAutoSessions";

export default function CourseDetails() {
  const { slug } = useParams<{ slug: string }>();
  const course = useMemo(() => courses.find((c) => c.slug === slug), [slug]);

  if (!course) {
    return (
      <div className="py-24 text-center text-text-secondary">
        Course not found
      </div>
    );
  }
  const { toast } = useToast();
  const navigate = useNavigate();

 const isAuthed = Boolean(localStorage.getItem("authToken"));

  const addToCart = (courseId: string) => {
    const key = "cart";
    const raw = localStorage.getItem(key);
    const current: Array<{ id: string; qty: number }> = raw ? JSON.parse(raw) : [];

    const idx = current.findIndex((x) => x.id === courseId);
    if (idx >= 0) current[idx].qty += 1;
    else current.push({ id: courseId, qty: 1 });

    localStorage.setItem(key, JSON.stringify(current));
    window.dispatchEvent(new Event("storage"));
  };

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

    addToCart(course.id);

    toast({
      variant: "success",
      title: "Added to cart",
      message: `"${course.title}" was added successfully.`,
      duration: 3000,
      action: { label: "View cart", onClick: () => navigate("/cart") },
    });
  };

  const meta = { lessons: course.meta?.lessonsCount ?? 0, hours: course.meta?.totalHours ?? 0, students: course.meta?.students ?? 0, rating: course.meta?.rating ?? 0, };
  const autoSessions = useMemo(
    () => generateAutoSessions(meta.hours, 60),
    [meta.hours]
  );
  const topics = course.topics?.map((t) => ({
    title: t.title,
    duration: t.durationMin ?? 0,
  }));

  const hasDiscount = course.pricing?.oldPrice && course.pricing?.newPrice && course.pricing.oldPrice > course.pricing.newPrice;

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg-main" />
        <div className="absolute -top-32 left-1/2 h-170 w-170 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-32 right-10 h-140 w-140 rounded-full bg-cta/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-[40px] border border-border bg-bg-secondary/45 backdrop-blur">
          <div className="p-6 md:p-9">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              {/* Left */}
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-main/40 px-4 py-2 text-sm text-text-secondary">
                    <Sparkles size={16} className="text-primary" />
                    {course.category} • {course.level}
                  </span>
                  {course.language && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-main/40 px-4 py-2 text-sm text-text-secondary">
                      <ShieldCheck size={16} className="text-cta" />
                      {course.language}
                    </span>
                  )}
                </div>

                <h2 className="mt-5 text-4xl md:text-5xl font-semibold font-secondary leading-tight text-text-primary">
                  {course.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
                  {course.shortDescription}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <div className="rounded-2xl border border-border bg-bg-main/40 px-5 py-3">
                    <div className="text-xs text-text-muted">Price</div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <div className="text-2xl font-semibold text-text-primary">
                        {course.pricing?.newPrice} {course.pricing?.currency}
                      </div>
                      {hasDiscount && (
                        <div className="text-sm line-through text-text-muted">
                          {course.pricing?.oldPrice} {course.pricing?.currency}
                        </div>
                      )}
                    </div>
                  </div>

                  <button type="button" onClick={handleAdd} className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3 text-sm font-semibold text-white
                      transition hover:bg-primary-hover hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
                    Add to cart
                  </button>
                </div>
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Meta icon={<Layers size={18} />} label="Lessons" value={meta.lessons} />
                  <Meta icon={<Clock size={18} />} label="Hours" value={meta.hours} />
                  <Meta icon={<Users size={18} />} label="Students" value={meta.students} />
                  <Meta icon={<Star size={18} />} label="Rating" value={meta.rating.toFixed(1)} />
                </div>
              </div>

              {/* Right  */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative rounded-[36px] border border-border bg-bg-main/35 p-8">
                  <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-primary/12 blur-2xl" />
                  <div className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-cta/12 blur-2xl" />
                  <DynamicCourseImg title={course.title} size={190} />
                </div>
              </div>
            </div>
          </div>

          {/* divider */}
          <div className="h-px bg-border/70" />
          <div className="p-6 md:p-9 space-y-12">
            <div>
              <h2 className="text-2xl font-semibold text-text-primary"> About this course</h2>
              <div className="mt-5 rounded-3xl border border-border bg-bg-main/35 p-6">
                <p className="max-w-4xl text-base leading-relaxed text-text-secondary">
                  {course.fullDescription}
                </p>
              </div>
            </div>

            {topics && topics.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-text-primary">
                  What you will learn
                </h3>

                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {topics.map((t) => (
                    <li key={t.title} className=" flex items-start gap-3 rounded-2xl border border-border bg-bg-main/35 px-4 py-4">
                      <BadgeCheck size={18} className="mt-0.5 text-primary" />
                      <div>
                        <div className="text-sm font-medium text-text-primary">
                          {t.title}
                        </div>
                        <div className="text-xs text-text-muted">
                          {t.duration} min
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="rounded-3xl border border-border bg-bg-main/35 p-6">
              <div className="flex items-start gap-3">
                <BookOpen size={20} className="text-primary mt-0.5" />
                <p className="text-sm leading-relaxed text-text-secondary">
                  This course is designed as a guided journey, not just a list of videos.
                  You will build understanding step by step, practice with real tasks,
                  and finish with practical outcomes you can reuse in real projects.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
        <h3 className="text-xl font-semibold mt-6 text-text-primary">Course sessions</h3>

        <div className="mt-6 space-y-3">
          {autoSessions.map((s) => {
            const locked = !s.isPreview;

            return (
              <button
                key={s.index}
                type="button"
                onClick={() => {
                  if (locked) {
                    if (!isAuthed) {
                      toast({
                        variant: "error",
                        title: "Login required",
                        message: "Login to access the full sessions.",
                        duration: 4500,
                        action: { label: "Go to login", onClick: () => navigate("/auth/login") },
                      });
                      return;
                    }

                    toast({
                      variant: "error",
                      title: "Locked session",
                      message: "Purchase the course to unlock this session.",
                      duration: 4500,
                      action: { label: "Go to cart", onClick: () => navigate("/cart") },
                    });
                    return;
                  }

                  navigate(`/courses/${course.slug}/session/1`);
                }}
                className="w-full text-left flex items-center justify-between gap-4 rounded-2xl border border-border bg-bg-main/35 px-4 py-4 hover:bg-bg-main/45 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-primary">
                    {locked ? <Lock size={18} /> : <PlayCircle size={18} />}
                  </div>

                  <div className="min-w-0">
                    <div className="text-sm font-medium text-text-primary">
                      {s.index}. {s.title}
                      {s.isPreview && (
                        <span className="ml-2 text-xs rounded-full border border-border bg-bg-secondary/50 px-2 py-0.5 text-text-secondary">
                          Preview
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-text-muted">{s.durationMin} min</div>
                  </div>
                </div>

                <span className="text-xs text-text-muted">{locked ? "Locked" : "Watch"}</span>
              </button>
            );
          })}
        </div>
      </div>
      </div>
      

    </section>
  );
}

function Meta({ icon, label, value, }: { icon: React.ReactNode; label: string; value: React.ReactNode; }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-bg-main/35 px-4 py-3">
      <div className="text-primary">{icon}</div>
      <div>
        <div className="text-sm font-semibold text-text-primary">{value}</div>
        <div className="text-xs text-text-muted">{label}</div>
      </div>
    </div>
  );
}
