import { describe, expect, it } from "vitest";
import { curriculum } from "@/content/curriculum";
import { lessonBody, playgroundConfig } from "@/lib/lesson-blocks";

const lessons = curriculum.flatMap((c) => c.modules.flatMap((m) => m.lessons));

describe("seed curriculum", () => {
  it("has the six courses in the demo's colors", () => {
    expect(curriculum.map((c) => [c.key, c.color])).toEqual([
      ["frontend", "#2EC4B6"],
      ["backend", "#2A4BAE"],
      ["fullstack", "#F5A524"],
      ["python", "#7C5CD6"],
      ["mobile", "#E4572E"],
      ["career", "#2E933C"],
    ]);
  });

  it("contains the 14 written demo lessons", () => {
    expect(lessons).toHaveLength(14);
  });

  it("uses unique slugs", () => {
    const slugs = lessons.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(curriculum.map((c) => c.slug)).size).toBe(curriculum.length);
    for (const c of curriculum) {
      expect(new Set(c.modules.map((m) => m.slug)).size).toBe(c.modules.length);
    }
  });

  it.each(lessons.map((l) => [l.slug, l] as const))("%s is valid", (_slug, l) => {
    expect(() => lessonBody.parse(l.body)).not.toThrow();
    if (l.playground) expect(() => playgroundConfig.parse(l.playground)).not.toThrow();
    expect(l.quiz.length).toBeGreaterThanOrEqual(3);
    expect(l.quiz.length).toBeLessThanOrEqual(5);
    for (const q of l.quiz) {
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      expect(q.answerIdx).toBeGreaterThanOrEqual(0);
      expect(q.answerIdx).toBeLessThan(q.options.length);
      expect(q.explain.length).toBeGreaterThan(0);
    }
  });
});
