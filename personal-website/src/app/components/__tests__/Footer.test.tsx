import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../Footer";
import { getRegion, type Region } from "@/regions";

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

  it("uses the site's colours outside the regions", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).not.toHaveAttribute("data-region");
    expect(footer.getAttribute("style")).toBeNull();
  });

  it("takes a region's page colours on that region's page", () => {
    const ridge = getRegion("valorant-ridge") as Region;
    render(<Footer region={ridge} />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveAttribute("data-region", "valorant-ridge");
    expect(footer.style.getPropertyValue("--pl-paper")).toBe(ridge.palette.light.paper);
    expect(footer.style.getPropertyValue("--pd-ink")).toBe(ridge.palette.dark.ink);
  });
});
