export interface TourismRouteRecord {
  id: string;
  name: string;
  description: string;
  difficulty: "Fácil" | "Moderada" | "Avanzada";
  duration: string;
  distance: string;
  points: string[];
  color: string;
  icon: string;
}

export interface TourismEventRecord {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  isFeatured: boolean;
}

const tourismRoutes: TourismRouteRecord[] = [
  {
    id: "ruta-patrimonio",
    name: "Ruta del Patrimonio Minero",
    description: "Recorre minas históricas, plazas y arquitectura emblemática.",
    difficulty: "Fácil",
    duration: "2-3 horas",
    distance: "4.2 km",
    points: ["Mina La Acosta", "Plaza Principal", "Panteón Inglés"],
    color: "from-primary to-cyan-300",
    icon: "⛏️",
  },
  {
    id: "ruta-gastronomica",
    name: "Ruta Gastronómica del Paste",
    description: "Sabores tradicionales y cocina local en el corazón del pueblo.",
    difficulty: "Fácil",
    duration: "2 horas",
    distance: "2.1 km",
    points: ["Pastes El Portal", "Mercado Municipal", "Cafeterías históricas"],
    color: "from-secondary to-orange-300",
    icon: "🥟",
  },
  {
    id: "ruta-ecoaventura",
    name: "Ruta EcoAventura",
    description: "Senderos y miradores para experiencias al aire libre.",
    difficulty: "Moderada",
    duration: "4 horas",
    distance: "8.4 km",
    points: ["Peña del Zumate", "Bosque de Oyamel", "Mirador Sierra Alta"],
    color: "from-emerald-400 to-teal-300",
    icon: "🌲",
  },
];

const tourismEvents: TourismEventRecord[] = [
  {
    id: "festival-plata",
    title: "Festival de la Plata y la Memoria Minera",
    description: "Música, talleres y narrativa histórica sobre el legado minero de RDM.",
    startDate: "2026-07-21T10:00:00.000Z",
    endDate: "2026-07-23T22:00:00.000Z",
    location: "Centro Histórico",
    isFeatured: true,
  },
  {
    id: "noche-leyendas",
    title: "Noche de Leyendas y Callejones",
    description: "Recorridos escénicos nocturnos con historias locales y tradición oral.",
    startDate: "2026-08-03T19:00:00.000Z",
    endDate: "2026-08-03T22:30:00.000Z",
    location: "Barrio Minero",
    isFeatured: false,
  },
  {
    id: "feria-paste",
    title: "Feria del Paste",
    description: "Encuentro gastronómico con productores locales y actividades familiares.",
    startDate: "2026-10-14T11:00:00.000Z",
    endDate: "2026-10-16T20:00:00.000Z",
    location: "Explanada Municipal",
    isFeatured: true,
  },
];

export function listTourismRoutes() {
  return tourismRoutes;
}

export function listTourismEvents() {
  return tourismEvents;
}
