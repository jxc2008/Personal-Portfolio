import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NonProfessional from "../page";

jest.mock("next/link", () => {
  const MockLink = ({ children }: { children: React.ReactNode }) => children;
  MockLink.displayName = "Link";
  return MockLink;
});

describe("NonProfessional page", () => {
  it("renders a mailto link instead of a button for contact", () => {
    render(<NonProfessional />);
    const link = screen.getByRole("link", { name: /contact me/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "mailto:joseph.x.cheng@gmail.com");
  });

  it("does not render a button for contact", () => {
    render(<NonProfessional />);
    const buttons = screen.queryAllByRole("button", { name: /contact me/i });
    expect(buttons).toHaveLength(0);
  });
});
