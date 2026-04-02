import type { AcqCompany, AcqContact, AcqRegulation, AcqEvent, AcqPlaybook, DashboardKPIs } from './types';

const BASE = '/api/acquisition';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API ${path}: ${res.status}`);
  return res.json();
}

export function fetchCompanies(params?: Record<string, string>): Promise<AcqCompany[]> {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return get<AcqCompany[]>(`/companies${qs}`);
}

export function fetchCompany(id: string): Promise<AcqCompany> {
  return get<AcqCompany>(`/companies/${id}`);
}

export function fetchContacts(params?: Record<string, string>): Promise<AcqContact[]> {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return get<AcqContact[]>(`/contacts${qs}`);
}

export function fetchDashboard(): Promise<DashboardKPIs> {
  return get<DashboardKPIs>('/dashboard');
}

export function fetchRegulations(): Promise<AcqRegulation[]> {
  return get<AcqRegulation[]>('/regulations');
}

export function fetchEvents(): Promise<AcqEvent[]> {
  return get<AcqEvent[]>('/events');
}

export function fetchPlaybook(): Promise<AcqPlaybook[]> {
  return get<AcqPlaybook[]>('/playbook');
}

export function fetchProjection(): Promise<{ by_tier: Record<string, { count: number; revenue: number }>; total: number }> {
  return get('/projection');
}
