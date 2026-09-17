"use client";

import { useEffect, useRef, useState } from "react";
import { m, useScroll, useMotionValueEvent } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavLink {
  label: string;
  href: string;
}

// ─── Config ───────────────────────────────────────────────────────────────────
const NAV_LINKS: NavLink[] = [
  { label: "O nama",   href: "#o-nama"   },
  { label: "Projekti", href: "#projekti" },
  { label: "Usluge",   href: "#usluge"   },
  { label: "Kontakt",  href: "#kontakt"  },
];

const PHONE = "064/201 4809";

// ─── OXO Logo Mark ────────────────────────────────────────────────────────────
function OxoLogo() {
  return (
    <a href="/" aria-label="Arhitektonski projektni biro Vučković — početna" className="flex items-center gap-2 group">
      {/* Geometric diamond mark */}
      <svg
        width="28" height="28" viewBox="0 0 28 28"
        fill="none" aria-hidden="true"
        className="transition-transform duration-500 group-hover:rotate-45"
      >
        <rect
          x="6" y="6" width="16" height="16"
          transform="rotate(45 14 14)"
          stroke="#f5f4f0" strokeWidth="1.5"
        />
        <rect
          x="9" y="9" width="10" height="10"
          transform="rotate(45 14 14)"
          fill="#f5f4f0" fillOpacity="0.12"
          stroke="#f5f4f0" strokeWidth="0.75"
        />
      </svg>
      <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#f5f4f0] leading-none select-none">
        VUČKOVIĆ<br />
        <span className="font-light tracking-[0.32em] text-[9px]">ARHITEKTI</span>
      </span>
    </a>
  );
}

// ─── Navbar Component ─────────────────────────────────────────────────────────
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 40);
  });

  return (
    <m.header
      id="navbar"
      role="banner"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? "navbar-glass" : "bg-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.1 }}
    >
      <div className="mx-auto max-w-[1680px] px-6 md:px-10 lg:px-16 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <OxoLogo />

        {/* Desktop Centre Nav */}
        <nav
          aria-label="Primarna navigacija"
          className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-[11px] font-medium tracking-[0.18em] uppercase text-[#f5f4f0]/70 hover:text-[#f5f4f0] transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#f5f4f0] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right — Phone Badge */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+381642014809"
            aria-label={`Pozovite nas: ${PHONE}`}
            className="group flex items-center gap-2.5 rounded-full border border-[#f5f4f0]/20 px-4 py-2 hover:border-[#f5f4f0]/60 hover:bg-[#f5f4f0]/5 transition-all duration-300"
          >
            {/* Pulse dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7a8c3f] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7a8c3f]" />
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#f5f4f0]/70 group-hover:text-[#f5f4f0] transition-colors duration-300">
              {PHONE}
            </span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-toggle"
          aria-label="Otvori meni"
          aria-expanded={mobileOpen}
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className={`block h-px w-6 bg-[#f5f4f0] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-px w-6 bg-[#f5f4f0] transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-[#f5f4f0] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <m.div
        initial={false}
        animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="md:hidden overflow-hidden navbar-glass"
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-[13px] font-medium tracking-[0.14em] uppercase text-[#f5f4f0]/70 hover:text-[#f5f4f0] py-3 border-b border-[#f5f4f0]/8 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${PHONE.replace(/\s/g, "")}`}
            className="text-[11px] font-mono tracking-widest text-[#7a8c3f] mt-3 pb-2"
          >
            {PHONE}
          </a>
        </nav>
      </m.div>
    </m.header>
  );
}
