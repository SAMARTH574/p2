import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import FinancialCalculator from "@/components/financial-calculator";
import AiChat from "@/components/ai-chat";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <HeroSection />
      <FinancialCalculator />
      <AiChat />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
