import type { AcqCompany, AcqContact, AcqRegulation, AcqEvent, AcqPlaybook, DashboardKPIs, SupplyChain, TrojanHorse } from './types';

const BASE = '/api/acquisition';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API ${path}: ${res.status}`);
  return res.json();
}

export function fetchCompanies(params?: Record<string, string>): Promise<AcqCompany[]> {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return get<{ companies: AcqCompany[] }>(`/companies${qs}`).then(r => r.companies ?? []);
}

export function fetchCompany(id: string): Promise<AcqCompany> {
  return get<AcqCompany>(`/companies/${id}`);
}

export function fetchContacts(params?: Record<string, string>): Promise<AcqContact[]> {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return get<{ contacts: AcqContact[] }>(`/contacts${qs}`).then(r => r.contacts ?? []);
}

export function fetchDashboard(): Promise<DashboardKPIs> {
  return get<DashboardKPIs>('/dashboard');
}

export function fetchRegulations(): Promise<AcqRegulation[]> {
  return get<{ regulations: AcqRegulation[] }>('/regulations').then(r => r.regulations ?? []);
}

export function fetchEvents(): Promise<AcqEvent[]> {
  return get<{ events: AcqEvent[] }>('/events').then(r => r.events ?? []);
}

export function fetchPlaybook(): Promise<AcqPlaybook[]> {
  return get<{ playbook: AcqPlaybook[] }>('/playbook').then(r => r.playbook ?? []);
}

export function fetchProjection(): Promise<{ by_tier: Record<string, { count: number; revenue: number }>; total: number }> {
  return get('/projection');
}

export function fetchSupplyChain(): Promise<SupplyChain[]> {
  return get<SupplyChain[]>('/supply-chain');
}

export function fetchTrojanHorses(): Promise<TrojanHorse[]> {
  return get<TrojanHorse[]>('/trojan-horses');
}
