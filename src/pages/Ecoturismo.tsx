import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import heroImg from "@/assets/ecoturismo-hero.jpg";
import NavBar from "@/components/NavBar";
import FooterSection from "@/components/FooterSection";
import RealitoOrb from "@/components/RealitoOrb";

const activities = [
  { name: "Senderismo en Bosque de Oyamel", difficulty: "Moderada", duration: "3-4 hrs", desc: "Camina entre bosques de oyamel y pino a 2,700m de altitud. Aire puro de montaña, aves endémicas y vistas panorámicas.", icon: "🥾" },
  { name: "Rappel en Peña del Zumate", difficulty: "Difícil", duration: "2 hrs", desc: "Descenso vertical de 40m por la peña rocosa con vista al pueblo. Equipo profesional y guías certificados.", icon: "🧗" },
  { name: "Ciclismo de Montaña", difficulty: "Moderada", duration: "2-3 hrs", desc: "Rutas por los senderos de la sierra con descensos técnicos y paisajes que quitan el aliento.", icon: "🚵" },
  { name: "Observación de Aves", difficulty: "Fácil", duration: "2 hrs", desc: "Más de 50 especies de aves habitan la zona. Colibríes, pájaros carpinteros y aves rapaces de la sierra hidalguense.", icon: "🦅" },
  { name: "Cabalgata por la Sierra", difficulty: "Fácil", duration: "1.5 hrs", desc: "Recorrido a caballo por senderos ancestrales con vistas al Valle del Mezquital y los bosques de coníferas.", icon: "🐴" },
  { name: "Camping bajo las Estrellas", difficulty: "Fácil", duration: "Noche completa", desc: "Cielo limpio a 2,700m sin contaminación lumínica. Fogatas, historias y el sonido del bosque.", icon: "⛺" },
  { name: "Tirolesa entre Montañas", difficulty: "Moderada", duration: "1 hr", desc: "1.2 km de cables entre cimas. Vuelo sobre el bosque con adrenalina pura y paisajes cinematográficos.", icon: "🪂" },
  { name: "Recorrido por Cascadas", difficulty: "Moderada", duration: "3 hrs", desc: "Descubre las cascadas ocultas de la sierra, alimentadas por manantiales de montaña cristalinos.", icon: "💧" },
];

const Ecoturismo = () => (
  <div className="min-h-screen bg-background text-foreground">
    <NavBar />
    <PageHero
      image={heroImg}
      tag="Naturaleza · Aventura · 2,700m"
      title="Eco"
      highlight="turismo"
      description="Bosques de oyamel, cascadas ocultas y cielos estrellados. La aventura comienza donde termina la neblina."
    />

    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          {activities.map((act, i) => (
            <motion.div
              key={act.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass-surface p-6 flex gap-5 group hover:glow-cyan transition-all duration-500"
            >
              <span className="text-4xl flex-shrink-0 mt-1">{act.icon}</span>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-lg font-semibold tracking-tight">{act.name}</h3>
                </div>
                <div className="flex gap-4 mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary">{act.difficulty}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{act.duration}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{act.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <FooterSection />
    <RealitoOrb />
  </div>
);

export default Ecoturismo;
