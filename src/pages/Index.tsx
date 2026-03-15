import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import SitesSection from "@/components/SitesSection";
import QuickLinksSection from "@/components/QuickLinksSection";
import MapSection from "@/components/MapSection";
import MerchantCatalog from "@/components/MerchantCatalog";
import FooterSection from "@/components/FooterSection";
import RealitoOrb from "@/components/RealitoOrb";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <HeroSection />
      <SitesSection />
      <QuickLinksSection />
      <div id="mapa">
        <MapSection />
      </div>
      <MerchantCatalog />
      <FooterSection />
      <RealitoOrb />
    </div>
  );
};

export default Index;
