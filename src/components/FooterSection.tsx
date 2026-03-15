import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="border-t border-foreground/5 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">R</span>
              </div>
              <span className="font-bold text-sm tracking-tight">
                RDM<span className="text-primary">·</span>X
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              La primera plataforma urbana 100% digitalizada de México. Real del Monte, Hidalgo.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-4">Explorar</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="/historia" className="block hover:text-foreground transition-colors">Historia</Link>
              <Link to="/cultura" className="block hover:text-foreground transition-colors">Cultura</Link>
              <Link to="/arte" className="block hover:text-foreground transition-colors">Arte</Link>
              <Link to="/gastronomia" className="block hover:text-foreground transition-colors">Gastronomía</Link>
              <Link to="/ecoturismo" className="block hover:text-foreground transition-colors">Ecoturismo</Link>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-4">Descubrir</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="/rutas" className="block hover:text-foreground transition-colors">Rutas Turísticas</Link>
              <Link to="/relatos" className="block hover:text-foreground transition-colors">Mitos y Leyendas</Link>
              <Link to="/dichos" className="block hover:text-foreground transition-colors">Dichos Mineros</Link>
              <Link to="/eventos" className="block hover:text-foreground transition-colors">Eventos</Link>
              <Link to="/comunidad" className="block hover:text-foreground transition-colors">Muro Global</Link>
              <Link to="/catalogo" className="block hover:text-foreground transition-colors">Catálogo Digital</Link>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-4">Datos en Vivo</h4>
            <div className="space-y-2 font-mono text-xs text-muted-foreground">
              <p>Altitud: 2,700m s.n.m.</p>
              <p>Coordenadas: 20.1410°N, 98.6735°W</p>
              <p>Pueblo Mágico desde 2004</p>
              <p className="pt-2">
                <Link to="/quienes-somos" className="text-primary hover:text-foreground transition-colors">
                  Quiénes Somos →
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            © 2026 RDM Digital · Arquitectura Soberana · Edwin Oswaldo Castillo Trejo
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Powered by TAMV Kernel · Realito AI
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
