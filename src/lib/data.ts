import { Gamepad2, Film, MonitorPlay, Award } from 'lucide-react';

export const links = {
  spotify: 'https://open.spotify.com/intl-es/artist/2pwi6uHFFNXPvoC2dECIf9',
  bandcamp: 'https://juleswineheart.bandcamp.com/',
  instagramJules: 'https://www.instagram.com/juleswineheart',
  instagramCosmic: 'https://www.instagram.com/cosmicvicarrecords',
  whatsapp: 'https://wa.me/5492966654899',
  email: 'mailto:juleswineheart@gmail.com',
  youtube: 'https://www.youtube.com/@juleswineheart',
};

export const secondaryReleases = [
  {
    title: 'Habitar P2P (Remix)',
    type: 'EP • 2025',
    imgId: 'habitar-remix-cover.jpg',
    altText: 'Habitar',
    streamUrl: links.spotify,
    buyUrl: links.bandcamp,
    color: 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]',
    textColor: 'text-blue-400',
  },
  {
    title: 'Algo Se Fue',
    type: 'Single • 2024',
    imgId: 'algo-se-fue-cover.jpg',
    altText: 'ASF',
    streamUrl: links.spotify,
    buyUrl: links.bandcamp,
    color: 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]',
    textColor: 'text-red-400',
  },
  {
    title: 'Ocupado Tu Corazón',
    type: 'Single • 2024',
    imgId: 'ocupado-tu-corazon-cover.jpg',
    altText: 'OTC',
    streamUrl: links.spotify,
    buyUrl: links.bandcamp,
    color: 'border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.3)]',
    textColor: 'text-pink-400',
  },
  {
    title: 'Memory of Changes',
    type: 'LP • 2022',
    imgId: 'memory-of-changes-cover.jpg',
    altText: 'MoC',
    streamUrl: links.spotify,
    buyUrl: links.bandcamp,
    color: 'border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]',
    textColor: 'text-purple-400',
  },
  {
    title: 'Nothing Ever Happened',
    type: 'Single • 2021',
    imgId: 'nothingeverhappened-cover.jpg',
    altText: 'NEH',
    streamUrl: links.spotify,
    buyUrl: links.bandcamp,
    color: 'border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.3)]',
    textColor: 'text-indigo-400',
  },
  {
    title: 'We Gonna Make It',
    type: 'Single • 2021',
    imgId: 'wegonnamakeit-cover.jpg',
    altText: 'WGMI',
    streamUrl: links.spotify,
    buyUrl: links.bandcamp,
    color: 'border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]',
    textColor: 'text-green-400',
  },
  {
    title: 'Where Was I',
    type: 'Single • 2021',
    imgId: 'wherewasi-cover.jpg',
    altText: 'WWI',
    streamUrl: links.spotify,
    buyUrl: links.bandcamp,
    color: 'border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.3)]',
    textColor: 'text-yellow-400',
  },
  {
    title: 'OK',
    type: 'LP • 2015',
    imgId: 'ok-cover.jpg',
    altText: 'OK',
    streamUrl: links.spotify,
    buyUrl: links.bandcamp,
    color: 'border-blue-400/50 shadow-[0_0_20px_rgba(96,165,250,0.3)]',
    textColor: 'text-blue-300',
  },
  {
    title: 'Spheres',
    type: 'EP • 2014',
    imgId: 'spheres-cover.jpg',
    altText: 'Spheres',
    streamUrl: links.spotify,
    buyUrl: links.bandcamp,
    color: 'border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.3)]',
    textColor: 'text-orange-400',
  },
  {
    title: 'Summertime',
    type: 'Double Single • 2014',
    imgId: 'summertime-cover.jpg',
    altText: 'Summer',
    streamUrl:
      'https://judasandthewinehearts.bandcamp.com/album/summertime-your-words',
    buyUrl:
      'https://judasandthewinehearts.bandcamp.com/album/summertime-your-words',
    color: 'border-teal-500/50 shadow-[0_0_20px_rgba(20,184,166,0.3)]',
    textColor: 'text-teal-400',
  },
  {
    title: "Jules' Basement",
    type: 'Compilado • 2013',
    imgId: 'julesbasement-cover.jpg',
    altText: 'Demos',
    streamUrl: links.bandcamp,
    buyUrl: links.bandcamp,
    color: 'border-gray-500/50 shadow-[0_0_20px_rgba(107,114,128,0.3)]',
    textColor: 'text-gray-400',
  },
];

