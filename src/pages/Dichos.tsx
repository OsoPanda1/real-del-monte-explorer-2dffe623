import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import heroImg from "@/assets/dichos-hero.jpg";
import { dichos } from "@/data/rdm-data";
import NavBar from "@/components/NavBar";
import FooterSection from "@/components/FooterSection";
import RealitoOrb from "@/components/RealitoOrb";

const Dichos = () => (
  <div className="min-h-screen bg-background text-foreground">
    <NavBar />
    <PageHero
      image={heroImg}
      tag="Sabiduría Minera · Lenguaje Vivo"
      title="Dichos"
      highlight="Mineros"
      description="El lenguaje de los barreteros, gambusinos y malacateros que trabajaron la plata durante siglos."
      highlightClass="text-gradient-gold"
    />

    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="space-y-6">
          {dichos.map((d, i) => (
            <motion.div
              key={d.dicho}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-surface p-8 md:p-10 group hover:glow-gold transition-all duration-500"
            >
              <div className="flex items-start gap-6">
                <span className="text-4xl md:text-5xl font-bold text-primary/20 flex-shrink-0 font-mono leading-none">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight italic mb-3">"{d.dicho}"</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">{d.significado}</p>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">{d.origen}</span>
                </div>
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

export default Dichos;
