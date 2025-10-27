import React, { useMemo, useState } from 'react';
import { Activity, Ticket, Laptop, AlertTriangle, Filter, Download, CheckCircle, X } from 'lucide-react';

function StatCard({ title, value, icon: Icon, accent = 'from-emerald-500/10 to-emerald-500/0' }) {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
        </div>
        <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${accent} grid place-items-center text-[#006F5B]`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

function Badge({ children, color = 'neutral' }) {
  const map = {
    neutral: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
    green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    yellow: 'bg-[#FFD166]/20 text-amber-700 dark:text-amber-300 dark:bg-amber-900/30',
    red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  };
  return <span className={`text-xs px-2 py-1 rounded-lg ${map[color]}`}>{children}</span>;
}

function TableSkeleton() {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800" />
      ))}
    </div>
  );
}

export default function Dashboard({ role, onOpenModal, offline }) {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('All');

  const tickets = useMemo(
    () => [
      { id: 'GD-1021', type: 'Incident', priority: 'High', assignee: 'Priya', sla: '2h', status: 'In Progress' },
      { id: 'GD-1020', type: 'Service', priority: 'Low', assignee: 'You', sla: '48h', status: 'Open' },
      { id: 'GD-1019', type: 'Change', priority: 'Medium', assignee: 'Alex', sla: '24h', status: 'Pending Approval' },
      { id: 'GD-1018', type: 'Incident', priority: 'Critical', assignee: 'N/A', sla: '1h', status: 'Waiting on User' },
    ],
    []
  );

  const filtered = tickets.filter((t) => (filter === 'All' ? true : t.priority === filter));

  return (
    <div className="space-y-6">
      {offline && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200 p-3">
          Some services are offline. Showing cached data in read-only mode.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Tickets" value={role === 'End User' ? '4' : '26'} icon={Ticket} />
        <StatCard title="Assigned Assets" value={role === 'End User' ? '3' : '124'} icon={Laptop} accent="from-[#006F5B]/10 to-transparent" />
        <StatCard title="Pending Approvals" value={role === 'Manager' ? '5' : '2'} icon={CheckCircle} accent="from-[#FFD166]/30 to-transparent" />
        <StatCard title="SLA Breaches" value={role === 'IT Manager' ? '3' : '1'} icon={AlertTriangle} accent="from-red-500/10 to-transparent" />
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Tickets</h3>
          <div className="flex items-center gap-2">
            <select
              className="text-sm rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-2 py-1"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
            <button className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 px-3 py-2 text-sm">
              <Filter className="h-4 w-4" />
              Filters
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-[#006F5B] text-white px-3 py-2 text-sm">
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>
        <div className="mt-4 overflow-x-auto">
          {loading ? (
            <TableSkeleton />
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-neutral-500">
                  <th className="py-2">Ticket ID</th>
                  <th>Type</th>
                  <th>Priority</th>
                  <th>Assigned To</th>
                  <th>SLA Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} className="border-t border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50">
                    <td className="py-3 font-medium text-[#006F5B]">{t.id}</td>
                    <td>{t.type}</td>
                    <td>
                      <Badge color={t.priority === 'Critical' ? 'red' : t.priority === 'High' ? 'yellow' : 'neutral'}>
                        {t.priority}
                      </Badge>
                    </td>
                    <td>{t.assignee}</td>
                    <td>{t.sla}</td>
                    <td>
                      <Badge color={t.status.includes('Pending') ? 'yellow' : 'green'}>{t.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {role === 'Manager' && (
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Pending Approvals</h3>
            <button onClick={() => onOpenModal('approve')} className="rounded-xl bg-[#FFD166] text-neutral-900 px-3 py-2 text-sm">Open Approval Modal</button>
          </div>
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            {[1,2].map((i) => (
              <div key={i} className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Software Access Request</p>
                    <p className="text-xs text-neutral-500">Raised by Chris • SLA 12h</p>
                  </div>
                  <Badge color="yellow">Pending</Badge>
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => onOpenModal('approve')} className="flex-1 rounded-xl bg-emerald-500 text-white py-2 text-sm">Approve</button>
                  <button onClick={() => onOpenModal('reject')} className="flex-1 rounded-xl bg-red-500/90 text-white py-2 text-sm">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Analytics</h3>
          <Badge color="blue">Live</Badge>
        </div>
        <div className="mt-3 grid md:grid-cols-3 gap-4">
          <MiniChart title="SLA Compliance" value="96%" color="#006F5B" />
          <MiniChart title="Avg Resolution" value="5.2h" color="#FFD166" />
          <MiniChart title="Privilege Changes" value="12/wk" color="#ef4444" />
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">AI Assistant (Preview)</h3>
          <Badge>Experimental</Badge>
        </div>
        <div className="mt-3 grid lg:grid-cols-3 gap-4">
          <SuggestionCard title="Auto-suggest resolution" body="Restart print spooler service on affected endpoints." />
          <SuggestionCard title="Optimize SLAs" body="Shift 2 low-impact tickets to async queue to avoid breach." />
          <SuggestionCard title="Asset lifecycle" body="3 laptops nearing end-of-life. Recommend replacement in Q4." />
        </div>
      </div>
    </div>
  );
}

function MiniChart({ title, value, color }) {
  return (
    <div className="rounded-xl p-4 border border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500">{title}</p>
        <Activity className="h-4 w-4 text-neutral-400" />
      </div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      <div className="mt-3 h-16 w-full">
        <svg viewBox="0 0 100 30" className="h-full w-full">
          <polyline fill="none" stroke={color} strokeWidth="2" points="0,20 15,22 30,15 45,18 60,10 75,12 90,8 100,10" />
        </svg>
      </div>
    </div>
  );
}

function SuggestionCard({ title, body }) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
      <p className="font-medium">{title}</p>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{body}</p>
      <div className="mt-3 flex gap-2">
        <button className="rounded-lg bg-[#006F5B] text-white text-sm px-3 py-1.5">Apply</button>
        <button className="rounded-lg border border-neutral-200 dark:border-neutral-800 text-sm px-3 py-1.5">Details</button>
      </div>
    </div>
  );
}
