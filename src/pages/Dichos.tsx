import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Heart, Sparkles, Search, Share2, BookOpen } from "lucide-react";
import NavBar from "@/components/NavBar";
import FooterSection from "@/components/FooterSection";
import RealitoOrb from "@/components/RealitoOrb";
import { SEOMeta, PAGE_SEO } from "@/components/SEOMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DICHOS_COMPLETOS, DICHO_CATEGORIES } from "@/data/dichos-data";

const Dichos = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [likedDichos, setLikedDichos] = useState<Set<string>>(new Set());

  const filteredDichos = useMemo(() => {
    return DICHOS_COMPLETOS.filter(d => {
      const matchCat = selectedCategory === "all" || d.categoria === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q ||
        d.texto.toLowerCase().includes(q) ||
        d.personaje.toLowerCase().includes(q) ||
        d.significado.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredDichos = useMemo(
    () => [...DICHOS_COMPLETOS].sort((a, b) => b.likes - a.likes).slice(0, 3),
    [],
  );

  const handleLike = (id: string) => {
    setLikedDichos(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOMeta {...PAGE_SEO.dichos} />
      <NavBar />

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden bg-gradient-to-b from-primary/10 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--gold)/0.15),transparent_70%)]" />
        <div className="container mx-auto px-6 md:px-8 pt-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <Badge variant="outline" className="border-primary text-primary mb-4">
              <Sparkles className="w-3 h-3 mr-1" /> Archivo Histórico
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Dichos{" "}
              <span className="text-gradient-gold">Personificados</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-body">
              47 personajes históricos conforman el rico vocabulario característico de Real del Monte.
              Expresiones nacidas en las minas, las cantinas y los hogares del Pueblo Mágico.
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              <BookOpen className="w-4 h-4 mr-2" /> Explorar Dichos
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 py-8">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por personaje, expresión o significado..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              {DICHO_CATEGORIES.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.icon} {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Featured */}
        {selectedCategory === "all" && !searchQuery && (
          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" /> Dichos Más Populares
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredDichos.map((dicho, i) => (
                <motion.div key={dicho.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="h-full bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="text-xs mb-2">{dicho.personaje}</Badge>
                      <Quote className="w-8 h-8 text-primary/30 mb-4" />
                      <p className="font-display text-lg font-bold mb-3">"{dicho.texto}"</p>
                      <p className="text-sm text-muted-foreground mb-4">{dicho.significado}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {DICHO_CATEGORIES.find(c => c.id === dicho.categoria)?.icon} {dicho.categoria.replace("_", " ")}
                        </Badge>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Heart className="w-4 h-4" /> {dicho.likes}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: DICHOS_COMPLETOS.length, label: "Personajes Registrados" },
              { value: DICHO_CATEGORIES.length - 1, label: "Categorías" },
              { value: "200+", label: "Años de Historia" },
              { value: "47", label: "Dichos Únicos" },
            ].map(s => (
              <Card key={s.label} className="bg-muted/30">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-primary">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-6">
            {selectedCategory === "all"
              ? "Índice Alfabético de Dichos Realmontenses"
              : `${DICHO_CATEGORIES.find(c => c.id === selectedCategory)?.icon} ${DICHO_CATEGORIES.find(c => c.id === selectedCategory)?.label}`}
          </h2>

          {filteredDichos.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Quote className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No se encontraron dichos con esa búsqueda</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredDichos.map((dicho, i) => (
                  <motion.div
                    key={dicho.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: Math.min(i * 0.03, 0.5) }}
                  >
                    <Card
                      className={`h-full cursor-pointer transition-all hover:shadow-lg ${expandedId === dicho.id ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setExpandedId(expandedId === dicho.id ? null : dicho.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <Quote className="w-6 h-6 text-primary/50 shrink-0" />
                          <Badge variant="outline" className="text-xs shrink-0">
                            {DICHO_CATEGORIES.find(c => c.id === dicho.categoria)?.icon}
                          </Badge>
                        </div>
                        <Badge variant="secondary" className="text-xs mb-2">{dicho.personaje}</Badge>
                        <h3 className="font-display text-lg font-bold mb-2">"{dicho.texto}"</h3>

                        <AnimatePresence>
                          {expandedId === dicho.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="bg-muted/30 p-3 rounded-lg mt-3">
                                <p className="text-xs text-muted-foreground mb-1">Jerga Original:</p>
                                <p className="font-mono text-sm italic mb-2">"{dicho.jergaOriginal}"</p>
                              </div>
                              <p className="text-sm text-muted-foreground mt-3 pt-3 border-t">
                                <strong>Significado:</strong> {dicho.significado}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleLike(dicho.id); }}
                            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Heart className={`w-4 h-4 ${likedDichos.has(dicho.id) ? "fill-destructive text-destructive" : ""}`} />
                            {dicho.likes + (likedDichos.has(dicho.id) ? 1 : 0)}
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="mt-16 mb-8">
          <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="font-display text-2xl font-bold mb-3">¿Conoces más dichos?</h2>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto font-body">
                Ayúdanos a preservar el patrimonio lingüístico de Real del Monte. Comparte los dichos que conoces.
              </p>
              <Button variant="outline">Contribuir un dicho</Button>
            </CardContent>
          </Card>
        </section>
      </div>

      <FooterSection />
      <RealitoOrb />
    </div>
  );
};

export default Dichos;
