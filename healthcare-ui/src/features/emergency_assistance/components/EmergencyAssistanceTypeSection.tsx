import React from 'react';
import type { EmergencyType } from '../types';

interface EmergencyOption {
  value: EmergencyType;
  label: string;
  icon: string;
}

const EMERGENCY_OPTIONS: EmergencyOption[] = [
  { value: 'road_accident', label: 'Road Accident', icon: 'car_crash' },
  { value: 'heart_attack', label: 'Heart Attack / Chest Pain', icon: 'cardiology' },
  { value: 'breathing_difficulty', label: 'Difficulty Breathing', icon: 'pulmonology' },
  { value: 'unconscious', label: 'Unconscious / Unresponsive', icon: 'emergency' },
  { value: 'severe_bleeding', label: 'Severe Bleeding', icon: 'personal_injury' },
  { value: 'other', label: 'Other Medical Emergency', icon: 'medical_services' },
];

interface EmergencyAssistanceTypeSectionProps {
  value: EmergencyType | '';
  onChange: (value: EmergencyType) => void;
}

export const EmergencyAssistanceTypeSection: React.FC<EmergencyAssistanceTypeSectionProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-clinical-lift p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center shrink-0">
          <span className="font-headline font-black text-on-tertiary text-sm">1</span>
        </div>
        <div>
          <h2 className="font-headline font-bold text-on-surface text-base">Emergency Type</h2>
          <p className="text-on-surface-variant text-xs">Select the nature of emergency</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {EMERGENCY_OPTIONS.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? 'border-tertiary bg-tertiary/10 text-tertiary'
                  : 'border-outline-variant bg-surface-container-low text-on-surface hover:bg-surface-container hover:border-outline'
              }`}
            >
              <span
                className={`material-symbols-outlined text-xl ${
                  isSelected ? 'text-tertiary' : 'text-on-surface-variant'
                }`}
              >
                {option.icon}
              </span>
              <span className="font-label font-semibold text-sm">{option.label}</span>
              {isSelected && (
                <span className="material-symbols-outlined text-tertiary text-lg ml-auto">
                  check_circle
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
