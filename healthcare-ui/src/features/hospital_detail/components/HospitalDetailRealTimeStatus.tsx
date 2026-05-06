import React from 'react';
import { HOSPITAL_DETAIL } from '../utils/hospitalDetailData';

const STATUS_STYLES = {
  good: { dot: 'bg-secondary', text: 'text-secondary', bg: 'bg-secondary/10' },
  limited: { dot: 'bg-yellow-500', text: 'text-yellow-600', bg: 'bg-yellow-500/10' },
  full: { dot: 'bg-tertiary', text: 'text-tertiary', bg: 'bg-tertiary/10' },
};

export const HospitalDetailRealTimeStatus: React.FC = () => {
  return (
    <section className="max-w-lg mx-auto px-4 py-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
        <span className="text-[10px] font-label font-bold tracking-widest uppercase text-outline">
          Real-time Status
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {HOSPITAL_DETAIL.realTimeMetrics.map((m) => {
          const style = STATUS_STYLES[m.status];
          return (
            <div
              key={m.label}
              className="bg-surface-container-lowest rounded-2xl p-4 shadow-clinical-lift"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 ${style.bg} rounded-xl flex items-center justify-center`}>
                  <span className={`material-symbols-outlined ${style.text} text-[18px]`}>
                    {m.icon}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-label font-bold tracking-widest uppercase text-outline block mb-1">
                {m.label}
              </span>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${style.dot}`} />
                <span className={`font-headline font-bold text-base ${style.text}`}>{m.value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
