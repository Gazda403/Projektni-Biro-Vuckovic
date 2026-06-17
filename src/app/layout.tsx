import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OXO Arhitekti | Gde se inženjerstvo susreće sa savremenim dizajnom",
  description:
    "OXO Arhitekti — premium architectural studio based in Belgrade, Palilula. Founded 2009. Engineering meets contemporary design.",
  keywords: ["arhitektura", "dizajn", "Beograd", "OXO Arhitekti", "projektovanje"],
  openGraph: {
    title: "OXO Arhitekti",
    description: "Gde se inženjerstvo susreće sa savremenim dizajnom",
    type: "website",
    locale: "sr_RS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sr" className={`${inter.variable} ${cormorant.variable} ${orbitron.variable} antialiased`}>
      <body className="flex flex-col bg-[#0a0a0a] text-[#f5f4f0] overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
