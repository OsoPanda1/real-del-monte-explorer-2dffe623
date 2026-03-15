import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import heroImg from "@/assets/eventos-hero.jpg";
import { events } from "@/data/rdm-data";
import NavBar from "@/components/NavBar";
import FooterSection from "@/components/FooterSection";
import RealitoOrb from "@/components/RealitoOrb";

const Eventos = () => {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? events : events.slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <PageHero
        image={heroImg}
        tag="Calendario · Fiestas · Festivales"
        title="Eventos"
        highlight="& Fiestas"
        description="La agenda cultural de Real del Monte: festivales, ferias, conciertos y celebraciones que mantienen viva la tradición."
        highlightClass="text-gradient-gold"
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`glass-surface p-6 group transition-all duration-500 ${event.isFeatured ? "glow-gold border-secondary/20" : "hover:glow-cyan"}`}
              >
                {event.isFeatured && (
                  <span className="inline-block font-mono text-[9px] uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full mb-3">
                    ⭐ Destacado
                  </span>
                )}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-mono uppercase text-primary leading-none">
                      {new Date(event.startDate).toLocaleDateString("es-MX", { month: "short" })}
                    </span>
                    <span className="text-lg font-bold text-primary leading-none">
                      {new Date(event.startDate).getDate()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{event.title}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{event.location}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-primary">
                  {event.startDate === event.endDate
                    ? new Date(event.startDate).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })
                    : `${new Date(event.startDate).toLocaleDateString("es-MX", { day: "numeric", month: "short" })} — ${new Date(event.endDate).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}`
                  }
                </div>
              </motion.div>
            ))}
          </div>

          {events.length > 6 && (
            <div className="mt-12 text-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAll(!showAll)}
                className="btn-sovereign bg-primary text-primary-foreground"
              >
                {showAll ? "Ver Menos" : `Ver Todos (${events.length})`}
              </motion.button>
            </div>
          )}
        </div>
      </section>
      <FooterSection />
      <RealitoOrb />
    </div>
  );
};

export default Eventos;
