"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerClass,
} from "@irisui/ui";

const components = [
  { title: "Button", text: "Five looks, seven tones." },
  { title: "Dialog", text: "A window over the page." },
  { title: "Select", text: "One value from a list." },
  { title: "Toast", text: "A short message about an action." },
];

export default function NavigationMenuDemo() {
  return (
    <div className="flex h-72 w-full justify-center">
      <NavigationMenu aria-label="Main">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="m-0 grid w-72 list-none gap-1 p-0">
                <li>
                  <NavigationMenuLink href="/docs">Introduction</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="/docs">Theming</NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="m-0 grid w-[30rem] list-none grid-cols-2 gap-1 p-0">
                {components.map((c) => (
                  <li key={c.title}>
                    <NavigationMenuLink href="/docs">
                      <span className="block font-bold">{c.title}</span>
                      <span className="block text-sm text-text-muted">{c.text}</span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {/* A top-level link, styled like the triggers; `active` marks the current page. */}
            <NavigationMenuLink href="/docs" active className={navigationMenuTriggerClass}>
              Docs
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
