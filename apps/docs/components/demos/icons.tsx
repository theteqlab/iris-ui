import type { SVGProps } from "react";

// Any SVG icon works (Lucide, Heroicons…): the components size and colour it.
const icon = (d: string) =>
  function Icon(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        <path d={d} />
      </svg>
    );
  };

export const PlusIcon = icon("M12 5v14M5 12h14");
export const ArrowIcon = icon("M5 12h14M13 6l6 6-6 6");
export const SearchIcon = icon("M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4");
export const GearIcon = icon(
  "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1",
);
export const HeartIcon = icon(
  "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z",
);
export const MoreIcon = icon("M5 12h.01M12 12h.01M19 12h.01");
export const InfoIcon = icon("M12 16v-4M12 8h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z");
export const MailIcon = icon("M4 6h16v12H4zM4 7l8 6 8-6");
export const SparkIcon = icon(
  "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6",
);
