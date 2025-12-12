import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer"; 
import Hero from "@/components/sections/hero";
import Releases from "@/components/sections/releases";
import CTAInstagram from "@/components/ui/cta-instagram"; 
import Projects from "@/components/sections/projects";
import CosmicVicar from "@/components/sections/cosmic-vicar"; 
import Bunker from "@/components/sections/bunker";
import ConsoleMessage from "@/components/utils/console-message";
import { bunkerSignals } from "@/lib/data";
import WebglBackground from "@/components/ui/webgl-background";
import SectionReturn from "@/components/ui/SectionReturn"; 
import CTAConsole from "@/components/ui/cta-console";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen text-white selection:bg-purple-500/30">

      <WebglBackground />
      <ConsoleMessage /> 
      <Header />
      
      {/* 1. HERO */}
      <div id="hero">
        <Hero />
      </div>

      {/* 2. RELEASES */}
      <div id="releases">
        <Releases />
      </div>
      <SectionReturn href="#hero" />
      
      {/* INSTAGRAM CTA */}
      <CTAInstagram /> 
      
      {/* 3. PROJECTS */}
      <div id="projects">
        <Projects />
      </div>
      <SectionReturn href="#releases" />

      {/* --- CONSOLA DE CONTACTO --- */}
      <div id="contact-console"> {/* Le puse un ID por si querés navegar hacia ella en el futuro */}
        <CTAConsole />
      </div>
      {/* NUEVA FLECHITA: Vuelve a Projects */}
      <SectionReturn href="#projects" />

      {/* 4. COSMIC VICAR */}
      <div id="cosmic-vicar">
        <CosmicVicar />
      </div>
      {/* Nota: Podrías cambiar este href="#contact-console" si quisieras volver a la consola, 
         pero volver a #projects también funciona bien como navegación general */}
      <SectionReturn href="#projects" />

      {/* 5. BUNKER */}
      <div id="bunker">
        <Bunker signals={bunkerSignals} />
      </div>
     
      <Footer />
    </main>
  );
}