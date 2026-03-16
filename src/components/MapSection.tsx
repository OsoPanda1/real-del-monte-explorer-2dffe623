import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useApi } from "@/hooks/useApi";

interface PlaceData {
  id: string;
  slug: string;
  name: string;
  description: string;
  type: string;
  location: { lat: number; lng: number; alt?: number };
  isFeatured: boolean;
}

interface MerchantData {
  id: string;
  name: string;
  category: string;
  description: string;
  location: { lat: number; lng: number } | null;
  isActive: boolean;
}

const typeColors: Record<string, string> = {
  HISTORIC: "#00f3ff",
  MUSEUM: "#ffd700",
  MINE: "#ffd700",
  RELIGIOUS: "#ffd700",
  VIEWPOINT: "#00ff88",
  NATURE: "#00ff88",
  FOOD: "#ff8c00",
  LODGING: "#ff6b9d",
  HANDCRAFTS: "#c084fc",
  ACTIVITY: "#22d3ee",
  BAR: "#f97316",
  CULTURE: "#a78bfa",
};

const typeLabels: Record<string, string> = {
  HISTORIC: "Histórico",
  MUSEUM: "Museo",
  MINE: "Mina",
  RELIGIOUS: "Religioso",
  VIEWPOINT: "Mirador",
  NATURE: "Naturaleza",
  FOOD: "Gastronomía",
  LODGING: "Hospedaje",
  HANDCRAFTS: "Artesanías",
  ACTIVITY: "Actividad",
  BAR: "Bar",
  CULTURE: "Cultura",
};

// Fallback data when API is unavailable
const fallbackPlaces: PlaceData[] = [
  { id: "centro-historico", slug: "centro-historico", name: "Centro Histórico y Plaza Principal", description: "Corazón de Real del Monte, con arquitectura de influencia inglesa y memoria minera viva.", type: "HISTORIC", location: { lat: 20.1407, lng: -98.6725, alt: 2700 }, isFeatured: true },
  { id: "mina-de-acosta", slug: "mina-de-acosta", name: "Mina de Acosta", description: "Mina histórica convertida en museo. Desciende 400m bajo tierra.", type: "MUSEUM", location: { lat: 20.1448, lng: -98.6653, alt: 2720 }, isFeatured: true },
  { id: "panteon-ingles", slug: "panteon-ingles", name: "Panteón Inglés", description: "Único cementerio inglés en Latinoamérica con criptas victorianas.", type: "HISTORIC", location: { lat: 20.1397, lng: -98.6769, alt: 2690 }, isFeatured: true },
  { id: "parroquia-asuncion", slug: "parroquia-asuncion", name: "Parroquia de la Asunción", description: "Iglesia colonial del siglo XVIII con retablos barrocos dorados.", type: "RELIGIOUS", location: { lat: 20.1412, lng: -98.6738, alt: 2700 }, isFeatured: false },
  { id: "museo-medicina", slug: "museo-medicina", name: "Museo de Medicina Laboral", description: "Documenta las condiciones de salud de los mineros.", type: "MUSEUM", location: { lat: 20.1405, lng: -98.6729, alt: 2700 }, isFeatured: false },
  { id: "cristo-rey", slug: "cristo-rey", name: "Cristo Rey (Peña del Zumate)", description: "Vistas panorámicas de 360° del pueblo.", type: "VIEWPOINT", location: { lat: 20.1460, lng: -98.6690, alt: 2780 }, isFeatured: true },
  { id: "mina-dolores", slug: "mina-dolores", name: "Mina de Dolores", description: "Una de las minas más profundas de la región.", type: "MINE", location: { lat: 20.1430, lng: -98.6700, alt: 2730 }, isFeatured: false },
  { id: "bosque-pinos", slug: "bosque-pinos", name: "Bosque de Pinos y Oyameles", description: "Senderismo a 2,700m de altitud.", type: "NATURE", location: { lat: 20.1556, lng: -98.6856, alt: 2750 }, isFeatured: false },
  { id: "mirador-atardecer", slug: "mirador-atardecer", name: "Mirador del Atardecer", description: "Mejor lugar para ver el atardecer.", type: "VIEWPOINT", location: { lat: 20.1489, lng: -98.6711, alt: 2760 }, isFeatured: false },
];

