import { fadeInUp, staggerContainer, cardReveal } from "../animations";

describe("fadeInUp", () => {
  it("has correct hidden state", () => {
    expect(fadeInUp.hidden).toEqual({ opacity: 0, y: 30 });
  });

  it("has correct visible state with transition", () => {
    expect(fadeInUp.visible).toEqual({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    });
  });
});

describe("staggerContainer", () => {
  it("has empty hidden state", () => {
    expect(staggerContainer.hidden).toEqual({});
  });

  it("staggers children by 0.15s", () => {
    expect(staggerContainer.visible).toEqual({
      transition: { staggerChildren: 0.15 },
    });
  });
});

describe("cardReveal", () => {
  it("has correct hidden state with scale", () => {
    expect(cardReveal.hidden).toEqual({ opacity: 0, y: 40, scale: 0.97 });
  });

  it("has correct visible state with transition", () => {
    expect(cardReveal.visible).toEqual({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 },
    });
  });
});
