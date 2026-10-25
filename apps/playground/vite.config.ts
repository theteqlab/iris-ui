import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { getThemeScript } from "@verre/ui/theme-script";
import { defineConfig, type Plugin } from "vite";

/** Injects the anti-flash theme script at the top of `<head>`. */
function themeScript(): Plugin {
  return {
    name: "theme-script",
    transformIndexHtml: () => [
      { tag: "script", children: getThemeScript(), injectTo: "head-prepend" },
    ],
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), themeScript()],
});
