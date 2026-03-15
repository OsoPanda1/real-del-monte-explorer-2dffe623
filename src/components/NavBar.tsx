import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-2xl border-b border-foreground/5" : ""
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">R</span>
          </div>
          <span className="font-bold text-sm tracking-tight">
            RDM<span className="text-primary">·</span>X
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <a href="#explorar" className="hover:text-foreground transition-colors">Explorar</a>
          <a href="#comercios" className="hover:text-foreground transition-colors">Comercios</a>
          <a href="#" className="hover:text-foreground transition-colors">Realito AI</a>
        </div>

        <motion.a
          href="#comercios"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-sovereign bg-primary text-primary-foreground text-[10px] px-5 py-2"
        >
          Registrar Negocio
        </motion.a>
      </div>
    </motion.nav>
  );
};

export default NavBar;
