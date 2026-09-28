/**
 * Tiny inline-markup tokenizer for lesson text.
 * Supports **bold**, *italic* and `code`. Everything else is plain text —
 * we never render raw HTML from content.
 */
export type InlineToken =
  | { kind: "text"; value: string }
  | { kind: "bold"; value: string }
  | { kind: "italic"; value: string }
  | { kind: "code"; value: string };

const PATTERN = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g;

export function tokenizeInline(input: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let last = 0;
  for (const match of input.matchAll(PATTERN)) {
    const start = match.index ?? 0;
    if (start > last) tokens.push({ kind: "text", value: input.slice(last, start) });
    const raw = match[0];
    if (raw.startsWith("`")) tokens.push({ kind: "code", value: raw.slice(1, -1) });
    else if (raw.startsWith("**")) tokens.push({ kind: "bold", value: raw.slice(2, -2) });
    else tokens.push({ kind: "italic", value: raw.slice(1, -1) });
    last = start + raw.length;
  }
  if (last < input.length) tokens.push({ kind: "text", value: input.slice(last) });
  return tokens;
}
