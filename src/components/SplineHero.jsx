import React from 'react';
import Spline from '@splinetool/react-spline';
import { ArrowUpRight, Plus } from 'lucide-react';

export default function SplineHero({ onRaiseTicket, onRequestAsset }) {
  return (
    <section className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="grid md:grid-cols-2">
        <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-[#006F5B] bg-[#006F5B]/10 px-3 py-1 rounded-full w-fit">Enterprise IT Platform</span>
          <h1 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-neutral-900 dark:text-neutral-100">GuardianDesk — Unified Operations for Assets, Tickets, Privileges, and Analytics</h1>
          <p className="mt-3 text-neutral-600 dark:text-neutral-300 text-sm md:text-base">Modern microservice architecture with a backend-for-frontend layer. Stay compliant, reduce MTTR, and keep SLAs green with real-time insights and streamlined workflows.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={onRaiseTicket} className="inline-flex items-center gap-2 rounded-xl bg-[#006F5B] text-white px-4 py-2 text-sm shadow-sm hover:shadow transition-shadow">
              <Plus className="h-4 w-4" /> Raise Ticket
            </button>
            <button onClick={onRequestAsset} className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800">
              Request Asset <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="h-[300px] md:h-[360px] lg:h-[420px]">
          <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-transparent dark:from-neutral-900/60" />
        </div>
      </div>
    </section>
  );
}
