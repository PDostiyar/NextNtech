import { describe, expect, it } from "vitest";
import { tokenizeInline } from "@/lib/inline";

describe("tokenizeInline", () => {
  it("returns plain text untouched", () => {
    expect(tokenizeInline("Hello world")).toEqual([{ kind: "text", value: "Hello world" }]);
  });

  it("parses bold, italic and code", () => {
    expect(tokenizeInline("a **b** *c* `d`")).toEqual([
      { kind: "text", value: "a " },
      { kind: "bold", value: "b" },
      { kind: "text", value: " " },
      { kind: "italic", value: "c" },
      { kind: "text", value: " " },
      { kind: "code", value: "d" },
    ]);
  });

  it("keeps HTML-looking text as text, never markup", () => {
    const tokens = tokenizeInline("tags like `<font>` and <script>");
    expect(tokens).toContainEqual({ kind: "code", value: "<font>" });
    expect(tokens.at(-1)).toEqual({ kind: "text", value: " and <script>" });
  });

  it("does not treat lone asterisks as italic", () => {
    expect(tokenizeInline("7 * 6 = 42")).toEqual([{ kind: "text", value: "7 * 6 = 42" }]);
  });
});
