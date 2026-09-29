import type { Metadata } from "next";
import { En } from "@/components/ui/En";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { RememberCourse } from "@/components/ui/PathCard";
import { Star8 } from "@/components/ui/Star8";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getCourse } from "@/lib/courses";

type Props = { params: Promise<{ locale: Locale; courseSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = await getCourse(courseSlug);
  return course ? { title: course.title, description: course.summary } : {};
}

export default async function CoursePage({ params }: Props) {
  const { locale, courseSlug } = await params;
  setRequestLocale(locale);
  const course = await getCourse(courseSlug);
  if (!course) notFound();

  const t = await getTranslations("common");
  const tc = await getTranslations("course");

  return (
    <div
      className="mx-auto max-w-[820px] px-4.5 py-8.5"
      style={{ "--course": course.color } as CSSProperties}
    >
      <RememberCourse slug={course.slug} />
      <Link href="/courses" className="mb-3 inline-block font-bold text-lapis hover:underline">
        <span className="inline-block rtl:-scale-x-100" aria-hidden="true">
          ←
        </span>{" "}
        {t("allCourses")}
      </Link>
      <div className="border-s-[6px] border-s-course ps-3.5">
        <h1 className="mb-1.5 text-[30px] font-extrabold text-ink">
          <span aria-hidden="true">{course.emoji}</span> <En>{course.title}</En>
        </h1>
        <En as="p">{course.summary}</En>
        <p>{t("anywhereNote")}</p>
      </div>

      <ol className="mt-5 grid gap-3">
        {course.modules.map((m, i) => {
          const first = m.lessons[0];
          const ready = Boolean(first);
          return (
            <li key={m.id}>
              <Card className={ready ? "border-s-[5px] border-s-course" : "border-s-[5px] border-s-line"}>
                <div className="flex items-center gap-3.5">
                  <Star8
                    size={26}
                    className="shrink-0"
                    color={ready ? course.color : "var(--color-line)"}
                    filled={ready}
                  />
                  <div className="flex-1">
                    <strong className="text-ink">
                      {tc("module", { n: i + 1 })}: <En>{m.title}</En>
                    </strong>
                    {ready && (
                      <div className="text-[13px]">
                        {tc("moduleReady")}
                        {m.lessons.length > 1 && <> · {tc("lessons", { count: m.lessons.length })}</>}
                      </div>
                    )}
                  </div>
                  {ready ? (
                    <ButtonLink href={`/courses/${course.slug}/${first.slug}`} kind="course" size="sm">
                      {t("start")}
                    </ButtonLink>
                  ) : (
                    <span className="text-[13px] font-bold text-muted">{t("coming")}</span>
                  )}
                </div>
              </Card>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
