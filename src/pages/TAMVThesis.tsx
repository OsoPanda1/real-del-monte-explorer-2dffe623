import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Crown,
  ScrollText,
  Network,
  Layers,
  Fingerprint,
  ShieldCheck,
  BookOpenCheck,
  Quote,
  ExternalLink,
  Sparkles,
  Compass,
  History,
  GraduationCap,
  Database,
  Cpu,
  Heart,
} from "lucide-react";
import NavBar from "@/components/NavBar";
import FooterSection from "@/components/FooterSection";
import { SEOMeta } from "@/components/SEOMeta";
import { THESIS_DATA, type ThesisFederation } from "@/data/tamv-thesis";

const FED_ICONS: Record<string, typeof Fingerprint> = {
  "FED-01": Fingerprint,
  "FED-02": Cpu,
  "FED-03": BookOpenCheck,
  "FED-04": Database,
  "FED-05": Sparkles,
  "FED-06": Compass,
  "FED-07": GraduationCap,
};

const stateBadgeStyles: Record<ThesisFederation["state"], string> = {
  operativa:
    "bg-[hsl(var(--electric))]/15 text-[hsl(var(--electric-light))] border-[hsl(var(--electric))]/30",
  construcción:
    "bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/30",
  planeada:
    "bg-muted text-muted-foreground border-border/40",
};

