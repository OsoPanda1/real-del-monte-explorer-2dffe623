import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { VisualProvider } from "@/contexts/VisualContext";
import { AppShell } from "@/components/AppShell";
import Index from "./pages/Index";
import Historia from "./pages/Historia";
import Cultura from "./pages/Cultura";
import Arte from "./pages/Arte";
import Gastronomia from "./pages/Gastronomia";
import Relatos from "./pages/Relatos";
import Ecoturismo from "./pages/Ecoturismo";
import Rutas from "./pages/Rutas";
import Dichos from "./pages/Dichos";
import Eventos from "./pages/Eventos";
import Comunidad from "./pages/Comunidad";
import Catalogo from "./pages/Catalogo";
import QuienesSomos from "./pages/QuienesSomos";
import Donar from "./pages/Donar";
import GraciasDonativo from "./pages/GraciasDonativo";
import ComerciosPanel from "./pages/ComerciosPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <VisualProvider>
        <AppShell>
          <BrowserRouter>
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
          </BrowserRouter>
        </AppShell>
      </VisualProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
