"use client";

import { m, Variants } from "framer-motion";

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 70, damping: 18, delay },
  }),
};

const lineReveal: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { type: "spring", stiffness: 50, damping: 15 },
  },
};

export default function ContactSection() {
  return (
    <m.section
      id="kontakt"
      className="relative w-full bg-[#E2D6CC] text-[#0B0B0B] py-24 md:py-36 px-6 md:px-12 lg:px-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-20">

        {/* Section Header */}
        <div className="relative w-full">
          <m.div
            variants={lineReveal}
            className="h-[1px] bg-[#0B0B0B]/30 mb-6 md:mb-8 origin-left"
          />
          <div className="flex justify-between items-baseline">
            <div className="overflow-hidden pb-2">
              <m.h2
                variants={itemVariants}
                custom={0.1}
                className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Kontaktirajte Nas
              </m.h2>
            </div>
            <div className="overflow-hidden pb-2">
              <m.span
                variants={itemVariants}
                custom={0.2}
                className="text-4xl md:text-6xl lg:text-8xl font-light tracking-widest"
              >
                05
              </m.span>
            </div>
          </div>
        </div>

        {/* Content Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left: Big CTA Text & Address */}
          <m.div variants={itemVariants} custom={0.25} className="flex flex-col gap-10">
            <p
              className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Razgovarajmo o Vašem projektu — od idejnog rešenja do ključa u ruke.
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#0B0B0B]/50 block mb-2">
                  Adresa
                </span>
                <p className="text-lg font-medium text-[#0B0B0B] leading-relaxed">
                  Ive Lole Ribara 53<br />
                  21208 Sremska Kamenica, Novi Sad
                </p>
              </div>
              <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-sm border border-[#0B0B0B]/10">
                <iframe 
                  src="https://maps.google.com/maps?q=Ive+Lole+Ribara+53%2C+21208+Sremska+Kamenica%2C+Srbija&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </m.div>

          {/* Right: Contact Details */}
          <m.div variants={itemVariants} custom={0.4} className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#0B0B0B]/50">
                Email
              </span>
              <a
                href="mailto:duskovuckovic@gmail.com"
                className="group inline-flex items-center gap-3 text-[#0B0B0B]"
              >
                <span
                  className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight border-b-2 border-[#0B0B0B] pb-1 group-hover:border-[#7a8c3f] group-hover:text-[#7a8c3f] transition-all duration-400"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  duskovuckovic@gmail.com
                </span>
                <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">→</span>
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#0B0B0B]/50">
                Telefon
              </span>
              <a
                href="tel:+381642014809"
                className="text-lg font-medium text-[#0B0B0B] hover:text-[#7a8c3f] transition-colors duration-300"
              >
                064/201 4809
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#0B0B0B]/50">
                Radno Vreme
              </span>
              <p className="text-lg font-medium text-[#0B0B0B] leading-relaxed">
                Pon – Pet: 09:00 – 17:00
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-8 pt-4 border-t border-[#0B0B0B]/15">
              {["Instagram", "LinkedIn", "Houzz"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-xs font-bold tracking-[0.2em] uppercase text-[#0B0B0B]/50 hover:text-[#0B0B0B] transition-colors duration-300"
                >
                  {platform}
                </a>
              ))}
            </div>
          </m.div>
        </div>

      </div>
    </m.section>
  );
}
