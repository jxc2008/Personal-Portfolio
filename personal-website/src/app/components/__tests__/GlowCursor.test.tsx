import { fireEvent, render } from "@testing-library/react";
import GlowCursor from "../GlowCursor";

describe("GlowCursor", () => {
  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation((q: string) => ({ matches: false, media: q }));
  });

  it("hides over regions marked data-glow-cursor=off and comes back elsewhere", () => {
    const { container } = render(
      <>
        <GlowCursor />
        <section data-glow-cursor="off">
          <span data-testid="inside">hero</span>
        </section>
        <div data-testid="outside">below</div>
      </>,
    );
    const [dot, glow] = Array.from(container.children).slice(0, 2) as HTMLElement[];
    const inside = container.querySelector('[data-testid="inside"]')!;
    const outside = container.querySelector('[data-testid="outside"]')!;

    fireEvent.mouseMove(inside, { clientX: 10, clientY: 10 });
    expect(dot.className).toMatch(/suppressed/);
    expect(glow.className).toMatch(/suppressed/);

    fireEvent.mouseMove(outside, { clientX: 10, clientY: 900 });
    expect(dot.className).not.toMatch(/suppressed/);
    expect(glow.className).not.toMatch(/suppressed/);
  });

  it("re-checks on scroll, when content moves under a still pointer", () => {
    const { container } = render(
      <>
        <GlowCursor />
        <section data-glow-cursor="off" data-testid="hero" />
        <div data-testid="below" />
      </>,
    );
    const [dot] = Array.from(container.children) as HTMLElement[];
    const hero = container.querySelector('[data-testid="hero"]')!;
    const below = container.querySelector('[data-testid="below"]')!;

    fireEvent.mouseMove(hero, { clientX: 20, clientY: 20 });
    expect(dot.className).toMatch(/suppressed/);

    document.elementFromPoint = jest.fn(() => below);
    fireEvent.scroll(window);
    expect(dot.className).not.toMatch(/suppressed/);
  });
});
