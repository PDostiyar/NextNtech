import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Star8 } from "@/components/ui/Star8";

/** Friendly placeholder for pages built in a later phase. */
export function ComingSoon({ title, body, cta }: { title: string; body: string; cta: ReactNode }) {
  return (
    <div className="mx-auto max-w-[520px] px-4.5 py-11">
      <Card className="text-center">
        <Star8 size={40} className="mx-auto" />
        <h1 className="mt-2.5 mb-2 text-[26px] font-extrabold text-ink">{title}</h1>
        <p className="mb-5">{body}</p>
        <ButtonLink href="/courses" kind="dark">
          {cta}
        </ButtonLink>
      </Card>
    </div>
  );
}
