"use client";

import React, { useRef, useState, useEffect } from 'react';
import { m, Variants } from 'framer-motion';
import { Star } from 'lucide-react';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ana Jovanović",
    role: "CEO, TechNova",
    content: "OXO Arhitekti su transformisali naš prostor. Njihov pristup detaljima i posvećenost funkcionalnosti su besprekorni.",
    avatar: "https://picsum.photos/100/100?random=11"
  },
  {
    id: 2,
    name: "Marko Nikolić",
    role: "Investitor",
    content: "Izuzetan nivo profesionalizma od prvog nacrta do finalne izvedbe. Preporučujemo ih svima koji traže vrhunski dizajn.",
    avatar: "https://picsum.photos/100/100?random=12"
  },
  {
    id: 3,
    name: "Jovana Kostić",
    role: "Menadžer projekta",
    content: "Hibridni pristup inženjeringa i arhitekture učinio je naš projekat ne samo prelepim, već i strukturno superiornim.",
    avatar: "https://picsum.photos/100/100?random=13"
  },
  {
    id: 4,
    name: "Milan Petrović",
    role: "Preduzetnik",
    content: "Kombinacija moderne estetike i održivosti. Naš novi poslovni prostor je pravo remek-delo zahvaljujući OXO timu.",
    avatar: "https://picsum.photos/100/100?random=14"
  },
  {
    id: 5,
    name: "Stefan Đorđević",
    role: "Razvojni inženjer",
    content: "Efikasnost u procesu dobijanja dozvola i vođenje gradilišta su nam uštedeli mesece rada. Pravi partneri u gradnji.",
    avatar: "https://picsum.photos/100/100?random=15"
  },
  {
    id: 6,
    name: "Elena Savić",
    role: "Klijent",
    content: "Preciznost, transparentnost i izvanredna komunikacija. Uživali smo u svakom koraku procesa dizajniranja naše vile.",
    avatar: "https://picsum.photos/100/100?random=16"
  },
  {
    id: 7,
    name: "Dragan Ilić",
    role: "Direktor",
    content: "Vizija koju OXO Arhitekti donose je neuporediva. Uspeli su da spoje luksuz i toplinu u našem stambenom kompleksu.",
    avatar: "https://picsum.photos/100/100?random=17"
  },
  {
    id: 8,
    name: "Nataša Vuković",
    role: "Dizajner enterijera",
    content: "Impresionirani smo brzinom i kvalitetom 3D vizualizacija koje su nam pomogle da razumemo svaki detalj pre početka radova.",
    avatar: "https://picsum.photos/100/100?random=18"
  },
  {
    id: 9,
    name: "Filip Pavlović",
    role: "Građevinski inženjer",
    content: "Njihova sposobnost da odgovore na najkompleksnije inženjerske zahteve bez ugrožavanja estetike je zaista retka.",
    avatar: "https://picsum.photos/100/100?random=19"
  },
  {
    id: 10,
    name: "Katarina Ristić",
    role: "Hotelijer",
    content: "Partnerstvo sa OXO Arhitektima je najbolja odluka koju smo doneli za naš hotel. Dizajn je postao naš zaštitni znak.",
    avatar: "https://picsum.photos/100/100?random=20"
  }
];

const loopedTestimonials = [...testimonials, ...testimonials];

const CARD_WIDTH = 400;
const CARD_GAP = 24;
// Track width for exactly one set of items
const TRACK_WIDTH = (CARD_WIDTH + CARD_GAP) * testimonials.length;

const TestimonialCard: React.FC<{ t: Testimonial }> = ({ t }) => (
  <div
    className="flex-shrink-0 bg-[#161616] p-8 rounded-2xl border border-white/5 shadow-md hover:border-white/20 transition-all duration-300 cursor-grab active:cursor-grabbing group"
    style={{ width: CARD_WIDTH }}
  >
    <div className="flex gap-1 mb-6">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={16} className="fill-[#E2D6CC] text-[#E2D6CC] opacity-80 group-hover:opacity-100 transition-opacity" />
      ))}
    </div>
    <p className="text-white/80 italic mb-8 leading-relaxed text-lg font-light" style={{ fontFamily: "var(--font-inter)" }}>"{t.content}"</p>
    <div className="flex items-center gap-4">
      <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-white/20" />
      <div>
        <h5 className="font-semibold text-white text-base tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>{t.name}</h5>
        <p className="text-sm text-white/50 tracking-wide mt-1" style={{ fontFamily: "var(--font-inter)" }}>{t.role}</p>
      </div>
    </div>
  </div>
);

const headerFade: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
  },
};

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 md:py-32 bg-[#0B0B0B] overflow-hidden border-t border-white/10">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 mb-16 md:mb-24">
        <m.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={headerFade}
          className="flex flex-col items-center text-center w-full"
        >
          <span className="text-xs md:text-sm tracking-[0.32em] uppercase text-white/40 mb-6 font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
            Šta Klijenti Kažu
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight max-w-3xl" style={{ fontFamily: "var(--font-inter)" }}>
            Poverenje izgrađeno kroz vrhunski kvalitet i posvećenost.
          </h2>
        </m.div>
      </div>

      {/* Carousel */}
      <div className="relative w-full">
        {/* Left/Right Fades */}
        <div className="absolute left-0 top-0 h-full w-24 md:w-48 bg-gradient-to-r from-[#0B0B0B] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-24 md:w-48 bg-gradient-to-l from-[#0B0B0B] to-transparent z-10 pointer-events-none" />

        <m.div
          className="flex"
          style={{ gap: CARD_GAP, paddingLeft: CARD_GAP, paddingRight: CARD_GAP }}
          animate={{ x: [0, -TRACK_WIDTH] }}
          transition={{
            ease: "linear",
            duration: 40,
            repeat: Infinity,
          }}
          // @ts-ignore
          whileHover={{ animationPlayState: "paused" }}
          drag="x"
          dragConstraints={{ left: -TRACK_WIDTH, right: 0 }}
          whileDrag={{ animationPlayState: "paused" } as any}
        >
          {loopedTestimonials.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} />
          ))}
        </m.div>
      </div>
    </section>
  );
}
