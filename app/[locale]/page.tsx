import type { CSSProperties } from "react";
import { En } from "@/components/ui/En";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShareButton } from "@/components/layout/ShareButton";
import { ButtonLink } from "@/components/ui/Button";
import { PathCard } from "@/components/ui/PathCard";
import { Star8 } from "@/components/ui/Star8";
import type { Locale } from "@/i18n/routing";
import { getCourses } from "@/lib/courses";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const courses = await getCourses();

  const [titleStart, titleEnd] = t("heroTitle").split("—");
  const steps = [
    ["📖", t("stepRead"), t("stepReadDesc")],
    ["🧪", t("stepPractice"), t("stepPracticeDesc")],
    ["✅", t("stepAnswer"), t("stepAnswerDesc")],
    ["🏅", t("stepAchieve"), t("stepAchieveDesc")],
  ] as const;

  return (
    <>
      <header className="relative overflow-hidden bg-[linear-gradient(160deg,var(--color-ink)_0%,var(--color-lapis)_70%)] px-5 pt-13 pb-15 text-center text-white">
        <Star8
          size={220}
          color="#fff"
          className="pointer-events-none absolute -start-5 -top-5 opacity-[0.08]"
        />
        <Star8
          size={260}
          color="#fff"
          className="pointer-events-none absolute -end-7 -bottom-10 opacity-[0.08]"
        />
        <div className="relative mx-auto max-w-[680px]">
          <div className="mb-4.5 inline-block rounded-full bg-white/12 px-4 py-1.5 text-[13px] font-bold tracking-wider">
            {t("badge")}
          </div>
          <h1 className="mb-4 text-[clamp(28px,6vw,46px)] leading-[1.18] font-extrabold">
            {titleStart}
            {titleEnd !== undefined && <span className="text-saffron">—{titleEnd}</span>}
          </h1>
          <p className="mb-3 text-lg leading-[1.7] opacity-90">{t("heroSub")}</p>
          <p className="mb-6.5 text-[15px] opacity-85">🧭 {t("heroAnywhere")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/courses">{t("ctaStart")}</ButtonLink>
            <ShareButton
              label={t("ctaInvite")}
              kind="ghost"
              className="border-white text-white hover:bg-white/10"
            />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[980px] px-4.5 py-9.5">
        <h2 className="mb-1.5 text-[26px] font-extrabold text-ink">{t("pickStart")}</h2>
        <p className="mb-4">{tc("anywhereNote")}</p>
        <div className="grid [grid-template-columns:repeat(auto-fill,minmax(min(270px,100%),1fr))] gap-4">
          {courses.map((c) => (
            <PathCard key={c.id} href={`/courses/${c.slug}`} color={c.color} courseSlug={c.slug}>
              <div className="text-3xl" aria-hidden="true">
                {c.emoji}
              </div>
              <En as="h3" className="mt-2 mb-1.5 text-lg font-extrabold text-ink">
                {c.title}
              </En>
              <En as="p" className="mb-2.5 text-sm leading-normal">
                {c.summary}
              </En>
              <span
                className="text-[13px] font-bold text-course"
                style={{ "--course": c.color } as CSSProperties}
              >
                {t("modulesReady", { count: c.readyModules })}
              </span>
            </PathCard>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-white px-4.5 py-9.5">
        <div className="mx-auto max-w-[980px]">
          <h2 className="mb-5 text-[26px] font-extrabold text-ink">{t("howTitle")}</h2>
          <div className="grid [grid-template-columns:repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {steps.map(([emoji, title, desc]) => (
              <div key={title} className="flex gap-3">
                <div className="text-[26px]" aria-hidden="true">
                  {emoji}
                </div>
                <div>
                  <strong className="text-ink">{title}</strong>
                  <p className="mt-1 text-sm leading-normal">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
