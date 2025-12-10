"use client";

import { projects } from '@/lib/data';
import { Play, Award, Gamepad2, Film, MonitorPlay } from 'lucide-react';
import { useState } from 'react';

export default function Projects() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const handleProjectClick = (id: string) => {
    setActiveProject(activeProject === id ? null : id);
  };

  return (
    <section id="projects" className="py-32 relative z-10 border-t border-white/5 bg-[#080808]">
        <div className="container mx-auto px-6 max-w-[1080px]">
            <div className="mb-12">
                <span className="text-blue-500 font-mono text-xs mb-2 block tracking-widest">02. PORTFOLIO</span>
                <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter">Proyectos</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => (
                    <div 
                        key={project.id} 
                        onClick={(e) => { e.stopPropagation(); handleProjectClick(project.id); }}
                        className={`group rounded-2xl bg-[#0a0a0a] border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col ${project.style} ${activeProject === project.id ? 'border-opacity-100 shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'border-white/10'}`}
                    >
                        <div className="relative aspect-[16/9] w-full bg-neutral-900 overflow-hidden">
                            <img 
                                src={project.imgId} 
                                alt={project.title} 
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
                            />
                            <div className="absolute inset-0 flex items-center justify-center z-[-1]">
                                {/* Icono placeholder si no carga la imagen */}
                                <project.icon size={40} className="text-white/20" />
                            </div>
                            
                            {project.tag && (
                                <div className="absolute top-3 right-3 z-20">
                                    <span className={`border text-[9px] font-black px-2 py-0.5 uppercase flex items-center gap-1 shadow-lg rounded ${project.tagStyle}`}>
                                        <Award size={8} /> {project.tag}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="p-6 bg-neutral-900/50 border-t border-white/5 flex flex-col justify-center min-h-[100px] transition-colors group-hover:bg-neutral-900">
                            <h3 className="text-xl font-black text-white uppercase italic mb-1">{project.title}</h3>
                            
                            <div className={`overflow-hidden transition-all duration-500 ease-out ${activeProject === project.id ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-2'}`}>
                                <p className="text-neutral-400 text-xs leading-relaxed">
                                    {project.desc}
                                </p>
                                {project.btn && (
                                    <button onClick={() => window.open(project.btn.link)} className="mt-3 flex items-center gap-2 text-white text-[10px] uppercase font-bold tracking-widest hover:text-green-400 transition-colors">
                                        <Play size={10} fill="currentColor"/> {project.btn.text}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}
