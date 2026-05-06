import React from 'react';
import { HospitalListingBottomNav } from './HospitalListingBottomNav';
import { HospitalListingFilters } from './HospitalListingFilters';
import { HospitalListingFooter } from './HospitalListingFooter';
import { HospitalListingHeader } from './HospitalListingHeader';
import { HospitalListingHero } from './HospitalListingHero';
import { HospitalListingList } from './HospitalListingList';
import { HospitalListingTrustSection } from './HospitalListingTrustSection';

export const HospitalListing: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface pb-20">
      <HospitalListingHeader />
      <HospitalListingHero />
      <HospitalListingFilters />
      <HospitalListingList />
      <HospitalListingTrustSection />
      <HospitalListingFooter />
      <HospitalListingBottomNav />
    </div>
  );
};
