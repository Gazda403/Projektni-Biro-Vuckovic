"use client";

import { m } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: "01",
    title: "STAMBENO-POSLOVNA ZGRADA",
    description: "Stambeno-poslovna zgrada u Beogradu — kompletna projektna dokumentacija i nadzor.",
    image: "/images/projekat-beograd.jpg",
    delay: 0.1
  },
  {
    id: "02",
    title: "KUĆA PORODICE VUKOJEVIĆ",
    description: "Kuća porodice Vukojević — idejni i glavni projekat sa unutrašnjim uređenjem.",
    image: "/images/projekat-kuca-vukojevic.jpg",
    delay: 0.25
  },
  {
    id: "03",
    title: "POZORIŠTE & MTS POSLOVNA ZGRADA",
    description: "Dogradnja pozorišta i poslovna zgrada MTS-a — kompleksno inženjersko rešenje.",
    image: "/images/projekat-pozoriste-mts.jpg",
    delay: 0.4
  }
];

export default function ProjectsSection() {
  return (
    <m.section
      id="projekti"
      className="relative w-full bg-[#0B0B0B] text-[#f5f4f0] py-24 md:py-32 px-6 md:px-12 lg:px-24 z-40"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Brutalist Sector Divider Header */}
        <div className="relative w-full">
          <m.div 
            className="h-[1px] bg-white/20 mb-6 md:mb-8 origin-left"
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
                transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.1 }}
              >
                Izabrani Projekti
              </m.h2>
            </div>
            <div className="overflow-hidden pb-2">
              <m.span 
                className="text-4xl md:text-6xl lg:text-8xl font-light tracking-widest text-white/80"
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.2 }}
              >
                03
              </m.span>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {projects.map((project) => (
            <m.div 
              key={project.id}
              className="flex flex-col group cursor-pointer"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 60, damping: 20, delay: project.delay }}
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#1a1a1a] mb-6 rounded-sm">
                <m.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                >
                  <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </m.div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-3">
                <span className="text-4xl md:text-5xl font-light tracking-widest text-white/40" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                  {project.id}
                </span>
                
                <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight relative inline-block w-fit group-hover:text-[#7a8c3f] transition-colors duration-300" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                  {project.title}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#7a8c3f] group-hover:w-full transition-all duration-500 ease-[0.25,1,0.5,1]" />
                </h3>
                
                <p className="text-sm md:text-base text-white/50 font-medium leading-relaxed mt-1">
                  {project.description}
                </p>
              </div>
            </m.div>
          ))}
        </div>

      </div>
    </m.section>
  );
}
