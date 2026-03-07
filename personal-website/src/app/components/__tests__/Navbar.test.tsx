import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../Navbar";
import { NavbarProvider } from "../NavbarContext";

// Mock react-icons/fa
jest.mock("react-icons/fa", () => ({
  FaSun: () => <span data-testid="icon-sun">sun</span>,
  FaMoon: () => <span data-testid="icon-moon">moon</span>,
  FaBars: () => <span data-testid="icon-bars">bars</span>,
  FaTimes: () => <span data-testid="icon-times">times</span>,
}));

function renderNavbar() {
  return render(
    <NavbarProvider>
      <Navbar />
    </NavbarProvider>
  );
}

describe("Navbar dark mode toggle", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders a theme toggle button", () => {
    renderNavbar();
    expect(
      screen.getByRole("button", { name: /switch to dark mode/i })
    ).toBeInTheDocument();
  });

  it("shows moon icon when in light mode", () => {
    renderNavbar();
    expect(screen.getByTestId("icon-moon")).toBeInTheDocument();
  });

  it("shows sun icon when in dark mode", () => {
    localStorage.setItem("theme", "dark");
    renderNavbar();
    expect(screen.getByTestId("icon-sun")).toBeInTheDocument();
  });

  it("toggles from light to dark on click", () => {
    renderNavbar();
    const btn = screen.getByRole("button", { name: /switch to dark mode/i });
    act(() => {
      btn.click();
    });
    expect(screen.getByTestId("icon-sun")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /switch to light mode/i })
    ).toBeInTheDocument();
  });

  it("toggles from dark to light on click", () => {
    localStorage.setItem("theme", "dark");
    renderNavbar();
    const btn = screen.getByRole("button", { name: /switch to light mode/i });
    act(() => {
      btn.click();
    });
    expect(screen.getByTestId("icon-moon")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /switch to dark mode/i })
    ).toBeInTheDocument();
  });

  it("renders nav links alongside the toggle", () => {
    renderNavbar();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Professional")).toBeInTheDocument();
    expect(screen.getByText("Non-Professional")).toBeInTheDocument();
  });
});

describe("Navbar hamburger menu", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders a hamburger button with toggle navigation label", () => {
    renderNavbar();
    expect(
      screen.getByRole("button", { name: /toggle navigation/i })
    ).toBeInTheDocument();
  });

  it("shows FaBars icon when nav is hidden", () => {
    renderNavbar();
    expect(screen.getByTestId("icon-bars")).toBeInTheDocument();
  });

  it("shows FaTimes icon when nav is visible after click", () => {
    renderNavbar();
    const hamburger = screen.getByRole("button", { name: /toggle navigation/i });
    act(() => {
      hamburger.click();
    });
    expect(screen.getByTestId("icon-times")).toBeInTheDocument();
  });

  it("toggles nav visibility on click", () => {
    renderNavbar();
    const hamburger = screen.getByRole("button", { name: /toggle navigation/i });

    // Click to open
    act(() => {
      hamburger.click();
    });
    expect(screen.getByTestId("icon-times")).toBeInTheDocument();

    // Click to close
    act(() => {
      hamburger.click();
    });
    expect(screen.getByTestId("icon-bars")).toBeInTheDocument();
  });
});
