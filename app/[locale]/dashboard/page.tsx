import { getTranslations, setRequestLocale } from "next-intl/server";
import { ComingSoon } from "@/components/layout/ComingSoon";
import type { Locale } from "@/i18n/routing";

// Placeholder — the real dashboard is built in Phase 4.
export default async function DashboardPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("progress");
  return <ComingSoon title={t("title")} body={t("soon")} cta={t("keep")} />;
}
