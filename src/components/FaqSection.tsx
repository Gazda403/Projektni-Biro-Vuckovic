"use client";

import { useState } from "react";
import { m, AnimatePresence, Variants } from "framer-motion";

const faqData = [
  {
    question: "Da li pru\u017eate usluge sudskog i vansudskog ve\u0161ta\u010denja?",
    answer: "Da. Du\u0161ko Vu\u010dkovi\u0107 je sertifikovani sudski vesta\u010d u oblasti visokogradnje i pru\u017ea sudska i vansudska ve\u0161ta\u010denja za gra\u0111evinske sporove, procenu tr\u017ei\u0161ne i gra\u0111evinske vrednosti nekretnina, kao i studije opravdanosti ulaganja.",
  },
  {
    question: "Koliko traje proces legalizacije (ozakonjenja) objekta?",
    answer: "Rok zavisi od vrste objekta i lokalnih organa, ali u proseku postupak traje od 3 do 6 meseci. Na\u0161 biro priprema svu potrebnu dokumentaciju i aktivno prati proceduru kako bi se rok maksimalno skratio.",
  },
  {
    question: "Da li radite na energetskim elaboratima i energetskim paso\u0161ima?",
    answer: "Apsolutno. Izra\u0111ujemo energetske elaborate i energetske paso\u0161e za stambene i poslovne objekte, u skladu sa va\u017ee\u0107im propisima. Ovaj dokument je obavezan pri prodaji nekretnine i ishode\u0107ivanju upotrebne dozvole.",
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
                Kompletna arhitektonska, pravna i tehnička podrška — od projektovanja do legalizacije i sudskog veštačenja.
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
