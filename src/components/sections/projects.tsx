"use client";

import React from 'react';
import Image from 'next/image';
import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { getPlaceholderImage } from '@/lib/placeholder-images';


const Projects = () => {

  return (
    <section id="projects" className="py-24 sm:py-32 relative z-10 border-t border-border/50 bg-secondary/20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-12">
          <span className="text-blue-500 font-mono text-xs mb-2 block tracking-widest">02. PORTFOLIO</span>
          <h2 className="text-5xl font-black text-foreground font-headline uppercase italic tracking-tighter">Proyectos</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {projects.map((project) => {
            const TagIcon = project.tagIcon;
            const image = getPlaceholderImage(project.imgId);
            
            return (
              <Card
                key={project.id}
                className={cn(
                  'group rounded-2xl bg-card border border-border/50 transition-all duration-300 overflow-hidden flex flex-col',
                  'hover:border-primary/50'
                )}
              >
                <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                        src={image.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        data-ai-hint={image.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {project.tag && (
                    <div className="absolute top-3 right-3 z-20">
                      <span className={cn('border text-[9px] font-black px-2 py-0.5 uppercase flex items-center gap-1.5 shadow-lg rounded', project.tagStyle)}>
                        {TagIcon && <TagIcon size={10} />} {project.tag}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-card flex flex-col justify-center min-h-[100px] flex-grow">
                  <h3 className="text-xl font-black text-foreground font-headline uppercase italic mb-2">{project.title}</h3>
                  
                  <div className="mt-2 flex flex-col flex-grow">
                    <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                      {project.desc}
                    </p>
                    {project.btn && (
                      <Button asChild variant="link" className="mt-4 px-0 text-accent font-bold uppercase tracking-widest h-auto self-start">
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
