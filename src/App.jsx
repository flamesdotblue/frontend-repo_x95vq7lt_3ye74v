import React, { useEffect, useState } from 'react';
import DZSidebar from './components/DZSidebar.jsx';
import DZTopbar from './components/DZTopbar.jsx';
import DZHero from './components/DZHero.jsx';
import DZDashboard from './components/DZDashboard.jsx';

function Modal({ title, description, onClose }) {
  return (
    <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-2xl border border-neutral-800 bg-neutral-950 text-neutral-200">
        <div className="p-5 border-b border-neutral-800">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-neutral-400 mt-1">{description}</p>
        </div>
        <div className="p-5 space-y-3 text-sm text-neutral-300">
          <p>• Insights generated using behavioral clustering and anomaly detection.</p>
          <p>• Recommended actions: isolate suspicious hosts, invalidate sessions, and update WAF rules.</p>
          <p>• Export detailed report from the top bar for sharing with stakeholders.</p>
        </div>
        <div className="p-5 flex justify-end">
          <button onClick={onClose} className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 text-sm">Close</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [modal, setModal] = useState(null); // 'analysis' | 'generate' | null
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(id);
  }, [toast]);

  const handleDownload = () => {
    setToast('Preparing PDF report...');
    setTimeout(() => setToast('Report ready'), 1000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <DZTopbar
        onToggleMenu={() => setMobileMenu((v) => !v)}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((v) => !v)}
        onDownload={handleDownload}
      />

      <div className="flex">
        <div className="hidden md:block"><DZSidebar active={active} onChange={setActive} /></div>

        {/* Mobile drawer */}
        {mobileMenu && (
          <div className="fixed inset-0 z-30 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenu(false)} />
            <div className="absolute left-0 top-0 h-full w-72 bg-neutral-950 border-r border-neutral-800">
              <DZSidebar active={active} onChange={(k) => { setActive(k); setMobileMenu(false); }} />
            </div>
          </div>
        )}

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          <DZHero onAnalyze={() => setModal('analysis')} onGenerate={() => setModal('generate')} />
          <DZDashboard onOpenModal={setModal} />
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-4 right-4 z-40">
          <div className="rounded-xl bg-neutral-900 text-neutral-100 border border-neutral-800 px-4 py-3 shadow-lg">{toast}</div>
        </div>
      )}

      {modal === 'analysis' && (
        <Modal
          title="AI Attack Analysis"
          description="Summarized findings across WAF, IDS, and Auth telemetry"
          onClose={() => setModal(null)}
        />
      )}
      {modal === 'generate' && (
        <Modal
          title="IOC & IOA Generation"
          description="Deterministic indicators extracted from latest threat artifacts"
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
