"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { localeLabels, routing, type Locale } from "@/i18n/routing";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";
import { Logo } from "@/components/ui/Logo";

export function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const links = [
    { href: "/courses", label: t("courses") },
    { href: "/dashboard", label: t("progress") },
    { href: "/about", label: t("about") },
  ] as const;

  return (
    <nav className="sticky top-0 z-10 bg-ink px-4 py-3.5 sm:px-5">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-1 gap-y-2">
        <Link href="/" aria-label={t("home")} className="me-auto rounded-lg">
          <Logo />
        </Link>

        <div className="order-last flex w-full flex-wrap items-center justify-between gap-x-0.5 gap-y-2 sm:order-none sm:w-auto sm:justify-start">
          <span className="flex">
            {links.map((l) => {
              const active = pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-2 py-1.5 text-sm whitespace-nowrap sm:px-2.5 sm:text-[15px]",
                    active ? "font-extrabold text-saffron" : "font-semibold text-white hover:text-saffron",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </span>
          <span className="sm:ms-1.5">
            <LanguageSwitcher label={t("language")} />
          </span>
        </div>

        <Link href="/login" className={buttonClasses("primary", "sm", "ms-1.5")}>
          {t("signin")}
        </Link>
      </div>
    </nav>
  );
}

function LanguageSwitcher({ label }: { label: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const change = (next: Locale) => {
    startTransition(() => router.replace(pathname, { locale: next, scroll: false }));
  };

  return (
    <span role="group" aria-label={label} className={cn("flex gap-1", pending && "opacity-70")}>
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          onClick={() => change(l)}
          aria-pressed={locale === l}
          className={cn(
            "rounded-lg px-2 py-1 text-[13px] font-extrabold whitespace-nowrap sm:px-2.5",
            locale === l ? "bg-saffron text-ink" : "bg-white/10 text-white hover:bg-white/20",
          )}
        >
          {localeLabels[l]}
        </button>
      ))}
    </span>
  );
}
