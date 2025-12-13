"use client";

import { projects } from '@/lib/data';
import { Play, Award } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative z-10 overflow-hidden">
        {/* Encabezado (Alineado al centro) */}
        <div className="container mx-auto px-6 max-w-[1080px] mb-12">
            <span className="text-blue-500 font-mono text-xs mb-2 block tracking-widest">02. PORTFOLIO</span>
            <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter">Proyectos</h2>
        </div>

        {/* CONTENEDOR DEL CARRUSEL 
            - flex: pone los items en fila.
            - overflow-x-auto: permite scroll horizontal.
            - snap-x: activa el magnetismo.
            - no-scrollbar: clase custom para ocultar la barra.
        */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-12 w-full no-scrollbar md:px-[calc((100vw-1080px)/2+1.5rem)]">
            {projects.map((project) => (
                <div 
                    key={project.id} 
                    // CAMBIO DE TAMAÑO:
                    // - w-[85vw]: En celular ocupa el 85% de la pantalla (se ve un poco del siguiente).
                    // - md:w-[450px]: En PC tiene un tamaño fijo y prolijo.
                    // - flex-none: Evita que se aplasten.
                    // - snap-center: Se centra al soltar.
                    className={`
                        relative flex-none w-[85vw] md:w-[450px] snap-center
                        group rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 
                        overflow-hidden flex flex-col transition-all duration-300 
                        hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] 
                        ${project.style}
                    `}
                >
                    {/* IMAGEN DEL PROYECTO */}
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
                                <span className={`border text-[9px] font-black px-2 py-1 uppercase flex items-center gap-1 shadow-lg rounded backdrop-blur-md ${project.tagStyle}`}>
                                    <Award size={10} /> {project.tag}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* INFO */}
                    <div className="p-6 flex flex-col flex-1 border-t border-white/5 bg-transparent">
                        <h3 className="text-2xl font-black text-white uppercase italic mb-3 tracking-tight">{project.title}</h3>
                        
                        <p className="text-neutral-300 text-xs leading-relaxed mb-6 flex-1">
                            {project.desc}
                        </p>

                        {project.btn && (
                            <button 
                                onClick={() => window.open(project.btn.link)} 
                                className="w-full py-3 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 hover:border-transparent text-[10px] uppercase font-bold tracking-widest transition-all duration-300 rounded flex items-center justify-center gap-2"
                            >
                                <Play size={10} fill="currentColor" /> {project.btn.text}
                            </button>
                        )}
                    </div>
                </div>
            ))}
            
            {/* Espaciador final para que la última tarjeta no quede pegada al borde derecho */}
            <div className="w-6 shrink-0" />
        </div>

        {/* Estilos CSS locales para ocultar la barra de scroll (funciona en Chrome, Safari y Firefox) */}
        <style jsx global>{`
            .no-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
        `}</style>
    </section>
  );
}
