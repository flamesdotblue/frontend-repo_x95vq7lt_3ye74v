import React from 'react';
import { Home, Ticket, Laptop, CheckCircle, BarChart3, Shield, Settings, Server } from 'lucide-react';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: Home },
  { key: 'tickets', label: 'Ticketing', icon: Ticket },
  { key: 'assets', label: 'Assets', icon: Laptop },
  { key: 'approvals', label: 'Approvals', icon: CheckCircle },
  { key: 'analytics', label: 'Reports', icon: BarChart3 },
  { key: 'privileges', label: 'Privileges', icon: Shield },
  { key: 'audit', label: 'Audit & History', icon: Server },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default function SidebarNav({ active, onChange, collapsed }) {
  return (
    <aside
      className={`bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 h-full flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-72'
      }`}
      aria-label="Sidebar navigation"
    >
      <div className="px-4 py-4 flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-[#006F5B] text-white grid place-items-center font-bold">G</div>
        {!collapsed && (
          <div>
            <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">GuardianDesk</div>
            <div className="text-xs text-neutral-500">IT Operations</div>
          </div>
        )}
      </div>
      <nav className="px-2 py-2 space-y-1 flex-1 overflow-y-auto">
        {navItems.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                isActive
                  ? 'bg-[#006F5B]/10 text-[#006F5B] dark:text-[#7de2cc]'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span>{label}</span>}
            </button>
          );
        })}
      </nav>
      <div className="p-3 text-xs text-neutral-500">
        {!collapsed && <p>v1.0 — Microservices ready</p>}
      </div>
    </aside>
  );
}
