import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-rdm.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Vista aérea de Real del Monte, Hidalgo al atardecer con neblina"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/55 via-background/15 to-transparent" />
      </div>

      {/* Stars overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 40}%`,
              left: `${Math.random() * 100}%`,
              "--duration": `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 3}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pb-20 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="inline-block font-mono text-xs uppercase tracking-widest text-primary mb-4 bg-background/60 px-3 py-1 rounded-full backdrop-blur-sm">
            Pueblo Mágico · 2,700m · Hidalgo, México
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase leading-[0.9] mb-6">
            Navega el
            <br />
            <span className="text-gradient-cyan">Alma</span> de la
            <br />
            Montaña
          </h1>
          <p className="max-w-xl text-slate-700 text-lg leading-relaxed mb-8 bg-background/60 p-4 rounded-2xl backdrop-blur-sm">
            Descubre Real del Monte como nunca antes. Geolocalización en tiempo real,
            asistente IA y un ecosistema digital que conecta la herencia minera con el futuro.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/rutas">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-sovereign bg-primary text-primary-foreground inline-block"
              >
                Explorar Rutas
              </motion.span>
            </Link>
            <Link to="/catalogo">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-sovereign bg-foreground/10 text-foreground border border-foreground/20 inline-block"
              >
                Catálogo Digital
              </motion.span>
            </Link>
          </div>
        </motion.div>

        {/* Live data strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 flex flex-wrap gap-8 font-mono text-xs uppercase tracking-widest text-muted-foreground"
        >
          <span>Clima: <span className="text-foreground">12°C Neblina</span></span>
          <span>Altitud: <span className="text-foreground">2,700m</span></span>
          <span>Nodos Activos: <span className="text-primary">128</span></span>
          <span>Ocupación: <span className="text-secondary">42%</span></span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
