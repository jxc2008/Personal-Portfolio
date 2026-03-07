import "./globals.css";
import LayoutClient from "./components/LayoutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Joseph Cheng | CS & Math @ NYU",
  description:
    "Personal portfolio of Joseph Cheng — CS and Mathematics student at NYU. Projects in physics simulation, quant trading, and calculus education.",
  openGraph: {
    title: "Joseph Cheng",
    description: "Personal portfolio of Joseph Cheng",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
