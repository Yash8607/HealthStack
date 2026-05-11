import React, { useState } from 'react';
import { useRouter } from 'next/router';
import type { EmergencyAssistanceForm, EmergencyType } from '../types';
import { EmergencyAssistanceActionsSection } from './EmergencyAssistanceActionsSection';
import { EmergencyAssistanceBottomNav } from './EmergencyAssistanceBottomNav';
import { EmergencyAssistanceFooter } from './EmergencyAssistanceFooter';
import { EmergencyAssistanceHeader } from './EmergencyAssistanceHeader';
import { EmergencyAssistanceLocationSearch } from './EmergencyAssistanceLocationSearch';
import { EmergencyAssistancePatientSection } from './EmergencyAssistancePatientSection';
import { EmergencyAssistanceTypeSection } from './EmergencyAssistanceTypeSection';

export const EmergencyAssistance: React.FC = () => {
  const router = useRouter();

  const [form, setForm] = useState<EmergencyAssistanceForm>({
    emergencyType: '',
    patientName: '',
    phoneNumber: '',
    email: '',
    location: '',
    emergencyNotes: '',
  });

  const handleCancel = () => {
    router.push('/');
  };

  const handleLocationSelect = (location: string) => {
    setForm((prev) => ({ ...prev, location }));
  };

  const handleTypeChange = (value: EmergencyType) => {
    setForm((prev) => ({ ...prev, emergencyType: value }));
  };

  const handlePatientChange = (
    field: 'patientName' | 'phoneNumber' | 'email' | 'location' | 'emergencyNotes',
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background text-on-surface pb-24">
      <EmergencyAssistanceHeader onCancel={handleCancel} />

      <main className="pt-20 px-4 max-w-lg mx-auto flex flex-col gap-4">
        <div className="pt-4">
          <span className="text-[10px] font-bold tracking-widest uppercase text-tertiary block mb-1">
            Emergency Response
          </span>
          <h2 className="font-headline text-2xl font-extrabold text-on-surface leading-tight">
            Request Assistance
          </h2>
          <p className="text-on-surface-variant text-sm mt-1">
            Fill in the details below to alert the nearest response team.
          </p>
        </div>

        <EmergencyAssistanceLocationSearch onSelectLocation={handleLocationSelect} />

        <EmergencyAssistanceTypeSection value={form.emergencyType} onChange={handleTypeChange} />

        <EmergencyAssistancePatientSection
          values={{
            patientName: form.patientName,
            phoneNumber: form.phoneNumber,
            email: form.email,
            location: form.location,
            emergencyNotes: form.emergencyNotes,
          }}
          onChange={handlePatientChange}
        />

        <EmergencyAssistanceActionsSection />

        <EmergencyAssistanceFooter />
      </main>

      <EmergencyAssistanceBottomNav />
    </div>
  );
};
