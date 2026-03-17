import { Router } from "express";

const merchantsRouter = Router();

const merchantsData = [
  {
    id: "pasteria-el-portal",
    slug: "pasteria-el-portal",
    name: "Pastería El Portal",
    category: "FOOD",
    immersionLevel: 2,
    description: "Pastes tradicionales con receta córnica frente a la plaza principal. La receta original traída por mineros ingleses en 1824.",
    priceRange: "$$",
    address: "Plaza Principal s/n, Centro",
    location: { lat: 20.1409, lng: -98.6723 },
    phone: "+52 771 123 4567",
    mainImage: "/assets/merchants/pasteria-portal.jpg",
    tags: ["pastes", "tradicional", "centro", "córnica"],
    isActive: true,
  },
  {
    id: "mina-coffee",
    slug: "mina-coffee-house",
    name: "Mina Coffee House",
    category: "FOOD",
    immersionLevel: 2,
    description: "Café artesanal y repostería en ambiente colonial. Specialty coffee de altura cultivado en la sierra hidalguense.",
    priceRange: "$$",
    address: "Calle Principal #25",
    location: { lat: 20.1391, lng: -98.6752 },
    phone: "+52 771 123 4567",
    mainImage: null,
    tags: ["café", "repostería", "colonial", "artesanal"],
    isActive: true,
  },
  {
    id: "hotel-real",
    slug: "hotel-real-del-monte",
    name: "Hotel Real del Monte",
    category: "LODGING",
    immersionLevel: 3,
    description: "Hotel boutique con vista panorámica. Hospedaje tradicional con amenidades modernas y chimenea en cada habitación.",
    priceRange: "$$$",
    address: "Carretera Federal #10",
    location: { lat: 20.1456, lng: -98.6800 },
    phone: "+52 771 234 5678",
    mainImage: null,
    tags: ["hotel", "boutique", "vista panorámica", "chimenea"],
    isActive: true,
  },
  {
    id: "artesanias-rdm",
    slug: "artesanias-rdm",
    name: "Artesanías RDM",
    category: "HANDCRAFTS",
    immersionLevel: 1,
    description: "Artesanías locales auténticas: tapetes, cerámica, obsidiana y productos típicos de la región minera.",
    priceRange: "$$",
    address: "Plaza Central #8",
    location: { lat: 20.1385, lng: -98.6755 },
    phone: "+52 771 345 6789",
    mainImage: null,
    tags: ["artesanías", "cerámica", "obsidiana", "tapetes"],
    isActive: true,
  },
  {
    id: "casa-tacos",
    slug: "casa-de-los-tacos",
    name: "La Casa de los Tacos",
    category: "FOOD",
    immersionLevel: 1,
    description: "Tacos tradicionales: carnitas, barbacoa y lengua. El sabor auténtico de Hidalgo a precio accesible.",
    priceRange: "$",
    address: "Calle Juárez #15",
    location: { lat: 20.1388, lng: -98.6748 },
    phone: "+52 771 456 7890",
    mainImage: null,
    tags: ["tacos", "carnitas", "barbacoa", "económico"],
    isActive: true,
  },
  {
    id: "eco-aventuras",
    slug: "eco-aventuras-rdm",
    name: "Eco Aventuras RDM",
    category: "ACTIVITY",
    immersionLevel: 3,
    description: "Tours de ecoturismo, rappelling y senderismo guiado por expertos locales. Aventura a 2,700m de altitud.",
    priceRange: "$$$",
    address: "Camino al Bosque s/n",
    location: { lat: 20.1500, lng: -98.6820 },
    phone: "+52 771 678 9012",
    mainImage: null,
    tags: ["ecoturismo", "rappelling", "senderismo", "aventura"],
    isActive: true,
  },
  {
    id: "bar-portal",
    slug: "bar-el-portal",
    name: "Bar El Portal",
    category: "BAR",
    immersionLevel: 1,
    description: "Bar tradicional con música en vivo los fines de semana. Mezcal artesanal y cerveza de montaña.",
    priceRange: "$$",
    address: "Calle Miguel Hidalgo #5",
    location: { lat: 20.1382, lng: -98.6753 },
    phone: "+52 771 789 0123",
    mainImage: null,
    tags: ["bar", "música", "mezcal", "cerveza artesanal"],
    isActive: true,
  },
  {
    id: "los-portales",
    slug: "restaurante-los-portales",
    name: "Restaurante Los Portales",
    category: "FOOD",
    immersionLevel: 2,
    description: "Comida típica hidalguense en ambiente colonial. Mole, barbacoa, pastes y platillos de la sierra.",
    priceRange: "$$$",
    address: "Portal de San Pedro #3",
    location: { lat: 20.1384, lng: -98.6758 },
    phone: "+52 771 901 2345",
    mainImage: null,
    tags: ["restaurante", "mole", "barbacoa", "colonial"],
    isActive: true,
  },
  {
    id: "tours-historicos",
    slug: "tours-historicos-rdm",
    name: "Tours Históricos RDM",
    category: "ACTIVITY",
    immersionLevel: 2,
    description: "Recorridos guiados a pie por la historia del Pueblo Mágico con actores caracterizados de época.",
    priceRange: "$$",
    address: "Plaza Principal s/n",
    location: { lat: 20.1392, lng: -98.6754 },
    phone: "+52 771 012 3456",
    mainImage: null,
    tags: ["tours", "historia", "teatro", "caminata"],
    isActive: true,
  },
  {
    id: "galeria-arte",
    slug: "galeria-arte-local",
    name: "Galería de Arte Local",
    category: "CULTURE",
    immersionLevel: 1,
    description: "Exhibición y venta de arte local, pintura tradicional y fotografía de la sierra hidalguense.",
    priceRange: "$$",
    address: "Plaza de la Constitución #12",
    location: { lat: 20.1390, lng: -98.6746 },
    phone: "+52 771 890 1234",
    mainImage: null,
    tags: ["arte", "galería", "pintura", "fotografía"],
    isActive: true,
  },
];

merchantsRouter.get("/", (req, res) => {
  const { category } = req.query;
  let result = merchantsData.filter((m) => m.isActive);
  if (category && typeof category === "string") {
    result = result.filter((m) => m.category === category.toUpperCase());
  }
  return res.json(result);
});

merchantsRouter.get("/:slug", (req, res) => {
  const merchant = merchantsData.find(
    (m) => m.slug === req.params.slug || m.id === req.params.slug
  );
  if (!merchant) return res.status(404).json({ error: "Comercio no encontrado." });
  return res.json(merchant);
});

export default merchantsRouter;
