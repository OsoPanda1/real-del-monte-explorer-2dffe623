import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Crown, ArrowRight, Network, ShieldCheck } from "lucide-react";

const NodoCeroBanner = () => (
  <section className="relative py-10 border-y border-[hsl(var(--gold))]/15 bg-gradient-to-r from-background via-[hsl(var(--gold))]/[0.04] to-background">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center border border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/8">
            <Crown className="w-5 h-5 text-[hsl(var(--gold))]" />
          </div>
          <div>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[hsl(var(--gold))] mb-1">
              Sello TAMV Online™ · Nodo Territorial Cero
            </p>
            <p className="font-display text-base md:text-lg text-foreground">
              Real del Monte opera como{" "}
              <span className="text-gradient-gold">Sistema Operativo Territorial Soberano</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="hidden md:inline-flex items-center gap-1.5 font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            <Network className="w-3 h-3 text-[hsl(var(--electric))]" /> 7 Federaciones
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            <ShieldCheck className="w-3 h-3 text-[hsl(var(--electric))]" /> Triple Federado
          </span>
          <Link
            to="/tamv"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/10 hover:bg-[hsl(var(--gold))]/20 transition-all group"
          >
            <span className="font-body text-[11px] tracking-[0.25em] uppercase text-[hsl(var(--gold))]">
              Entrar al Civilization Hub
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[hsl(var(--gold))] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default NodoCeroBanner;
