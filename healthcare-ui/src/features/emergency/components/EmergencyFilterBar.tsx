import React from 'react';
import { EMERGENCY_FILTERS } from '../utils/emergencyData';

interface EmergencyFilterBarProps {
  resultCount: number;
}

export const EmergencyFilterBar: React.FC<EmergencyFilterBarProps> = ({
  resultCount,
}) => {
  return (
    <div className="bg-surface-container-low p-2 rounded-2xl flex flex-wrap gap-2 mb-8 items-center">
      {EMERGENCY_FILTERS.map((filter) => (
        <button
          key={filter.id}
          type="button"
          className="bg-surface-container-lowest text-on-surface px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-white transition-colors"
        >
          <span className="material-symbols-outlined text-sm">{filter.icon}</span>
          {filter.label}
        </button>
      ))}
      <div className="ml-auto pr-4 hidden sm:block">
        <span className="text-xs font-medium text-on-surface-variant">
          {resultCount} results found
        </span>
      </div>
    </div>
  );
};
