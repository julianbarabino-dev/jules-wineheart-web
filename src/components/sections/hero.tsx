"use client";

import { Play, Headphones, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
    const scrollToSection = (id: string) => {
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 z-10 overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-purple-900/80 to-blue-900/60 rounded-full blur-[120px] opacity-40"></div>
      </motion.div>

      <h1 className="relative z-10 text-7xl md:text-9xl font-black font-headline text-foreground tracking-tighter mb-6 leading-none animate-fade-in">
        JULES<br className="md:hidden" /> WINEHEART
      </h1>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-muted-foreground font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-12 animate-fade-in [animation-delay:200ms]">
        <span>Lo-fi Folk</span>
        <span className="hidden md:inline text-primary">•</span>
        <span>Electronic</span>
        <span className="hidden md:inline text-primary">•</span>
        <span>Ambient</span>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in [animation-delay:400ms]">
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

      <div className="absolute bottom-12 animate-bounce text-muted-foreground/50 z-10">
        <ChevronDown size={24} />
      </div>
    </section>
  );
};

export default Hero;
