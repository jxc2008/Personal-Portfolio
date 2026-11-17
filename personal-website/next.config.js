/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enforces best practices in React
  swcMinify: true, // Enables faster builds with the SWC compiler
  // The old Projects and Passions pages were replaced by the regions.
  async redirects() {
    return [
      { source: "/professional", destination: "/#regions", permanent: true },
      { source: "/nonprofessional", destination: "/#regions", permanent: true },
    ];
  },
};

module.exports = nextConfig;
