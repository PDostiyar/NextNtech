import { getTranslations, setRequestLocale } from "next-intl/server";
import { ComingSoon } from "@/components/layout/ComingSoon";
import type { Locale } from "@/i18n/routing";

// Placeholder — accounts and sign-in are built in Phase 3.
export default async function LoginPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("login");
  const tc = await getTranslations("home");
  return <ComingSoon title={t("title")} body={`${t("sub")} ${t("soon")}`} cta={tc("ctaStart")} />;
}
