import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShareButton } from "@/components/layout/ShareButton";
import { Card } from "@/components/ui/Card";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <div className="mx-auto max-w-[720px] px-4.5 py-10 text-base leading-[1.7]">
      <h1 className="mb-4 text-[30px] font-extrabold text-ink">{t("title")}</h1>
      <p className="mb-3.5">
        <strong className="text-ink">{t("lead")}</strong> {t("p1")}
      </p>
      <p className="mb-3.5">{t("p2")}</p>
      <p className="mb-5">{t("p3")}</p>
      <Card className="border-saffron bg-cream text-center">
        <h2 className="mb-3 text-lg font-extrabold text-ink">{t("shareTitle")}</h2>
        <ShareButton label={t("shareButton")} />
      </Card>
    </div>
  );
}
