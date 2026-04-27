import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/HeroSection";
import NodoCeroBanner from "@/components/NodoCeroBanner";
import SitesSection from "@/components/SitesSection";
import QuickLinksSection from "@/components/QuickLinksSection";
import MapSection from "@/components/MapSection";
import MerchantCatalog from "@/components/MerchantCatalog";
import { SEOMeta, PAGE_SEO } from "@/components/SEOMeta";

const Index = () => {
  return (
    <MainLayout>
      <SEOMeta {...PAGE_SEO.home} />
      <HeroSection />
      <NodoCeroBanner />
      <SitesSection />
      <QuickLinksSection />
      <div id="mapa">
        <MapSection />
      </div>
      <MerchantCatalog />
    </MainLayout>
  );
};

export default Index;
