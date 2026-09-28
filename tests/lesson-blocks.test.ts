import { describe, expect, it } from "vitest";
import { lessonBody, lessonPlainText, parsePlayground } from "@/lib/lesson-blocks";

describe("lesson blocks", () => {
  it("accepts every block type", () => {
    const body = lessonBody.parse([
      { type: "paragraph", text: "Hi **there**" },
      { type: "heading", text: "Title" },
      { type: "code", language: "html", code: "<p>x</p>" },
      { type: "callout", tone: "tip", text: "Tip" },
      { type: "visual", name: "ClientServer", props: { label: "GET /" } },
    ]);
    expect(body).toHaveLength(5);
  });

  it("rejects unknown visuals and block types", () => {
    expect(() => lessonBody.parse([{ type: "visual", name: "Nope" }])).toThrow();
    expect(() => lessonBody.parse([{ type: "html", html: "<script>" }])).toThrow();
    expect(() => lessonBody.parse([])).toThrow();
  });

  it("produces plain text for narration without markup or code", () => {
    const text = lessonPlainText(
      lessonBody.parse([
        { type: "paragraph", text: "Learn **HTML** and `CSS`" },
        { type: "code", code: "secret()" },
      ]),
    );
    expect(text).toBe("Learn HTML and CSS");
  });

  it("parses playground configs", () => {
    expect(parsePlayground(null)).toBeNull();
    expect(parsePlayground({ type: "sql", title: "t", hint: "h" })?.type).toBe("sql");
    expect(() => parsePlayground({ type: "ruby", title: "t", hint: "h" })).toThrow();
  });
});
