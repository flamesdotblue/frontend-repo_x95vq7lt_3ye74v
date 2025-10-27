import React from 'react';
import { Shield, Home, Bot, FileText, Server, ScrollText } from 'lucide-react';

export default function DZSidebar({ active, onChange }) {
  const items = [
    { key: 'dashboard', label: 'Dashboard', icon: Home },
    { key: 'analysis', label: 'AI Attack Analysis', icon: Bot },
    { key: 'ioc', label: 'IOC/IOA Generation', icon: FileText },
    { key: 'api', label: 'API Management', icon: Server },
    { key: 'logs', label: 'Logs', icon: ScrollText },
  ];

  return (
    <aside className="h-screen w-72 shrink-0 border-r border-neutral-800 bg-neutral-950 text-neutral-200 hidden md:flex md:flex-col">
      <div className="flex items-center gap-2 px-5 h-16 border-b border-neutral-800">
        <div className="h-9 w-9 grid place-items-center rounded-lg bg-emerald-500/10 text-emerald-400">
          <Shield className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm text-neutral-400">SOC Suite</div>
          <div className="font-semibold tracking-tight">DedZone</div>
        </div>
      </div>
      <nav className="p-3 space-y-1">
        {items.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-colors text-sm ${
                isActive ? 'bg-emerald-500/10 text-emerald-300' : 'hover:bg-neutral-900 text-neutral-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
      <div className="mt-auto p-4 text-xs text-neutral-500">Dark-themed, SOC-ready interface</div>
    </aside>
  );
}
