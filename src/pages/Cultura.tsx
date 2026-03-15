import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import heroImg from "@/assets/cultura-hero.jpg";
import NavBar from "@/components/NavBar";
import FooterSection from "@/components/FooterSection";
import RealitoOrb from "@/components/RealitoOrb";

const traditions = [
  { title: "El Paste", icon: "🥟", desc: "Herencia directa de los mineros de Cornwall, Inglaterra (1824). La receta original se adaptó con ingredientes mexicanos: papa, carne, chile y frijol. Hoy es el símbolo gastronómico del pueblo." },
  { title: "Día de Muertos en el Panteón Inglés", icon: "💀", desc: "Celebración única donde se honra a los mineros ingleses con ofrendas que mezclan tradiciones victorianas y mexicanas en el único panteón inglés de Latinoamérica." },
  { title: "Fútbol: El Primer Partido en México", icon: "⚽", desc: "En 1827, los mineros ingleses jugaron el primer partido de fútbol en suelo mexicano en las explanadas de Real del Monte, décadas antes de que el deporte se popularizara." },
  { title: "La Música de Banda Minera", icon: "🎺", desc: "Las bandas de viento nacieron en las comunidades mineras. Sus sones y marchas acompañan procesiones, fiestas patronales y celebraciones desde el siglo XVIII." },
  { title: "Arquitectura Cornish-Colonial", icon: "🏘️", desc: "La fusión única entre la arquitectura colonial española y las casas de piedra estilo Cornwall creó un paisaje urbano irrepetible en México." },
  { title: "La Platería Hidalguense", icon: "💎", desc: "La tradición platera de Real del Monte y Pachuca tiene más de 400 años. Los artesanos locales transforman la plata en joyería de clase mundial." },
];

const Cultura = () => (
  <div className="min-h-screen bg-background text-foreground">
    <NavBar />
    <PageHero
      image={heroImg}
      tag="Patrimonio Inmaterial · Herencia Bicultural"
      title="Cultura"
      highlight="& Tradición"
      description="Donde la herencia inglesa y la identidad mexicana se fundieron en algo único: la cultura de Real del Monte."
      highlightClass="text-gradient-gold"
    />

    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {traditions.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-surface p-8 group hover:glow-gold transition-all duration-500"
            >
              <span className="text-4xl mb-4 block">{t.icon}</span>
              <h3 className="text-xl font-bold tracking-tight mb-3">{t.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Cultural Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center max-w-3xl mx-auto"
        >
          <blockquote className="text-2xl md:text-3xl font-light italic text-foreground/80 leading-relaxed">
            "Real del Monte no es solo un lugar, es un encuentro entre dos mundos que creó algo que ninguno de los dos podría haber imaginado solo."
          </blockquote>
          <cite className="mt-6 block font-mono text-xs uppercase tracking-widest text-primary">
            — Tradición Oral, Real del Monte
          </cite>
        </motion.div>
      </div>
    </section>
    <FooterSection />
    <RealitoOrb />
  </div>
);

export default Cultura;
