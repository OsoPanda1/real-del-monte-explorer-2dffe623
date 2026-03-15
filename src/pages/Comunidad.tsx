import { useState } from "react";
import { motion } from "framer-motion";
import { communityPosts } from "@/data/rdm-data";
import NavBar from "@/components/NavBar";
import FooterSection from "@/components/FooterSection";
import RealitoOrb from "@/components/RealitoOrb";

const Comunidad = () => {
  const [newPost, setNewPost] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />

      <section className="pt-24 pb-8">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-mono text-xs uppercase tracking-widest text-primary mb-3 block">Muro Global · Comparte Tu Experiencia</span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-[0.9] mb-4">
              Comunidad <span className="text-gradient-cyan">RDM</span>
            </h1>
            <p className="max-w-xl text-muted-foreground text-lg leading-relaxed">
              Fotos, videos, historias y reseñas de viajeros que han descubierto la magia de Real del Monte.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Post Input */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="glass-surface-strong p-6">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Comparte tu experiencia en Real del Monte..."
              className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground resize-none min-h-[80px] text-sm"
            />
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-foreground/10">
              <div className="flex gap-3">
                <button className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">📷 Foto</button>
                <button className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">🎥 Video</button>
                <button className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">📍 Ubicación</button>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-sovereign bg-primary text-primary-foreground text-[10px] px-5 py-2"
              >
                Publicar
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Feed */}
      <section className="py-8 pb-24">
        <div className="container mx-auto px-6">
          <div className="space-y-4">
            {communityPosts.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-surface p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{post.author[0]}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{post.author}</h4>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary">{post.location}</span>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} className={`text-sm ${j < post.rating ? "text-secondary" : "text-muted"}`}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{post.content}</p>
                <div className="mt-4 flex gap-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <button className="hover:text-foreground transition-colors">❤️ Me gusta</button>
                  <button className="hover:text-foreground transition-colors">💬 Comentar</button>
                  <button className="hover:text-foreground transition-colors">🔗 Compartir</button>
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
};

export default Comunidad;
