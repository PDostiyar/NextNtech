import type { Metadata } from "next";
import { En } from "@/components/ui/En";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { LessonBody } from "@/components/lesson/LessonBody";
import { Card } from "@/components/ui/Card";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getLesson } from "@/lib/courses";

type Props = { params: Promise<{ locale: Locale; courseSlug: string; lessonSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseSlug, lessonSlug } = await params;
  const lesson = await getLesson(courseSlug, lessonSlug);
  return lesson ? { title: lesson.title } : {};
}

// Phase 1: read-only lesson body. Phase 2 adds the media bar, playground and quiz.
export default async function LessonPage({ params }: Props) {
  const { locale, courseSlug, lessonSlug } = await params;
  setRequestLocale(locale);
  const lesson = await getLesson(courseSlug, lessonSlug);
  if (!lesson) notFound();

  const t = await getTranslations("lesson");
  const course = lesson.module.course;

  return (
    <div
      className="mx-auto max-w-[780px] px-4.5 py-8.5"
      style={{ "--course": course.color } as CSSProperties}
    >
      <Link
        href={`/courses/${course.slug}`}
        className="mb-3 inline-block font-bold text-lapis hover:underline"
      >
        <span className="inline-block rtl:-scale-x-100" aria-hidden="true">
          ←
        </span>{" "}
        <En>{course.title}</En>
      </Link>
      <div className="text-[13px] font-extrabold tracking-wider text-course">
        {t("eyebrow", { n: lesson.module.order + 1 })} · <En>{lesson.module.title.toUpperCase()}</En>
      </div>
      <h1 className="mt-1.5 mb-3.5 text-[28px] font-extrabold text-ink">
        <En>{lesson.title}</En>
      </h1>

      {locale !== "en" && (
        <div className="mb-3 rounded-[10px] border border-saffron bg-cream px-3.5 py-2.5 text-[13px]">
          ℹ️ {t("note")}
        </div>
      )}

      <Card className="border-t-[5px] border-t-course text-base leading-[1.7]" dir="ltr" lang="en">
        <LessonBody blocks={lesson.body} />
      </Card>

      <p className="mt-5 rounded-xl border border-dashed border-course bg-course-tint px-4 py-3 text-sm">
        🧪 {t("practiceSoon")}
      </p>
    </div>
  );
}
