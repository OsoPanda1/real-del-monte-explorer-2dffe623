import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import SitesSection from "@/components/SitesSection";
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
      <MapSection />
      <MerchantCatalog />
      <FooterSection />
      <RealitoOrb />
    </div>
  );
};

export default Index;
