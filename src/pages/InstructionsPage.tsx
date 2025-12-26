import { useMemo, useState } from "react";
import TitleComponent from "../components/shared/TitleComponent";
import { instructionTopics, type InstructionTopic } from "../data/instructions";
import { TopicsMobileTabs, TopicsSidebar } from "../components/TopicsSidebar";
import { TopicCard } from "../components/TopicCard";
import { RenderInstruction } from "../components/RenderInstruction";

export default function InstructionsPage() {
  const topics = useMemo<InstructionTopic[]>(() => instructionTopics, []);
  const [activeId, setActiveId] = useState<string>(
    topics[0]?.id ?? "learning-access"
  );
  const active = topics.find((t) => t.id === activeId) ?? topics[0];

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-bg-main to-transparent" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg-main" />
        <div className="absolute -top-32 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-32 left-24 h-105 w-105 rounded-full bg-cta/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
          style={{ backgroundImage:"linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)",backgroundSize: "44px 44px",}}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <TitleComponent
          title="Student instructions"
          description="Certificates, payments, platform rules, and study tips — organized and easy to follow."
          align="center"
          className="max-w-2xl"
        />
        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-4 order-1 lg:order-2 min-w-0">
            <div className="hidden lg:block sticky top-24">
              <TopicsSidebar topics={topics} activeId={activeId} onSelect={setActiveId} />
            </div>

            {/* Mobile tabs */}
            <div className="lg:hidden">
              <TopicsMobileTabs topics={topics} activeId={activeId} onSelect={setActiveId} />
            </div>
          </aside>

          {/* left */}
          <div className="lg:col-span-8 order-2 lg:order-1 min-w-0 space-y-4 sm:space-y-5">
            <TopicCard>
              <div className="flex items-start justify-between gap-3 sm:gap-4 min-w-0">
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-semibold text-text-primary wrap-break-word">
                    {active.label}
                  </h2>
                  <p className="mt-1 text-sm text-text-secondary leading-relaxed wrap-break-word">
                    {active.summary}
                  </p>
                </div>
                <span className="hidden sm:flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary shrink-0">
                  {active.icon}
                </span>
              </div>
            </TopicCard>

            {active.sections.map((sec) => (
              <TopicCard key={sec.id} title={sec.title}>
                <div className="space-y-3 sm:space-y-4 min-w-0">
                  {sec.blocks.map((b, idx) => RenderInstruction(b, idx))}
                </div>
              </TopicCard>
            ))}

            <TopicCard>
              <p className="text-sm font-semibold text-text-primary wrap-break-word">
                Didn’t find your answer?
              </p>
              <p className="mt-2 text-sm text-text-secondary wrap-break-word">
                Visit the Support page and send us your details (course name + email + screenshot if possible).
              </p>
            </TopicCard>
          </div>
        </div>
      </div>
    </section>
  );
}
