"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, ShoppingBag, Disc, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { links, secondaryReleases } from '@/lib/data';
import { cn } from '@/lib/utils';
import { getPlaceholderImage } from '@/lib/placeholder-images';

const Releases = () => {
  const [activeRelease, setActiveRelease] = useState<number | null>(null);

  const bloodmoonImage = getPlaceholderImage('bloodmoon-cover');
  
  const handleReleaseClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    activeRelease === index ? setActiveRelease(null) : setActiveRelease(index);
  };

  return (
    <section id="releases" className="py-24 sm:py-32 relative z-10 border-t border-border/50 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-primary font-mono text-xs mb-2 block tracking-widest">01. DISCOGRAFÍA</span>
            <h2 className="text-5xl font-black text-foreground font-headline uppercase italic tracking-tighter">
              Lanzamientos
            </h2>
          </div>
          <Link href={links.spotify} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors text-xs font-bold uppercase tracking-widest border-b border-transparent hover:border-foreground pb-1 flex items-center gap-2">
            Spotify <ExternalLink size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* BLOODMOON (Principal) */}
          <Card className="lg:col-span-1 group relative aspect-[3/4] bg-card border-primary/50 shadow-lg shadow-primary/10 transition-all duration-500 cursor-pointer overflow-hidden rounded-2xl flex flex-col hover:border-primary/80 hover:shadow-primary/20 hover:shadow-xl">
            <div className="absolute top-4 right-4 bg-primary-foreground text-background text-[9px] font-black px-2.5 py-1 uppercase z-20 animate-pulse rounded-full shadow-lg">Nuevo</div>
            <div className="relative flex-1 overflow-hidden">
              <Image
                src={bloodmoonImage.imageUrl}
                alt={bloodmoonImage.description}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-105"
                data-ai-hint={bloodmoonImage.imageHint}
              />
              <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-card to-transparent"></div>
            </div>
            <CardContent className="p-6 flex flex-col justify-end relative z-10 bg-card">
              <h3 className="text-3xl font-black text-foreground font-headline uppercase italic leading-none mb-2">BLOODMOON</h3>
              <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-wider mb-6">EP • 2025</p>
              <div className="flex gap-2">
                <Button asChild className="flex-1 bg-primary-foreground text-background hover:bg-muted" size="sm">
                  <Link href={links.spotify} target="_blank"><Play size={12} fill="currentColor" /> Stream</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1" size="sm">
                  <Link href={links.bandcamp} target="_blank"><ShoppingBag size={12} /> Buy</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Catalog Slider */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
              <Disc size={12} /> Archivo
            </h3>
            
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent className="-ml-6">
                {secondaryReleases.map((release, index) => {
                   const image = getPlaceholderImage(release.imgId);
                  return (
                    <CarouselItem key={index} className="pl-6 basis-full md:basis-1/2 lg:basis-1/2 xl:basis-[40%]">
                      <div className="p-1">
                        <Card
                          onClick={(e) => handleReleaseClick(e, index)}
                          className={cn(
                            "group relative aspect-square bg-card border transition-all duration-300 cursor-pointer overflow-hidden rounded-2xl",
                            activeRelease === index ? release.color : "border-border hover:border-foreground/30"
                          )}
                        >
                          <Image
                            src={image.imageUrl}
                            alt={release.title}
                            fill
                            className="object-cover transition-all duration-500 opacity-80 group-hover:opacity-100"
                            data-ai-hint={image.imageHint}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-card/50 to-background/50 z-[-1]">
                            <span className="text-foreground/10 font-black text-4xl font-headline">{release.altText}</span>
                          </div>

                          <div className={cn("absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300", activeRelease === index ? 'opacity-100' : 'opacity-0')}>
                            <h3 className="text-xl font-bold text-white leading-tight mb-1 font-headline">{release.title}</h3>
                            <p className={cn("text-[10px] font-mono uppercase tracking-wider mb-4 font-bold", release.textColor)}>{release.type}</p>
                            <div className="flex gap-2">
                              <Button asChild size="xs" className="flex-1 bg-white text-black hover:bg-neutral-300"><Link href={release.streamUrl} target="_blank"><Play size={10} fill="currentColor" /> Stream</Link></Button>
                              <Button asChild variant="outline" size="xs" className="flex-1 border-white/50 text-white hover:bg-white hover:text-black"><Link href={release.buyUrl} target="_blank"><ShoppingBag size={10} /> Buy</Link></Button>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
               <div className="hidden sm:block">
                <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Releases;
