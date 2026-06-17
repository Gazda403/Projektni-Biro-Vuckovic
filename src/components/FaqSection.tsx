"use client";

import { useState } from "react";
import { m, AnimatePresence, Variants } from "framer-motion";

const faqData = [
  {
    question: "Da li pružate usluge projektovanja i izvođenja (ključ u ruke)?",
    answer: "Da, OXO Arhitekti funkcionišu kao hibridni arhitektonski i inženjerski studio. Pored izrade kompletne tehničke dokumentacije, možemo preuzeti vođenje projekta na terenu kako bismo osigurali da je svaki detalj izveden tačno onako kako je projektovan.",
  },
  {
    question: "Koliko traje proces od idejnog rešenja do dobijanja građevinske dozvole?",
    answer: "Vremenski okvir zavisi od kompleksnosti projekta i lokalnih regulativa. Prosečno, faza idejnog rešenja traje 4-6 nedelja, dok proces ishodovanja dozvola može trajati dodatnih 2 do 4 meseca. Naš tim aktivno upravlja procedurama kako bi maksimizovao efikasnost.",
  },
  {
    question: "Da li radite projekte za klijente van Beograda i Srbije?",
    answer: "Apsolutno. Zahvaljujući modernim digitalnim alatima, uspešno vodimo i realizujemo projekte kako na teritoriji cele Srbije, tako i za internacionalne klijente, pružajući visok nivo komunikacije i detaljne dokumentacije koja olakšava lokalno izvođenje.",
  },
];

const sectionFade: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
  },
};

const lineFade: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const headerTextReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } 
  },
};

const accordionVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: { 
    height: "auto", 
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] }
  },
  exit: { 
    height: 0, 
    opacity: 0,
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] }
  }
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <m.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={sectionFade}
      className="w-full bg-[#E2D6CC] text-[#0B0B0B] py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-[1920px] mx-auto w-full">
        {/* Section Header */}
        <div className="w-full mb-16 md:mb-24">
          <m.div
            variants={lineFade}
            className="h-[1px] bg-[#0B0B0B]/20 mb-6 md:mb-8 origin-left w-full"
          />
          <div className="flex justify-between items-start md:items-center font-semibold tracking-wide w-full">
            <m.h2
              variants={headerTextReveal}
              className="text-sm md:text-base tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              ČESTO POSTAVLJANA PITANJA
            </m.h2>
            <m.span
              variants={headerTextReveal}
              className="text-base md:text-lg tracking-[0.3em] uppercase opacity-80"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              06
            </m.span>
          </div>
        </div>

        {/* Desktop 2-column Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Left Column (Metadata) - 35% */}
          <div className="lg:w-[35%]">
            <div className="sticky top-32">
              <p className="text-xl md:text-2xl lg:text-3xl font-light leading-snug tracking-tight text-[#0B0B0B]/80" style={{ fontFamily: "var(--font-inter)" }}>
                Sveobuhvatna inženjerska i arhitektonska podrška od ideje do realizacije.
              </p>
            </div>
          </div>

          {/* Right Column (Accordion) - 65% */}
          <div className="lg:w-[65%] flex flex-col w-full">
            {faqData.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className="border-b border-[#0B0B0B]/20"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full py-8 flex justify-between items-center text-left focus:outline-none"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="text-lg md:text-xl lg:text-2xl font-medium tracking-tight pr-8">
                      {faq.question}
                    </h3>
                    <div className="relative w-6 h-6 flex-shrink-0 flex items-center justify-center">
                      {/* Plus / X Icon */}
                      <m.div
                        initial={false}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                        className="w-full h-full relative"
                      >
                        <span className="absolute top-1/2 left-0 w-full h-[2px] bg-[#0B0B0B] -translate-y-1/2" />
                        <m.span 
                          initial={false}
                          animate={{ opacity: isOpen ? 0 : 1, rotate: isOpen ? 90 : 90 }}
                          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                          className="absolute top-1/2 left-0 w-full h-[2px] bg-[#0B0B0B] -translate-y-1/2 rotate-90" 
                        />
                      </m.div>
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        id={`faq-answer-${index}`}
                        variants={accordionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="overflow-hidden"
                      >
                        <div className="pb-8 text-base md:text-lg text-[#0B0B0B]/70 leading-relaxed max-w-3xl" style={{ fontFamily: "var(--font-inter)" }}>
                          {faq.answer}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </m.section>
  );
}
