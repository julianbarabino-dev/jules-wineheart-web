"use client";

import { Play, Headphones, ChevronDown, Guitar, Laptop, Book, Keyboard, Terminal, Moon, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// --- CONFIGURACIÓN DE HERRAMIENTAS ---
const creativeTools = [
  { icon: Guitar, section: "#releases", label: "Música" },
  { icon: Laptop, section: "#projects", label: "Proyectos" },
  { icon: Book, section: "#diary", label: "Sound Diary" },
  { icon: Keyboard, section: "#cosmic", label: "Cosmic Vicar" },
  { icon: Terminal, section: "#bunker", label: "Bunker" },
];

// --- COMPONENTE: TÍTULO INTERACTIVO ---
const DraggableTitle = ({ mode }: { mode: string }) => {
  const constraintsRef = useRef(null);

  // Configuración visual de cada palabra secreta
  const configs: Record<string, { text: string; color: string }> = {
    default: { text: "JULES WINEHEART", color: "text-foreground" },
    ghost:   { text: "LISTEN",          color: "text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" },
    hacker:  { text: "TRUE LIES",       color: "text-green-500 font-code tracking-widest" },
    blood:   { text: "LUNA",            color: "text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]" },
    ritual:  { text: "RITUAL",          color: "text-neutral-400 font-serif tracking-[1em]" },
  };

  const current = configs[mode] || configs.default;
  const letters = current.text.split("");

  return (
    <div className="relative z-50 mb-12">
      {/* Área invisible para restringir el arrastre */}
      <motion.div className="absolute inset-0 w-full h-full pointer-events-none" ref={constraintsRef} />
      
      <AnimatePresence mode="wait">
        <motion.h1
          key={mode} // Clave única para forzar la re-renderización al cambiar de modo
          className={`text-6xl sm:text-7xl md:text-9xl font-black font-headline leading-none select-none flex flex-wrap justify-center gap-1 ${current.color}`}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ 
            opacity: 0, 
            y: 50, 
            rotateX: 90, 
            filter: "blur(20px)",
            transition: { duration: 0.5 } 
          }}
        >
          {letters.map((char, index) => {
            if (char === " ") return <span key={index} className="w-4 md:w-8" />;
            
            // Animación de "sacudida" para los modos secretos
            const isSecret = mode !== 'default';
            const shake = isSecret ? {
              x: [0, -2, 2, -1, 1, 0],
              y: [0, 1, -1, 0],
              transition: { repeat: Infinity, duration: 0.2 + Math.random() * 0.3 }
            } : {};

            return (
              <motion.span
                key={`${mode}-${index}`}
                drag={!isSecret} // Solo se puede arrastrar en modo normal
                dragConstraints={constraintsRef}
                dragElastic={0.2}
                whileHover={!isSecret ? { scale: 1.2, color: "#a855f7", rotate: Math.random() * 15 - 7.5 } : {}}
                whileTap={{ scale: 0.9, cursor: "grabbing" }}
                animate={shake}
                className={`inline-block ${!isSecret ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
              >
                {char}
              </motion.span>
            );
          })}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};


const Hero = () => {
    const [mode, setMode] = useState('default'); // default, ghost, hacker, blood, ritual
    const [inputBuffer, setInputBuffer] = useState('');

  // Lógica de detección de teclado (Cheat Codes)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMode('default');
        setInputBuffer('');
        return;
      }

      // Solo letras
      if (/^[a-zA-Z]$/.test(e.key)) {
        const char = e.key.toUpperCase();
        setInputBuffer(prev => {
          const newBuffer = (prev + char).slice(-10); // Guardamos las últimas 10 letras
          
          // DETECTAR PALABRAS CLAVE
          if (newBuffer.endsWith('LISTEN')) setMode('ghost');
          else if (newBuffer.endsWith('TRUELIES')) setMode('hacker');
          else if (newBuffer.endsWith('LUNA')) setMode('blood');
          else if (newBuffer.endsWith('RITUAL')) setMode('ritual');
          
          return newBuffer;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 z-10 overflow-hidden">
        
      {/* --- EFECTOS DE FONDO (Capas Overlay) --- */}
      <AnimatePresence>
        
        {/* MODO HACKER: Matriz Verde */}
        {mode === 'hacker' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-black border border-green-500 text-green-500 px-4 py-2 font-mono text-sm shadow-[0_0_20px_rgba(0,255,0,0.5)]">
              &gt; SYSTEM BREACH DETECTED.
            </div>
          </motion.div>
        )}

        {/* MODO GHOST: Casete Flotante + Audio */}
        {mode === 'ghost' && (
          <motion.div
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 right-8 z-50"
          >
            {/* Casete CSS */}
            <div className="w-64 h-40 bg-zinc-900 border-4 border-zinc-700 rounded-xl p-3 shadow-2xl relative">
              <div className="w-full h-full border border-zinc-800 rounded bg-zinc-950 flex items-center justify-center gap-6">
                <div className="w-12 h-12 rounded-full border-4 border-zinc-700 bg-black animate-[spin_3s_linear_infinite]" />
                <div className="w-12 h-12 rounded-full border-4 border-zinc-700 bg-black animate-[spin_3s_linear_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-10 border-t-2 border-b-2 border-zinc-800/50" />
              </div>
              <div className="absolute bottom-4 left-0 w-full text-center">
                <span className="text-[10px] font-mono text-white/50 bg-black/50 px-2 py-1 rounded">PLAYING_GHOST_TRACK.MP3</span>
              </div>
            </div>
            {/* Reproductor de Audio (Asegúrate que el archivo esté en public/) */}
            <audio src="/ghost-track.mp3" autoPlay loop />
          </motion.div>
        )}

        {/* MODO BLOOD: Luna Roja */}
        {mode === 'blood' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
             <div className="w-[500px] h-[500px] bg-red-600 rounded-full blur-[150px] opacity-20 animate-pulse"></div>
             <Moon className="absolute text-red-500 w-96 h-96 opacity-10" />
          </motion.div>
        )}

        {/* MODO RITUAL: Fuego */}
        {mode === 'ritual' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed bottom-0 inset-x-0 h-64 bg-gradient-to-t from-gray-900 to-transparent z-0 flex justify-center items-end pb-10 gap-10">
             <Flame className="text-white w-12 h-12 animate-bounce opacity-50" />
             <Flame className="text-white w-16 h-16 animate-bounce opacity-80" style={{ animationDelay: '0.1s' }} />
             <Flame className="text-white w-12 h-12 animate-bounce opacity-50" style={{ animationDelay: '0.2s' }} />
          </motion.div>
        )}

      </AnimatePresence>

      <DraggableTitle mode={mode} />

      <motion.div 
        animate={{ opacity: mode === 'default' ? 1 : 0, visibility: mode === 'default' ? 'visible' : 'hidden' }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-muted-foreground font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-8">
            <span>Lo-fi Folk</span>
            <span className="hidden md:inline text-primary">•</span>
            <span>Electronic</span>
            <span className="hidden md:inline text-primary">•</span>
            <span>Ambient</span>
        </div>

        <div className="relative z-10 flex items-center justify-center space-x-6 my-4">
            {creativeTools.map((tool, index) => (
                <button
                    key={index}
                    onClick={() => scrollToSection(tool.section)}
                    title={tool.label}
                    className="text-muted-foreground hover:text-accent hover:-translate-y-1 transition-all duration-300"
                    >
                    <tool.icon size={20} />
                </button>
            ))}
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <Button
                onClick={() => scrollToSection('#releases')}
                size="lg"
                className="group relative px-8 py-4 bg-primary-foreground text-background font-black uppercase tracking-wider overflow-hidden hover:scale-105 transition-transform duration-300 hover:bg-primary hover:text-primary-foreground"
            >
                <Play size={16} fill="currentColor" /> Bloodmoon EP
            </Button>

            <Button
                onClick={() => scrollToSection('#cosmic')}
                variant="outline"
                size="lg"
                className="px-8 py-4 font-bold uppercase tracking-wider hover:bg-foreground/5 transition-colors backdrop-blur-sm"
            >
                <Headphones size={16} /> Productora
            </Button>
        </div>
      </motion.div>

      <div className="absolute bottom-12 animate-bounce text-muted-foreground/50 z-10">
        <ChevronDown size={24} />
      </div>
    </section>
  );
};

export default Hero;
