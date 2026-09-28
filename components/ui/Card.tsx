import type { ComponentProps } from "react";
import { cn } from "./cn";

export function Card({ className, ...rest }: ComponentProps<"div">) {
  return <div className={cn("rounded-2xl border border-line bg-white p-5", className)} {...rest} />;
}
