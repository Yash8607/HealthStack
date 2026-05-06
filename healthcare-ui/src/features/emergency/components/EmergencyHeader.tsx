import React from 'react';
import Link from 'next/link';

interface EmergencyHeaderProps {
  onOpenSearch: () => void;
}

export const EmergencyHeader: React.FC<EmergencyHeaderProps> = ({ onOpenSearch }) => {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-xl z-[70]">
      <Link href="/" className="flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">healing</span>
        <span className="text-2xl font-headline font-bold tracking-tight text-primary">
          HealthCare+
        </span>
      </Link>

      <button
        type="button"
        onClick={onOpenSearch}
        className="cursor-pointer bg-surface-container-low hover:bg-surface-container transition-colors rounded-full flex items-center px-4 py-2 gap-3 min-w-[180px] md:min-w-[300px]"
      >
        <span className="material-symbols-outlined text-on-surface-variant text-xl">
          search
        </span>
        <span className="text-on-surface-variant text-sm font-medium">
          Search hospitals...
        </span>
      </button>

      <div className="hidden md:flex items-center gap-4">
        <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">
          more_vert
        </span>
      </div>
    </header>
  );
};
