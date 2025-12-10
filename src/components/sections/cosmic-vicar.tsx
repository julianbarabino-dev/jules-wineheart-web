import Link from "next/link";
import { Play, Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { links } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mic2, Layers, Scissors, Gamepad2 } from 'lucide-react';
import type { Dictionary } from "@/lib/get-dictionary";

type IconKeys = keyof typeof iconMap;

const iconMap = {
  Mic2,
  Layers,
  Scissors,
  Gamepad2,
};

interface CosmicVicarProps {
  dictionary: Dictionary['cosmicVicar'];
}

const CosmicVicar = ({ dictionary }: CosmicVicarProps) => {

  const cosmicVicarServices = [
    { 
        name: dictionary.services.production.title,
        icon: "Mic2",
        description: dictionary.services.production.description
    },
    { 
        name: dictionary.services.mixing.title, 
        icon: "Layers",
        description: dictionary.services.mixing.description
    },
    { 
        name: dictionary.services.editing.title, 
        icon: "Scissors",
        description: dictionary.services.editing.description
    },
    { 
        name: dictionary.services.gameAudio.title, 
        icon: "Gamepad2",
        description: dictionary.services.gameAudio.description
    },
] as const;

  return (
    <section id="cosmic" className="py-24 sm:py-32 border-t border-border/50 bg-secondary/20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="border border-border bg-card/50 relative text-left overflow-hidden rounded-lg">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
          <div className="p-10 md:p-14">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
              <Badge variant="outline" className="animate-pulse bg-red-900/20 border-red-500/30 py-1 px-3 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] mr-2"></div>
                <span className="text-[10px] font-mono text-red-400 tracking-widest uppercase font-bold">{dictionary.status}</span>
              </Badge>
              <h2 className="text-3xl md:text-5xl font-black font-alt-headline uppercase tracking-tighter text-foreground leading-none">
                Cosmic Vicar Records
              </h2>
            </div>
            <div className="flex flex-col md:flex-row gap-12 justify-between">
              <div className="flex-1">
                <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-lg border-l-2 border-border pl-4">
                  {dictionary.description}
                </p>
                <Accordion type="single" collapsible className="w-full">
                  {cosmicVicarServices.map((service) => {
                    const Icon = iconMap[service.icon as IconKeys];
                    return (
                      <AccordionItem value={service.name} key={service.name} className="border-border/50">
                        <AccordionTrigger className="hover:no-underline font-bold text-sm uppercase tracking-wider text-foreground">
                          <div className="flex items-center gap-3">
                            <Icon size={16} className="text-primary"/>
                            <span>{service.name}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-xs pl-9">
                          {service.description}
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </div>
              <div className="flex flex-col justify-end items-start md:items-end gap-6 min-w-[200px]">
                <Button asChild size="lg" className="bg-primary-foreground text-background font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all w-full text-center">
                  <Link href={`${links.whatsapp}?text=${dictionary.whatsappCTA}`} target="_blank">
                    <Play size={16} fill="currentColor" /> {dictionary.startProject}
                  </Link>
                </Button>
                <Button asChild variant="link" className="text-muted-foreground hover:text-foreground transition-colors text-xs font-bold uppercase tracking-widest">
                  <Link href={links.instagramCosmic} target="_blank">
                    <Instagram size={20}/> <span className="ml-2">{dictionary.followIG}</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CosmicVicar;
