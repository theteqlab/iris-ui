import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { ServerCodeBlock } from "fumadocs-ui/components/codeblock.rsc";
import { codeThemes } from "@/lib/shiki";

const managers = {
  pnpm: "pnpm add @irisui/ui @irisui/tokens",
  npm: "npm install @irisui/ui @irisui/tokens",
  yarn: "yarn add @irisui/ui @irisui/tokens",
};

/** Install command, one tab per package manager. */
export function Install() {
  return (
    <Tabs items={Object.keys(managers)}>
      {Object.entries(managers).map(([name, command]) => (
        <Tab key={name} value={name}>
          <ServerCodeBlock code={command} lang="sh" themes={codeThemes} />
        </Tab>
      ))}
    </Tabs>
  );
}
