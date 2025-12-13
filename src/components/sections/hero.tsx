"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, Moon, Flame } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";

// ... (TODA LA CONFIGURACIÓN DE SECRET_MODES y MATRIXRAIN QUEDA IGUAL) ...
const SECRET_MODES = {
  default: { target: "", style: "" },
  ghost: { target: "LISTEN", style: "text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] font-serif" },
  hacker: { target: "TRUELIES", style: "text-green-500 font-mono tracking-widest drop-shadow-[0_0_15px_rgba(34,197,94,0.9)]" },
  blood: { target: "LUNA", style: "text-red-600 font-black tracking-tighter drop-shadow-[0_0_30px_rgba(220,38,38,1)]" },
  ritual: { target: "RITUAL", style: "text-neutral-400 font-serif tracking-[1em] uppercase" },
  play: { target: "PLAY", style: "text-green-400 font-bold tracking-widest drop-shadow-[0_0_20px_#4ade80]" },
  stop: { target: "STOP", style: "text-red-500 font-bold tracking-widest drop-shadow-[0_0_20px_#ef4444]" }
};

const MatrixRain = () => {
  const [columns, setColumns] = useState<number[]>([]);
  useEffect(() => { setColumns(Array.from({ length: 20 })); }, []);
  if (columns.length === 0) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-30 flex justify-between">
      {columns.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -1000 }}
          animate={{ y: 2000 }}
          transition={{ repeat: Infinity, duration: Math.random() * 5 + 5, ease: "linear", delay: Math.random() * 5 }}
          className="text-green-500 font-mono text-xs writing-vertical-lr leading-none opacity-50 select-none"
          style={{ writingMode: 'vertical-rl' }}
        >
          {Array.from({ length: 30 }).map(() => Math.round(Math.random())).join(" ")}
        </motion.div>
      ))}
    </div>
  );
};

const WordProgressDisplay = ({ target, current, onFocusInput }: any) => {
  if (!target) return <div className="h-12 mb-8 opacity-0">...</div>; 
  const slots = target.split("");
  return (
    <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        onClick={(e) => { e.stopPropagation(); onFocusInput(); }} 
        className="flex gap-3 sm:gap-4 mb-8 h-12 items-end justify-center z-50 relative cursor-text group"
    >
      {slots.map((char:string, i:number) => {
        const found = current[i]; 
        return (
          <div key={i} className="flex flex-col items-center gap-2 w-6 sm:w-10">
            <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={found ? { opacity: 1, scale: 1 } : { opacity: 0 }} className="text-xl sm:text-2xl font-mono text-purple-400 font-bold">{found || "_"}</motion.span>
            <div className={`w-full h-1 rounded transition-colors duration-300 ${found ? "bg-purple-500 shadow-[0_0_10px_#a855f7]" : "bg-white/10 group-hover:bg-white/30"}`} />
          </div>
        )
      })}
      <div className="absolute -right-8 bottom-2 text-white/20 animate-pulse md:hidden">
          <Keyboard size={16} />
      </div>
    </motion.div>
  );
};

