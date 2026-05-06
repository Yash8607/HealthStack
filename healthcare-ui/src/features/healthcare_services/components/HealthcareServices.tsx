import React from 'react';
import { HealthcareServicesHeader } from './HealthcareServicesHeader';
import { HealthcareServicesSearchSection } from './HealthcareServicesSearchSection';
import { HealthcareServicesHero } from './HealthcareServicesHero';
import { HealthcareServicesCards } from './HealthcareServicesCards';
import { HealthcareServicesFeature } from './HealthcareServicesFeature';
import { HealthcareServicesFooter } from './HealthcareServicesFooter';

export const HealthcareServices: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface">
      <HealthcareServicesHeader />
      <HealthcareServicesSearchSection />
      <HealthcareServicesHero />
      <HealthcareServicesCards />
      <HealthcareServicesFeature />
      <HealthcareServicesFooter />
    </div>
  );
};
