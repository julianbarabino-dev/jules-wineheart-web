"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';
import type { BunkerSignalsOutput } from '@/ai/flows/generate-bunker-signals';
import { Typewriter } from '@/components/ui/typewriter';

interface BunkerProps {
  signals: BunkerSignalsOutput;
}

const Bunker = ({ signals }: BunkerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const bunkerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (bunkerRef.current) {
      observer.observe(bunkerRef.current);
    }

    return () => {
      if (bunkerRef.current) {
        observer.unobserve(bunkerRef.current);
      }
    };
  }, []);

  return (
    <section id="bunker" ref={bunkerRef} className="py-24 sm:py-32 border-t border-border/50 relative z-10 bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <Terminal size={20} className="text-accent" />
          <h3 className="text-xl font-bold font-code uppercase tracking-widest text-accent">
            Señal desde el Bunker
          </h3>
          <div className="w-2 h-2 bg-accent rounded-full animate-cursor-blink ml-auto"></div>
        </div>

        <div className="border border-accent/20 bg-black/50 p-6 font-code text-sm md:text-base shadow-lg shadow-accent/5 rounded-lg">
          <div className="flex flex-col gap-8">
            {signals.map((signal, index) => (
              <div key={index} className="flex flex-col gap-2 border-b border-accent/10 pb-6 last:border-0 last:pb-0 min-h-[3em]">
                <div className="flex items-center gap-3 text-accent/70 text-xs font-bold flex-wrap">
                  <span>[{signal.date}]</span>
                  <span>{signal.time}</span>
                  <span className="text-accent">__{signal.status}</span>
                </div>
                <div className="text-accent/90 leading-relaxed">
                  {index === 0 && isVisible ? (
                    <>
                      <Typewriter text={signal.text} start={isVisible} />
                      <span className="animate-cursor-blink inline-block w-2 h-5 bg-accent align-middle ml-1"></span>
                    </>
                  ) : (
                    <span>{signal.text}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bunker;
