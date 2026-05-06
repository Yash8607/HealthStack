import React, { useEffect, useRef } from 'react';
import {
  EMERGENCY_POPULAR_SEARCHES,
  EMERGENCY_RECENT_SEARCHES,
} from '../utils/emergencyData';

interface EmergencySearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export const EmergencySearchOverlay: React.FC<EmergencySearchOverlayProps> = ({
  open,
  onClose,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-4 border-b border-surface-container">
        <button
          type="button"
          className="p-2 hover:bg-surface-container-low rounded-full"
          onClick={onClose}
          aria-label="Close search"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex-grow relative">
          <input
            ref={inputRef}
            className="w-full border-none focus:ring-0 focus:outline-none text-lg py-2 font-medium placeholder:text-on-surface-variant bg-transparent"
            placeholder="Search hospitals, ICU, location..."
            type="text"
          />
        </div>
        <button
          type="button"
          className="text-tertiary font-bold text-sm px-2"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>

      <div className="flex-grow overflow-y-auto px-6 py-8">
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
            Recent Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {EMERGENCY_RECENT_SEARCHES.map((chip) => (
              <span
                key={chip.label}
                className="bg-surface-container-low px-4 py-2 rounded-full text-sm font-semibold text-on-surface flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">{chip.icon}</span>
                {chip.label}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
            Popular Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {EMERGENCY_POPULAR_SEARCHES.map((chip) => (
              <span
                key={chip.label}
                className="bg-surface-container-low px-4 py-2 rounded-full text-sm font-semibold text-on-surface flex items-center gap-2 border border-surface-container"
              >
                <span className="material-symbols-outlined text-base">{chip.icon}</span>
                {chip.label}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
            Live Results
          </h3>

          <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-tertiary-container/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary">emergency</span>
              </div>
              <div>
                <div className="font-bold text-on-surface">
                  <span className="text-tertiary">City</span> Emergency
                </div>
                <div className="text-sm text-on-surface-variant flex items-center gap-2">
                  <span className="text-tertiary font-bold">ICU Available</span> • 1.2 km
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline-variant group-hover:text-primary">
              chevron_right
            </span>
          </div>

          <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant">
                  local_hospital
                </span>
              </div>
              <div>
                <div className="font-bold text-on-surface">Apollo Trauma Center</div>
                <div className="text-sm text-on-surface-variant flex items-center gap-2">
                  ICU Full • <span className="text-tertiary font-bold">3.4 km</span>
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline-variant group-hover:text-primary">
              chevron_right
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
