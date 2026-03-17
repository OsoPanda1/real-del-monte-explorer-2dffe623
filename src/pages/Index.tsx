import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/HeroSection";
import SitesSection from "@/components/SitesSection";
import QuickLinksSection from "@/components/QuickLinksSection";
import MapSection from "@/components/MapSection";
import MerchantCatalog from "@/components/MerchantCatalog";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
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
