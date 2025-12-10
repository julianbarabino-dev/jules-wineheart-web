"use client";

import { secondaryReleases, links } from '@/lib/data';
import { Play, ShoppingBag, Disc, ExternalLink, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function Releases() {
  const [activeRelease, setActiveRelease] = useState<number | null>(null);

  const handleReleaseClick = (index: number) => {
    setActiveRelease(activeRelease === index ? null : index);
  };

  return (
    <section id="releases" className="py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-6 max-w-[1080px]">
        
        {/* CABECERA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <span className="text-purple-500 font-mono text-xs mb-2 block tracking-widest">01. DISCOGRAFÍA</span>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
              Lanzamientos
            </h2>
          </div>
          <a href={links.spotify} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest border-b border-transparent hover:border-white pb-1 flex items-center gap-2">
            Spotify <ExternalLink size={12}/>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* BLOODMOON (Principal) */}
            <div className="lg:col-span-1 group relative aspect-square md:aspect-[3/4] bg-white/5 border border-white/10 transition-all duration-500 overflow-hidden rounded-2xl flex flex-col backdrop-blur-md mb-8 lg:mb-0">
                <div className="absolute top-3 right-3 bg-purple-600 text-white text-[9px] font-black px-2 py-0.5 uppercase z-20 animate-pulse rounded-full shadow-lg">Nuevo</div>
                <div className="relative flex-1 overflow-hidden">
                    <img src="/fotos/bloodmoon-cover.jpg" alt="Bloodmoon" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                </div>
                <div className="p-6 flex flex-col justify-end relative z-10 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-3xl font-black text-white uppercase italic leading-none mb-2 drop-shadow-lg">BLOODMOON</h3>
                    <p className="text-purple-300 font-mono text-[10px] uppercase tracking-wider mb-6 font-bold">EP • 2025</p>
                    <div className="flex gap-2">
                        <button onClick={() => window.open(links.spotify)} className="flex-1 bg-white text-black py-3 text-[10px] font-bold uppercase hover:bg-purple-500 hover:text-white transition-colors flex items-center justify-center gap-1 rounded"><Play size={10} fill="currentColor"/> Stream</button>
                        <button onClick={() => window.open(links.bandcamp)} className="flex-1 border border-white/30 text-white py-3 text-[10px] font-bold uppercase hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-1 rounded"><ShoppingBag size={10}/> Buy</button>
                    </div>
                </div>
            </div>

            {/* LISTA SECUNDARIA */}
            <div className="lg:col-span-2 relative flex flex-col">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                     <Disc size={12} /> Archivo
                   </h3>
                </div>

                <div className="relative w-full">
                    <div className="flex overflow-x-auto snap-x gap-4 pb-4 scrollbar-hide relative z-10 pr-6 pl-1">
                        {secondaryReleases.map((release, index) => {
                            const isActive = activeRelease === index;
                            return (
                                <div key={index} onClick={(e) => { e.stopPropagation(); handleReleaseClick(index); }} className={`min-w-[150px] sm:min-w-[180px] snap-start shrink-0 relative flex flex-col transition-all duration-300 cursor-pointer ${isActive ? 'scale-100 z-20' : 'scale-95 opacity-80'}`}>
                                    <div className={`aspect-square relative rounded-xl overflow-hidden border transition-all duration-300 ${isActive ? (release.color || 'border-white') : 'border-white/10'}`}>
                                        <img src={release.img} alt={release.altText} className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isActive ? 'scale-105' : ''}`} />
                                        <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                                             <button onClick={(e) => { e.stopPropagation(); window.open(release.streamUrl); }} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform shadow-lg">
                                                <Play size={20} fill="currentColor" className="ml-1"/>
                                             </button>
                                        </div>
                                    </div>
                                    <div className={`mt-3 text-left transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                                        <h3 className="text-xs font-bold text-white leading-tight mb-1 truncate">{release.title}</h3>
                                        <p className={`${release.textColor} text-[9px] font-mono uppercase tracking-wider font-bold`}>{release.type}</p>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="w-4 shrink-0"></div>
                    </div>
                    {/* ELIMINADO EL DIV DEL DEGRADADO NEGRO AQUÍ */}
                </div>

                <div className="flex lg:hidden items-center justify-center gap-3 text-[10px] font-mono text-neutral-500 mt-2 animate-pulse opacity-80">
                     <ArrowLeft size={12} /> <span className="tracking-widest font-bold">DESLIZA</span> <ArrowRight size={12} />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}