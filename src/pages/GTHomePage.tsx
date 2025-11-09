import MainNavbar from "../components/MainNavbar";
import HeroSection from "../sections/HeroSection";
import FeaturesSection from "../sections/FeaturesSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import CTASection from "../sections/CTASection";

export default function HomePage() {
  return (
    <>
      <MainNavbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      {/* Footer component if available */}
    </>
  );
}

