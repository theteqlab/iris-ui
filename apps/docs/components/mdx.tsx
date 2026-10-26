import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Demo } from "./demo";
import { Install } from "./install";
import { KeyboardTable } from "./keyboard-table";
import { PropsTable } from "./props-table";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Tab,
    Tabs,
    TypeTable,
    Demo,
    Install,
    PropsTable,
    KeyboardTable,
    ...components,
  };
}
