import { tokenizeInline } from "@/lib/inline";

/** Renders **bold**, *italic* and `code` from lesson text. Never renders raw HTML. */
export function InlineText({ text }: { text: string }) {
  return (
    <>
      {tokenizeInline(text).map((t, i) => {
        switch (t.kind) {
          case "bold":
            return (
              <strong key={i} className="text-ink">
                {t.value}
              </strong>
            );
          case "italic":
            return <em key={i}>{t.value}</em>;
          case "code":
            return (
              <code key={i} className="rounded bg-paper px-1.5 py-0.5 font-mono text-[0.9em] text-ink">
                {t.value}
              </code>
            );
          default:
            return <span key={i}>{t.value}</span>;
        }
      })}
    </>
  );
}
