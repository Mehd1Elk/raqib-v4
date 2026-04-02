'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, Zap, Clock, RefreshCw } from 'lucide-react';

interface CronJob {
  agentId: string;
  agentName: string;
  layer: string;
  platform?: string;
  frequency: string;
  status: 'running' | 'paused' | 'error' | 'scheduled';
  nextRun: string;
  lastRun: string;
}

const LAYER_COLORS: Record<string, { bg: string; text: string }> = {
  L0:     { bg: '#1C1814', text: '#FDFAF3' },
  L1:     { bg: '#B8963E', text: '#FDFAF3' },
  'L1.5': { bg: '#D4AF60', text: '#1C1814' },
  L2:     { bg: '#D4CCBA', text: '#1C1814' },
  L3:     { bg: '#E8E4DC', text: '#1C1814' },
  OPS:    { bg: '#918977', text: '#FDFAF3' },
  CORE:   { bg: '#2C2418', text: '#B8963E' },
};

const STATUS_DOT: Record<CronJob['status'], string> = {
  running:   'bg-emerald-500',
  paused:    'bg-amber-400',
  error:     'bg-red-500',
  scheduled: 'bg-blue-400',
};

function getTimeUntil(nextRun: string): string {
  const diff = new Date(nextRun).getTime() - Date.now();
  if (diff <= 0) return 'Imminent';
  const hours = Math.floor(diff / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  if (hours > 0) return `dans ${hours}h ${minutes}m`;
  return `dans ${minutes}m`;
}

export function CronScheduler() {
  const [jobs, setJobs] = useState<CronJob[]>([]);
  const [source, setSource] = useState<'LIVE' | 'SIMULE'>('SIMULE');
  const [loading, setLoading] = useState(true);
  const [layerFilter, setLayerFilter] = useState('ALL');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    try {
      const res = await fetch('/api/openclaw/crons');
      const data = await res.json();
      setJobs(data.crons ?? []);
      setSource(data.source === 'openclaw' ? 'LIVE' : 'SIMULE');
    } catch {
      // keep existing jobs on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchJobs();
    const interval = setInterval(fetchJobs, 30_000);
    return () => clearInterval(interval);
  }, [fetchJobs]);

  async function handleAction(agentId: string, action: 'play' | 'pause' | 'zap') {
    setActionLoading(agentId);
    try {
      await fetch('/api/openclaw/crons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId, action }),
      });
      setJobs(prev => prev.map(j => {
        if (j.agentId !== agentId) return j;
        if (action === 'play')  return { ...j, status: 'running' };
        if (action === 'pause') return { ...j, status: 'paused' };
        return j;
      }));
    } finally {
      setActionLoading(null);
    }
  }

  const layers = ['ALL', ...Array.from(new Set(jobs.map(j => j.layer))).sort()];
  const filteredJobs = layerFilter === 'ALL' ? jobs : jobs.filter(j => j.layer === layerFilter);
  const layerColor = (layer: string) =>
    LAYER_COLORS[layer] ?? { bg: '#D4CCBA', text: '#1C1814' };

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFAF3] overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#D4CCBA] shrink-0">
        <div className="flex items-center gap-3">
          <Clock size={13} className="text-[#B8963E]" />
          <span className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[2px] text-[#1C1814]">
            CRON SCHEDULER
          </span>
          <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#918977]">
            {filteredJobs.length} tache{filteredJobs.length !== 1 ? 's' : ''}
          </span>
          <span
            className={`font-[family-name:var(--font-jetbrains)] text-[7px] px-1.5 py-[2px] rounded-none-none ${
              source === 'LIVE'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-[#F2EFE8] text-[#918977]'
            }`}
          >
            {source === 'LIVE' ? 'LIVE' : 'SIMULE'}
          </span>
        </div>
        <button
          onClick={() => { setLoading(true); fetchJobs(); }}
          className="p-1 hover:bg-[#F2EFE8] rounded-none transition-colors"
          aria-label="Actualiser"
        >
          <RefreshCw
            size={12}
            className={loading ? 'animate-spin text-[#B8963E]' : 'text-[#918977]'}
          />
        </button>
      </div>

      {/* Layer filter pills */}
      <div className="flex items-center gap-1.5 px-6 py-2.5 border-b border-[#D4CCBA] overflow-x-auto shrink-0">
        {layers.map(layer => {
          const isActive = layerFilter === layer;
          const lc = layer !== 'ALL' ? layerColor(layer) : null;
          return (
            <button
              key={layer}
              onClick={() => setLayerFilter(layer)}
              className="shrink-0 font-[family-name:var(--font-jetbrains)] text-[8px] px-2 py-[3px] rounded-none-none transition-all"
              style={
                isActive && lc
                  ? { backgroundColor: lc.bg, color: lc.text }
                  : isActive
                  ? { backgroundColor: '#1C1814', color: '#FDFAF3' }
                  : { backgroundColor: '#F2EFE8', color: '#918977' }
              }
            >
              {layer}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3 animate-pulse">
                <div className="w-2 h-2 rounded-none-none bg-[#D4CCBA]" />
                <div className="h-3 w-12 rounded-none bg-[#D4CCBA]" />
                <div className="h-3 flex-1 rounded-none bg-[#D4CCBA]" />
                <div className="h-3 w-10 rounded-none bg-[#D4CCBA]" />
                <div className="h-3 w-16 rounded-none bg-[#D4CCBA]" />
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <Clock size={20} className="text-[#D4CCBA]" />
            <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#918977] uppercase tracking-wider">
              Aucune tache planifiee
            </span>
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#D4CCBA]">
                {['', 'Couche', 'Agent', 'Freq', 'Prochain run', 'Actions'].map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-2 text-left font-[family-name:var(--font-jetbrains)] text-[8px] uppercase tracking-wider text-[#918977] font-normal"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map(job => {
                const lc = layerColor(job.layer);
                const isActing = actionLoading === job.agentId;
                return (
                  <tr
                    key={job.agentId}
                    className="border-b border-[#D4CCBA]/40 hover:bg-[#F2EFE8] transition-colors"
                  >
                    {/* Status dot */}
                    <td className="pl-4 pr-2 py-3 w-6">
                      <span
                        className={`w-2 h-2 rounded-none-none inline-block ${STATUS_DOT[job.status] ?? 'bg-[#918977]'}`}
                      />
                    </td>

                    {/* Layer badge */}
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span
                        className="font-[family-name:var(--font-jetbrains)] text-[8px] px-2 py-[3px] rounded-none-none"
                        style={{ backgroundColor: lc.bg, color: lc.text }}
                      >
                        {job.layer}
                      </span>
                    </td>

                    {/* Agent name + id */}
                    <td className="px-3 py-3 min-w-[160px]">
                      <div className="text-[10px] text-[#1C1814] leading-tight" style={{ fontFamily: 'var(--font-noto-sans, sans-serif)' }}>
                        {job.agentName}
                      </div>
                      <div className="font-[family-name:var(--font-jetbrains)] text-[7px] text-[#918977] mt-0.5">
                        {job.agentId}
                      </div>
                    </td>

                    {/* Frequency */}
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#918977]">
                        {job.frequency}
                      </span>
                    </td>

                    {/* Countdown */}
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#1C1814]">
                        {getTimeUntil(job.nextRun)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        {job.status !== 'running' ? (
                          <button
                            onClick={() => handleAction(job.agentId, 'play')}
                            disabled={isActing}
                            aria-label="Demarrer"
                            className="disabled:opacity-40 hover:opacity-70 transition-opacity"
                          >
                            <Play size={11} className="text-emerald-600" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAction(job.agentId, 'pause')}
                            disabled={isActing}
                            aria-label="Mettre en pause"
                            className="disabled:opacity-40 hover:opacity-70 transition-opacity"
                          >
                            <Pause size={11} className="text-amber-500" />
                          </button>
                        )}
                        <button
                          onClick={() => handleAction(job.agentId, 'zap')}
                          disabled={isActing}
                          aria-label="Declencher maintenant"
                          className="disabled:opacity-40 hover:opacity-70 transition-opacity"
                        >
                          <Zap size={11} className="text-[#B8963E]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
