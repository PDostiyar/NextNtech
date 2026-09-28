/**
 * Seeds all six courses, every module from the curriculum outline, and the 14
 * fully written demo lessons (with quiz questions).
 *
 * Idempotent: re-running updates content in place by slug. It never deletes
 * learner data — quiz questions are matched by (lesson, order) and updated.
 */
import { PrismaClient } from "@prisma/client";
import { curriculum } from "../content/curriculum";
import { lessonBody, playgroundConfig } from "../lib/lesson-blocks";

const prisma = new PrismaClient();

async function main() {
  let lessonCount = 0;
  let questionCount = 0;

  for (const [ci, c] of curriculum.entries()) {
    const course = await prisma.course.upsert({
      where: { slug: c.slug },
      update: { key: c.key, title: c.title, summary: c.summary, emoji: c.emoji, color: c.color, order: ci },
      create: {
        slug: c.slug,
        key: c.key,
        title: c.title,
        summary: c.summary,
        emoji: c.emoji,
        color: c.color,
        order: ci,
      },
    });

    for (const [mi, m] of c.modules.entries()) {
      const mod = await prisma.module.upsert({
        where: { courseId_slug: { courseId: course.id, slug: m.slug } },
        update: { title: m.title, order: mi },
        create: { courseId: course.id, slug: m.slug, title: m.title, order: mi },
      });

      for (const [li, l] of m.lessons.entries()) {
        // Validate against the same schemas the app uses to render.
        const body = lessonBody.parse(l.body);
        const playground = l.playground ? playgroundConfig.parse(l.playground) : undefined;
        if (l.quiz.length < 3 || l.quiz.length > 5) {
          throw new Error(`Lesson ${l.slug} needs 3–5 quiz questions (has ${l.quiz.length})`);
        }

        const data = {
          moduleId: mod.id,
          order: li,
          title: l.title,
          body,
          playground: playground ?? undefined,
          videoUrl: l.videoUrl ?? null,
          published: true,
        };
        const lesson = await prisma.lesson.upsert({
          where: { slug: l.slug },
          update: data,
          create: { slug: l.slug, ...data },
        });
        lessonCount++;

        const existing = await prisma.quizQuestion.findMany({
          where: { lessonId: lesson.id },
          orderBy: { order: "asc" },
        });
        for (const [qi, q] of l.quiz.entries()) {
          if (q.answerIdx < 0 || q.answerIdx >= q.options.length) {
            throw new Error(`Lesson ${l.slug} question ${qi + 1}: answerIdx out of range`);
          }
          const qData = {
            order: qi,
            prompt: q.prompt,
            options: q.options,
            answerIdx: q.answerIdx,
            explain: q.explain,
          };
          const match = existing.find((e) => e.order === qi);
          if (match) await prisma.quizQuestion.update({ where: { id: match.id }, data: qData });
          else await prisma.quizQuestion.create({ data: { lessonId: lesson.id, ...qData } });
          questionCount++;
        }
      }
    }
  }

  console.log(
    `Seeded ${curriculum.length} courses, ${curriculum.reduce((n, c) => n + c.modules.length, 0)} modules, ` +
      `${lessonCount} lessons, ${questionCount} quiz questions.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
