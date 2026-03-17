import { Router } from "express";

const placesRouter = Router();

// In-memory places store (seeded data)
const placesData = [
  {
    id: "centro-historico",
    slug: "centro-historico",
    name: "Centro Histórico y Plaza Principal",
    description: "Corazón de Real del Monte, con arquitectura de influencia inglesa y memoria minera viva. Rodeada de portales coloniales del siglo XVIII.",
    type: "HISTORIC",
    location: { lat: 20.1407, lng: -98.6725, alt: 2700 },
    isFeatured: true,
  },
  {
    id: "mina-de-acosta",
    slug: "mina-de-acosta",
    name: "Mina de Acosta",
    description: "Mina histórica convertida en museo con recorridos guiados y túneles originales. Desciende 400m bajo tierra en una experiencia única.",
    type: "MUSEUM",
    location: { lat: 20.1448, lng: -98.6653, alt: 2720 },
    isFeatured: true,
  },
  {
    id: "panteon-ingles",
    slug: "panteon-ingles",
    name: "Panteón Inglés",
    description: "Único cementerio inglés en Latinoamérica con criptas victorianas. Testigo de la presencia británica en la minería del siglo XIX. Tumbas orientadas hacia Inglaterra.",
    type: "HISTORIC",
    location: { lat: 20.1397, lng: -98.6769, alt: 2690 },
    isFeatured: true,
  },
  {
    id: "parroquia-asuncion",
    slug: "parroquia-asuncion",
    name: "Parroquia de la Asunción",
    description: "Iglesia colonial del siglo XVIII con retablos barrocos dorados y fachada de cantera rosa que domina la plaza principal.",
    type: "RELIGIOUS",
    location: { lat: 20.1412, lng: -98.6738, alt: 2700 },
    isFeatured: false,
  },
  {
    id: "museo-medicina",
    slug: "museo-medicina-laboral",
    name: "Museo de Medicina Laboral",
    description: "Documenta las condiciones de salud de los mineros con instrumental médico del siglo XIX y fotografías históricas.",
    type: "MUSEUM",
    location: { lat: 20.1405, lng: -98.6729, alt: 2700 },
    isFeatured: false,
  },
  {
    id: "cristo-rey",
    slug: "cristo-rey",
    name: "Cristo Rey (Peña del Zumate)",
    description: "Monumento icónico en la cima de la peña con vistas panorámicas de 360° del pueblo y las montañas circundantes.",
    type: "VIEWPOINT",
    location: { lat: 20.1460, lng: -98.6690, alt: 2780 },
    isFeatured: true,
  },
  {
    id: "mina-dolores",
    slug: "mina-dolores",
    name: "Mina de Dolores",
    description: "Una de las minas más profundas de la región, clave en la historia de la plata novohispana.",
    type: "MINE",
    location: { lat: 20.1430, lng: -98.6700, alt: 2730 },
    isFeatured: false,
  },
  {
    id: "bosque-pinos",
    slug: "bosque-pinos",
    name: "Bosque de Pinos y Oyameles",
    description: "Área natural para senderismo a 2,700m de altitud. Bosque de oyamel y pino con aire puro de montaña y senderos marcados.",
    type: "NATURE",
    location: { lat: 20.1556, lng: -98.6856, alt: 2750 },
    isFeatured: false,
  },
  {
    id: "mirador-atardecer",
    slug: "mirador-atardecer",
    name: "Mirador del Atardecer",
    description: "Mejor lugar para ver el atardecer en todo el Valle del Mezquital. Un espectáculo de colores sobre la sierra hidalguense.",
    type: "VIEWPOINT",
    location: { lat: 20.1489, lng: -98.6711, alt: 2760 },
    isFeatured: false,
  },
  {
    id: "vista-penon",
    slug: "vista-penon",
    name: "Vista del Peñón",
    description: "Panorámica espectacular del pueblo desde lo alto, con vistas que alcanzan el Valle del Mezquital en días claros.",
    type: "VIEWPOINT",
    location: { lat: 20.1511, lng: -98.6694, alt: 2790 },
    isFeatured: false,
  },
];

placesRouter.get("/", (_req, res) => {
  return res.json(placesData);
});

placesRouter.get("/:slug", (req, res) => {
  const place = placesData.find((p) => p.slug === req.params.slug || p.id === req.params.slug);
  if (!place) return res.status(404).json({ error: "Lugar no encontrado." });
  return res.json(place);
});

export default placesRouter;
