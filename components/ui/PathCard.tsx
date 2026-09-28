"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "./cn";

export const LAST_COURSE_KEY = "nnt:lastCourse";

type Props = {
  href: string;
  color: string;
  courseSlug: string;
  /** Show the filled tint + ✓ badge when this was the last-opened course. */
  showSelected?: boolean;
  children: ReactNode;
};

/** Course card: tints and lifts in its own color on hover; selected shows a filled tint + ✓. */
export function PathCard({ href, color, courseSlug, showSelected = false, children }: Props) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (!showSelected) return;
    try {
      setSelected(localStorage.getItem(LAST_COURSE_KEY) === courseSlug);
    } catch {
      // storage unavailable (private mode) — no selected state
    }
  }, [showSelected, courseSlug]);

  return (
    <Link
      href={href}
      style={{ "--course": color } as CSSProperties}
      className={cn(
        "relative block rounded-2xl border-2 border-t-[5px] border-t-course p-5 transition duration-150",
        "hover:-translate-y-[3px] hover:border-course hover:shadow-course",
        selected ? "border-course bg-course-tint-strong" : "border-line bg-white hover:bg-course-tint",
      )}
      aria-current={selected ? "true" : undefined}
    >
      {selected && (
        <span className="absolute end-3 top-2.5 rounded-full bg-course px-2.5 py-0.5 text-xs font-extrabold text-white">
          ✓
        </span>
      )}
      {children}
    </Link>
  );
}

/** Remembers the last-opened course so the course list can highlight it. */
export function RememberCourse({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      localStorage.setItem(LAST_COURSE_KEY, slug);
    } catch {
      // ignore
    }
  }, [slug]);
  return null;
}
