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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute inset-0 w-full h-full z-0"
      >
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-purple-900/80 to-blue-900/60 rounded-full blur-[120px] opacity-40"
        ></motion.div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-7xl md:text-9xl font-black font-headline text-foreground tracking-tighter mb-6 leading-none"
      >
        JULES<br className="md:hidden" /> WINEHEART
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-muted-foreground font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-12"
      >
        <span>Lo-fi Folk</span>
        <span className="hidden md:inline text-primary">•</span>
        <span>Electronic</span>
        <span className="hidden md:inline text-primary">•</span>
        <span>Ambient</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 flex flex-col sm:flex-row gap-6 justify-center items-center"
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
