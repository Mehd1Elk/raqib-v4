import { NextResponse } from 'next/server';
import { createSciClient } from '@/lib/science/supabase';

export async function GET() {
  const supabase = await createSciClient();

  const [papers, labs, patents, conferences, breakthroughs] = await Promise.all([
    supabase.from('sci_papers').select('domain,brique,status'),
    supabase.from('sci_labs').select('domain'),
    supabase.from('sci_patents').select('domain'),
    supabase.from('sci_conferences').select('domain'),
    supabase.from('sci_breakthroughs').select('*').order('date', { ascending: false }).limit(10),
  ]);

  const paperData = papers.data || [];
  const labData = labs.data || [];
  const patentData = patents.data || [];

  const domains = ['1', '2', '3', '4', '5', '6', '7'] as const;
  const briques = ['noos', 'aelya', 'myne', 'burhan', 'yrknown', 'raqib', 'mizan'] as const;
  const statuses = ['to_read', 'reading', 'read', 'applied', 'dismissed'] as const;

  const by_domain: Record<string, { papers: number; labs: number; patents: number }> = {};
  for (const d of domains) {
    by_domain[d] = {
      papers: paperData.filter((p: { domain: string }) => p.domain === d).length,
      labs: labData.filter((l: { domain: string }) => l.domain === d).length,
      patents: patentData.filter((p: { domain: string }) => p.domain === d).length,
    };
  }

  const by_status: Record<string, number> = {};
  for (const s of statuses) {
    by_status[s] = paperData.filter((p: { status: string }) => p.status === s).length;
  }

  const by_brique: Record<string, number> = {};
  for (const b of briques) {
    by_brique[b] = paperData.filter((p: { brique: string }) => p.brique === b).length;
  }

  return NextResponse.json({
    total_papers: paperData.length,
    total_labs: labData.length,
    total_patents: patentData.length,
    total_conferences: (conferences.data || []).length,
    total_breakthroughs: (breakthroughs.data || []).length,
    by_domain,
    by_status,
    by_brique,
    recent_breakthroughs: breakthroughs.data || [],
  });
}
