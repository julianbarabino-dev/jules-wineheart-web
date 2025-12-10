import Link from "next/link";
import { Instagram, Youtube, Music } from 'lucide-react';
import { links } from "@/lib/data";

const Footer = () => {
  return (
    <footer className="bg-background/50 pt-20 pb-10 border-t border-border/50 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-border pt-12">
          <div>
            <h4 className="font-bold text-foreground mb-4 uppercase text-xs tracking-wider">Contacto</h4>
            <a href={links.email} className="text-muted-foreground hover:text-foreground block mb-2 text-sm font-code transition-colors">{links.email.replace('mailto:', '')}</a>
            <p className="text-muted-foreground/50 text-xs font-code">Buenos Aires, CABA</p>
            <a href="#" className="mt-4 inline-block text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all border-b border-border hover:border-foreground pb-0.5">
              Descargar EPK
            </a>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4 uppercase text-xs tracking-wider">Redes</h4>
            <div className="flex gap-5">
              <a href={links.instagramJules} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors"><Instagram size={20}/></a>
              <a href={links.youtube} target="_blank" rel="noopener noreferrer" aria-label="Youtube" className="text-muted-foreground hover:text-foreground transition-colors"><Youtube size={20}/></a>
              <a href={links.spotify} target="_blank" rel="noopener noreferrer" aria-label="Spotify" className="text-muted-foreground hover:text-foreground transition-colors"><Music size={20}/></a>
            </div>
          </div>
          <div className="md:text-right flex flex-col md:items-end justify-between">
            <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-bold">© {new Date().getFullYear()} Jules Wineheart</p>
            <p className="text-muted-foreground/50 text-[10px] mt-2 cursor-default hover:text-muted-foreground transition-colors">Desarrollado por Julián Barabino</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
