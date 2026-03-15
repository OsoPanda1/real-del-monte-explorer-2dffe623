import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import heroImg from "@/assets/historia-hero.jpg";
import { routes } from "@/data/rdm-data";
import NavBar from "@/components/NavBar";
import FooterSection from "@/components/FooterSection";
import RealitoOrb from "@/components/RealitoOrb";

const Rutas = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <PageHero
        image={heroImg}
        tag="9 Rutas Temáticas · Explora a Tu Ritmo"
        title="Rutas"
        highlight="Turísticas"
        description="Patrimonio, gastronomía, aventura, romance, cerveza, plata y más. Cada ruta es una historia diferente."
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route, i) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setSelected(selected === route.id ? null : route.id)}
                className="glass-surface overflow-hidden cursor-pointer group hover:glow-cyan transition-all duration-500"
              >
                <div className={`h-1.5 bg-gradient-to-r ${route.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
                <div className="p-6">
                  <span className="text-3xl mb-3 block">{route.icon}</span>
                  <h3 className="text-xl font-bold tracking-tight mb-1">{route.name}</h3>
                  <div className="flex gap-4 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary">{route.difficulty}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{route.duration}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{route.distance}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{route.description}</p>

                  {selected === route.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="border-t border-foreground/10 pt-4"
                    >
                      <span className="font-mono text-[9px] uppercase tracking-widest text-secondary mb-3 block">Puntos del Recorrido</span>
                      <div className="space-y-2">
                        {route.points.map((point, j) => (
                          <div key={j} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">{j + 1}</div>
                            <span className="text-sm">{point}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
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
};

export default Rutas;
