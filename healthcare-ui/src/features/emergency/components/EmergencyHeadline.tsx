import React from 'react';

export const EmergencyHeadline: React.FC = () => {
  return (
    <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div className="max-w-2xl">
        <span className="text-xs font-bold tracking-widest uppercase text-tertiary mb-2 block">
          Critical Care Network
        </span>
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
          Nearby Emergency Hospitals
        </h1>
        <p className="text-on-surface-variant mt-2 text-lg">
          Sorted by ETA from your current location.
        </p>
      </div>
      <div className="flex items-center gap-2 bg-tertiary-container/20 px-4 py-2 rounded-xl self-start md:self-end">
        <span className="material-symbols-outlined text-tertiary">location_on</span>
        <span className="text-sm font-semibold text-on-tertiary-container">
          Downtown Medical District
        </span>
      </div>
    </div>
  );
};
