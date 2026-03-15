import { useState } from "react";
import { motion } from "framer-motion";
import { businesses } from "@/data/rdm-data";
import NavBar from "@/components/NavBar";
import FooterSection from "@/components/FooterSection";
import RealitoOrb from "@/components/RealitoOrb";

const categories = ["Todos", "Restaurante", "Hotel", "Tienda", "Bar", "Actividad", "Cultura", "Repostería"];

const Catalogo = () => {
  const [filter, setFilter] = useState("Todos");
  const filtered = filter === "Todos" ? businesses : businesses.filter((b) => b.category === filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />

      <section className="pt-24 pb-8">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-mono text-xs uppercase tracking-widest text-secondary mb-3 block">Directorio Verificado</span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-[0.9] mb-4">
              Catálogo <span className="text-gradient-gold">Digital</span>
            </h1>
            <p className="max-w-xl text-muted-foreground text-lg">
              Comercios, restaurantes, hoteles y servicios verificados de Real del Monte.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-widest transition-all border-t border-foreground/10 ${
                  filter === cat ? "bg-primary text-primary-foreground" : "bg-card/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-8 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((biz, i) => (
              <motion.div
                key={biz.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`glass-surface p-6 group transition-all duration-500 ${biz.isPremium ? "glow-gold border-secondary/20" : "hover:glow-cyan"}`}
              >
                {biz.isPremium && (
                  <span className="inline-block font-mono text-[9px] uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full mb-3">
                    ⭐ Premium
                  </span>
                )}
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary block mb-1">{biz.category}</span>
                <h3 className="text-xl font-semibold tracking-tight mb-2">{biz.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{biz.description}</p>
                <div className="space-y-1 font-mono text-[10px] text-muted-foreground">
                  {biz.address && <p>📍 {biz.address}</p>}
                  <p>📞 {biz.phone}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No se encontraron negocios en esta categoría.</p>
            </div>
          )}
        </div>
      </section>
      <FooterSection />
      <RealitoOrb />
    </div>
  );
};

export default Catalogo;
