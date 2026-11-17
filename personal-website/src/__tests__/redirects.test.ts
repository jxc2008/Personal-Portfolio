// The old Projects and Passions pages are gone; their URLs land on the regions.
const nextConfig = require("../../next.config.js");

describe("redirects", () => {
  it("sends the removed pages to the regions section", async () => {
    const redirects = await nextConfig.redirects();
    expect(redirects).toEqual([
      { source: "/professional", destination: "/#regions", permanent: true },
      { source: "/nonprofessional", destination: "/#regions", permanent: true },
    ]);
  });
});
