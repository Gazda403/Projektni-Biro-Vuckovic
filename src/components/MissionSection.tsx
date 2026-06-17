"use client";

import { m, Variants } from "framer-motion";

// ─── Animation Variants ───────────────────────────────────────────────────────

const nasaReveal: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { type: "spring", stiffness: 130, damping: 18, delay: 0.05 },
  },
};

const misijaReveal: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { type: "spring", stiffness: 130, damping: 18, delay: 0.18 },
  },
};

const copyFade: Variants = {
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 70, damping: 18, delay: 0.5 },
  },
};

const headerNumberReveal: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: { type: "spring", stiffness: 60, damping: 20, delay: 0.2 },
  },
};

export default function MissionSection() {
  return (
    <m.section
      id="nasa-misija"
      className="relative w-full min-h-[90vh] md:min-h-screen overflow-hidden bg-[#0B0B0B] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/nasa-misija-bg.png')",
        backgroundAttachment: "fixed",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >

      {/* ── LEFT GLASSMORPHISM PANEL ─────────────────────────────────────── */}
      {/* Sits over the left ~45% with true backdrop-blur */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 z-10"
        style={{ width: "clamp(260px, 45%, 640px)" }}
      >
        {/* Hard glass block */}
        <div
          className="absolute inset-0"
          style={{
            background: "rgba(10, 10, 10, 0.12)",
            backdropFilter: "blur(24px) saturate(140%)",
            WebkitBackdropFilter: "blur(24px) saturate(140%)",
          }}
        />
        {/* Soft right feather so the edge blends into the photo */}
        <div
          className="absolute inset-y-0 right-0 w-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(10,10,10,0) 0%, rgba(10,10,10,0.12) 100%)",
            backdropFilter: "none",
          }}
        />
      </div>

      {/* ── CONTENT LAYER (above glass + image) ─────────────────────────── */}
      <div className="relative z-20 flex flex-col justify-between min-h-[90vh] md:min-h-screen px-6 md:px-12 lg:px-24 py-24 md:py-32">

        {/* Section Editorial Header — matching ServicesSection / ProjectsSection */}
        <div className="w-full">
          <div className="flex justify-end items-baseline">
            <div className="overflow-hidden pb-2">
              <m.span
                variants={headerNumberReveal}
                className="text-4xl md:text-6xl lg:text-8xl font-light tracking-widest text-white/80"
              >
                04
              </m.span>
            </div>
          </div>
        </div>

        {/* ── GIANT SPLIT TITLE ──────────────────────────────────────────── */}
        {/* The title is positioned absolutely to span edge-to-edge */}
        <div className="flex-1 flex items-center -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24">
          <div className="w-full">
            {/* Row 1: NAŠA — positioned over the glass panel side */}
            <div className="overflow-hidden">
              <m.h2
                variants={nasaReveal}
                className="block leading-none font-black uppercase tracking-tighter transform-gpu will-change-transform bg-cover bg-center bg-no-repeat text-transparent"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(4.5rem, 13vw, 12rem)",
                  backgroundImage: "url('/images/nasa-misija-bg.png')",
                  backgroundAttachment: "fixed",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                Naša
              </m.h2>
            </div>

            {/* Row 2: MISIJA — shifts right to cross into the clear image side */}
            <div className="overflow-hidden">
              <m.span
                variants={misijaReveal}
                className="block leading-none font-black uppercase tracking-tighter text-white transform-gpu will-change-transform"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(4.5rem, 13vw, 12rem)",
                  /* Push it so it starts around the glass boundary and bleeds right */
                  paddingLeft: "clamp(0px, 18vw, 240px)",
                  textShadow: "0 2px 40px rgba(0,0,0,0.35)",
                }}
              >
                Misija
              </m.span>
            </div>
          </div>
        </div>

        {/* ── BOTTOM ROW: editorial copy (anchored to left panel) ────────── */}
        <div
          className="flex flex-col gap-5"
          style={{ maxWidth: "clamp(260px, 38%, 480px)" }}
        >
          {/* Index badge */}
          <m.span
            variants={copyFade}
            className="text-[10px] font-bold tracking-[0.35em] uppercase text-white/40"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            04 — OXO Arhitekti
          </m.span>

          {/* Mission statement */}
          <m.p
            variants={copyFade}
            className="text-base md:text-lg font-light leading-relaxed text-white/80"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Gradimo prostore koji ne samo da izgledaju izuzetno, već funkcionišu
            savršeno — kroz preciznost inženjera i osećaj umetnika. Svaki projekat
            je naša posvećenost trajnoj lepoti i funkcionalnosti.
          </m.p>

          {/* CTA */}
          <m.a
            variants={copyFade}
            href="#o-nama"
            className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.25em] uppercase text-white/50 hover:text-[#7a8c3f] transition-colors duration-300 group mt-2"
          >
            <span className="border-b border-white/25 group-hover:border-[#7a8c3f] pb-px transition-colors duration-300">
              Upoznajte studio
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </m.a>
        </div>

      </div>
    </m.section>
  );
}
