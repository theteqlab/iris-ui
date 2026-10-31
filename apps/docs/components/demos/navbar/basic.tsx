"use client";

import {
  Button,
  Field,
  FieldLabel,
  Navbar,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  Slider,
  navigationMenuTriggerClass,
} from "@irisui/ui";
import { useState } from "react";

const tiles = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2];

export default function NavbarDemo() {
  const [opacity, setOpacity] = useState([0.6]);
  return (
    <div className="flex w-full flex-col gap-4">
      <Field className="max-w-xs">
        <FieldLabel>Background opacity · {Math.round((opacity[0] ?? 0) * 100)} %</FieldLabel>
        <Slider value={opacity} onValueChange={setOpacity} min={0} max={1} step={0.05} />
      </Field>
      {/* Scroll inside the box: the cards pass behind the bar, blurred. */}
      <div
        tabIndex={0}
        aria-label="Page content"
        className="h-80 overflow-y-auto rounded-card border border-line"
      >
        <Navbar opacity={opacity[0]} className="justify-between">
          <strong>iris-ui</strong>
          <NavigationMenu aria-label="Main" className="hidden sm:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" active className={navigationMenuTriggerClass}>
                  Docs
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={navigationMenuTriggerClass}>
                  Components
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button look="solid" size="sm">
            Sign in
          </Button>
        </Navbar>
        <div className="grid grid-cols-3 gap-3 p-4">
          {tiles.map((tone, i) => (
            <div
              key={i}
              className="flex h-24 items-end rounded-field p-3 text-sm font-bold text-text-on-holo"
              style={{ background: `var(--tone-${tone})` }}
            >
              Card {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
