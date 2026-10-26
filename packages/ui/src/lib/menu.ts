/** Classes shared by the menus (DropdownMenu, ContextMenu, Menubar): opaque panel and 44 px items. */
export const menuPanel =
  "iris-popover iris-floating z-50 box-border min-w-60 rounded-card p-1.5 font-sans text-md outline-none";

export const menuItem = [
  "iris-option relative flex min-h-11 cursor-pointer items-center gap-3 rounded-field px-3",
  "outline-none select-none data-disabled:cursor-not-allowed",
  "[&_svg]:pointer-events-none [&_svg]:size-[18px] [&_svg]:shrink-0",
];

export const menuLabel = "px-3 pt-2 pb-1 font-mono text-xs text-text-muted";
export const menuSeparator = "mx-1 my-1.5 h-px bg-line";
export const menuShortcut = "ml-auto font-mono text-xs tracking-wide text-text-muted";