const fallbackMerchants: MerchantData[] = [
  { id: "pasteria-portal", name: "Pastería El Portal", category: "FOOD", description: "Pastes tradicionales con receta córnica.", location: { lat: 20.1409, lng: -98.6723 }, isActive: true },
  { id: "mina-coffee", name: "Mina Coffee House", category: "FOOD", description: "Café artesanal en ambiente colonial.", location: { lat: 20.1391, lng: -98.6752 }, isActive: true },
  { id: "hotel-real", name: "Hotel Real del Monte", category: "LODGING", description: "Hotel boutique con vista panorámica.", location: { lat: 20.1456, lng: -98.6800 }, isActive: true },
  { id: "eco-aventuras", name: "Eco Aventuras RDM", category: "ACTIVITY", description: "Tours de ecoturismo y rappelling.", location: { lat: 20.1500, lng: -98.6820 }, isActive: true },
  { id: "bar-portal", name: "Bar El Portal", category: "BAR", description: "Bar con música en vivo.", location: { lat: 20.1382, lng: -98.6753 }, isActive: true },
];

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const { data: apiPlaces } = useApi<PlaceData[]>("/api/places");
  const { data: apiMerchants } = useApi<MerchantData[]>("/api/merchants");

  const places = apiPlaces ?? fallbackPlaces;
  const merchants = apiMerchants ?? fallbackMerchants;

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [20.1410, -98.6735],
      zoom: 15,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Add places
    places.forEach((place) => {
      if (activeFilter && place.type !== activeFilter) return;
      const color = typeColors[place.type] ?? "#00f3ff";
      const label = typeLabels[place.type] ?? place.type;
      const size = place.isFeatured ? 16 : 12;

      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="
          width: ${size}px; height: ${size}px; border-radius: 50%;
          background: ${color}; border: 2px solid rgba(0,0,0,0.5);
          box-shadow: 0 0 14px ${color}80;
          animation: nodePulse 3s ease-in-out infinite;
        "></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      L.marker([place.location.lat, place.location.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="
            background: #0d0d0d; color: #f0f0f0; padding: 14px 18px;
            border-radius: 14px; border: 1px solid rgba(255,255,255,0.1);
            font-family: 'Inter', sans-serif; min-width: 180px;
          ">
            <div style="font-size:9px; text-transform:uppercase; letter-spacing:0.15em; color:${color}; font-family:'IBM Plex Mono',monospace;">${label}</div>
            <div style="font-size:15px; font-weight:600; margin-top:4px;">${place.name}</div>
            <div style="font-size:12px; color:#999; margin-top:6px; line-height:1.4;">${place.description.substring(0, 120)}…</div>
            ${place.location.alt ? `<div style="font-size:10px; color:#666; margin-top:6px; font-family:'IBM Plex Mono',monospace;">${place.location.alt}m s.n.m.</div>` : ""}
          </div>`,
          { className: "rdm-popup", closeButton: false }
        );
    });

    // Add merchants
    merchants.forEach((merchant) => {
      if (!merchant.location || !merchant.isActive) return;
      if (activeFilter && merchant.category !== activeFilter) return;
      const color = typeColors[merchant.category] ?? "#ff8c00";
      const label = typeLabels[merchant.category] ?? merchant.category;

      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="
          width: 10px; height: 10px; border-radius: 50%;
          background: ${color}; border: 1.5px solid rgba(0,0,0,0.4);
          box-shadow: 0 0 10px ${color}60;
          animation: nodePulse 4s ease-in-out infinite;
        "></div>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
      });

      L.marker([merchant.location.lat, merchant.location.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="
            background: #0d0d0d; color: #f0f0f0; padding: 14px 18px;
            border-radius: 14px; border: 1px solid rgba(255,255,255,0.1);
            font-family: 'Inter', sans-serif; min-width: 170px;
          ">
            <div style="font-size:9px; text-transform:uppercase; letter-spacing:0.15em; color:${color}; font-family:'IBM Plex Mono',monospace;">Comercio · ${label}</div>
            <div style="font-size:15px; font-weight:600; margin-top:4px;">${merchant.name}</div>
            <div style="font-size:12px; color:#999; margin-top:6px; line-height:1.4;">${merchant.description.substring(0, 100)}…</div>
          </div>`,
          { className: "rdm-popup", closeButton: false }
        );
    });

    setMapReady(true);

    return () => {
      map.remove();
    };
  }, [places, merchants, activeFilter]);

  const filterOptions = [
    { key: null, label: "Todos" },
    { key: "HISTORIC", label: "Histórico" },
    { key: "MUSEUM", label: "Museos" },
    { key: "VIEWPOINT", label: "Miradores" },
    { key: "NATURE", label: "Naturaleza" },
    { key: "FOOD", label: "Gastronomía" },
    { key: "LODGING", label: "Hospedaje" },
  ];

  return (
    <section className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-primary mb-3 block">
            Gemelo Digital · Capa de Datos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">
            Mapa <span className="text-gradient-cyan">en Tiempo Real</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg">
            Cada nodo representa un punto de interés activo con telemetría del gemelo digital.
            Los comercios verificados brillan con más intensidad.
          </p>
        </motion.div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-6 font-mono text-[10px] uppercase tracking-widest">
          {filterOptions.map((opt) => (
            <button
              key={opt.key ?? "all"}
              onClick={() => setActiveFilter(opt.key)}
              className={`px-3 py-1.5 rounded-lg transition-all border border-border ${
                activeFilter === opt.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-card/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-surface overflow-hidden glow-cyan"
        >
          <div ref={mapRef} className="w-full h-[500px] md:h-[600px]" />
          {!mapReady && (
            <div className="absolute inset-0 shimmer-terrain" />
          )}
        </motion.div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-6 font-mono text-xs uppercase tracking-widest">
          {[
            { label: "Museos/Minas", color: "bg-secondary" },
            { label: "Histórico", color: "bg-primary" },
            { label: "Miradores", colorHex: "#00ff88" },
            { label: "Gastronomía", colorHex: "#ff8c00" },
            { label: "Hospedaje", colorHex: "#ff6b9d" },
            { label: "Comercios", colorHex: "#c084fc" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className={`w-2.5 h-2.5 rounded-full ${item.color ?? ""}`}
                style={item.colorHex ? { backgroundColor: item.colorHex } : {}}
              />
              <span className="text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Live stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap gap-8 font-mono text-xs uppercase tracking-widest text-muted-foreground"
        >
          <span>
            Nodos:{" "}
            <span className="text-primary">{places.length + merchants.length}</span>
          </span>
          <span>
            Lugares: <span className="text-foreground">{places.length}</span>
          </span>
          <span>
            Comercios: <span className="text-secondary">{merchants.length}</span>
          </span>
          <span>
            Altitud: <span className="text-foreground">2,700m</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
