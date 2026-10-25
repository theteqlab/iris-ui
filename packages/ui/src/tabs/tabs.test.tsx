import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../../../test/axe";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

function Settings(props: Parameters<typeof Tabs>[0]) {
  return (
    <Tabs defaultValue="profile" {...props}>
      <TabsList aria-label="Settings">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="api" disabled>
          API
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">Your name and photo.</TabsContent>
      <TabsContent value="billing">Your plan and invoices.</TabsContent>
      <TabsContent value="api">Keys.</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("shows the active panel and switches with a click", async () => {
    const onValueChange = vi.fn();
    render(<Settings onValueChange={onValueChange} />);
    expect(screen.getByRole("tab", { name: "Profile" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Your name and photo.");

    await userEvent.click(screen.getByRole("tab", { name: "Billing" }));
    expect(onValueChange).toHaveBeenCalledWith("billing");
    expect(screen.getByRole("tabpanel", { name: "Billing" })).toHaveTextContent("invoices");
  });

  it("moves with the arrow keys and skips disabled tabs", async () => {
    render(<Settings />);
    screen.getByRole("tab", { name: "Profile" }).focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Billing" })).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Profile" })).toHaveFocus();
  });

  it("passes its look to the list and the tabs", () => {
    render(<Settings look="underline" />);
    expect(screen.getByRole("tablist")).toHaveAttribute("data-look", "underline");
    expect(screen.getByRole("tab", { name: "Billing" })).toHaveAttribute("data-look", "underline");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Settings />);
    await expectNoAxeViolations(container);
  });
});
