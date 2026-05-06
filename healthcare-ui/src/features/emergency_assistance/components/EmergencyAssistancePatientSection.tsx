import React from 'react';

interface PatientDetails {
  patientName: string;
  phoneNumber: string;
  location: string;
  emergencyNotes: string;
}

interface EmergencyAssistancePatientSectionProps {
  values: PatientDetails;
  onChange: (field: keyof PatientDetails, value: string) => void;
}

export const EmergencyAssistancePatientSection: React.FC<
  EmergencyAssistancePatientSectionProps
> = ({ values, onChange }) => {
  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-clinical-lift p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center shrink-0">
          <span className="font-headline font-black text-on-tertiary text-sm">2</span>
        </div>
        <div>
          <h2 className="font-headline font-bold text-on-surface text-base">Patient Details</h2>
          <p className="text-on-surface-variant text-xs">Fill in patient information</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant block mb-1.5">
            Patient Name
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
              person
            </span>
            <input
              type="text"
              value={values.patientName}
              onChange={(e) => onChange('patientName', e.target.value)}
              placeholder="Enter patient name"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant text-on-surface placeholder:text-on-surface-variant text-sm font-body focus:outline-none focus:ring-2 focus:ring-tertiary/40 focus:border-tertiary"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant block mb-1.5">
            Phone Number
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
              call
            </span>
            <input
              type="tel"
              value={values.phoneNumber}
              onChange={(e) => onChange('phoneNumber', e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant text-on-surface placeholder:text-on-surface-variant text-sm font-body focus:outline-none focus:ring-2 focus:ring-tertiary/40 focus:border-tertiary"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant block mb-1.5">
            Location
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-tertiary text-lg">
              location_on
            </span>
            <input
              type="text"
              value={values.location}
              onChange={(e) => onChange('location', e.target.value)}
              placeholder="Search or pin your location"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant text-on-surface placeholder:text-on-surface-variant text-sm font-body focus:outline-none focus:ring-2 focus:ring-tertiary/40 focus:border-tertiary"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant block mb-1.5">
            Emergency Notes
          </label>
          <textarea
            value={values.emergencyNotes}
            onChange={(e) => onChange('emergencyNotes', e.target.value)}
            placeholder="Describe the emergency situation (symptoms, additional context...)"
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant text-on-surface placeholder:text-on-surface-variant text-sm font-body focus:outline-none focus:ring-2 focus:ring-tertiary/40 focus:border-tertiary resize-none"
          />
        </div>
      </div>
    </div>
  );
};
