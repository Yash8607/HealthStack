import React from 'react';

export const HospitalListingHero: React.FC = () => {
  return (
    <section className="max-w-lg mx-auto px-4 pt-6 pb-4">
      <span className="text-[10px] font-label font-bold tracking-widest uppercase text-primary block mb-2">
        Recommendations
      </span>
      <h1 className="font-headline text-[1.9rem] font-extrabold text-on-surface leading-tight mb-2">
        Hospital Recommendations
      </h1>
      <p className="text-on-surface-variant text-sm leading-relaxed">
        Compare top-tier medical institutions curated for your specific health profile and insurance coverage.
      </p>
    </section>
  );
};
