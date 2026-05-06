import React, { useState } from 'react';
import { EMERGENCY_HOSPITALS } from '../utils/emergencyData';
import { EmergencyBottomNav } from './EmergencyBottomNav';
import { EmergencyClinicalFooter } from './EmergencyClinicalFooter';
import { EmergencyFab } from './EmergencyFab';
import { EmergencyFilterBar } from './EmergencyFilterBar';
import { EmergencyHeader } from './EmergencyHeader';
import { EmergencyHeadline } from './EmergencyHeadline';
import { EmergencyHospitalList } from './EmergencyHospitalList';
import { EmergencyMapView } from './EmergencyMapView';
import { EmergencySearchOverlay } from './EmergencySearchOverlay';

export const Emergency: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-surface pb-24">
      <EmergencyHeader onOpenSearch={() => setSearchOpen(true)} />

      <EmergencySearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <main className="pt-24 px-6 max-w-5xl mx-auto">
        <EmergencyHeadline />
        <EmergencyFilterBar resultCount={EMERGENCY_HOSPITALS.length} />
        <EmergencyHospitalList hospitals={EMERGENCY_HOSPITALS} />
        <EmergencyMapView />
      </main>

      <EmergencyFab />
      <EmergencyBottomNav onOpenSearch={() => setSearchOpen(true)} />
      <EmergencyClinicalFooter />
    </div>
  );
};
