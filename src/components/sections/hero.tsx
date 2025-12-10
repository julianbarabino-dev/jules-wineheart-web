"use client";

import { Play, Headphones, ChevronDown, Guitar, Laptop, Book, Keyboard, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useAnimation, useTransform } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

const creativeTools = [
  { icon: Guitar, section: "#releases", tooltip: "Música" },
  { icon: Laptop, section: "#projects", tooltip: "Proyectos" },
  { icon: Book, section: "#diary", tooltip: "Sound Diary" },
  { icon: Keyboard, section: "#cosmic", tooltip: "Cosmic Vicar" },
  { icon: Terminal, section: "#bunker", tooltip: "Bunker" },
];

const DraggableTitle = ({ text }: { text: string }) => {
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  const [isFalling, setIsFalling] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest > 0.05 && !isFalling) {
        setIsFalling(true);
        controls.start("fall");
      }
    });
  }, [scrollYProgress, controls, isFalling]);


  return (
    <h1 className="relative z-50 text-6xl sm:text-7xl md:text-9xl font-black font-headline text-foreground tracking-tighter mb-6 leading-none select-none">
      {text.split("").map((char, index) => {
        if (char === " ") {
          return <span key={index} className="inline-block w-4 md:w-6"></span>;
        }
        return (
          <motion.span
            key={index}
            drag={!isFalling}
            dragElastic={0.1}
            whileHover={{ scale: 1.2, color: "#a855f7", rotate: Math.random() * 20 - 10 }}
            whileTap={{ scale: 0.9, cursor: "grabbing" }}
            className="inline-block cursor-grab"
            style={{ position: isFalling ? 'fixed' : 'relative' }}
            animate={controls}
            variants={{
              fall: {
                y: typeof window !== 'undefined' ? window.innerHeight - 150 + (Math.random() * 50) : 1000,
                x: typeof window !== 'undefined' ? (Math.random() * window.innerWidth) - (window.innerWidth / 2) : 0,
                rotate: Math.random() * 360 - 180,
                transition: {
                  delay: Math.random() * 1.5,
                  duration: 2 + Math.random() * 2,
                  ease: [0.1, 0.25, 0.3, 1] // Ease out cubic
                }
              }
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </h1>
  );
};


const Hero = () => {
    const scrollToSection = (id: string) => {
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 z-10 overflow-hidden">
      
      <DraggableTitle text="JULES WINEHEART" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-muted-foreground font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-8"
      >
        <span>Lo-fi Folk</span>
        <span className="hidden md:inline text-primary">•</span>
        <span>Electronic</span>
        <span className="hidden md:inline text-primary">•</span>
        <span>Ambient</span>
      </motion.div>

      <motion.div 
        className="relative z-10 flex items-center justify-center space-x-6 my-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
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
      </motion.div>

      <div className="absolute bottom-12 animate-bounce text-muted-foreground/50 z-10">
        <ChevronDown size={24} />
      </div>
    </section>
  );
};

export default Hero;
