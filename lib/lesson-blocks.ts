import { z } from "zod";

/**
 * Lesson bodies are stored as an ordered array of typed blocks (Lesson.body JSON).
 *
 * Paragraph and callout text supports a tiny inline syntax (see lib/inline.ts):
 *   **bold**   *italic*   `code`
 */

export const VISUAL_NAMES = ["WebTrio", "TagAnatomy", "BoxModel", "ClientServer", "TableVisual"] as const;
export type VisualName = (typeof VISUAL_NAMES)[number];

export const paragraphBlock = z.object({
  type: z.literal("paragraph"),
  text: z.string().min(1),
});

export const headingBlock = z.object({
  type: z.literal("heading"),
  text: z.string().min(1),
});

export const codeBlock = z.object({
  type: z.literal("code"),
  language: z.string().default("text"),
  code: z.string().min(1),
});

export const calloutBlock = z.object({
  type: z.literal("callout"),
  tone: z.enum(["info", "tip", "warning"]).default("info"),
  text: z.string().min(1),
});

export const visualBlock = z.object({
  type: z.literal("visual"),
  name: z.enum(VISUAL_NAMES),
  // Optional props for the visual, e.g. { label: "GET /api/joke" } for ClientServer
  props: z.record(z.string(), z.string()).optional(),
});

export const lessonBlock = z.discriminatedUnion("type", [
  paragraphBlock,
  headingBlock,
  codeBlock,
  calloutBlock,
  visualBlock,
]);
export const lessonBody = z.array(lessonBlock).min(1);

export type LessonBlock = z.infer<typeof lessonBlock>;
export type LessonBody = z.infer<typeof lessonBody>;

export const PLAYGROUND_TYPES = ["html", "python", "sql", "php", "api", "hash"] as const;
export type PlaygroundType = (typeof PLAYGROUND_TYPES)[number];

export const playgroundConfig = z.object({
  type: z.enum(PLAYGROUND_TYPES),
  title: z.string().min(1),
  hint: z.string().min(1),
  starter: z.string().optional(),
  // html only: render the preview inside a phone frame
  phone: z.boolean().optional(),
});
export type PlaygroundConfig = z.infer<typeof playgroundConfig>;

/** Parse untrusted JSON from the database into a typed lesson body. */
export function parseLessonBody(value: unknown): LessonBody {
  return lessonBody.parse(value);
}

export function parsePlayground(value: unknown): PlaygroundConfig | null {
  if (value === null || value === undefined) return null;
  return playgroundConfig.parse(value);
}

/** Plain text of a lesson body — used for audio narration and search. */
export function lessonPlainText(body: LessonBody): string {
  return body
    .map((b) => {
      switch (b.type) {
        case "paragraph":
        case "heading":
        case "callout":
          return b.text.replace(/\*\*|\*|`/g, "");
        case "code":
        case "visual":
          return "";
      }
    })
    .filter(Boolean)
    .join("\n\n");
}
