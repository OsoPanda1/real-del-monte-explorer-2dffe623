import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import heroImg from "@/assets/relatos-hero.jpg";
import { relatos } from "@/data/rdm-data";
import NavBar from "@/components/NavBar";
import FooterSection from "@/components/FooterSection";
import RealitoOrb from "@/components/RealitoOrb";

const categoryColors: Record<string, string> = {
  Leyenda: "text-secondary",
  Fantasma: "text-destructive",
  Historia: "text-primary",
  Tradición: "text-heritage-warm",
};

const Relatos = () => (
  <div className="min-h-screen bg-background text-foreground">
    <NavBar />
    <PageHero
      image={heroImg}
      tag="Mitos · Leyendas · Fantasmas"
      title="Relatos"
      highlight="Oscuros"
      description="Las historias que se cuentan cuando la neblina baja y las velas parpadean. Mitos y leyendas de Real del Monte."
      highlightClass="text-gradient-gold"
    />

    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="space-y-8">
          {relatos.map((relato, i) => (
            <motion.div
              key={relato.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-surface p-8 md:p-10 group hover:glow-gold transition-all duration-500"
            >
              <span className={`font-mono text-[10px] uppercase tracking-widest ${categoryColors[relato.category] || "text-primary"}`}>
                {relato.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-2 mb-4">{relato.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg italic">"{relato.excerpt}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-8 h-px bg-primary/50" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Tradición Oral · Real del Monte</span>
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

export default Relatos;
