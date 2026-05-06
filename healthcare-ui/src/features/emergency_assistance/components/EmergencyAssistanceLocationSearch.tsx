import React, { useState } from 'react';
import type { LocationResult, SearchChip } from '../types';

const RECENT_SEARCHES: SearchChip[] = [
  { label: 'Apollo Hospital', icon: 'history' },
  { label: 'Heart Attack Emergency', icon: 'history' },
  { label: 'Lab Test Near Me', icon: 'history' },
];

const POPULAR_SEARCHES: SearchChip[] = [
  { label: 'Hospitals', icon: 'trending_up' },
  { label: 'Emergency ICU', icon: 'trending_up' },
  { label: 'Appointments', icon: 'trending_up' },
  { label: 'Lab Tests', icon: 'trending_up' },
];

const NEARBY_FACILITIES: LocationResult[] = [
  {
    id: 'apollo',
    name: 'Apollo Hospital',
    address: 'Connaught Place, New Delhi',
    distanceMi: 0.8,
    type: 'hospital',
  },
  {
    id: 'city-emergency',
    name: 'City Emergency Centre',
    address: 'Karol Bagh, New Delhi',
    distanceMi: 1.4,
    type: 'urgent_care',
  },
  {
    id: 'max-healthcare',
    name: 'Max Healthcare',
    address: 'Saket, New Delhi',
    distanceMi: 2.5,
    type: 'hospital',
  },
];

const TYPE_ICONS: Record<LocationResult['type'], string> = {
  hospital: 'local_hospital',
  clinic: 'medical_services',
  urgent_care: 'emergency',
};

interface EmergencyAssistanceLocationSearchProps {
  onSelectLocation: (location: string) => void;
}

export const EmergencyAssistanceLocationSearch: React.FC<
  EmergencyAssistanceLocationSearchProps
> = ({ onSelectLocation }) => {
  const [query, setQuery] = useState('');
  const [usingCurrentLocation, setUsingCurrentLocation] = useState(false);

  const handleUseCurrentLocation = () => {
    setUsingCurrentLocation(true);
    setQuery('Current Location — GPS Active');
    onSelectLocation('Current Location');
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-clinical-lift p-5 flex flex-col gap-5">
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-tertiary text-xl">
          location_on
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Use My Current Location"
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant text-on-surface placeholder:text-on-surface-variant text-sm font-body focus:outline-none focus:ring-2 focus:ring-tertiary/40"
        />
      </div>

      <button
        type="button"
        onClick={handleUseCurrentLocation}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
          usingCurrentLocation
            ? 'bg-tertiary/10 border-tertiary text-tertiary'
            : 'bg-surface-container-low border-outline-variant text-on-surface-variant hover:bg-surface-container'
        }`}
      >
        <span className="material-symbols-outlined text-lg">my_location</span>
        <span className="text-sm font-semibold font-label">
          {usingCurrentLocation ? 'GPS Location Active' : 'Use My Current Location'}
        </span>
        {usingCurrentLocation && (
          <span className="ml-auto w-2 h-2 rounded-full bg-tertiary animate-pulse" />
        )}
      </button>

      <div>
        <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-2">
          Recent Searches
        </p>
        <div className="flex flex-wrap gap-2">
          {RECENT_SEARCHES.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => setQuery(chip.label)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-label hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">{chip.icon}</span>
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-2">
          Popular Searches
        </p>
        <div className="flex flex-wrap gap-2">
          {POPULAR_SEARCHES.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => setQuery(chip.label)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-label hover:bg-primary/20 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">{chip.icon}</span>
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-3">
          Nearby Facilities
        </p>
        <div className="flex flex-col gap-2">
          {NEARBY_FACILITIES.map((facility) => (
            <button
              key={facility.id}
              type="button"
              onClick={() => {
                setQuery(facility.name);
                onSelectLocation(facility.name);
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-lg">
                  {TYPE_ICONS[facility.type]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-on-surface truncate">{facility.name}</p>
                <p className="text-xs text-on-surface-variant truncate">{facility.address}</p>
              </div>
              <span className="text-xs font-bold text-tertiary shrink-0">
                {facility.distanceMi} mi
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
