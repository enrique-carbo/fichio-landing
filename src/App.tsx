/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { SpecialtiesBento } from './components/sections/SpecialtiesBento';
import { SecurityArchitecture } from './components/sections/SecurityArchitecture';
import { InteractiveDemo } from './components/sections/InteractiveDemo';
import { FeatureComparison } from './components/sections/FeatureComparison';
import { TechSpecs } from './components/sections/TechSpecs';
import { DownloadWaitlist } from './components/sections/DownloadWaitlist';
import { Footer } from './components/layout/Footer';
import { SpecialtyId } from './types';

export default function App() {
  const [demoSpecialty, setDemoSpecialty] = useState<SpecialtyId>('medicina');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSpecialtyForDemo = (specialtyId: string) => {
    setDemoSpecialty(specialtyId as SpecialtyId);
    scrollToSection('demostracion');
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-brand-500/20 selection:text-brand-700 dark:selection:text-brand-300">
      {/* Navigation Top Bar Contract */}
      <Navbar
        onOpenDownload={() => scrollToSection('descargas')}
        onOpenDemo={() => scrollToSection('demostracion')}
      />

      {/* Main Content Sections (Modular Island Flow) */}
      <main className="flex-1">
        <Hero
          onOpenDownload={() => scrollToSection('descargas')}
          onOpenDemo={() => scrollToSection('demostracion')}
        />

        <SpecialtiesBento
          onSelectSpecialtyForDemo={handleSelectSpecialtyForDemo}
        />

        <SecurityArchitecture />

        <InteractiveDemo
          key={demoSpecialty}
          initialSpecialty={demoSpecialty}
        />

        <FeatureComparison />

        <TechSpecs />

        <DownloadWaitlist />
      </main>

      {/* Quiet Footer */}
      <Footer />
    </div>
  );
}
