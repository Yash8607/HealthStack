import React from 'react';
import Link from 'next/link';

export const HomeServiceCards: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-6">
      <Link
        href="/emergency_assistance"
        className="bg-tertiary rounded-2xl p-8 shadow-clinical-lift flex flex-col gap-5 cursor-pointer hover:scale-[1.01] transition-transform"
      >
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-on-tertiary text-2xl">ambulance</span>
        </div>
        <div>
          <h2 className="font-headline font-bold text-2xl text-on-tertiary mb-2">Emergency</h2>
          <p className="font-body text-on-tertiary/80 text-sm leading-relaxed">
            Accident, Heart Attack, Pregnancy &amp; more. Immediate response team ready 24/7.
          </p>
        </div>
        <span className="mt-auto w-fit flex items-center gap-2 bg-on-tertiary text-tertiary font-label font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition">
          Get help now
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </span>
      </Link>

      <Link
        href="/healthcare_services"
        className="bg-secondary rounded-2xl p-8 shadow-clinical-lift flex flex-col gap-5 cursor-pointer hover:scale-[1.01] transition-transform"
      >
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-on-secondary text-2xl">stethoscope</span>
        </div>
        <div>
          <h2 className="font-headline font-bold text-2xl text-on-secondary mb-2">Normal</h2>
          <p className="font-body text-on-secondary/80 text-sm leading-relaxed">
            Checkup, Appointments, Lab Tests &amp; more. Schedule your wellness journey today.
          </p>
        </div>
        <span className="mt-auto w-fit flex items-center gap-2 bg-on-secondary text-secondary font-label font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition">
          Book appointment
          <span className="material-symbols-outlined text-[18px]">calendar_today</span>
        </span>
      </Link>
    </section>
  );
};