const TAMVThesis = () => {
  const t = THESIS_DATA;
  const maturityRows = [
    { label: "Nodo Cero (RDM Digital)", value: t.maturity.nodoCero },
    { label: "Conceptual", value: t.maturity.conceptual },
    { label: "Frontend", value: t.maturity.frontend },
    { label: "Integración", value: t.maturity.integracion },
    { label: "Infraestructura", value: t.maturity.infraestructura },
    { label: "Marketing", value: t.maturity.marketing },
  ];

  return (
    <>
      <SEOMeta
        title="Tesis Soberana TAMV — Nodo Cero RDM Digital"
        description="Arquitectura civilizatoria soberana TAMV MD-X4 desplegada en Real del Monte. 7 federaciones, 7 capas, 5 RFCs y biografía operativa de Anubis Villaseñor."
      />
      <div className="min-h-screen bg-background relative">
        <NavBar />

        <main className="container mx-auto px-6 pt-32 pb-24 relative z-10">
          {/* HERO */}
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16 max-w-4xl mx-auto"
          >
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/5"
            >
              <Crown className="w-4 h-4 mr-2 text-[hsl(var(--gold))]" />
              <span className="font-body text-[10px] tracking-[0.3em] uppercase text-[hsl(var(--gold))]">
                Sello {t.meta.sello} · Nodo Cero
              </span>
            </Badge>

            <h1 className="font-display text-4xl md:text-6xl font-light leading-tight mb-6">
              <span className="text-foreground/90">Tesis Soberana</span>{" "}
              <span className="text-gradient-gold">TAMV MD-X4</span>
            </h1>

            <p className="font-display italic text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {t.meta.title}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Badge variant="secondary" className="bg-card/60 border border-border/40">
                <Fingerprint className="w-3 h-3 mr-1.5" />
                ORCID {t.meta.orcid}
              </Badge>
              <Badge variant="secondary" className="bg-card/60 border border-border/40">
                <ScrollText className="w-3 h-3 mr-1.5" />
                DOI {t.meta.doi}
              </Badge>
              <Badge variant="secondary" className="bg-card/60 border border-border/40">
                <Compass className="w-3 h-3 mr-1.5" />
                {t.meta.nodoCero}
              </Badge>
            </div>
          </motion.header>

          {/* AUTHOR + DEDICATION */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            <Card className="lg:col-span-2 border-[hsl(var(--gold))]/20 bg-card/60 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <Crown className="w-5 h-5 text-[hsl(var(--gold))]" />
                  El Arquitecto · {t.meta.author}
                </CardTitle>
                <p className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground mt-1">
                  Alias operativo: {t.meta.alias} — {t.biography.origin}
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="font-body text-sm text-foreground/80 leading-relaxed">
                  Más de{" "}
                  <span className="text-[hsl(var(--gold))] font-semibold">
                    {t.biography.hours.toLocaleString()} horas
                  </span>{" "}
                  dedicadas a conceptualizar un organismo digital soberano orquestado por una sola
                  mente. Su trayectoria se aleja del founder típico de Silicon Valley: creador
                  Hecho en México que opera en orden inverso — primero infraestructura, después
                  documentación, finalmente validación global.
                </p>
                <ul className="space-y-2">
                  {t.biography.journey.map((step, i) => (
                    <li
                      key={i}
                      className="flex gap-3 items-start font-body text-sm text-foreground/75"
                    >
                      <History className="w-4 h-4 mt-0.5 text-[hsl(var(--electric))]/70 flex-shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-border/30">
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                    Método
                  </p>
                  <p className="font-body text-xs text-foreground/70 italic">
                    {t.biography.method}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[hsl(var(--gold))]/20 bg-card/60 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[hsl(var(--terracotta))]" />
                  Dedicatoria
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-display italic text-sm text-foreground/80 leading-relaxed">
                  {t.meta.dedication}
                </p>
                <div className="pt-3 border-t border-border/30 space-y-2">
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                    Anclajes públicos verificables
                  </p>
                  {t.publicAnchors.map((a) => (
                    <a
                      key={a.url}
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 group text-foreground/75 hover:text-[hsl(var(--gold))] transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span className="font-body text-[11px] tracking-wider">{a.label}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* PILLARS */}
          <section className="mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-light mb-8 text-center">
              Tres dimensiones inseparables
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {t.pillars.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full border-[hsl(var(--gold))]/15 bg-card/60 backdrop-blur-md hover:border-[hsl(var(--gold))]/40 transition-all">
                    <CardContent className="p-6">
                      <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[hsl(var(--gold))] mb-3">
                        Pilar {i + 1}
                      </p>
                      <h3 className="font-display text-xl text-foreground mb-3">{p.title}</h3>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">
                        {p.summary}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* FEDERATIONS */}
          <section className="mb-16">
            <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
              <h2 className="font-display text-2xl md:text-3xl font-light flex items-center gap-3">
                <Network className="w-6 h-6 text-[hsl(var(--electric))]" />
                7 Federaciones operativas
              </h2>
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                Modelo MD-X4 · Triple Federado
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {t.federations.map((f) => {
                const Icon = FED_ICONS[f.id] ?? Network;
                return (
                  <Card
                    key={f.id}
                    className="border-border/40 bg-card/50 backdrop-blur-md hover:border-[hsl(var(--gold))]/30 transition-all"
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-[hsl(var(--gold))]" />
                          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-[hsl(var(--gold))]/80">
                            {f.id}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-[9px] tracking-wider ${stateBadgeStyles[f.state]}`}
                        >
                          {f.state}
                        </Badge>
                      </div>
                      <h3 className="font-display text-base text-foreground mb-1.5">{f.name}</h3>
                      <p className="font-body text-[11px] text-muted-foreground tracking-wide">
                        {f.scope}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* LAYERS + RFCs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            <Card className="lg:col-span-2 border-[hsl(var(--gold))]/20 bg-card/60 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[hsl(var(--gold))]" />
                  7 Capas civilizatorias
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {t.layers.map((l) => (
                  <div
                    key={l.idx}
                    className="flex gap-4 items-start p-3 rounded-lg border border-border/30 bg-background/30 hover:border-[hsl(var(--gold))]/30 transition-all"
                  >
                    <span className="font-display text-2xl text-[hsl(var(--gold))]/70 min-w-[2rem] text-center">
                      {l.idx}
                    </span>
                    <div className="flex-1">
                      <p className="font-display text-sm text-foreground mb-0.5">{l.name}</p>
                      <p className="font-body text-[11px] text-muted-foreground leading-relaxed">
                        {l.purpose}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-[hsl(var(--gold))]/20 bg-card/60 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[hsl(var(--electric))]" />
                  RFCs TAMV
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {t.rfcs.map((r) => (
                  <div
                    key={r.id}
                    className="p-3 rounded-lg border border-border/40 bg-background/40 hover:border-[hsl(var(--electric))]/40 transition-all"
                  >
                    <p className="font-body text-[10px] tracking-[0.25em] uppercase text-[hsl(var(--electric-light))] mb-1">
                      {r.id}
                    </p>
                    <p className="font-display text-sm text-foreground">{r.title}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* MATURITY */}
          <section className="mb-16">
            <Card className="border-[hsl(var(--gold))]/20 bg-card/60 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[hsl(var(--gold))]" />
                  Diagnóstico de madurez
                </CardTitle>
                <p className="font-body text-[11px] tracking-wider uppercase text-muted-foreground mt-1">
                  Auditoría declarada por el arquitecto · {t.meta.year}
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                {maturityRows.map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between font-body text-xs mb-2">
                      <span className="text-foreground/80 tracking-wider uppercase">
                        {m.label}
                      </span>
                      <span className="text-[hsl(var(--gold))]">{m.value}%</span>
                    </div>
                    <Progress value={m.value} className="h-1.5" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* DIAGNOSIS */}
          <section className="mb-16">
            <Card className="border-[hsl(var(--terracotta))]/30 bg-card/60 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <Quote className="w-5 h-5 text-[hsl(var(--terracotta))]" />
                  {t.diagnosis.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80 leading-relaxed">
                  {t.diagnosis.description}
                </p>
                <p className="font-body text-sm text-[hsl(var(--gold))]/90 leading-relaxed border-l-2 border-[hsl(var(--gold))]/40 pl-4">
                  {t.diagnosis.response}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* AXIOMS */}
          <section className="mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-light mb-8 text-center">
              Axiomas operativos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.axioms.map((axiom, i) => (
                <motion.blockquote
                  key={i}
                  initial={{ opacity: 0, x: i % 2 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative p-6 rounded-lg border border-[hsl(var(--gold))]/20 bg-card/40 backdrop-blur-md"
                >
                  <Quote className="w-5 h-5 text-[hsl(var(--gold))]/40 absolute top-4 left-4" />
                  <p className="font-display italic text-sm md:text-base text-foreground/85 leading-relaxed pl-7">
                    {axiom}
                  </p>
                </motion.blockquote>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              asChild
              className="bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold-dark))] text-background"
            >
              <Link to="/tamv">Ir al Civilization Hub</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-[hsl(var(--gold))]/30 text-foreground hover:bg-[hsl(var(--gold))]/10"
            >
              <Link to="/tamv/status">Estado del Nodo Cero</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-[hsl(var(--electric))]/30 text-foreground hover:bg-[hsl(var(--electric))]/10"
            >
              <Link to="/tamv/api">Explorar API TAMV</Link>
            </Button>
          </div>
        </main>

        <FooterSection />
      </div>
    </>
  );
};

export default TAMVThesis;
