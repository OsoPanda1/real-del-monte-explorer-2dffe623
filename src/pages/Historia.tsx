import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import heroImg from "@/assets/historia-hero.jpg";
import { timelineHistory } from "@/data/rdm-data";
import NavBar from "@/components/NavBar";
import FooterSection from "@/components/FooterSection";
import RealitoOrb from "@/components/RealitoOrb";

const Historia = () => (
  <div className="min-h-screen bg-background text-foreground">
    <NavBar />
    <PageHero
      image={heroImg}
      tag="Desde 1528 · Cinco Siglos de Historia"
      title="Historia"
      highlight="Viva"
      description="De las vetas de plata a la primera huelga de América. La historia de Real del Monte es la historia de México."
      highlightClass="text-gradient-gold"
    />

    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary/20" />

          {timelineHistory.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative flex items-start mb-16 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <div className={`flex-1 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"} pl-20 md:pl-0`}>
                <span className="font-mono text-3xl md:text-5xl font-bold text-primary/30">{item.year}</span>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mt-2 mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
              {/* Node */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary glow-cyan border-2 border-background z-10 mt-2" />
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>

        {/* Notable Figures */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase mb-12">
            Personajes <span className="text-gradient-cyan">Notables</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Pedro Romero de Terreros", role: "Conde de Regla", desc: "Propietario de las minas más ricas de Nueva España. Su fortuna financió la construcción del Monte de Piedad y múltiples obras pías." },
              { name: "Mineros de Cornwall", role: "Ingenieros Británicos, 1824", desc: "Trajeron tecnología de vapor, el juego del fútbol, los pastes y construyeron el emblemático Panteón Inglés." },
              { name: "Los Barreteros de 1766", role: "Héroes Laborales", desc: "Protagonistas de la primera huelga de América. Su valentía estableció precedentes para los derechos laborales en todo el continente." },
            ].map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-surface p-8"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">{person.role}</span>
                <h3 className="text-xl font-semibold mt-2 mb-3">{person.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{person.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
    <FooterSection />
    <RealitoOrb />
  </div>
);

export default Historia;
