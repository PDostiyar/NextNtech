import type { LessonBody, PlaygroundConfig } from "@/lib/lesson-blocks";

export type SeedQuestion = {
  prompt: string;
  options: string[];
  answerIdx: number;
  explain: string;
};

export type SeedLesson = {
  slug: string;
  title: string;
  body: LessonBody;
  playground: PlaygroundConfig | null;
  quiz: SeedQuestion[];
  videoUrl?: string;
};

export type SeedModule = {
  slug: string;
  title: string;
  /** Lesson titles from docs/NextNTech-Curriculum-Outline.md (planned, not yet written). */
  outline: string[];
  /** Fully written lessons. Modules without any are shown as "coming soon". */
  lessons: SeedLesson[];
};

export type SeedCourse = {
  key: "frontend" | "backend" | "fullstack" | "python" | "mobile" | "career";
  slug: string;
  title: string;
  summary: string;
  emoji: string;
  color: string;
  modules: SeedModule[];
};
