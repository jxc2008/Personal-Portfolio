import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useTheme, useNavbarContext, NavbarProvider } from "../NavbarContext";

function DarkModeDisplay() {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <div>
      <span data-testid="dark-mode">{darkMode ? "dark" : "light"}</span>
      <button onClick={toggleDarkMode}>toggle</button>
    </div>
  );
}

function NavbarContextDisplay() {
  const { darkMode } = useNavbarContext();
  return (
    <div>
      <span data-testid="ctx-dark">{darkMode ? "dark" : "light"}</span>
    </div>
  );
}

describe("NavbarProvider / useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("initializes darkMode as false when localStorage has no theme", () => {
    render(
      <NavbarProvider>
        <DarkModeDisplay />
      </NavbarProvider>
    );
    expect(screen.getByTestId("dark-mode")).toHaveTextContent("light");
  });

  it("initializes darkMode as true when localStorage theme is 'dark'", () => {
    localStorage.setItem("theme", "dark");
    render(
      <NavbarProvider>
        <DarkModeDisplay />
      </NavbarProvider>
    );
    expect(screen.getByTestId("dark-mode")).toHaveTextContent("dark");
  });

  it("toggleDarkMode switches darkMode from false to true", () => {
    render(
      <NavbarProvider>
        <DarkModeDisplay />
      </NavbarProvider>
    );
    act(() => {
      screen.getByRole("button", { name: "toggle" }).click();
    });
    expect(screen.getByTestId("dark-mode")).toHaveTextContent("dark");
  });

  it("toggleDarkMode switches darkMode from true to false", () => {
    localStorage.setItem("theme", "dark");
    render(
      <NavbarProvider>
        <DarkModeDisplay />
      </NavbarProvider>
    );
    act(() => {
      screen.getByRole("button", { name: "toggle" }).click();
    });
    expect(screen.getByTestId("dark-mode")).toHaveTextContent("light");
  });

  it("persists 'dark' to localStorage when darkMode is toggled on", () => {
    render(
      <NavbarProvider>
        <DarkModeDisplay />
      </NavbarProvider>
    );
    act(() => {
      screen.getByRole("button", { name: "toggle" }).click();
    });
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("persists 'light' to localStorage when darkMode is toggled off", () => {
    localStorage.setItem("theme", "dark");
    render(
      <NavbarProvider>
        <DarkModeDisplay />
      </NavbarProvider>
    );
    act(() => {
      screen.getByRole("button", { name: "toggle" }).click();
    });
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("useTheme and useNavbarContext both expose context values", () => {
    render(
      <NavbarProvider>
        <DarkModeDisplay />
        <NavbarContextDisplay />
      </NavbarProvider>
    );
    expect(screen.getByTestId("dark-mode")).toBeInTheDocument();
    expect(screen.getByTestId("ctx-dark")).toBeInTheDocument();
  });
});
