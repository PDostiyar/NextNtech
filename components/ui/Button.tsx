import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "./cn";

export type ButtonKind = "primary" | "dark" | "ghost" | "green" | "course";
export type ButtonSize = "sm" | "md";

const kinds: Record<ButtonKind, string> = {
  primary: "bg-saffron text-ink hover:brightness-105",
  dark: "bg-lapis text-white hover:bg-lapis-soft",
  ghost: "border-2 border-lapis bg-transparent text-lapis hover:bg-lapis/5",
  green: "bg-green text-white hover:brightness-110",
  // Uses the surrounding course color (see --course in globals.css)
  course: "bg-course text-white hover:brightness-110",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-[15px]",
};

export function buttonClasses(kind: ButtonKind = "primary", size: ButtonSize = "md", extra?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition",
    "disabled:cursor-default disabled:opacity-50",
    kinds[kind],
    sizes[size],
    extra,
  );
}

type ButtonProps = ComponentProps<"button"> & { kind?: ButtonKind; size?: ButtonSize };

export function Button({ kind, size, className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={buttonClasses(kind, size, className)} {...rest} />;
}

type ButtonLinkProps = ComponentProps<typeof Link> & { kind?: ButtonKind; size?: ButtonSize };

export function ButtonLink({ kind, size, className, ...rest }: ButtonLinkProps) {
  return <Link className={buttonClasses(kind, size, className)} {...rest} />;
}
