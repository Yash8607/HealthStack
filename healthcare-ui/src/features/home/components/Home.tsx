import React from 'react';
import { HomeNav } from './HomeNav';
import { HomeHero } from './HomeHero';
import { HomeServiceCards } from './HomeServiceCards';
import { HomeFeaturedSection } from './HomeFeaturedSection';
import { HomeEmergencyBanner } from './HomeEmergencyBanner';
import { HomeFooter } from './HomeFooter';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface">
      <HomeNav />
      <HomeHero />
      <HomeServiceCards />
      <HomeFeaturedSection />
      <HomeEmergencyBanner />
      <HomeFooter />
    </div>
  );
};
