import React from 'react';
import { HospitalDetailBottomNav } from './HospitalDetailBottomNav';
import { HospitalDetailCenters } from './HospitalDetailCenters';
import { HospitalDetailFooter } from './HospitalDetailFooter';
import { HospitalDetailHeader } from './HospitalDetailHeader';
import { HospitalDetailHero } from './HospitalDetailHero';
import { HospitalDetailOverview } from './HospitalDetailOverview';
import { HospitalDetailPhilosophy } from './HospitalDetailPhilosophy';
import { HospitalDetailRealTimeStatus } from './HospitalDetailRealTimeStatus';
import { HospitalDetailSearchSection } from './HospitalDetailSearchSection';
import { HospitalDetailSpecialists } from './HospitalDetailSpecialists';
import { HospitalDetailStats } from './HospitalDetailStats';

export const HospitalDetail: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface pb-20">
      <HospitalDetailHeader />
      <HospitalDetailSearchSection />
      <HospitalDetailHero />
      <HospitalDetailOverview />
      <HospitalDetailStats />
      <HospitalDetailPhilosophy />
      <HospitalDetailCenters />
      <HospitalDetailRealTimeStatus />
      <HospitalDetailSpecialists />
      <HospitalDetailFooter />
      <HospitalDetailBottomNav />
    </div>
  );
};
