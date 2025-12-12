"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Play, Pause } from "lucide-react";

// Enlaces del menú
const navItems = [
  { name: "Música", href: "#releases" },
  { name: "Proyectos", href: "#projects" },
  { name: "CVR", href: "#cosmic-vicar" },
  { name: "Bunker", href: "#bunker" },
];

// --- TU PLAYLIST CON BPM ---
const PLAYLIST = [
  { url: "/tracks/miraHaciaArriba.mp3", bpm: 129 }, 
  // { url: "/tracks/track-2.mp3", bpm: 85 }, 
  // { url: "/tracks/track-3.mp3", bpm: 140 }, 
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackName, setTrackName] = useState("");      
  const [displayedText, setDisplayedText] = useState(""); 
  
  const currentBpmRef = useRef(120);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- FUNCIÓN AUXILIAR: ENVIAR ESTADO A TODA LA APP ---
  const dispatchRadioEvent = (isPlaying: boolean, bpm: number) => {
    // 1. Evento para el fondo pulsante
    const eventState = new CustomEvent('radio-state-change', { 
        detail: { isPlaying, bpm } 
    });
    window.dispatchEvent(eventState);

    // 2. Eventos para el Glitch del Hero
    if (isPlaying) {
        window.dispatchEvent(new CustomEvent('trigger-jules-radio'));
    } else {
        window.dispatchEvent(new CustomEvent('trigger-jules-radio-stop'));
    }
  };

  // --- EFECTO MAQUINA DE ESCRIBIR ---
  useEffect(() => {
    if (!trackName) {
        setDisplayedText("");
        return;
    }

    setDisplayedText("");
    let currentIndex = 0;
    const typingSpeed = 150; 

    const typingInterval = setInterval(() => {
      setDisplayedText(trackName.slice(0, currentIndex + 1));
      currentIndex++;

      if (currentIndex >= trackName.length) {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [trackName]);

  const playRandomTrack = () => {
    if (!audioRef.current) return;
    
    const randomIndex = Math.floor(Math.random() * PLAYLIST.length);
    const selectedTrack = PLAYLIST[randomIndex];
    
    currentBpmRef.current = selectedTrack.bpm;

    const cleanName = selectedTrack.url.split('/').pop() || "unknown.mp3";
    setTrackName(cleanName); 

    audioRef.current.src = selectedTrack.url;
    audioRef.current.play().catch(e => console.error("Error playing:", e));
    
    setIsPlaying(true);
    dispatchRadioEvent(true, selectedTrack.bpm); 
  };

  const toggleRadio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      dispatchRadioEvent(false, currentBpmRef.current); 
    } else {
      if (!audioRef.current.src) {
        playRandomTrack(); 
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        dispatchRadioEvent(true, currentBpmRef.current); 
      }
    }
  };

  // --- MANEJO DE AUDIO Y EVENTOS REMOTOS (PLAY / STOP) ---
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = 0.5;

    const handleEnded = () => { playRandomTrack(); };
    
    // Handler para cuando escriben "PLAY" en consola
    const handleRemotePlay = () => {
      if (audioRef.current && audioRef.current.paused) {
        playRandomTrack();
      }
    };

    // Handler para cuando escriben "STOP" en consola (AGREGADO)
    const handleRemoteStop = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
        // Despachamos evento para sincronizar estados (BPM, Fondo, etc)
        // Nota: dispatchRadioEvent enviará 'trigger-jules-radio-stop' de nuevo, 
        // pero no pasa nada, es redundante pero seguro.
        const eventState = new CustomEvent('radio-state-change', { 
            detail: { isPlaying: false, bpm: currentBpmRef.current } 
        });
        window.dispatchEvent(eventState);
      }
    };

    audioRef.current.addEventListener('ended', handleEnded);
    
    // Escuchamos ambos eventos
    window.addEventListener('trigger-jules-radio', handleRemotePlay);
    window.addEventListener('trigger-jules-radio-stop', handleRemoteStop);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.removeEventListener('trigger-jules-radio', handleRemotePlay);
      window.removeEventListener('trigger-jules-radio-stop', handleRemoteStop);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const baseClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    scrolled ? "bg-black/95 backdrop-blur-md py-2 border-b border-white/5" : "bg-transparent py-4"
  }`;

  return (
    <header className={baseClass}>
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        
        {/* --- LOGO + RADIO + CONSOLA DOS --- */}
        <button 
          onClick={toggleRadio} 
          className="group flex items-center gap-4 outline-none text-left"
          title="JVLES Radio"
        >
          <div className="flex items-center gap-3">
            {/* LOGICA DE PARPADEO (Ya la tenías, la mantengo intacta) */}
            <div className={`transition-colors duration-300 ${
                isPlaying 
                    ? "text-green-500 drop-shadow-[0_0_8px_#4ade80]" // SONANDO: Verde Fijo
                    : "text-white/70 group-hover:text-green-500 animate-pulse" // PAUSA: Gris + Parpadeo
            }`}>
                {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            </div>

            <div className="relative h-6 w-auto md:h-7 transition-all duration-300 filter brightness-125 group-hover:sepia-[100%] group-hover:saturate-[1000%] group-hover:hue-rotate-[80deg] group-hover:scale-105">
                <img 
                src="/icons/jv-logo-icon.svg"
                alt="JV Logo"
                className="h-full w-full object-contain"
                />
            </div>
          </div>

          <AnimatePresence>
            {isPlaying && (
                <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="overflow-hidden whitespace-nowrap" 
                >
                    <div className="font-mono text-[10px] md:text-xs text-green-500 font-bold tracking-wider bg-green-500/5 px-2 py-1 rounded border border-green-500/20 shadow-[0_0_10px_rgba(74,222,128,0.1)] min-w-[120px]">
                        <span className="opacity-70">C:\jvmusic&gt;</span>
                        <span className="text-green-400">{displayedText}</span>
                        <span className="animate-pulse ml-1 inline-block bg-green-500 w-1.5 h-3 align-middle"></span>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>
          
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative font-mono text-xs uppercase tracking-[0.2em] text-white/70 hover:text-green-400 transition-colors duration-300
              after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-green-400 after:transition-all after:duration-300 hover:after:w-full after:shadow-[0_0_15px_#6ee7b7]"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white/70 hover:text-green-500 transition-colors">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 md:hidden"
          >
            <nav className="flex flex-col items-center py-8 gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-sm uppercase tracking-[0.2em] text-white/80 hover:text-green-400 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}