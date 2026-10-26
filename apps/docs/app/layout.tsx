import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import { PaletteScript } from "@/components/palette";
import "./global.css";

export const metadata = {
  title: { template: "%s · iris-ui", default: "iris-ui" },
  description: "Accessible React components in the Verre irisé style.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-palette="nacre" suppressHydrationWarning>
      <head>
        <PaletteScript />
      </head>
      <body className="flex min-h-screen flex-col">
        {/* Light / dark: next-themes sets both the `dark` class (Fumadocs) and data-mode (iris-ui). */}
        <RootProvider
          theme={{ attribute: ["class", "data-mode"], defaultTheme: "system", enableSystem: true }}
          search={{ enabled: false }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
