import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import heroImg from "@/assets/gastronomia-hero.jpg";
import NavBar from "@/components/NavBar";
import FooterSection from "@/components/FooterSection";
import RealitoOrb from "@/components/RealitoOrb";

const dishes = [
  { name: "Paste Tradicional", origin: "Cornwall, 1824", desc: "La receta original traída por mineros ingleses, adaptada con papa, carne molida, cebolla y chile. Horneado en horno de leña.", price: "$25-40 MXN", icon: "🥟" },
  { name: "Paste de Frijol con Queso", origin: "Fusión Local", desc: "Variación mexicana del paste original. Frijol negro refritos con queso Oaxaca derretido.", price: "$20-35 MXN", icon: "🫘" },
  { name: "Barbacoa de Borrego", origin: "Tradición Hidalguense", desc: "Cordero envuelto en pencas de maguey, cocido toda la noche bajo tierra. Servido con salsa borracha y tlacoyos.", price: "$120-180 MXN", icon: "🍖" },
  { name: "Mole de Olla", origin: "Cocina Serrana", desc: "Caldo espeso con costilla de res, elote, calabaza, ejotes y chiles secos de la sierra de Hidalgo.", price: "$80-120 MXN", icon: "🍲" },
  { name: "Pulque Curado", origin: "Prehispánico", desc: "Bebida ancestral de maguey, curada con frutas como guayaba, piñón, avena o nuez. De los tlachiqueros locales.", price: "$30-50 MXN", icon: "🥛" },
  { name: "Pan de Pulque", origin: "Colonial", desc: "Pan dulce elaborado con pulque en lugar de levadura. Textura esponjosa y sabor ligeramente ácido único.", price: "$15-25 MXN", icon: "🍞" },
  { name: "Nieve Artesanal", origin: "Tradición Real del Monte", desc: "Nieves de crema, tequila, rompope, pétalos de rosa y sabores exóticos de la sierra. Elaboradas a mano.", price: "$25-45 MXN", icon: "🍨" },
  { name: "Café de Altura", origin: "Sierra Hidalguense", desc: "Café cultivado a 1,800m en la región de Tenango. Tostado artesanal con notas de chocolate y nuez.", price: "$35-60 MXN", icon: "☕" },
];

const Gastronomia = () => (
  <div className="min-h-screen bg-background text-foreground">
    <NavBar />
    <PageHero
      image={heroImg}
      tag="Sabores de la Montaña · Herencia Cornish"
      title="Gastro"
      highlight="nomía"
      description="Del paste inglés al mole hidalguense: 200 años de fusión culinaria a 2,700 metros de altitud."
      highlightClass="text-gradient-gold"
    />

    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary mb-3 block">Menú del Pueblo Mágico</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase">Platillos <span className="text-gradient-gold">Emblemáticos</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {dishes.map((dish, i) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass-surface p-6 flex gap-5 group hover:glow-gold transition-all duration-500"
            >
              <span className="text-4xl flex-shrink-0 mt-1">{dish.icon}</span>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-lg font-semibold tracking-tight">{dish.name}</h3>
                  <span className="font-mono text-xs text-secondary flex-shrink-0 ml-3">{dish.price}</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary block mb-2">{dish.origin}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{dish.desc}</p>
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

export default Gastronomia;
