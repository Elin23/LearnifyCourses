import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { courses } from "../data/courses";
import { generateAutoSessions } from "../utils/courseAutoSessions";
import { useToast } from "../components/shared/Toast";
import { Quizes } from "../sections/Quizes";

export default function CourseSession() {
  const { slug, index } = useParams<{ slug: string; index: string }>();
  const idx = Number(index || "1");

  const navigate = useNavigate();
  const { toast } = useToast();

  const course = useMemo(() => courses.find((c) => c.slug === slug), [slug]);

  const token = localStorage.getItem("token");
  const isAuthed = !!token && token !== "null" && token !== "undefined";

  if (!course) return <div className="py-24 text-center text-text-secondary">Course not found</div>;

  const metaHours = course.meta?.totalHours ?? 0;
  const autoSessions = generateAutoSessions(metaHours, 60);
  const session = autoSessions.find((s) => s.index === idx);

  if (!session) return <div className="py-24 text-center text-text-secondary">Session not found</div>;

  const locked = !session.isPreview;
  if (locked) {
    if (!isAuthed) {
      toast({ variant: "error", title: "Login required", message: "You need to login first.", duration: 4500, action: { label: "Go to login", onClick: () => navigate("/auth/login") },});
      return <div className="py-24 text-center text-text-secondary">Locked</div>;
    }

    toast({
      variant: "error",
      title: "Locked session",
      message: "Purchase the course to unlock this session.",
      duration: 4500,
      action: { label: "Go to cart", onClick: () => navigate("/cart") },
    });
    return <div className="py-24 text-center text-text-secondary">Locked</div>;
  }

  const previewVideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg-main" />
        <div className="absolute -top-32 left-1/2 h-170 w-170 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-32 right-10 h-140 w-140 rounded-full bg-cta/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-[40px] border border-border bg-bg-secondary/45 backdrop-blur">
          <div className="p-6 md:p-9">
            <h1 className="text-3xl md:text-4xl font-semibold font-secondary text-text-primary">
              {course.title} — {session.title}
            </h1>
            <p className="mt-2 text-sm text-text-muted">{session.durationMin} min</p>

            <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-bg-main/35">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={previewVideoUrl}
                  title={`${course.title} - Preview`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold text-text-primary">Quiz</h2>
              <div className="mt-4">
                <Quizes
                  onDone={(score) => {
                    toast({
                      variant: "success",
                      title: "Quiz submitted",
                      message: `Your score: ${score}/2`,
                      duration: 3500,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
