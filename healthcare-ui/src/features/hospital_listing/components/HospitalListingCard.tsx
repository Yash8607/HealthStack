import Link from 'next/link';
import React from 'react';
import type { Hospital } from '../types';

interface HospitalListingCardProps {
  hospital: Hospital;
}

const AVAILABILITY_STYLES = {
  available: { dot: 'bg-secondary', text: 'text-secondary' },
  limited: { dot: 'bg-yellow-500', text: 'text-yellow-600' },
  unavailable: { dot: 'bg-tertiary', text: 'text-tertiary' },
};

export const HospitalListingCard: React.FC<HospitalListingCardProps> = ({ hospital }) => {
  const avail = AVAILABILITY_STYLES[hospital.availabilityTone];

  return (
    <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-clinical-lift hover:scale-[1.01] transition-transform duration-200">
      <div className="relative h-44 w-full overflow-hidden bg-surface-container">
        <img
          src={hospital.imageUrl}
          alt={hospital.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-[8px] rounded-xl px-3 py-1.5">
          <span className="font-headline font-extrabold text-primary text-sm">{hospital.dailyRate}</span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-headline font-bold text-xl text-on-surface leading-tight">{hospital.name}</h2>
          <div className="flex items-center gap-1 shrink-0">
            <span
              className="material-symbols-outlined text-yellow-500 text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-label font-bold text-sm text-on-surface">{hospital.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-primary/10 px-2.5 py-1 rounded-full">
            <span className="material-symbols-outlined text-primary text-[14px]">person</span>
            <span className="text-xs font-label font-semibold text-primary">{hospital.experience}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {hospital.departments.map((dept) => (
            <span
              key={dept}
              className="px-2.5 py-1 bg-surface-container rounded-full text-xs font-label font-medium text-on-surface-variant"
            >
              {dept}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${avail.dot}`} />
          <span className={`text-xs font-label font-semibold ${avail.text}`}>
            {hospital.availability}
          </span>
        </div>

        <div className="flex gap-2 pt-1">
          <Link
            href="/hospital_detail"
            className="flex-1 bg-primary text-on-primary font-label font-semibold text-sm py-2.5 rounded-xl flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
            Book Appointment
          </Link>
          <Link
            href="/hospital_detail"
            className="px-4 bg-surface-container text-on-surface-variant font-label font-semibold text-sm py-2.5 rounded-xl hover:bg-surface-container-high transition-colors flex items-center"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
