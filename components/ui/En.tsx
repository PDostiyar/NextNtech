import type { ElementType, ReactNode } from "react";
import { cn } from "./cn";

type Props = {
  children: ReactNode;
  /** Render as a block element (e.g. "p", "h1") when the whole element is English. */
  as?: ElementType;
  className?: string;
};

/**
 * English content (from the database) shown inside a possibly-RTL page.
 *
 * - Inline (default): <bdi dir="ltr"> isolates a short English run inside Dari/Pashto text.
 * - Block (`as="p"` etc.): the element itself becomes left-to-right, so long English text
 *   wraps with correct punctuation, and stays aligned with the RTL page (`rtl:text-end`).
 */
export function En({ children, as, className }: Props) {
  if (as) {
    const Tag = as;
    return (
      <Tag lang="en" dir="ltr" className={cn("rtl:text-end", className)}>
        {children}
      </Tag>
    );
  }
  return (
    <bdi lang="en" dir="ltr" className={className}>
      {children}
    </bdi>
  );
}
