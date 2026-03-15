import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { VisualProvider } from "@/contexts/VisualContext";
import { AppShell } from "@/components/AppShell";

const Index = lazy(() => import("./pages/Index"));
const Historia = lazy(() => import("./pages/Historia"));
const Cultura = lazy(() => import("./pages/Cultura"));
const Arte = lazy(() => import("./pages/Arte"));
const Gastronomia = lazy(() => import("./pages/Gastronomia"));
const Relatos = lazy(() => import("./pages/Relatos"));
const Ecoturismo = lazy(() => import("./pages/Ecoturismo"));
const Rutas = lazy(() => import("./pages/Rutas"));
const Dichos = lazy(() => import("./pages/Dichos"));
const Eventos = lazy(() => import("./pages/Eventos"));
const Comunidad = lazy(() => import("./pages/Comunidad"));
const Catalogo = lazy(() => import("./pages/Catalogo"));
const QuienesSomos = lazy(() => import("./pages/QuienesSomos"));
const Donar = lazy(() => import("./pages/Donar"));
const GraciasDonativo = lazy(() => import("./pages/GraciasDonativo"));
const ComerciosPanel = lazy(() => import("./pages/ComerciosPanel"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-10 h-10 rounded-full bg-primary animate-pulse" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <VisualProvider>
        <AppShell>
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="/cultura" element={<Cultura />} />
            <Route path="/arte" element={<Arte />} />
            <Route path="/gastronomia" element={<Gastronomia />} />
            <Route path="/relatos" element={<Relatos />} />
            <Route path="/ecoturismo" element={<Ecoturismo />} />
            <Route path="/rutas" element={<Rutas />} />
            <Route path="/dichos" element={<Dichos />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/comunidad" element={<Comunidad />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/donar" element={<Donar />} />
            <Route path="/gracias-donativo" element={<GraciasDonativo />} />
            <Route path="/comercios/panel" element={<ComerciosPanel />} />
            <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AppShell>
      </VisualProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
