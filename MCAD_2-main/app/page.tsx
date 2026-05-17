
import { HeroSection } from "@/components/site/hero-section";
import { DigitalTwinHighlightSection } from "@/components/site/ros2-highlight-section";
import { ServicesSection } from "@/components/site/services-section";
import { TierPackagesSection } from "@/components/site/tier-packages-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <TierPackagesSection />
      <DigitalTwinHighlightSection />

    </>
  );
}
