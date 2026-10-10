import { InquiryProvider } from "@/components/providers/InquiryProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <InquiryProvider>
      <Navbar />
      <main id="main">
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <SkillsSection />
        <ServicesSection />
        <ProcessSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
        <FinalCTA />
      </main>
      <Footer />
    </InquiryProvider>
  );
}
