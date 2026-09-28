import { Fragment } from "react";
import type { LessonBody as Body } from "@/lib/lesson-blocks";
import { CodeBox } from "@/components/ui/CodeBox";
import { visuals } from "@/components/visuals";
import { InlineText } from "./InlineText";

const calloutStyles = {
  info: { icon: "ℹ️", className: "border-lapis-soft/40 bg-lapis-soft/5" },
  tip: { icon: "💡", className: "border-saffron bg-cream" },
  warning: { icon: "⚠️", className: "border-red/50 bg-red/5" },
} as const;

/** Renders an ordered array of typed lesson blocks. */
export function LessonBody({ blocks }: { blocks: Body }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "paragraph":
            return (
              <p key={i} className="mb-3.5">
                <InlineText text={b.text} />
              </p>
            );
          case "heading":
            return (
              <h2 key={i} className="mt-6 mb-2 text-xl font-extrabold text-ink">
                <InlineText text={b.text} />
              </h2>
            );
          case "code":
            return <CodeBox key={i} code={b.code} language={b.language} />;
          case "callout": {
            const s = calloutStyles[b.tone];
            return (
              <div
                key={i}
                className={`my-4 flex gap-2 rounded-xl border px-4 py-3 text-[15px] ${s.className}`}
              >
                <span aria-hidden="true">{s.icon}</span>
                <p>
                  <InlineText text={b.text} />
                </p>
              </div>
            );
          }
          case "visual": {
            const Visual = visuals[b.name];
            return (
              <Fragment key={i}>
                <Visual {...(b.props ?? {})} />
              </Fragment>
            );
          }
        }
      })}
    </>
  );
}
