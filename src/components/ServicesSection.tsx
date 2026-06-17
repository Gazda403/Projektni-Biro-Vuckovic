"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, Variants } from "framer-motion";

const services = [
  {
    id: "02.1",
    title: "Projektovanje i Dizajn",
    description: "Arhitektonsko projektovanje, idejna rešenja, i unutrašnji dizajn prilagođen najvišim estetskim standardima.",
  },
  {
    id: "02.2",
    title: "Inženjerske Delatnosti",
    description: "Detaljna tehnička dokumentacija, precizni proračuni i statika koja osigurava dugovečnost objekata.",
  },
  {
    id: "02.3",
    title: "Tehničko Savetovanje",
    description: "Stručni nadzor, inženjerski konsalting i kompletno upravljanje projektima od prve skice do ključa u ruke.",
  }
];

// Staggered container for the service items
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    }
  }
};

// Item reveal animation (sliding up from hidden crop)
const itemVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { 
    y: "0%",
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 18,
      mass: 1
    }
  }
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Create a parallax scroll effect (floating up faster than regular scroll)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // The parallax effect creates the "Scroll Lift" feeling
  const yParallax = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <m.section
      ref={sectionRef}
      id="usluge"
      className="relative w-full bg-[#E2D6CC] text-[#0B0B0B] py-24 md:py-32 px-6 md:px-12 lg:px-24 z-30 shadow-[0_-20px_40px_rgba(0,0,0,0.3)]"
      // Added a negative top margin to create the overlapping stacking effect on the previous section
      style={{ marginTop: "-5vh" }}
    >
      <m.div style={{ y: yParallax }} className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Header Section */}
        <div className="relative w-full">
          {/* Header Line Reveal */}
          <m.div 
            className="h-[1px] bg-[#0B0B0B]/30 mb-4 md:mb-8 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          />
          
          <div className="flex justify-between items-baseline">
            <div className="overflow-hidden pb-2">
              <m.h2 
                className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.2 }}
              >
                Naše Usluge
              </m.h2>
            </div>
            <div className="overflow-hidden pb-2">
              <m.span 
                className="text-4xl md:text-6xl lg:text-8xl font-light tracking-widest"
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.3 }}
              >
                02
              </m.span>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <m.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16 pt-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <div key={service.id} className="flex flex-col gap-4 md:gap-6 group">
              {/* Index Number */}
              <div className="overflow-hidden">
                <m.span 
                  variants={itemVariants}
                  className="block text-sm md:text-base font-semibold tracking-widest text-[#0B0B0B]/60"
                >
                  {service.id}
                </m.span>
              </div>

              {/* Title */}
              <div className="overflow-hidden py-1">
                <m.h3 
                  variants={itemVariants}
                  className="text-2xl md:text-2xl lg:text-3xl font-extrabold tracking-tight uppercase leading-snug"
                  style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                >
                  {service.title}
                </m.h3>
              </div>

              {/* Description */}
              <div className="overflow-hidden">
                <m.p 
                  variants={itemVariants}
                  className="text-base md:text-lg text-[#0B0B0B]/80 font-medium leading-relaxed"
                >
                  {service.description}
                </m.p>
              </div>

              {/* Link / Button */}
              <div className="overflow-hidden mt-4 md:mt-auto pt-2">
                <m.a 
                  href="#" 
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 text-sm md:text-base font-bold uppercase tracking-widest transition-all duration-300 hover:text-[#7a8c3f]"
                >
                  <span className="border-b-2 border-[#0B0B0B] group-hover:border-[#7a8c3f] pb-0.5 transition-colors">
                    Saznajte više
                  </span>
                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-2">→</span>
                </m.a>
              </div>
            </div>
          ))}
        </m.div>
        
      </m.div>
    </m.section>
  );
}
