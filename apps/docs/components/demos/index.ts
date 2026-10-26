import type { ComponentType } from "react";
import DialogBasic from "./dialog/basic";
import DialogControlled from "./dialog/controlled";
import DialogDanger from "./dialog/danger";
import DialogScroll from "./dialog/scroll";

/** Every live demo, by path under components/demos (the source shown is read from that file). */
export const demos: Record<string, ComponentType> = {
  "dialog/basic": DialogBasic,
  "dialog/controlled": DialogControlled,
  "dialog/danger": DialogDanger,
  "dialog/scroll": DialogScroll,
};
