import type { ReactNode } from "react";

/**
 * English content (from the database) shown inside a possibly-RTL page.
 * <bdi> isolates its direction so punctuation stays correct in Dari/Pashto.
 */
export function En({ children }: { children: ReactNode }) {
  return <bdi lang="en">{children}</bdi>;
}
