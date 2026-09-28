/** Dark code sample block. Always LTR, even on Dari/Pashto pages. */
export function CodeBox({ code, language }: { code: string; language?: string }) {
  return (
    <pre
      dir="ltr"
      data-language={language}
      className="my-4 overflow-x-auto rounded-xl bg-ink p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap text-code"
    >
      <code>{code}</code>
    </pre>
  );
}
