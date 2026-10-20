import type { Metadata } from "next";
import { En } from "@/components/ui/En";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PathCard } from "@/components/ui/PathCard";
import type { Locale } from "@/i18n/routing";
import { getCourses } from "@/lib/courses";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  return { title: t("allCourses") };
}

export default async function CoursesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("common");
  const courses = await getCourses();

  return (
    <div className="mx-auto max-w-[980px] px-4.5 py-8.5">
      <h1 className="mb-1 text-[30px] font-extrabold text-ink">{t("allCourses")}</h1>
      <p className="mb-4">🧭 {t("anywhereNote")}</p>
      <div className="grid gap-3.5">
        {courses.map((c) => (
          <PathCard key={c.id} href={`/courses/${c.slug}`} color={c.color} courseSlug={c.slug} showSelected>
            <div className="flex flex-wrap items-center gap-3.5">
              <div className="text-[32px]" aria-hidden="true">
                {c.emoji}
              </div>
              <div className="min-w-[200px] flex-1">
                <En as="h2" className="text-lg font-extrabold text-ink">
                  {c.title}
                </En>
                <En as="p" className="mt-1 text-sm">
                  {c.modules.map((m) => m.title).join(" · ")}
                </En>
              </div>
              <span className="inline-flex items-center rounded-xl bg-course px-4 py-2.5 text-[15px] font-bold text-white">
                {t("start")}
              </span>
            </div>
          </PathCard>
        ))}
      </div>
    </div>
  );
}