export const projects = [
    {
        id: 'norah',
        title: 'NORAH',
        tag: 'Premio CreAr',
        tagIcon: Award,
        icon: Gamepad2,
        imgId: 'norah-game-screenshot.jpg',
        desc: 'Videojuego educativo sobre artistas argentinas (Construct 3). Arte, música, concepto y programación. Premio a Mejor Sonorización.',
        btn: null,
        style: 'hover:border-blue-500/80',
        tagStyle: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500',
        glowStyle: 'bg-gradient-to-t from-blue-900/50 to-blue-800/20 blur-3xl'
    },
    {
        id: 'habitar',
        title: 'HABITAR P2P',
        tag: '',
        tagIcon: null,
        icon: Film,
        imgId: 'habitar-p2p-docu.jpg',
        desc: 'Música original para 4 mini documentales sobre arquitectos de BsAs. Prod. por Estudio Fiørd.',
        btn: { text: 'Escuchar en Spotify', link: links.spotify },
        style: 'hover:border-primary/50',
        tagStyle: '',
        glowStyle: 'bg-gradient-to-t from-purple-900/50 to-purple-800/20 blur-3xl'
    },
    {
        id: 'memory',
        title: 'MEMORY',
        tag: 'Unreal Connectors',
        tagIcon: Film,
        icon: Film,
        imgId: 'memory-short-film.jpg',
        desc: 'Música y diseño de sonido para cortometraje en Unreal 5. Dirigido por Aldana Drisaldi.',
        btn: null,
        style: 'hover:border-purple-500/50',
        tagStyle: 'bg-purple-900/20 text-purple-400 border-purple-500/20',
        glowStyle: 'bg-gradient-to-t from-purple-900/50 to-purple-800/20 blur-3xl'
    },
    {
        id: 'goodbye',
        title: 'GOODBYE CITIES',
        tag: 'BAFICI 2018',
        tagIcon: Film,
        icon: Film,
        imgId: 'goodbye-cities-film.jpg',
        desc: 'Carta a los nonatos. Cortometraje de Sebastian Pérez Opačak. Selección Oficial.',
        btn: null,
        style: 'hover:border-red-500/50',
        tagStyle: 'bg-purple-900/20 text-purple-400 border-purple-500/20',
        glowStyle: 'bg-gradient-to-t from-red-900/50 to-red-800/20 blur-3xl'
    },
    {
        id: 'retro',
        title: 'RETROAVENTURAS',
        tag: '',
        tagIcon: null,
        icon: MonitorPlay,
        imgId: 'retroaventuras-cover.jpg',
        desc: 'Música original para canal de YouTube dedicado a la cultura gaming retro en Argentina.',
        btn: null,
        style: 'hover:border-blue-500/50',
        tagStyle: '',
        glowStyle: 'bg-gradient-to-t from-blue-900/50 to-blue-800/20 blur-3xl'
    }
];

export const cosmicVicarServices = [
    { 
        name: "Producción Musical", 
        icon: "Mic2",
        description: "Desde la composición inicial hasta los arreglos finales para dar vida a tus canciones."
    },
    { 
        name: "Mezcla & Mastering", 
        icon: "Layers",
        description: "Balance, profundidad y claridad profesional para que tu música suene increíble en todas partes."
    },
    { 
        name: "Edición de Audio", 
        icon: "Scissors",
        description: "Limpieza, afinación y sincronización precisa para un sonido pulido y sin imperfecciones."
    },
    { 
        name: "SFX & Game Audio", 
        icon: "Gamepad2",
        description: "Diseño de efectos de sonido y música inmersiva que potencian la experiencia de juego."
    },
] as const;
