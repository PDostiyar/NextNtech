import { getTranslations } from "next-intl/server";
import { Star8 } from "@/components/ui/Star8";

export async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer className="bg-ink px-4 py-6 text-center text-[13px] text-[#aab6dd]">
      <Star8 size={18} className="mx-auto mb-1" />
      <p>{t("tagline")}</p>
    </footer>
  );
}
