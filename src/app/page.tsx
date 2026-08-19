import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Approach } from "@/components/Approach";
import { Speed } from "@/components/Speed";
import { AISection } from "@/components/AISection";
import { Services } from "@/components/Services";
import { Technology } from "@/components/Technology";
import { CaseStudies } from "@/components/CaseStudies";
import { AIChatSection } from "@/components/AIChatSection";
import { About } from "@/components/About";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { SectionLag } from "@/components/ui/SectionLag";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SectionLag>
        <Problem />
      </SectionLag>
      <SectionLag>
        <Approach />
      </SectionLag>
      <SectionLag>
        <Speed />
      </SectionLag>
      <SectionLag>
        <AISection />
      </SectionLag>
      <SectionLag>
        <Services />
      </SectionLag>
      <SectionLag>
        <Technology />
      </SectionLag>
      <SectionLag>
        <CaseStudies />
      </SectionLag>
      <SectionLag>
        <AIChatSection />
      </SectionLag>
      <SectionLag>
        <About />
      </SectionLag>
      <SectionLag>
        <FinalCTA />
      </SectionLag>
      <Footer />
    </main>
  );
}