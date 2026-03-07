import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../Footer";

describe("Footer", () => {
  it("renders the current year dynamically", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument();
  });

  it("renders copyright and author name", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveTextContent("Joseph Cheng");
    expect(footer).toHaveTextContent("All rights reserved.");
  });
});
