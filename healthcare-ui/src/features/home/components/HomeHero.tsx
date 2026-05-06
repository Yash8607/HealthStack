import React from 'react';

export const HomeHero: React.FC = () => {
  return (
    <section className="bg-surface-container-low py-24 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="font-headline font-extrabold text-5xl lg:text-6xl text-on-surface leading-[1.1]">
          Find hospitals, book appointments &amp; get emergency help — fast
        </h1>
        <button className="inline-flex items-center gap-2 bg-primary text-on-primary font-label font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition shadow-clinical-lift">
          <span className="material-symbols-outlined text-[20px]">search</span>
          Search
        </button>
      </div>
    </section>
  );
};
