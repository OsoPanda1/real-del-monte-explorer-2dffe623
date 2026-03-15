import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import heroImg from "@/assets/arte-hero.jpg";
import NavBar from "@/components/NavBar";
import FooterSection from "@/components/FooterSection";
import RealitoOrb from "@/components/RealitoOrb";

const artForms = [
  { title: "Platería Artesanal", desc: "Más de 400 años de tradición platera. Artesanos locales transforman plata de ley en piezas únicas: aretes, collares, anillos y esculturas que reflejan la herencia minera del pueblo.", icon: "💎" },
  { title: "Pintura y Muralismo", desc: "Artistas locales capturan los paisajes neblinosos, las calles coloniales y la vida cotidiana del pueblo en óleos, acuarelas y murales que decoran fachadas del centro.", icon: "🎨" },
  { title: "Textiles y Bordados", desc: "Técnicas prehispánicas de bordado se fusionan con patrones coloniales. Rebozos, tapetes y manteles con diseños únicos de la sierra hidalguense.", icon: "🧵" },
  { title: "Cerámica de Barro", desc: "Cerámica utilitaria y decorativa con técnicas ancestrales. Ollas, cazuelas y piezas ornamentales cocidas en hornos de leña tradicionales.", icon: "🏺" },
  { title: "Cantería y Escultura", desc: "El trabajo en cantera rosa y piedra volcánica tiene siglos de tradición. Desde marcos de puertas coloniales hasta esculturas contemporáneas.", icon: "🗿" },
  { title: "Fotografía Documental", desc: "Archivo fotográfico vivo que documenta la evolución del pueblo desde las primeras cámaras del siglo XIX hasta la fotografía artística contemporánea.", icon: "📸" },
];

const Arte = () => (
  <div className="min-h-screen bg-background text-foreground">
    <NavBar />
    <PageHero
      image={heroImg}
      tag="Expresión · Herencia · Creación"
      title="Arte"
      highlight="& Artesanía"
      description="La plata, el barro, el hilo y el color: las manos de Real del Monte transforman materiales en patrimonio."
    />

    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artForms.map((art, i) => (
            <motion.div
              key={art.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-surface p-8 group hover:glow-cyan transition-all duration-500"
            >
              <span className="text-4xl mb-4 block">{art.icon}</span>
              <h3 className="text-xl font-bold tracking-tight mb-3">{art.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{art.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Gallery CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 glass-surface-strong p-12 text-center glow-cyan"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase mb-4">
            Galería <span className="text-gradient-cyan">Digital</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Próximamente: una galería virtual inmersiva donde podrás explorar las obras de los artistas locales en 360°.
          </p>
          <span className="font-mono text-xs uppercase tracking-widest text-primary">Próximamente · TAMV Kernel</span>
        </motion.div>
      </div>
    </section>
    <FooterSection />
    <RealitoOrb />
  </div>
);

export default Arte;
