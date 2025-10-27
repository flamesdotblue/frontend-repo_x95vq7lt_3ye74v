import React from 'react';
import Spline from '@splinetool/react-spline';

export default function DZHero({ onAnalyze, onGenerate }) {
  return (
    <section className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 h-64">
      <Spline scene="https://prod.spline.design/4HIlOdlXYYkZW66z/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
      <div className="absolute inset-0 p-6 flex items-end justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-100">Security Shield. Modern. Minimal.</h2>
          <p className="text-sm text-neutral-400 mt-1">Live threat visibility for your SOC workflows.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onAnalyze} className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 text-sm font-medium">AI Attack Analysis</button>
          <button onClick={onGenerate} className="rounded-xl border border-neutral-700 hover:bg-neutral-900 text-neutral-200 px-4 py-2 text-sm font-medium">Generate IOC & IOA</button>
        </div>
      </div>
    </section>
  );
}
