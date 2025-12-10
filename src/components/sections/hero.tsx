"use client";

import { Play, Headphones, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
    const scrollToSection = (id: string) => {
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 z-10 overflow-hidden">
      <h1 className="text-7xl md:text-9xl font-black font-headline text-foreground tracking-tighter mb-6 leading-none animate-fade-in">
        JULES<br className="md:hidden" /> WINEHEART
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-muted-foreground font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-12 animate-fade-in [animation-delay:200ms]">
        <span>Lo-fi Folk</span>
        <span className="hidden md:inline text-primary">•</span>
        <span>Electronic</span>
        <span className="hidden md:inline text-primary">•</span>
        <span>Ambient</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in [animation-delay:400ms]">
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

      <div className="absolute bottom-12 animate-bounce text-muted-foreground/50">
        <ChevronDown size={24} />
      </div>
    </section>
  );
};

export default Hero;
