import { useTranslations } from "next-intl";
import { ComingSoon } from "@/components/layout/ComingSoon";

export default function NotFound() {
  const t = useTranslations("notFound");
  const tc = useTranslations("common");
  return <ComingSoon title={t("title")} body={t("body")} cta={tc("allCourses")} />;
}
