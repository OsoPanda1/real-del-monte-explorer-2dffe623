import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const landmarks = [
  { name: "Museo de Mina La Acosta", lat: 20.1421, lng: -98.6722, type: "museo", color: "#ffd700" },
  { name: "Plaza Principal", lat: 20.1408, lng: -98.6741, type: "histórico", color: "#00f3ff" },
  { name: "Panteón Inglés", lat: 20.1385, lng: -98.6773, type: "histórico", color: "#00f3ff" },
  { name: "Parroquia de la Asunción", lat: 20.1412, lng: -98.6738, type: "religioso", color: "#ffd700" },
  { name: "Museo de Medicina Laboral", lat: 20.1405, lng: -98.6729, type: "museo", color: "#ffd700" },
  { name: "Cristo Rey (Peña del Zumate)", lat: 20.1460, lng: -98.6690, type: "ecoturismo", color: "#00ff88" },
  { name: "Pastes El Portal", lat: 20.1410, lng: -98.6735, type: "gastronomía", color: "#ff8c00" },
  { name: "Mina de Dolores", lat: 20.1430, lng: -98.6700, type: "museo", color: "#ffd700" },
];

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);

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

    landmarks.forEach((lm) => {
      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="
          width: 14px; height: 14px; border-radius: 50%;
          background: ${lm.color}; border: 2px solid rgba(0,0,0,0.5);
          box-shadow: 0 0 12px ${lm.color}80;
          animation: nodePulse 3s ease-in-out infinite;
        "></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      L.marker([lm.lat, lm.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="
            background: #0d0d0d; color: #f0f0f0; padding: 12px 16px;
            border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);
            font-family: 'Inter', sans-serif; min-width: 160px;
          ">
            <div style="font-size:9px; text-transform:uppercase; letter-spacing:0.15em; color:${lm.color}; font-family:'IBM Plex Mono',monospace;">${lm.type}</div>
            <div style="font-size:14px; font-weight:600; margin-top:4px;">${lm.name}</div>
          </div>`,
          { className: "rdm-popup", closeButton: false }
        );
    });

    setMapReady(true);

    return () => {
      map.remove();
    };
  }, []);

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
            Gemelo Digital
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">
            Mapa <span className="text-gradient-cyan">en Tiempo Real</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg">
            Cada nodo representa un punto de interés activo. Los comercios verificados brillan con más intensidad.
          </p>
        </motion.div>

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
            { label: "Museos", color: "bg-secondary" },
            { label: "Histórico", color: "bg-primary" },
            { label: "Ecoturismo", color: "bg-emerald-400" },
            { label: "Gastronomía", color: "bg-heritage-warm" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
              <span className="text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MapSection;
