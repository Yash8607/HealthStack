import React from 'react';
import Link from 'next/link';

interface EmergencyAssistanceHeaderProps {
  onCancel: () => void;
}

export const EmergencyAssistanceHeader: React.FC<EmergencyAssistanceHeaderProps> = ({
  onCancel,
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-[70] bg-tertiary shadow-md">
      <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
        <Link
          href="/"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          <span className="material-symbols-outlined text-on-tertiary">arrow_back</span>
        </Link>

        <div className="text-center">
          <h1 className="font-headline font-bold text-base text-on-tertiary leading-tight">
            Emergency Assistance
          </h1>
          <p className="text-on-tertiary/70 text-xs font-label">HealthCare+</p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          <span className="material-symbols-outlined text-on-tertiary">close</span>
        </button>
      </div>
    </header>
  );
};
