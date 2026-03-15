const FooterSection = () => {
  return (
    <footer className="border-t border-foreground/5 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">R</span>
              </div>
              <span className="font-bold text-sm tracking-tight">
                RDM<span className="text-primary">·</span>X
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              La primera plataforma urbana 100% digitalizada de México. Real del Monte, Hidalgo.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-4">
              Navegación
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="#explorar" className="block hover:text-foreground transition-colors">Sitios Emblemáticos</a>
              <a href="#comercios" className="block hover:text-foreground transition-colors">Catálogo de Comercios</a>
              <a href="#" className="block hover:text-foreground transition-colors">Realito AI</a>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-4">
              Datos en Vivo
            </h4>
            <div className="space-y-2 font-mono text-xs text-muted-foreground">
              <p>Altitud: 2,700m s.n.m.</p>
              <p>Coordenadas: 20.1410°N, 98.6735°W</p>
              <p>Pueblo Mágico desde 2004</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            © 2026 RDM Digital · Arquitectura Soberana
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Powered by TAMV Kernel
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
