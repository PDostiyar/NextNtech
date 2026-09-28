import "server-only";
import { prisma } from "./db";
import { parseLessonBody, parsePlayground } from "./lesson-blocks";

/**
 * Public content queries. These never select QuizQuestion.answerIdx —
 * grading happens on the server (Phase 2).
 */

export type CourseSummary = Awaited<ReturnType<typeof getCourses>>[number];

export async function getCourses() {
  const courses = await prisma.course.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: {
      id: true,
      key: true,
      slug: true,
      title: true,
      summary: true,
      emoji: true,
      color: true,
      modules: {
        orderBy: { order: "asc" },
        select: {
          title: true,
          _count: { select: { lessons: { where: { published: true } } } },
        },
      },
    },
  });
  return courses.map((c) => ({
    ...c,
    readyModules: c.modules.filter((m) => m._count.lessons > 0).length,
  }));
}

export async function getCourse(slug: string) {
  const course = await prisma.course.findFirst({
    where: { slug, published: true },
    select: {
      id: true,
      key: true,
      slug: true,
      title: true,
      summary: true,
      emoji: true,
      color: true,
      modules: {
        orderBy: { order: "asc" },
        select: {
          id: true,
          slug: true,
          title: true,
          lessons: {
            where: { published: true },
            orderBy: { order: "asc" },
            select: { slug: true, title: true },
          },
        },
      },
    },
  });
  return course;
}

export async function getLesson(courseSlug: string, lessonSlug: string) {
  const lesson = await prisma.lesson.findFirst({
    where: { slug: lessonSlug, published: true, module: { course: { slug: courseSlug, published: true } } },
    select: {
      id: true,
      slug: true,
      title: true,
      body: true,
      videoUrl: true,
      audioWomanUrl: true,
      audioManUrl: true,
      playground: true,
      module: {
        select: {
          title: true,
          order: true,
          course: { select: { slug: true, title: true, color: true, emoji: true } },
        },
      },
    },
  });
  if (!lesson) return null;
  return {
    ...lesson,
    body: parseLessonBody(lesson.body),
    playground: parsePlayground(lesson.playground),
  };
}
