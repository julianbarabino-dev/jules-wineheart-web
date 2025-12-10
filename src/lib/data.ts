import { Guitar, Laptop, Book, Keyboard, Terminal, Gamepad2, Film, MonitorPlay, Mic2, Layers, Scissors } from "lucide-react";

export const creativeTools = [
  { icon: Guitar, section: "#releases", label: "Música", id: "releases" },
  { icon: Laptop, section: "#projects", label: "Proyectos", id: "projects" },
  { icon: Book, section: "#diary", label: "Sound Diary", id: "diary" },
  { icon: Keyboard, section: "#cosmic", label: "Cosmic Vicar", id: "cosmic" },
  { icon: Terminal, section: "#bunker", label: "Bunker", id: "bunker" },
];

export const projects = [
  {
    id: 'norah',
    title: 'NORAH',
    tag: 'Premio CreAr',
    tagIcon: 'Award',
    imgId: 'norah-game-screenshot.jpg',
    icon: Gamepad2,
    desc: 'Videojuego educativo sobre artistas argentinas (Construct 3). Arte, música, concepto y programación. Premio a Mejor Sonorización.',
    btn: null,
    style: 'hover:border-blue-500/80',
    tagStyle: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
  },
  {
    id: 'habitar',
    title: 'HABITAR P2P',
    tag: '',
    imgId: 'habitar-p2p-docu.jpg',
    icon: Film,
    desc: 'Música original para 4 mini documentales sobre arquitectos de BsAs. Prod. por Estudio Fiørd.',
    btn: { text: 'Escuchar en Spotify', link: 'https://open.spotify.com/intl-es/artist/2pwi6uHFFNXPvoC2dECIf9' },
    style: 'hover:border-white/50',
    tagStyle: ''
  },
  {
    id: 'memory',
    title: 'MEMORY',
    tag: 'Unreal Connectors',
    tagIcon: 'Award',
    imgId: 'memory-short-film.jpg',
    icon: Film,
    desc: 'Música y diseño de sonido para cortometraje en Unreal 5. Dirigido por Aldana Drisaldi.',
    btn: null,
    style: 'hover:border-purple-500/50',
    tagStyle: 'bg-purple-900/20 text-purple-400 border-purple-500/20'
  },
  {
    id: 'goodbye',
    title: 'GOODBYE CITIES',
    tag: 'BAFICI 2018',
    tagIcon: 'Award',
    imgId: 'goodbye-cities-film.jpg',
    icon: Film,
    desc: 'Carta a los nonatos. Cortometraje de Sebastian Pérez Opačak. Selección Oficial.',
    btn: null,
    style: 'hover:border-purple-500/50',
    tagStyle: 'bg-purple-900/20 text-purple-400 border-purple-500/20'
  },
  {
    id: 'retro',
    title: 'RETROAVENTURAS',
    tag: '',
    imgId: 'retroaventuras-cover.jpg',
    icon: MonitorPlay,
    desc: 'Música original para canal de YouTube dedicado a la cultura gaming retro en Argentina.',
    btn: null,
    style: 'hover:border-blue-500/50',
    tagStyle: ''
  }
];

export const bunkerSignals = [
  {
      date: "07.12.2025",
      time: "10:30 AM",
      status: "LIVE",
      text: "Exposición del arte de Bloodmoon 21 de diciembre en: Punkware Cyberzine - CABA"
  },
  {
      date: "01.12.2025",
      time: "11:20 PM",
      status: "NEXT MOVE",
      text: "Gotra single o Moonshiner EP"
  },
  {
      date: "07.11.2025",
      time: "09:00 AM",
      status: "REC",
      text: "Bloodmoon EP acaba de salir."
  }
];

export const secondaryReleases = [
    {
        title: "Habitar P2P (Remix)",
        type: "EP • 2025",
        img: "habitar-remix-cover.jpg",
        altText: "Habitar",
        streamUrl: "https://open.spotify.com/intl-es/artist/2pwi6uHFFNXPvoC2dECIf9",
        buyUrl: "https://juleswineheart.bandcamp.com/",
        color: "hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
        textColor: "text-blue-400"
    },
    {
        title: "Algo Se Fue",
        type: "Single • 2024",
        img: "algo-se-fue-cover.jpg",
        altText: "ASF",
        streamUrl: "https://open.spotify.com/intl-es/artist/2pwi6uHFFNXPvoC2dECIf9",
        buyUrl: "https://juleswineheart.bandcamp.com/",
        color: "hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]",
        textColor: "text-red-400"
    },
    {
        title: "Ocupado Tu Corazón",
        type: "Single • 2024",
        img: "ocupado-tu-corazon-cover.jpg",
        altText: "OTC",
        streamUrl: "https://open.spotify.com/intl-es/artist/2pwi6uHFFNXPvoC2dECIf9",
        buyUrl: "https://juleswineheart.bandcamp.com/",
        color: "hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]",
        textColor: "text-pink-400"
    },
    {
        title: "Memory of Changes",
        type: "LP • 2022",
        img: "memory-of-changes-cover.jpg",
        altText: "MoC",
        streamUrl: "https://open.spotify.com/intl-es/artist/2pwi6uHFFNXPvoC2dECIf9",
        buyUrl: "https://juleswineheart.bandcamp.com/",
        color: "hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]",
        textColor: "text-purple-400"
    }
];

export const cosmicServices = [
    { icon: Mic2, label: "Producción Musical" },
    { icon: Layers, label: "Mezcla & Mastering" },
    { icon: Scissors, label: "Edición de Audio" },
    { icon: Gamepad2, label: "SFX & Game Audio" }
];

export const links = {
    spotify: "https://open.spotify.com/intl-es/artist/2pwi6uHFFNXPvoC2dECIf9",
    bandcamp: "https://juleswineheart.bandcamp.com/",
    instagramJules: "https://www.instagram.com/juleswineheart",
    instagramCosmic: "https://www.instagram.com/cosmicvicarrecords",
    whatsapp: "https://wa.me/5492966654899",
    email: "mailto:juleswineheart@gmail.com",
    youtube: "https://www.youtube.com/@juleswineheart"
};
