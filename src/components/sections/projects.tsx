"use client";

import { useState, useRef } from 'react';
import { projects } from '@/lib/data';
import { Play, Award, ChevronRight } from 'lucide-react';

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollPosition = container.scrollLeft;
      const itemWidth = container.children[0].clientWidth;
      const index = Math.round(scrollPosition / itemWidth);
      setActiveIndex(index);
    }
  };

  const scrollToProject = (index: number) => {
    if (scrollRef.current) {
        const container = scrollRef.current;
        const itemWidth = container.children[0].clientWidth;
        container.scrollTo({
            left: index * (itemWidth + 24), 
            behavior: 'smooth'
        });
    }
  };

  return (
    <section id="projects" className="py-32 relative z-10 overflow-hidden">
        
        <div className="container mx-auto px-6 max-w-[1080px] mb-12 flex justify-between items-end">
            <div>
                <span className="text-blue-500 font-mono text-xs mb-2 block tracking-widest">02. PORTFOLIO</span>
                <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter">Proyectos</h2>
            </div>
            <div className="hidden md:block font-mono text-xs text-neutral-500">
                <span className="text-white">0{activeIndex + 1}</span> / 0{projects.length}
            </div>
        </div>

        <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-8 w-full no-scrollbar md:px-[calc((100vw-1080px)/2+1.5rem)]"
        >
            {projects.map((project, index) => {
                // Verificamos si esta es la tarjeta activa
                const isActive = activeIndex === index;

                return (
                    <div 
                        key={project.id} 
                        className={`
                            relative flex-none w-[85vw] md:w-[450px] snap-center
                            group rounded-2xl bg-white/5 backdrop-blur-md 
                            overflow-hidden flex flex-col transition-all duration-500
                            
                            /* LÓGICA DEL GLOW Y BORDE AUTOMÁTICO */
                            /* Si es la activa (isActive), le damos el borde fuerte y el glow intenso */
                            /* Si NO es la activa, tiene un borde suave y un glow mínimo */
                            
                            ${isActive 
                                ? '!border-purple-500/60 shadow-[0_0_30px_rgba(168,85,247,0.4)] opacity-100 scale-100' 
                                : '!border-purple-500/10 shadow-[0_0_10px_rgba(168,85,247,0.1)] opacity-50 scale-95 md:opacity-100 md:scale-100'}
                            
                            /* Mantenemos el hover para desktop por si acaso */
                            hover:!border-purple-500/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]
                            
                            !border
                            ${project.style}
                        `}
                    >
                        <div className="relative aspect-[16/9] w-full bg-neutral-900/50 overflow-hidden">
                            <img 
                                src={project.imgId} 
                                alt={project.title} 
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                            />
                            <div className="absolute inset-0 flex items-center justify-center z-[-1]">
                                <project.icon size={40} className="text-white/10" />
                            </div>
                            {project.tag && (
                                <div className="absolute top-3 right-3 z-20">
                                    <span className={`border border-purple-500/20 text-[9px] font-black px-2 py-1 uppercase flex items-center gap-1 shadow-lg rounded backdrop-blur-md ${project.tagStyle}`}>
                                        <Award size={10} /> {project.tag}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="p-6 flex flex-col flex-1 border-t border-purple-500/10 bg-transparent">
                            <h3 className="text-2xl font-black text-white uppercase italic mb-3 tracking-tight">{project.title}</h3>
                            <p className="text-neutral-300 text-xs leading-relaxed mb-6 flex-1">
                                {project.desc}
                            </p>
                            {project.btn && (
                                <button 
                                    onClick={() => window.open(project.btn.link)} 
                                    className="w-full py-3 bg-white/5 hover:bg-purple-500/10 text-white border border-white/10 hover:border-purple-500/30 text-[10px] uppercase font-bold tracking-widest transition-all duration-300 rounded flex items-center justify-center gap-2"
                                >
                                    <Play size={10} fill="currentColor" /> {project.btn.text}
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
            <div className="w-6 shrink-0" />
        </div>

        {/* CONTROLES DE NAVEGACIÓN (AZULES) */}
        <div className="container mx-auto px-6 max-w-[1080px] mt-4 flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-2">
                {projects.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => scrollToProject(i)}
                        className={`
                            h-1.5 rounded-sm transition-all duration-300 
                            ${activeIndex === i 
                                ? 'w-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' 
                                : 'w-2 bg-white/10 hover:bg-blue-500/30'}
                        `}
                        aria-label={`Ir al proyecto ${i + 1}`}
                    />
                ))}
            </div>
            <div className="md:hidden flex items-center justify-center text-blue-500/40 animate-pulse filter drop-shadow-[0_0_5px_rgba(59,130,246,0.4)]">
                <ChevronRight size={14} className="-mr-2 opacity-50" />
                <ChevronRight size={14} className="-mr-2 opacity-75" />
                <ChevronRight size={14} />
            </div>
        </div>

        <style jsx global>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
    </section>
  );
}
