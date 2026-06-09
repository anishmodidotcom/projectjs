import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jaynasippy.com"),
  title: "Jayna Sippy — Brand Consultant, Marketer & Founder",
  description:
    "Brand consultant, marketer and founder of Drive Me Social. I build brands, I travel light, and I take people with me. Based in Dubai and Mumbai.",
  openGraph: {
    title: "Jayna Sippy — Brand Consultant, Marketer & Founder",
    description:
      "Brand consultant, marketer and founder of Drive Me Social. I build brands, I travel light, and I take people with me. Based in Dubai and Mumbai.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hankenGrotesk.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
