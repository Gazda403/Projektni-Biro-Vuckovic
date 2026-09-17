import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Chakra_Petch } from "next/font/google";
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

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arhitektonski projektni biro Vučković | Projektovanje, nadzor i veštačenje — Novi Sad",
  description:
    "Arhitektonski projektni biro Vučković — specijalizovani studio za arhitektonsko projektovanje, sudsko i vansudsko veštačenje, energetsku efikasnost i legalizaciju objekata. Novi Sad, Srbija.",
  keywords: ["arhitektura", "projektovanje", "Novi Sad", "Vučković", "veštačenje", "legalizacija", "energetski pasoš", "nadzor"],
  openGraph: {
    title: "Arhitektonski projektni biro Vučković",
    description: "Projektovanje, nadzor i veštačenje — Novi Sad, Srbija",
    type: "website",
    locale: "sr_RS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sr" className={`${inter.variable} ${cormorant.variable} ${chakra.variable} antialiased`}>
      <body className="flex flex-col bg-[#0a0a0a] text-[#f5f4f0] overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
