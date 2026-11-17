import { useState } from 'react';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { LeadCaptureSection } from './components/LeadCaptureSection';
import { Navbar } from './components/Navbar';
import { ProofAndProcessSection } from './components/ProofAndProcessSection';
import { SimulatorSection } from './components/SimulatorSection';
import { StrategiesSection } from './components/StrategiesSection';
import {
  AttachedSimulationSummary,
  ConsortiumCategory,
  SimulatorMode,
} from './types/consultancy';

export default function App() {
  const [simMode, setSimMode] = useState<SimulatorMode>('consorcio');
  const [simCategory, setSimCategory] = useState<ConsortiumCategory>('imoveis');
  const [attachedSimulation, setAttachedSimulation] =
    useState<AttachedSimulationSummary | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSimulatePreset = (
    mode: SimulatorMode,
    category?: ConsortiumCategory
  ) => {
    setSimMode(mode);
    if (category) {
      setSimCategory(category);
    }
    scrollToSection('simulador');
  };

  const handleSendToLeadForm = (summary: AttachedSimulationSummary) => {
    setAttachedSimulation(summary);
    scrollToSection('contato');
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#14243B]">
      <Navbar onBookClick={() => scrollToSection('contato')} />

      <main>
        <HeroSection
          onSimulateClick={() => scrollToSection('simulador')}
          onContactClick={() => scrollToSection('contato')}
        />

        <SimulatorSection
          mode={simMode}
          onModeChange={setSimMode}
          category={simCategory}
          onCategoryChange={setSimCategory}
          onSendToLeadForm={handleSendToLeadForm}
        />

        <StrategiesSection onSimulatePreset={handleSimulatePreset} />

        <ProofAndProcessSection />

        <LeadCaptureSection
          attachedSimulation={attachedSimulation}
          onClearAttachedSimulation={() => setAttachedSimulation(null)}
        />
      </main>

      <Footer />
    </div>
  );
}
