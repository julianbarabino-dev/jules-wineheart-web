"use client";

import React from 'react';
import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

const Projects = () => {

  return (
    <section id="projects" className="py-24 sm:py-32 relative z-10 border-t border-border/50 bg-secondary/20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-12">
          <span className="text-blue-500 font-mono text-xs mb-2 block tracking-widest">02. PORTFOLIO</span>
          <h2 className="text-5xl font-black text-foreground font-headline uppercase italic tracking-tighter">Proyectos</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const Icon = project.icon;
            const TagIcon = project.tagIcon;
            
            return (
              <Card
                key={project.id}
                className={cn(
                  'group rounded-2xl bg-card border border-border/50 transition-all duration-300 overflow-hidden flex flex-col',
                  project.style
                )}
              >
                <div className="relative aspect-video w-full bg-card-foreground/5 flex items-center justify-center p-8 overflow-hidden">
                    <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300", project.glowStyle)}></div>
                    <Icon size={48} className="text-foreground/20 group-hover:text-foreground/80 transition-colors duration-300" />

                  {project.tag && (
                    <div className="absolute top-3 right-3 z-20">
                      <span className={cn('border text-[9px] font-black px-2 py-0.5 uppercase flex items-center gap-1.5 shadow-lg rounded', project.tagStyle)}>
                        {TagIcon && <TagIcon size={10} />} {project.tag}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-card-foreground/5 border-t border-border flex flex-col justify-center min-h-[100px] transition-colors group-hover:bg-card-foreground/10">
                  <h3 className="text-xl font-black text-foreground font-headline uppercase italic mb-1">{project.title}</h3>
                  
                  <div className="mt-2">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.desc}
                    </p>
                    {project.btn && (
                      <Button asChild variant="link" className="mt-3 px-0 text-accent font-bold uppercase tracking-widest h-auto">
                        <a href={project.btn.link} target="_blank" rel="noopener noreferrer">
                          <Play size={12} fill="currentColor"/> {project.btn.text}
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
