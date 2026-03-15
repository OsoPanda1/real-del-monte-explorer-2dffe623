import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import FooterSection from "@/components/FooterSection";
import RealitoOrb from "@/components/RealitoOrb";

const QuienesSomos = () => (
  <div className="min-h-screen bg-background text-foreground">
    <NavBar />

    <section className="pt-24 pb-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="font-mono text-xs uppercase tracking-widest text-primary mb-3 block">La Visión · El Fundador · La Misión</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-[0.9] mb-8">
            Quiénes <span className="text-gradient-cyan">Somos</span>
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          {/* CEO Bio */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
            <div className="glass-surface-strong p-8 glow-cyan">
              <span className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-4 block">CEO & Fundador</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2">Edwin Oswaldo Castillo Trejo</h2>
              <span className="font-mono text-xs uppercase tracking-widest text-primary block mb-6">Arquitecto Digital · Visionario Tecnológico</span>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Originario de la región de los Pueblos Mágicos de Hidalgo, Edwin Oswaldo Castillo Trejo es un arquitecto digital
                  con la visión de transformar el turismo mexicano a través de la tecnología de nueva generación.
                </p>
                <p>
                  Su misión: crear la primera plataforma de gemelo digital turístico en México, posicionando a Real del Monte
                  como pionero en innovación tecnológica y preservación del patrimonio cultural.
                </p>
                <p>
                  Con experiencia en arquitecturas soberanas, inteligencia artificial y sistemas distribuidos, Edwin lidera
                  el desarrollo del ecosistema RDM Digital desde su concepción hasta su despliegue como la plataforma
                  urbana más avanzada de Latinoamérica.
                </p>
                <p>
                  Su filosofía: <em className="text-foreground">"La tecnología debe servir a la comunidad, no al revés.
                  Cada línea de código que escribimos es un puente entre el patrimonio de nuestros ancestros
                  y el futuro de nuestros hijos."</em>
                </p>
              </div>
            </div>

            <div className="glass-surface p-8">
              <h3 className="text-xl font-bold tracking-tight mb-4">Logros Clave</h3>
              <div className="space-y-3">
                {[
                  "Creación del concepto TAMV (Motor de Conciencia Autónoma)",
                  "Diseño de la Arquitectura Soberana de 7 Capas para RDM-X",
                  "Desarrollo del asistente Realito AI con memoria episódica",
                  "Integración del primer Gemelo Digital turístico de México",
                  "Implementación del sistema de federación de comercios locales",
                ].map((logro, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{logro}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mission & Vision */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
            <div className="glass-surface p-8 glow-gold">
              <span className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-4 block">Misión</span>
              <p className="text-lg leading-relaxed">
                Digitalizar el patrimonio turístico, cultural e histórico de Real del Monte a través de tecnología
                de vanguardia, creando un ecosistema que beneficie a los comercios locales, preserve las tradiciones
                y posicione al pueblo como referente global de innovación turística.
              </p>
            </div>

            <div className="glass-surface p-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary mb-4 block">Visión</span>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Ser la primera plataforma de gemelo digital turístico 100% operativa en México y Latinoamérica,
                estableciendo el estándar para la digitalización soberana de pueblos mágicos y destinos culturales
                en todo el mundo.
              </p>
            </div>

            <div className="glass-surface p-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-4 block">Valores</span>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Soberanía", desc: "Tecnología que pertenece a la comunidad" },
                  { name: "Transparencia", desc: "Código abierto, decisiones públicas" },
                  { name: "Preservación", desc: "Patrimonio digital para las generaciones" },
                  { name: "Innovación", desc: "Tecnología de frontera al servicio local" },
                  { name: "Inclusión", desc: "Acceso digital para todos los comercios" },
                  { name: "Excelencia", desc: "Sin mediocridad, sin atajos, sin excusas" },
                ].map((valor) => (
                  <div key={valor.name}>
                    <h4 className="text-sm font-semibold text-foreground">{valor.name}</h4>
                    <p className="text-xs text-muted-foreground">{valor.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-surface p-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary mb-4 block">Tecnología</span>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "TAMV Kernel", "Leaflet", "Supabase", "Stripe", "Framer Motion", "Tailwind CSS", "AI Gateway", "WebSockets"].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg bg-card/60 border border-foreground/10 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    <FooterSection />
    <RealitoOrb />
  </div>
);

export default QuienesSomos;
