import React from 'react';
import { Menu, Moon, Sun, Download } from 'lucide-react';

export default function DZTopbar({ onToggleMenu, darkMode, onToggleDark, onDownload }) {
  return (
    <header className="sticky top-0 z-20 h-16 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onToggleMenu} className="md:hidden h-9 w-9 rounded-lg border border-neutral-800 grid place-items-center hover:bg-neutral-900">
            <Menu className="h-4 w-4 text-neutral-300" />
          </button>
          <div className="text-neutral-300 text-sm">Secure Operations Center</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onDownload} className="h-9 px-3 rounded-lg border border-neutral-800 text-neutral-200 hover:bg-neutral-900 flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span className="text-sm">Download PDF</span>
          </button>
          <button onClick={onToggleDark} className="h-9 w-9 rounded-lg border border-neutral-800 grid place-items-center hover:bg-neutral-900 text-neutral-300">
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
