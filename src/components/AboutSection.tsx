"use client";

import { m, Variants } from "framer-motion";
import Image from "next/image";

// PowerPoint-style fly-in transition presets
const flyInUp: Variants = {
  hidden: { opacity: 0, y: 150, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      type: "spring", 
      stiffness: 40, 
      damping: 20, 
      mass: 1,
      duration: 1.2 
    } 
  }
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export default function AboutSection() {
  return (
    <section 
      id="o-nama" 
      className="relative w-full min-h-screen bg-[#0a0a0a] text-[#f5f4f0] py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#7a8c3f]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4" />

      <m.div 
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        
        {/* Left Column: Images */}
        <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center">
          <m.div 
            variants={flyInUp}
            className="absolute top-0 left-0 w-3/4 h-3/4 rounded-sm overflow-hidden z-10 shadow-2xl"
          >
            <Image 
              src="/images/about_office.png" 
              alt="Arhitektonski projektni biro Vučković — Studio"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </m.div>

          <m.div 
            variants={{
              hidden: { opacity: 0, y: 100, x: 50, scale: 0.9 },
              visible: { 
                opacity: 1, y: 0, x: 0, scale: 1, 
                transition: { type: "spring", stiffness: 30, damping: 18, delay: 0.4 } 
              }
            } as Variants}
            className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-sm overflow-hidden z-20 shadow-2xl border-4 border-[#0a0a0a]"
          >
            <Image 
              src="/images/about_model.png" 
              alt="Architectural Model"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          </m.div>
        </div>

        {/* Right Column: Text Content */}
        <div className="flex flex-col justify-center">
          <m.div variants={flyInUp} className="mb-4">
            <h2 
              className="text-[#7a8c3f] uppercase tracking-[0.3em] text-xs md:text-sm font-semibold mb-4"
            >
              O nama
            </h2>
            <h3 
              className="font-light text-4xl md:text-5xl lg:text-6xl leading-tight mb-8"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Inženjerska preciznost i <span className="italic text-white/80">pravna stručnost</span> u jednom birou.
            </h3>
          </m.div>

          <m.p variants={flyInUp} className="text-white/60 text-base md:text-lg leading-relaxed mb-6 font-light">
            Arhitektonski projektni biro Vučković je studio sa sedištem u Novom Sadu, na čelu sa arhitektom i sudskim veštakom Duškom Vučkovićem. Biro je specijalizovan za sveobuhvatno arhitektonsko projektovanje, inženjerski nadzor, pravne procedure i stručna sudska veštačenja za stambene, poslovne i javne objekte.
          </m.p>

          <m.p variants={flyInUp} className="text-white/60 text-base md:text-lg leading-relaxed mb-10 font-light">
            Svakom projektu pristupamo kao jedinstvenom izazovu koji zahteva balans između estetike, energetske efikasnosti i tehničke tačnosti. Kao sertifikovani sudski veštak u oblasti visokogradnje, Duško Vučković pruža i sudske i vansudske procene vrednosti nekretnina i građevinskih radova.
          </m.p>

          <m.div variants={flyInUp}>
             <button className="group relative overflow-hidden rounded-full border border-white/20 bg-transparent px-8 py-3.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#f5f4f0] transition-colors hover:border-[#7a8c3f]">
                <span className="relative z-10 flex items-center gap-2">
                  Upoznajte tim
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
                <div className="absolute inset-0 z-0 bg-[#7a8c3f] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
             </button>
          </m.div>
        </div>

      </m.div>
    </section>
  );
}
