import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Upload, Bot } from 'lucide-react';

function BarChart({ data }) {
  // data: [{label, value}]
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="w-full h-56 flex items-end gap-3 p-3 border border-neutral-800 rounded-xl bg-neutral-950">
      {data.map(d => (
        <div key={d.label} className="flex-1 flex flex-col items-center">
          <div className="w-full bg-emerald-600/20 rounded-t-md" style={{ height: `${(d.value / max) * 100}%` }}>
            <div className="h-full w-full bg-emerald-500 rounded-t-md" />
          </div>
          <div className="mt-2 text-[11px] text-neutral-400 text-center leading-tight">{d.label}</div>
        </div>
      ))}
    </div>
  );
}

function PieChart({ slices }) {
  // slices: [{label, value, color}]
  const total = slices.reduce((a, b) => a + b.value, 0) || 1;
  let cumulative = 0;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="border border-neutral-800 rounded-xl bg-neutral-950 p-3 flex items-center justify-center">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r={radius} fill="transparent" stroke="#1f2937" strokeWidth="20" />
        {slices.map((s, i) => {
          const fraction = s.value / total;
          const dash = fraction * circumference;
          const gap = circumference - dash;
          const rotate = (cumulative / total) * 360;
          cumulative += s.value;
          return (
            <circle
              key={i}
              cx="100"
              cy="100"
              r={radius}
              fill="transparent"
              stroke={s.color}
              strokeWidth="20"
              strokeDasharray={`${dash} ${gap}`}
              transform={`rotate(${rotate} 100 100)`}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default function DZDashboard({ onOpenModal }) {
  const [feed, setFeed] = useState([
    { id: 1, text: 'WAF blocked SQLi attempt from 185.23.44.12', severity: 'high' },
    { id: 2, text: 'New login from unknown device - user: ops-01', severity: 'medium' },
  ]);

  useEffect(() => {
    const id = setInterval(() => {
      const severities = ['low', 'medium', 'high'];
      const samples = [
        'Brute force attempt detected on /auth',
        'Suspicious file upload blocked',
        'XSS payload filtered in /search',
        'Outbound connection to known C2 domain prevented',
      ];
      setFeed((prev) => [
        { id: Date.now(), text: samples[Math.floor(Math.random() * samples.length)], severity: severities[Math.floor(Math.random() * 3)] },
        ...prev.slice(0, 20),
      ]);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const owasp = useMemo(() => ([
    { label: 'A01', value: 42 },
    { label: 'A02', value: 25 },
    { label: 'A03', value: 12 },
    { label: 'A04', value: 34 },
    { label: 'A05', value: 16 },
    { label: 'A06', value: 8 },
    { label: 'A07', value: 21 },
    { label: 'A08', value: 5 },
    { label: 'A09', value: 11 },
    { label: 'A10', value: 7 },
  ]), []);

  const pie = useMemo(() => ([
    { label: 'SQLi', value: 32, color: '#10b981' },
    { label: 'XSS', value: 18, color: '#34d399' },
    { label: 'Auth', value: 25, color: '#6ee7b7' },
    { label: 'Bot', value: 10, color: '#a7f3d0' },
    { label: 'Other', value: 15, color: '#064e3b' },
  ]), []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-neutral-200">OWASP Top 10 Distribution</h3>
            <button onClick={() => onOpenModal('analysis')} className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500">
              <Bot className="h-4 w-4" />
              AI Attack Analysis
            </button>
          </div>
          <BarChart data={owasp} />
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-neutral-200">Attack Types</h3>
          <PieChart slices={pie} />
          <div className="text-xs text-neutral-400 grid grid-cols-2 gap-y-1">
            {pie.map((p) => (
              <div key={p.label} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-sm" style={{ background: p.color }} />
                {p.label} - {p.value}%
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-neutral-800 rounded-xl bg-neutral-950">
          <div className="flex items-center justify-between p-4 border-b border-neutral-800">
            <div className="font-semibold text-neutral-200">Real-time Activity</div>
            <div className="text-xs text-neutral-500">Live feed</div>
          </div>
          <ul className="divide-y divide-neutral-900">
            {feed.map(item => (
              <li key={item.id} className="p-4 flex items-center gap-3">
                <div className={`h-7 w-7 grid place-items-center rounded-lg ${
                  item.severity === 'high' ? 'bg-red-500/10 text-red-400' : item.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-neutral-700/20 text-neutral-400'
                }`}>
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <span className="text-sm text-neutral-300">{item.text}</span>
                <span className="ml-auto text-[11px] px-2 py-0.5 rounded-full border border-neutral-800 text-neutral-400 capitalize">{item.severity}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <div className="border border-neutral-800 rounded-xl bg-neutral-950 p-4">
            <div className="font-semibold text-neutral-200">Upload Logs</div>
            <p className="text-xs text-neutral-500 mt-1">Drop log files for analysis. Max 20MB.</p>
            <label className="mt-3 block border border-dashed border-neutral-700 rounded-xl p-6 text-center hover:bg-neutral-900 cursor-pointer">
              <input type="file" className="hidden" multiple />
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-5 w-5 text-neutral-400" />
                <span className="text-sm text-neutral-300">Click to upload or drag-and-drop</span>
              </div>
            </label>
            <div className="mt-3 flex gap-2">
              <button onClick={() => onOpenModal('generate')} className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 text-sm">Generate IOC & IOA</button>
            </div>
          </div>

          <div className="border border-neutral-800 rounded-xl bg-neutral-950 p-4">
            <div className="font-semibold text-neutral-200">API Management</div>
            <p className="text-xs text-neutral-500 mt-1">Keys, usage, and rate limits.</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-neutral-900 p-3">
                <div className="text-neutral-400">Requests</div>
                <div className="text-neutral-100 text-lg font-semibold">12.8k</div>
              </div>
              <div className="rounded-lg bg-neutral-900 p-3">
                <div className="text-neutral-400">Rate Limit</div>
                <div className="text-neutral-100 text-lg font-semibold">850/min</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
