import type { ComponentType } from "react";
import type { VisualName } from "@/lib/lesson-blocks";
import { BoxModel } from "./BoxModel";
import { ClientServer } from "./ClientServer";
import { TableVisual } from "./TableVisual";
import { TagAnatomy } from "./TagAnatomy";
import { WebTrio } from "./WebTrio";

/** Lesson visuals referenced by name from { type: "visual", name } blocks. */
export const visuals: Record<VisualName, ComponentType<Record<string, string>>> = {
  WebTrio,
  TagAnatomy,
  BoxModel,
  ClientServer,
  TableVisual: () => <TableVisual />,
};
