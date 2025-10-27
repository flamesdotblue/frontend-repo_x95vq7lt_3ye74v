import React, { useEffect, useState } from 'react';
import SidebarNav from './components/SidebarNav.jsx';
import Topbar from './components/Topbar.jsx';
import SplineHero from './components/SplineHero.jsx';
import Dashboard from './components/Dashboard.jsx';
import { X } from 'lucide-react';

export default function App() {
  const [active, setActive] = useState('dashboard');
  const [role, setRole] = useState('End User');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showToast, setShowToast] = useState(null);
  const [modal, setModal] = useState(null); // 'approve' | 'reject' | null
  const [offline, setOffline] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(null), 2000);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  const handleAuth = () => {
    setAuthenticated(true);
    setShowToast('Signed in');
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
        <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-medium text-[#006F5B] bg-[#006F5B]/10 px-3 py-1 rounded-full">GuardianDesk</div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight">Secure passwordless access</h1>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300">Continue with your identity provider. MFA/OTP supported for step-up verification.</p>
            <div className="mt-6 space-y-3">
              <button onClick={handleAuth} className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-3 flex items-center justify-center gap-3">
                <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="h-5 w-5" />
                Continue with Google
              </button>
              <button onClick={handleAuth} className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-3 flex items-center justify-center gap-3">
                <img src="https://images.unsplash.com/photo-1570063578733-6a33b69d1439?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxNaWNyb3NvZnR8ZW58MHwwfHx8MTc2MTUzOTE4NXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Microsoft" className="h-5 w-5" />
                Continue with Microsoft
              </button>
              <div className="pt-2">
                <label className="text-sm text-neutral-500">MFA / OTP</label>
                <div className="mt-2 flex gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <input key={i} inputMode="numeric" maxLength={1} className="w-12 h-12 text-center rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900" />
                  ))}
                </div>
                <button onClick={handleAuth} className="mt-3 rounded-xl bg-[#006F5B] text-white px-4 py-2">Verify</button>
              </div>
            </div>
          </div>
          <div className="h-[360px]">
            <SplineHero onRaiseTicket={() => {}} onRequestAsset={() => {}} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <div className="flex h-screen">
        <div className="hidden md:block">
          <SidebarNav active={active} onChange={setActive} collapsed={sidebarCollapsed} />
        </div>
        <div className="flex-1 flex flex-col">
          <Topbar
            role={role}
            onRoleChange={setRole}
            darkMode={darkMode}
            onToggleDark={() => setDarkMode((v) => !v)}
            onToggleSidebar={() => setSidebarCollapsed((v) => !v)}
            onShowToast={(m) => setShowToast(m)}
          />
          <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            <SplineHero onRaiseTicket={() => setShowToast('New ticket')} onRequestAsset={() => setShowToast('Asset request')} />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={offline} onChange={(e) => setOffline(e.target.checked)} />
                  Read-only mode if services offline
                </label>
              </div>
              <div className="text-xs text-neutral-500">Role: {role}</div>
            </div>

            <Dashboard role={role} onOpenModal={setModal} offline={offline} />
          </main>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="rounded-xl bg-neutral-900 text-white px-4 py-3 shadow-lg">
            {showToast}
          </div>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{modal === 'approve' ? 'Approve request' : 'Reject request'}</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">Add an optional comment and confirm.</p>
              </div>
              <button onClick={() => setModal(null)} className="h-8 w-8 grid place-items-center rounded-lg border border-neutral-200 dark:border-neutral-800">
                <X className="h-4 w-4" />
              </button>
            </div>
            <textarea className="mt-4 w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3" rows={4} placeholder="Comment (optional)" />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setModal(null)} className="rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-2">Cancel</button>
              <button onClick={() => { setModal(null); setShowToast('Action submitted'); }} className={`rounded-xl px-4 py-2 text-white ${modal==='approve' ? 'bg-emerald-600' : 'bg-red-600'}`}>{modal==='approve' ? 'Approve' : 'Reject'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
