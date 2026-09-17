"use client";

import { m } from "framer-motion";

const navLinks = [
  { label: "O Nama", href: "#o-nama" },
  { label: "Usluge", href: "#usluge" },
  { label: "Projekti", href: "#projekti" },
  { label: "Misija", href: "#nasa-misija" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#0B0B0B] text-[#f5f4f0] px-6 md:px-12 lg:px-24 pt-16 pb-10">
      
      <m.div
        className="max-w-7xl mx-auto flex flex-col gap-16"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      >

        {/* Top Row: Brand + Nav */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">

          {/* Brand wordmark */}
          <div className="flex flex-col gap-3">
            <span
              className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-[#f5f4f0]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Vučković Arhitekti
            </span>
            <p className="text-sm text-white/40 font-light max-w-xs leading-relaxed">
              Projektovanje, sudsko veštačenje i nadzor. Novi Sad, Srbija.
            </p>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap gap-x-10 gap-y-4" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold tracking-[0.22em] uppercase text-white/50 hover:text-[#7a8c3f] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-white/10" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-white/25 tracking-wide">
            © {year} Arhitektonski projektni biro Vučković — Sva prava zadržana.
          </p>
          <p className="text-xs text-white/20 tracking-widest uppercase">
            Novi Sad · Srbija
          </p>
        </div>

      </m.div>
    </footer>
  );
}
