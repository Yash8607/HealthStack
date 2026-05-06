import React from 'react';
import { HOSPITAL_DETAIL } from '../utils/hospitalDetailData';

export const HospitalDetailSpecialists: React.FC = () => {
  return (
    <section className="bg-surface-container-low py-5">
      <div className="max-w-lg mx-auto px-4">
        <span className="text-[10px] font-label font-bold tracking-widest uppercase text-outline block mb-3">
          Specialists
        </span>
        <div className="flex flex-col gap-3">
          {HOSPITAL_DETAIL.doctorsList.map((doc) => (
            <div
              key={doc.id}
              className="bg-surface-container-lowest rounded-2xl p-4 shadow-clinical-lift flex gap-4 items-start"
            >
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-surface-container shrink-0">
                <img
                  src={doc.imageUrl}
                  alt={doc.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-headline font-bold text-base text-on-surface leading-tight">
                  {doc.name}
                </h3>
                <p className="text-xs text-on-surface-variant mb-2">{doc.title}</p>

                <div className="flex items-center gap-1 mb-2">
                  <span
                    className="material-symbols-outlined text-yellow-500 text-[14px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="font-label font-bold text-xs text-on-surface">{doc.rating}</span>
                  <span className="text-[10px] text-on-surface-variant">({doc.reviewCount})</span>
                </div>

                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span className="text-xs font-label font-semibold text-secondary">
                    {doc.availability}
                  </span>
                </div>

                <button className="w-full bg-surface-container text-on-surface-variant font-label font-semibold text-xs py-2 rounded-xl hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">calendar_view_week</span>
                  Check Schedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
