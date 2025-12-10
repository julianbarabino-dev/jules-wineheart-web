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
    imgId: '/fotos/norah-game-screenshot.jpg',
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
    imgId: '/fotos/habitar-p2p-docu.jpg',
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
    imgId: '/fotos/memory-short-film.jpg',
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
    imgId: '/fotos/goodbye-cities-film.jpg',
    icon: Film,
    desc: 'Música orginal para "Carta a los nonatos": Cortometraje de Sebastian Pérez Opačak. Selección Oficial BAFICI.',
    btn: null,
    style: 'hover:border-purple-500/50',
    tagStyle: 'bg-purple-900/20 text-purple-400 border-purple-500/20'
  },
  {
    id: 'retro',
    title: 'RETROAVENTURAS',
    tag: '',
    imgId: '/fotos/retroaventuras-cover.jpg',
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
      status: "NEXT MOVE?",
      text: "Nuevo proyecto single o Moonshiner-dreamyAmbient- EP?"
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
        img: "/fotos/habitar-remix-cover.jpg",
        altText: "Habitar",
        streamUrl: "https://open.spotify.com/intl-es/artist/2pwi6uHFFNXPvoC2dECIf9",
        buyUrl: "https://juleswineheart.bandcamp.com/",
        color: "hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
        textColor: "text-blue-400"
    },
    {
        title: "Algo Se Fue",
        type: "Single • 2024",
        img: "/fotos/algo-se-fue-cover.jpg",
        altText: "ASF",
        streamUrl: "https://open.spotify.com/intl-es/artist/2pwi6uHFFNXPvoC2dECIf9",
        buyUrl: "https://juleswineheart.bandcamp.com/",
        color: "hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]",
        textColor: "text-red-400"
    },
    {
        title: "Ocupado Tu Corazón",
        type: "Single • 2024",
        img: "/fotos/ocupado-tu-corazon-cover.jpg",
        altText: "OTC",
        streamUrl: "https://open.spotify.com/intl-es/artist/2pwi6uHFFNXPvoC2dECIf9",
        buyUrl: "https://juleswineheart.bandcamp.com/",
        color: "hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]",
        textColor: "text-pink-400"
    },
    {
        title: "Memory of Changes",
        type: "LP • 2022",
        img: "/fotos/memory-of-changes-cover.jpg",
        altText: "MoC",
        streamUrl: "https://open.spotify.com/intl-es/artist/2pwi6uHFFNXPvoC2dECIf9",
        buyUrl: "https://juleswineheart.bandcamp.com/",
        color: "hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]",
        textColor: "text-purple-400"
    },
    {
        title: "Nothing Ever Happened",
        type: "Single • 2021",
        img: "/fotos/nothingeverhappened-cover.jpg",
        altText: "NEH",
        streamUrl: "https://open.spotify.com/intl-es/artist/2pwi6uHFFNXPvoC2dECIf9",
        buyUrl: "https://juleswineheart.bandcamp.com/",
        color: "hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]",
        textColor: "text-indigo-400"
    },
    {
        title: "We Gonna Make It",
        type: "Single • 2021",
        img: "/fotos/wegonnamakeit-cover.jpg",
        altText: "WGMI",
        streamUrl: "https://open.spotify.com/intl-es/artist/2pwi6uHFFNXPvoC2dECIf9",
        buyUrl: "https://juleswineheart.bandcamp.com/",
        color: "hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]",
        textColor: "text-green-400"
    },
    {
        title: "Where Was I",
        type: "Single • 2021",
        img: "/fotos/wherewasi-cover.jpg",
        altText: "WWI",
        streamUrl: "https://open.spotify.com/intl-es/artist/2pwi6uHFFNXPvoC2dECIf9",
        buyUrl: "https://juleswineheart.bandcamp.com/",
        color: "hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]",
        textColor: "text-yellow-400"
    },
    {
        title: "OK",
        type: "LP • 2015",
        img: "/fotos/ok-cover.jpg",
        altText: "OK",
        streamUrl: "https://open.spotify.com/intl-es/artist/2pwi6uHFFNXPvoC2dECIf9",
        buyUrl: "https://juleswineheart.bandcamp.com/",
        color: "hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(96,165,250,0.3)]",
        textColor: "text-blue-300"
    },
    {
        title: "Spheres",
        type: "EP • 2014",
        img: "/fotos/spheres-cover.jpg",
        altText: "Spheres",
        streamUrl: "https://open.spotify.com/intl-es/artist/2pwi6uHFFNXPvoC2dECIf9",
        buyUrl: "https://juleswineheart.bandcamp.com/",
        color: "hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]",
        textColor: "text-orange-400"
    },
    {
        title: "Summertime",
        type: "Double Single • 2014",
        img: "/fotos/summertime-cover.jpg",
        altText: "Summer",
        streamUrl: "https://judasandthewinehearts.bandcamp.com/album/summertime-your-words",
        buyUrl: "https://judasandthewinehearts.bandcamp.com/album/summertime-your-words",
        color: "hover:border-teal-500/50 hover:shadow-[0_0_20px_rgba(20,184,166,0.3)]",
        textColor: "text-teal-400"
    },
    {
        title: "Jules' Basement",
        type: "Compilado • 2013",
        img: "/fotos/julesbasement-cover.jpg",
        altText: "Demos",
        streamUrl: "https://juleswineheart.bandcamp.com/",
        buyUrl: "https://juleswineheart.bandcamp.com/",
        color: "hover:border-gray-500/50 hover:shadow-[0_0_20px_rgba(107,114,128,0.3)]",
        textColor: "text-gray-400"
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

