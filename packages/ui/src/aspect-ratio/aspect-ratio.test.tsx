import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AspectRatio } from "./aspect-ratio";

describe("AspectRatio", () => {
  it("keeps its content at the ratio", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <img src="data:," alt="Lake" />
      </AspectRatio>,
    );
    const wrapper = screen.getByAltText("Lake").parentElement?.parentElement;
    expect(wrapper?.style.paddingBottom).toBe(`${100 / (16 / 9)}%`);
  });
});
