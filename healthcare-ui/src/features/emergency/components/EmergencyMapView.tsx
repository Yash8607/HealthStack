import React from 'react';
import { EMERGENCY_MAP_IMAGE_URL } from '../utils/emergencyData';

export const EmergencyMapView: React.FC = () => {
  return (
    <div className="mb-20">
      <h3 className="font-headline text-xl font-bold mb-4 text-on-surface">
        Map View — Nearby Hospitals
      </h3>
      <div className="relative w-full h-80 rounded-[2.5rem] overflow-hidden bg-surface-container-high group">
        <div className="absolute inset-0 bg-surface-container-high">
          <img
            alt="City map background"
            className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
            src={EMERGENCY_MAP_IMAGE_URL}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
            <span
              className="material-symbols-outlined fill text-tertiary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              map
            </span>
            <span className="text-lg font-bold text-on-surface">
              Tap to expand interactive map
            </span>
          </div>
        </div>
        <div className="absolute top-1/4 left-1/3">
          <div className="bg-tertiary text-on-tertiary w-8 h-8 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <span className="material-symbols-outlined text-sm">emergency</span>
          </div>
        </div>
        <div className="absolute bottom-1/3 right-1/4">
          <div className="bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-sm">location_on</span>
          </div>
        </div>
      </div>
    </div>
  );
};
