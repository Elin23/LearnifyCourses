import type { InstructionBlock } from "../data/instructions";
import { NoteBox } from "./NoteBox";

export function RenderInstruction(block: InstructionBlock, key: string | number) {
  if (block.type === "text") {
    return (
      <p key={key} className=" text-sm text-text-secondary leading-relaxed wrap-break-word whitespace-normal" >
        <span className="font-semibold text-text-primary">{block.title}: </span>
        <span className="wrap-break-word">{block.body}</span>
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <div key={key} className="min-w-0">
        <p className="text-sm font-semibold text-text-primary wrap-break-word">
          {block.title}
        </p>

        <ul className="mt-3 space-y-2 text-sm text-text-secondary leading-relaxed min-w-0">
          {block.items.map((x, i) => (
            <li key={i} className="flex items-start gap-3 min-w-0" >
              <span className=" mt-2.5 h-1.5 w-1.5 rounded-full bg-primary/70 shrink-0"/>
              <span className="min-w-0 wrap-break-word whitespace-normal">
                {x}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (block.type === "tips") {
    return (
      <div key={key} className=" rounded-2xl border border-border bg-bg-secondary/40 p-4 sm:p-5 min-w-0">
        <p className="text-sm font-semibold text-text-primary wrap-break-word">
          {block.title}
        </p>

        <ul className="mt-3 space-y-2 text-sm text-text-secondary leading-relaxed min-w-0">
          {block.items.map((x, i) => (
            <li key={i} className="flex items-start gap-3 min-w-0">
              <span className=" mt-2.5 h-1.5 w-1.5 rounded-full bg-cta/70 shrink-0"/>
              <span className="min-w-0 wrap-break-word whitespace-normal">
                {x}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div key={key} className="min-w-0">
      <NoteBox title={block.title} body={block.body} tone={block.tone ?? "info"} />
    </div>
  );
}
