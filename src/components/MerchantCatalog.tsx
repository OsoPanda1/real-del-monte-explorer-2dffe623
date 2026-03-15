import { motion } from "framer-motion";
import { useState } from "react";

const categories = [
  { type: "Hoteles", price: 500, color: "from-secondary to-yellow-300", tier: "L1", icon: "🏨" },
  { type: "Camiones Rojos", price: 500, color: "from-destructive to-red-400", tier: "L1", icon: "🚌" },
  { type: "Racers", price: 500, color: "from-destructive to-orange-400", tier: "L1", icon: "🏎️" },
  { type: "Pasterías", price: 400, color: "from-heritage-warm to-orange-300", tier: "L2", icon: "🥟" },
  { type: "Cuatrimotos", price: 400, color: "from-heritage-warm to-yellow-400", tier: "L2", icon: "🏍️" },
  { type: "Platerías", price: 350, color: "from-silver-chrome to-gray-300", tier: "L2", icon: "💎" },
  { type: "Bares", price: 350, color: "from-silver-chrome to-blue-300", tier: "L2", icon: "🍸" },
  { type: "Restaurantes", price: 300, color: "from-primary to-cyan-300", tier: "L2", icon: "🍽️" },
  { type: "Artesanías", price: 300, color: "from-primary to-teal-300", tier: "L2", icon: "🎨" },
  { type: "Recorridos Teatrales", price: 300, color: "from-primary to-indigo-400", tier: "L2", icon: "🎭" },
  { type: "Abarrotes / Misceláneas", price: 250, color: "from-muted-foreground to-gray-400", tier: "L3", icon: "🏪" },
  { type: "Góndolas (Semifijo)", price: 150, color: "from-muted-foreground to-gray-500", tier: "L3", icon: "🛒" },
];

const extras = [
  { label: "Publicidad en todas las unidades (Camiones Rojos)", price: "Incluido" },
  { label: "Publicidad personalizada en camión específico", price: "+$150 MXN" },
];

const MerchantCatalog = () => {
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter ? categories.filter((c) => c.tier === filter) : categories;

  return (
    <section id="comercios" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-secondary mb-3 block">
            Catálogo Soberano
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">
            Únete a la <span className="text-gradient-gold">Federación</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Registra tu negocio en el ecosistema digital de Real del Monte. Solo los comercios verificados aparecen en el Gemelo Digital.
          </p>
        </motion.div>

        {/* Tier filters */}
        <div className="flex gap-3 mb-8 font-mono text-xs uppercase tracking-widest">
          {[null, "L1", "L2", "L3"].map((tier) => (
            <button
              key={tier ?? "all"}
              onClick={() => setFilter(tier)}
              className={`px-4 py-2 rounded-lg transition-all border-t border-foreground/10 ${
                filter === tier
                  ? "bg-primary text-primary-foreground"
                  : "bg-card/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {tier ?? "Todos"}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((cat, i) => (
            <motion.div
              key={cat.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -5 }}
              className="relative p-6 glass-surface overflow-hidden group cursor-pointer"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${cat.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
              <div className="text-2xl mb-3">{cat.icon}</div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                Nivel {cat.tier}
              </span>
              <h3 className="text-lg font-semibold tracking-tight mt-1 mb-4">{cat.type}</h3>
              <div className="flex justify-between items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-sovereign bg-foreground text-background text-[10px] px-4 py-2"
                >
                  Registrar
                </motion.button>
                <span className="font-mono text-[10px] text-muted-foreground">
                  ${cat.price} MXN / mes
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Extras */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 glass-surface p-6"
        >
          <h4 className="font-mono text-xs uppercase tracking-widest text-secondary mb-4">
            Servicios adicionales
          </h4>
          <div className="space-y-3">
            {extras.map((extra) => (
              <div key={extra.label} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{extra.label}</span>
                <span className="font-mono text-xs text-foreground">{extra.price}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MerchantCatalog;
