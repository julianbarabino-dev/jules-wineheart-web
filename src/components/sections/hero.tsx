"use client";

import { Play, Headphones, ChevronDown, Guitar, Laptop, Book, Keyboard, Terminal, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useRef, useState, useEffect } from "react";

const creativeTools = [
  { icon: Guitar, section: "#releases", tooltip: "Música" },
  { icon: Laptop, section: "#projects", tooltip: "Proyectos" },
  { icon: Book, section: "#diary", tooltip: "Sound Diary" },
  { icon: Keyboard, section: "#cosmic", tooltip: "Cosmic Vicar" },
  { icon: Terminal, section: "#bunker", tooltip: "Bunker" },
];

const DraggableTitle = ({ text, mode }: { text: string, mode: 'default' | 'ghost' | 'hacker' }) => {
  const constraintsRef = useRef(null);
  let displayText = text;
  let animationProps = {};
  
  if (mode === 'ghost') {
    displayText = 'LISTEN';
    animationProps = {
      animate: { scale: [1, 1.05, 1], transition: { duration: 1, repeat: Infinity } }
    };
  } else if (mode === 'hacker') {
    displayText = 'TRUE LIES';
    animationProps = {
      animate: { 
        x: [-2, 2, -2, 2, 0], 
        y: [2, -2, 2, -2, 0],
        rotate: [-1, 1, -1, 1, 0],
        transition: { duration: 0.2, repeat: Infinity }
      }
    };
  }

  return (
    <>
      <motion.div className="w-full h-full absolute" ref={constraintsRef} />
      <h1 className="relative z-50 text-6xl sm:text-7xl md:text-9xl font-black font-headline text-foreground tracking-tighter mb-6 leading-none select-none">
        {displayText.split("").map((char, index) => {
          if (char === " ") {
            return <span key={index} className="inline-block w-4 md:w-6"></span>;
          }
          return (
            <motion.span
              key={index}
              drag={mode === 'default'}
              dragConstraints={constraintsRef}
              dragElastic={0.1}
              whileHover={{ scale: 1.2, color: "#a855f7", rotate: Math.random() * 20 - 10 }}
              whileTap={{ scale: 0.9, cursor: "grabbing" }}
              className="inline-block cursor-grab"
              {...animationProps}
            >
              {char}
            </motion.span>
          );
        })}
      </h1>
    </>
  );
};


const Hero = () => {
  const [ghostMode, setGhostMode] = useState(false);
  const [hackerMode, setHackerMode] = useState(false);
  const [keySequence, setKeySequence] = useState('');

  const GHOST_CODE = 'LISTEN';
  const HACKER_CODE = 'TRUELIES';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setGhostMode(false);
        setHackerMode(false);
        setKeySequence('');
        return;
      }
      
      const newSequence = (keySequence + e.key.toUpperCase()).slice(-HACKER_CODE.length);
      setKeySequence(newSequence);
      
      if (newSequence.endsWith(GHOST_CODE)) {
        setHackerMode(false);
        setGhostMode(true);
      }
      
      if (newSequence.endsWith(HACKER_CODE)) {
        setGhostMode(false);
        setHackerMode(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keySequence]);
  
  const getTitleMode = () => {
    if (ghostMode) return 'ghost';
    if (hackerMode) return 'hacker';
    return 'default';
  }

    const scrollToSection = (id: string) => {
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 z-10 overflow-hidden">
      
      <AnimatePresence>
        {hackerMode && (
            <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-green-500 z-[100] mix-blend-difference pointer-events-none"
            />
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] p-6 bg-black border border-green-500/50 font-code text-green-400 shadow-lg shadow-green-500/20"
            >
                <p>&gt; SYSTEM BREACH DETECTED.</p>
                <p>&gt; ACCESS GRANTED.</p>
            </motion.div>
            </>
        )}

        {ghostMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          >
            <div className="w-64 h-40 bg-neutral-800 border-4 border-neutral-700 rounded-lg p-3 flex flex-col shadow-2xl">
              <div className="flex-1 bg-neutral-900/50 border border-neutral-700/50 rounded flex items-center justify-center">
                  <div className="w-10 h-10 border-2 border-neutral-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-neutral-600 rounded-full"></div>
                  </div>
                   <div className="w-10 h-10 border-2 border-neutral-600 rounded-full flex items-center justify-center ml-2">
                    <div className="w-2 h-2 bg-neutral-600 rounded-full"></div>
                  </div>
              </div>
              <div className="h-4 mt-2 bg-neutral-700 rounded-sm"></div>
            </div>
            <audio src="/ghost-track.mp3" autoPlay loop />
          </motion.div>
        )}
      </AnimatePresence>

      <DraggableTitle text="JULES WINEHEART" mode={getTitleMode()} />
      
      <AnimatePresence>
      {!ghostMode && !hackerMode && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-muted-foreground font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-8">
            <span>Lo-fi Folk</span>
            <span className="hidden md:inline text-primary">•</span>
            <span>Electronic</span>
            <span className="hidden md:inline text-primary">•</span>
            <span>Ambient</span>
        </div>

        <div 
            className="relative z-10 flex items-center justify-center space-x-6 my-4"
            >
            <TooltipProvider>
            {creativeTools.map((tool, index) => (
                <Tooltip key={index}>
                <TooltipTrigger asChild>
                    <motion.button
                    onClick={() => scrollToSection(tool.section)}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.8 + index * 0.1 } }
                    }}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -5, color: 'hsl(var(--accent))' }}
                    className="text-muted-foreground transition-colors cursor-pointer"
                    >
                    <tool.icon size={20} />
                    </motion.button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tool.tooltip}</p>
                </TooltipContent>
                </Tooltip>
            ))}
            </TooltipProvider>
        </div>

        <div
            className="relative z-10 flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
        >
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
      )}
      </AnimatePresence>

      <div className="absolute bottom-12 animate-bounce text-muted-foreground/50 z-10">
        <ChevronDown size={24} />
      </div>
    </section>
  );
};

export default Hero;
