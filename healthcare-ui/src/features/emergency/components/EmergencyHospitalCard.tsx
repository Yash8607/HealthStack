import React from 'react';
import type { EmergencyBadgeTone, EmergencyHospital } from '../types';

interface EmergencyHospitalCardProps {
  hospital: EmergencyHospital;
}

const BADGE_CLASSES: Record<EmergencyBadgeTone, string> = {
  tertiary: 'bg-tertiary text-on-tertiary',
  primary: 'bg-primary-container text-on-primary-container',
  secondary: 'bg-secondary-container text-on-secondary-container',
};

export const EmergencyHospitalCard: React.FC<EmergencyHospitalCardProps> = ({
  hospital,
}) => {
  const icuAvailable = hospital.icuStatus === 'AVAILABLE';

  return (
    <div className="bg-surface-container-lowest rounded-[2rem] p-6 flex flex-col md:flex-row gap-8 items-start shadow-clinical-lift hover:scale-[1.01] transition-transform duration-300">
      <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden bg-surface-container flex-shrink-0">
        <img
          alt={hospital.name}
          className="w-full h-full object-cover"
          src={hospital.imageUrl}
        />
      </div>

      <div className="flex-grow space-y-4 w-full">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h2 className="font-headline text-2xl font-bold text-on-surface leading-tight">
              {hospital.name}
            </h2>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span
                className={`${BADGE_CLASSES[hospital.badge.tone]} text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter`}
              >
                {hospital.badge.label}
              </span>
              <div className="flex items-center gap-1 text-on-surface-variant">
                <span
                  className="material-symbols-outlined fill text-sm text-yellow-500"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="text-sm font-bold">{hospital.rating}</span>
              </div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-tertiary text-2xl font-black block leading-none">
              {hospital.etaMinutes} min
            </span>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              {hospital.distanceKm} km away
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-low p-3 rounded-xl">
            <span className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant block mb-1">
              ICU Status
            </span>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${icuAvailable ? 'bg-secondary' : 'bg-tertiary'}`}
              />
              <span
                className={`text-sm font-bold uppercase ${icuAvailable ? 'text-secondary' : 'text-tertiary'}`}
              >
                {hospital.icuStatus}
              </span>
            </div>
          </div>
          <div className="bg-surface-container-low p-3 rounded-xl">
            <span className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant block mb-1">
              Beds
            </span>
            <span className="text-sm font-bold text-on-surface">
              {hospital.bedsAvailable} Available
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            className="bg-tertiary text-on-tertiary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-lg">call</span>
            Call Now
          </button>
          <button
            type="button"
            className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-lg">near_me</span>
            Navigate
          </button>
          <button
            type="button"
            className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-lg">notification_important</span>
            Alert Hospital
          </button>
        </div>
      </div>
    </div>
  );
};
