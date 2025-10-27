import React from 'react';
import { Search, Bell, User, Sun, Moon, ChevronDown } from 'lucide-react';

export default function Topbar({ role, onRoleChange, darkMode, onToggleDark, onToggleSidebar, onShowToast }) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-neutral-900/80 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onToggleSidebar} className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg border border-neutral-200 dark:border-neutral-800">
            <span className="sr-only">Toggle navigation</span>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              className="w-80 pl-10 pr-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:ring-2 focus:ring-[#006F5B]/30 outline-none"
              placeholder="Search tickets, assets, users..."
              onKeyDown={(e) => e.key === 'Enter' && onShowToast('Search executed')}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select
            className="hidden sm:block text-sm rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2"
            value={role}
            onChange={(e) => onRoleChange(e.target.value)}
            aria-label="Select role"
          >
            <option>End User</option>
            <option>Support Agent</option>
            <option>Manager</option>
            <option>IT Manager</option>
            <option>Auditor</option>
          </select>

          <button
            onClick={onToggleDark}
            className="h-10 w-10 grid place-items-center rounded-xl border border-neutral-200 dark:border-neutral-800"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button className="relative h-10 w-10 grid place-items-center rounded-xl border border-neutral-200 dark:border-neutral-800">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 text-[10px] bg-[#FFD166] text-neutral-900 rounded-full px-1.5 py-0.5">3</span>
          </button>

          <button className="flex items-center gap-2 rounded-xl px-2 py-1 border border-neutral-200 dark:border-neutral-800">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#006F5B] to-emerald-400 text-white grid place-items-center">
              <User className="h-4 w-4" />
            </div>
            <span className="hidden sm:block text-sm">Alex</span>
            <ChevronDown className="h-4 w-4 hidden sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}
