import { useState } from "react";

export function Quizes({ onDone }: { onDone: (score: number) => void }) {
  const questions = [
    {
      id: "q1",
      question: "What is this page for?",
      options: ["Preview the course session", "Checkout only", "Admin panel", "Profile"],
      correctIndex: 0,
    },
    {
      id: "q2",
      question: "Locked sessions require…",
      options: ["Nothing", "Only refresh", "Login + purchase", "Delete cache"],
      correctIndex: 2,
    },
  ];

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = questions.length;
  const score = questions.reduce((acc, q) => acc + ((answers[q.id] ?? -1) === q.correctIndex ? 1 : 0), 0);

  const getOptionClass = (qId: string, optIndex: number, correctIndex: number) => {
    const selected = answers[qId] === optIndex;

    if (!submitted) {
      return ["border-border bg-bg-main/35 hover:bg-bg-main/45",selected ? "ring-2 ring-primary/35" : "",]. join(" ");
    }
    if (optIndex === correctIndex) {
      return "border-green-500/50 bg-green-500/10";
    }
    if (selected && optIndex !== correctIndex) {
      return "border-red-500/50 bg-red-500/10";
    }
    return "border-border bg-bg-main/20 opacity-80";
  };

  return (
    <div className="rounded-3xl border border-border bg-bg-main/35 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-text-secondary">
          {submitted ? (
            <span>
              Result: <span className="font-semibold text-text-primary">{score}/{total}</span>
            </span>
          ) : (
            "Select answers then submit."
          )}
        </div>

        <button type="button" disabled={submitted || Object.keys(answers).length !== total} onClick={() => {
            setSubmitted(true);
            onDone(score);
          }}
          className="rounded-xl bg-primary px-6 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          Submit
        </button>
      </div>
      <div className="mt-6 space-y-6">
        {questions.map((q, qIdx) => {
          const chosen = answers[q.id];
          const isCorrect = submitted && chosen === q.correctIndex;
          return (
            <div key={q.id} className="rounded-2xl border border-border bg-bg-secondary/30 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="text-sm font-semibold text-text-primary">
                  {qIdx + 1}. {q.question}
                </div>

                {submitted && (
                  <span className={["text-xs rounded-full border px-2 py-0.5", isCorrect ? "border-green-500/40 bg-green-500/10 text-green-600" : "border-red-500/40 bg-red-500/10 text-red-600",].join(" ")}>
                    {isCorrect ? "Correct" : "Wrong"}
                  </span>
                )}
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, optIndex) => (
                  <button key={opt} type="button" disabled={submitted} onClick={() => setAnswers((p) => ({ ...p, [q.id]: optIndex }))}
                    className={["rounded-xl border px-3 py-2 text-left text-sm transition", getOptionClass(q.id, optIndex, q.correctIndex), ].join(" ")}>
                    <span className="text-text-primary">{opt}</span>
                  </button>
                ))}
              </div>

              {submitted && (
                <div className="mt-4 space-y-1 text-xs">
                  <div className="text-green-600">
                    Correct answer: <span className="font-semibold">{q.options[q.correctIndex]}</span>
                  </div>

                  {chosen !== q.correctIndex && chosen !== undefined && chosen !== -1 && (
                    <div className="text-red-600">
                      Your answer: <span className="font-semibold">{q.options[chosen]}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {submitted && (
        <div className="mt-6 flex justify-end">
          <button type="button" onClick={() => {
              setAnswers({});
              setSubmitted(false);
            }}
            className="rounded-xl border border-border bg-bg-secondary/40 px-5 py-2 text-sm font-semibold text-text-primary hover:bg-bg-secondary/55 transition">
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
