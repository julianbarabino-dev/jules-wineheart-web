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

export default function Home() {
  return (
    // CAMBIO AQUÍ: Quité 'bg-black'. Ahora es transparente y deja ver el fondo del layout.
    <main className="flex flex-col min-h-screen text-white selection:bg-purple-500/30">
      
      <ConsoleMessage /> 
      <Header />
      
      <Hero />
      <Releases />
      
      <CTAInstagram /> 
      
      <Projects />
      <CosmicVicar />
      <Bunker signals={bunkerSignals} />
      
      <Footer />
    </main>
  );
}