export default function Hero() {
  const [mode, setMode] = useState('default'); 
  const [buffer, setBuffer] = useState("");         
  const [targetWord, setTargetWord] = useState(""); 
  const [shake, setShake] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  
  const [isRadioActive, setIsRadioActive] = useState(false);
  const [hasStartedOnce, setHasStartedOnce] = useState(false);
  
  const [glitchTrigger, setGlitchTrigger] = useState(false);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const startRadio = () => { setIsRadioActive(true); setHasStartedOnce(true); };
    
    const stopRadio = () => { 
        setIsRadioActive(false); 
        setMode('default'); 
        setBuffer("");      
        setTargetWord("");  
    };

    window.addEventListener('trigger-jules-radio', startRadio);
    window.addEventListener('trigger-jules-radio-stop', stopRadio);

    return () => {
      window.removeEventListener('trigger-jules-radio', startRadio);
      window.removeEventListener('trigger-jules-radio-stop', stopRadio);
    };
  }, []);

  // --- LÓGICA DEL RITMO DE GLITCH ---
  useEffect(() => {
    if (!isRadioActive) {
      setGlitchTrigger(false);
      return;
    }
    setGlitchTrigger(true);
    const initialTimeout = setTimeout(() => { setGlitchTrigger(false); }, 1200);
    const intervalId = setInterval(() => {
      setGlitchTrigger(true);
      setTimeout(() => { setGlitchTrigger(false); }, 400); 
    }, 5000);
    return () => { clearTimeout(initialTimeout); clearInterval(intervalId); };
  }, [isRadioActive]);

  useEffect(() => {
    if ((mode === 'play' || mode === 'stop') && showOverlay) {
      const timer = setTimeout(() => {
        setShowOverlay(false);
        setMode('default');
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [mode, showOverlay]);

  // --- FUNCIÓN "START SYSTEM" ---
  const handleSystemStart = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setHasStartedOnce(true);
    window.dispatchEvent(new CustomEvent('trigger-jules-radio'));
    setIsRadioActive(true);
    setShake(true);
    setMode('play'); 
    setTargetWord("PLAY");
    setBuffer("PLAY");

    setTimeout(() => { 
        setShake(false);
        setMode('default'); 
        setBuffer("");      
        setTargetWord("");  
    }, 1500);
  };

  // --- PROCESAMIENTO DE INPUT ---
  const processInput = (char: string) => {
    if (!/^[a-zA-Z]$/.test(char)) return;

    const upperChar = char.toUpperCase();
    let effectiveBuffer = buffer;
    let effectiveTarget = targetWord;

    if (mode !== 'default') {
      setMode('default');
      setShowOverlay(false);
      effectiveBuffer = ""; 
      effectiveTarget = "";
    }

    const nextCharIndex = effectiveBuffer.length;
    let currentTarget = effectiveTarget;
    
    if (effectiveBuffer === "") {
      const foundKey = Object.keys(SECRET_MODES).find(key => key !== 'default' && SECRET_MODES[key as keyof typeof SECRET_MODES].target.startsWith(upperChar));
      if (foundKey) {
        const wordToMatch = SECRET_MODES[foundKey as keyof typeof SECRET_MODES].target;
        currentTarget = wordToMatch;
        setTargetWord(wordToMatch);
      } else { 
        setBuffer("");
        setTargetWord("");
        return; 
      }
    }

    if (currentTarget && currentTarget[nextCharIndex] === upperChar) {
      const newBuffer = effectiveBuffer + upperChar;
      setBuffer(newBuffer); 
      
      if (newBuffer === currentTarget) {
        const winningModeKey = Object.keys(SECRET_MODES).find(key => key !== 'default' && SECRET_MODES[key as keyof typeof SECRET_MODES].target === currentTarget);
        
        if (winningModeKey) {
          if (winningModeKey === 'play') {
            window.dispatchEvent(new CustomEvent('trigger-jules-radio'));
            setHasStartedOnce(true); 
          }
          if (winningModeKey === 'stop') {
            window.dispatchEvent(new CustomEvent('trigger-jules-radio-stop'));
          }

          setTimeout(() => {
            setShake(true); 
            setMode(winningModeKey); 
            setTimeout(() => { setShake(false); setShowOverlay(true); setBuffer(""); setTargetWord(""); }, 600);
          }, 200);
        }
      }
    } else { 
        setBuffer(""); 
        setTargetWord(""); 
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMode('default'); setShowOverlay(false); }
      if (/^[a-zA-Z]$/.test(e.key) && !e.ctrlKey && !e.altKey && !e.metaKey) processInput(e.key);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, buffer, targetWord]);

  const handleMobileFocus = () => { hiddenInputRef.current?.focus(); };

  const handleHiddenInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.length > 0) {
        const lastChar = val.slice(-1);
        processInput(lastChar);
        e.target.value = "";
    }
  };

  const scrollTo = (id: string) => { 
      const element = document.querySelector(id);
      if (element) { element.scrollIntoView({ behavior: 'smooth' }); }
  };

  const navIcons = [
    { src: "/icons/music-icon.svg", label: "Música", id: "#releases" },
    { src: "/icons/projects-icon.svg", label: "Proyectos", id: "#projects" },
    { src: "/icons/cvr-icon.svg", label: "CVR", id: "#cosmic-vicar" }, 
    // CAMBIO 1: Bunker ahora es LOG
    { src: "/icons/bunker-icon.svg", label: "LOG", id: "#bunker" },
    // CAMBIO 2: Agregamos Contacto (Asegurate de tener un icono o repetí uno)
    { src: "/icons/mail-icon.svg", label: "CONTACT", id: "#contact" } 
  ];

  return (
    <motion.section 
        animate={shake ? { x: [-5, 5, -5, 5, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => { if(mode === 'default' && buffer.length === 0) handleMobileFocus() }}
        /* CAMBIO 1: Ajuste de padding-top (pt-24) para empujar todo un poco más abajo visualmente */
        className={`relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden transition-colors duration-1000 z-20 pt-24 md:pt-16
      ${mode === 'default' || mode === 'play' || mode === 'stop' ? '' : ''}
      ${mode === 'hacker' ? 'bg-black text-green-500 font-mono' : ''}
      ${mode === 'blood' ? 'bg-[#1a0505] text-red-400' : ''}
      ${mode === 'ritual' ? 'bg-gray-950 text-neutral-500 grayscale' : ''}
      ${mode === 'ghost' ? 'bg-[#0a0a0a] text-white' : ''}
      ${mode === 'stop' ? 'bg-black text-red-500' : ''}
    `}>
      
      <input ref={hiddenInputRef} type="text" className="opacity-0 absolute top-0 left-0 h-1 w-1 -z-10" onChange={handleHiddenInput} autoComplete="off" autoCorrect="off" autoCapitalize="none" />

      {/* --- OVERLAY DE INICIO --- */}
      <AnimatePresence>
        {!isRadioActive && !hasStartedOnce && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }} 
            className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-[2px]"
          >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSystemStart}
                className="group relative px-8 py-3 overflow-hidden border border-purple-500/50 rounded-sm bg-black/40 hover:bg-black/80 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
              >
                 <span className="relative z-10 font-mono text-purple-400 font-bold tracking-[0.2em] text-sm md:text-base animate-pulse group-hover:text-purple-300 transition-colors">
                   ▶ START SYSTEM
                 </span>
                 <div className="absolute inset-0 bg-purple-900/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showOverlay && mode === 'hacker' && <MatrixRain />}
        
        {showOverlay && mode === 'hacker' && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"><div className="bg-black border border-green-500 text-green-500 px-6 py-2 font-mono text-sm shadow-[0_0_20px_rgba(0,255,0,0.6)] animate-pulse">&gt; SYSTEM BREACH DETECTED.</div></motion.div>)}
        {showOverlay && mode === 'ghost' && (<motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-12 right-6 md:right-12 z-50 pointer-events-none"><div className="bg-zinc-900 border-4 border-zinc-700 rounded-xl p-4 shadow-2xl rotate-3"><span className="text-white font-mono text-[10px] block text-center bg-black/50 rounded px-2">PLAYING: GHOST_TRACK...</span></div><audio src="/ghost-track.mp3" autoPlay loop /></motion.div>)}
        {showOverlay && mode === 'blood' && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none bg-red-900/20"><Moon size={300} className="text-red-600 opacity-20 animate-pulse" /></motion.div>)}
        {showOverlay && mode === 'ritual' && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed bottom-0 inset-x-0 flex justify-center pb-20 gap-10 pointer-events-none"><Flame className="text-white w-20 h-20 animate-bounce opacity-50" /></motion.div>)}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onClick={(e) => { e.stopPropagation(); handleMobileFocus(); }} 
        className="relative z-50 w-full max-w-4xl mx-auto select-none px-4 flex justify-center mb-6 h-40 md:h-56 rounded-lg cursor-pointer group"
      >
        <div className="relative z-10 w-full h-full">
            <img 
              src="/logos/jvles-logo.png" 
              alt="JVLES Logo" 
              className="w-full h-full object-cover object-center filter brightness-110 contrast-125 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" 
            />
        </div>
        <div className={`absolute inset-0 z-20 pointer-events-none opacity-50 mix-blend-hard-light ${glitchTrigger ? "block glitch-layer-1" : "hidden"}`}>
            <img 
                src="/logos/jvles-logo.png" 
                alt="Glitch 1"
                className="w-full h-full object-cover object-center filter contrast-200 saturate-200 hue-rotate-90 translate-x-1" 
            />
        </div>
        <div className={`absolute inset-0 z-20 pointer-events-none opacity-50 mix-blend-hard-light ${glitchTrigger ? "block glitch-layer-2" : "hidden"}`}>
            <img 
                src="/logos/jvles-logo.png" 
                alt="Glitch 2"
                className="w-full h-full object-cover object-center filter contrast-200 saturate-200 hue-rotate-180 -translate-x-1" 
            />
        </div>
      </motion.div>

      {/* --- BOTÓN INLINE (START) --- */}
      {!isRadioActive && hasStartedOnce && (
          <motion.button 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSystemStart}
            className="mb-8 z-50 group relative px-6 py-2 overflow-hidden"
          >
             <span className="relative z-10 font-mono text-purple-400 font-bold tracking-[0.2em] text-sm md:text-base animate-pulse group-hover:text-purple-300 transition-colors">
               ▶ START SYSTEM
             </span>
             <div className="absolute inset-0 bg-purple-900/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </motion.button>
      )}

      {mode === 'default' && (<WordProgressDisplay target={targetWord} current={buffer} onFocusInput={handleMobileFocus} />)}
      {mode === 'play' && (<WordProgressDisplay target="PLAY" current="PLAY" onFocusInput={() => {}} />)}

      {mode !== 'default' && mode !== 'play' && <div className="h-12 mb-8 opacity-0"></div>}
      
      <motion.div 
        animate={{ 
            opacity: (mode === 'default' || mode === 'play' || mode === 'stop') ? 1 : 0.2, 
            filter: (mode === 'default' || mode === 'play' || mode === 'stop') ? 'blur(0px)' : 'blur(5px)' 
        }} 
        transition={{ duration: 0.5 }} 
        className="relative z-40 flex flex-col items-center max-w-4xl"
      >
          {/* Subtítulos */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-16 opacity-80">
            <span>Lo-fi Folk</span><span className="text-green-500 animate-pulse drop-shadow-[0_0_5px_rgba(34,197,94,1)]">•</span>
            <span>Electronic</span><span className="text-green-500 animate-pulse drop-shadow-[0_0_5px_rgba(34,197,94,1)]">•</span>
            <span>Ambient</span>
          </div>

          {/* Nav Icons: CAMBIO 2 - Quitamos el margen gigante de abajo (antes mb-32) para que todo el bloque baje */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-8">
            {navIcons.map((tool, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); scrollTo(tool.id); }} className="group flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer">
                <div className="relative w-7 h-7 transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:scale-125 filter group-hover:text-green-300 group-hover:sepia-[100%] group-hover:saturate-[1000%] group-hover:hue-rotate-[80deg] group-hover:drop-shadow-[0_0_25px_rgba(167,243,208,1)]">
                  <img src={tool.src} alt={tool.label} className="w-full h-full object-contain pointer-events-none" />
                </div>
                <span className="text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -bottom-6 whitespace-nowrap text-green-400 font-mono">{tool.label}</span>
              </button>
            ))}
          </div>
          
      </motion.div>
    </motion.section>
  );
}