import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Heart } from "lucide-react";

const navItems = [
  { label: "Historia", path: "/historia" },
  { label: "Gastronomía", path: "/gastronomia" },
  { label: "Cultura", path: "/cultura" },
  { label: "Rutas", path: "/rutas" },
  { label: "Comercios", path: "/catalogo" },
  { label: "Eventos", path: "/eventos" },
  { label: "TAMV", path: "/tamv" },
  { label: "Tenochtitlán", path: "/tenochtitlan" },
  { label: "Mapa Vivo", path: "/#mapa" },
];

const chapters = [
  { id: "inicio", label: "Inicio", preview: "Portal", path: "/" },
  { id: "historia", label: "Historia Minera", preview: "Capítulo I", path: "/historia" },
  { id: "gastronomia", label: "Gastronomía", preview: "Sabores", path: "/gastronomia" },
  { id: "cultura", label: "Cultura y Leyendas", preview: "Identidad", path: "/cultura" },
  { id: "arte", label: "Arte", preview: "Creación", path: "/arte" },
  { id: "rutas", label: "Rutas Turísticas", preview: "Experiencias", path: "/rutas" },
  { id: "ecoturismo", label: "Ecoturismo", preview: "Naturaleza", path: "/ecoturismo" },
  { id: "relatos", label: "Mitos y Leyendas", preview: "Relatos", path: "/relatos" },
  { id: "dichos", label: "Dichos Mineros", preview: "Tradición", path: "/dichos" },
  { id: "comercios", label: "Catálogo Digital", preview: "Comercios", path: "/catalogo" },
  { id: "eventos", label: "Eventos", preview: "Agenda", path: "/eventos" },
  { id: "comunidad", label: "Muro Global", preview: "Comunidad", path: "/comunidad" },
  { id: "nosotros", label: "Quiénes Somos", preview: "Equipo", path: "/quienes-somos" },
  { id: "tamv", label: "TAMV Civilization Hub", preview: "Nodo Cero", path: "/tamv" },
  { id: "tenochtitlan", label: "System Tenochtitlán", preview: "Kernel", path: "/tenochtitlan" },
  { id: "apoya", label: "Apoya RDM", preview: "Donaciones", path: "/donar" },
];

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "glass-nav" : ""
        }`}
      >
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full flex items-center justify-center pulse-gold"
            style={{ background: "radial-gradient(circle, hsl(43, 80%, 55%), hsl(43, 60%, 35%))" }}>
            <span className="text-sm font-display font-bold" style={{ color: "hsl(220, 45%, 8%)" }}>R</span>
          </div>
          <div>
            <span className="font-display text-base text-foreground tracking-wide group-hover:text-gradient-gold transition-all">
              RDM Digital
            </span>
            <span className="font-body text-[8px] tracking-[0.3em] uppercase text-[hsl(var(--gold))]/60 block -mt-0.5">
              Real del Monte
            </span>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-body text-[11px] tracking-[0.12em] uppercase transition-colors duration-300 ${
                location.pathname === item.path ? "text-[hsl(var(--gold))]" : "text-muted-foreground hover:text-[hsl(var(--gold))]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/donar"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-gold font-body text-[11px] tracking-wider uppercase text-[hsl(var(--gold))] hover:bg-[hsla(43,80%,55%,0.1)] transition-all"
          >
            <Heart className="w-3 h-3" /> Apoya
          </Link>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="font-body text-[11px] tracking-[0.3em] uppercase text-muted-foreground hover:text-[hsl(var(--gold))] transition-colors duration-500 flex items-center gap-2 xl:hidden"
        >
          <span className="hidden sm:inline">{menuOpen ? "Cerrar" : "Índice"}</span>
          <div className="flex flex-col gap-1 w-5">
            <motion.div animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 5 : 0 }} className="w-full h-[1px]" style={{ background: "hsl(var(--gold))" }} />
            <motion.div animate={{ opacity: menuOpen ? 0 : 1 }} className="w-full h-[1px] bg-[hsl(var(--gold))]/60" />
            <motion.div animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -5 : 0 }} className="w-full h-[1px]" style={{ background: "hsl(var(--gold))" }} />
          </div>
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, hsla(220, 30%, 5%, 0.97), hsla(220, 35%, 3%, 0.99))",
              backdropFilter: "blur(30px)",
            }}
          >
            <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
            <nav className="text-center space-y-4 relative z-10 max-h-[80vh] overflow-y-auto py-8">
              {chapters.map((ch, i) => (
                <motion.div
                  key={ch.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                >
                  <Link
                    to={ch.path}
                    className={`flex items-center gap-4 mx-auto group ${
                      location.pathname === ch.path ? "opacity-100" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <span className="font-body text-[10px] tracking-[0.3em] uppercase text-[hsl(var(--gold))]/40 w-24 text-right group-hover:text-[hsl(var(--gold))]/80 transition-colors">
                      {ch.preview}
                    </span>
                    <span className="w-px h-8 bg-gradient-to-b from-transparent via-[hsl(var(--gold))]/30 to-transparent" />
                    <span className={`font-display text-2xl md:text-4xl tracking-tight transition-colors duration-500 ${
                      location.pathname === ch.path ? "text-gradient-gold" : "text-foreground/80 hover:text-gradient-gold"
                    }`}>
                      {ch.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
