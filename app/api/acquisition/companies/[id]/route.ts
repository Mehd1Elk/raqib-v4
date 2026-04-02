import { NextResponse } from 'next/server';
import { createAcqClient } from '@/lib/acquisition/supabase';

function getSuggestedPersonas(briques: string[]) {
  const personas = new Set<string>();
  if (briques.includes('N')) personas.add('drh');
  if (briques.includes('A')) personas.add('dpo');
  if (briques.includes('B')) {
    personas.add('cto');
    personas.add('rse');
    personas.add('achats');
  }
  if (briques.includes('M')) {
    personas.add('cto');
    personas.add('cfo');
  }
  if (briques.includes('Z')) {
    personas.add('cfo');
    personas.add('achats');
  }
  if (briques.includes('Y')) personas.add('drh');
  if (briques.includes('R')) personas.add('rse');
  return Array.from(personas);
}

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const supabase = await createAcqClient();
  
  const { data: company, error } = await supabase
    .from('acq_companies')
    .select('*, acq_contacts(*)')
    .eq('id', id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!company) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const { data: regulations, error: regError } = await supabase.from('acq_regulations').select('*');
  
  let matchedRegulations = [];
  if (!regError && regulations) {
    matchedRegulations = regulations.filter((reg: any) => {
      const sectorMatch = reg.applies_to_sectors?.includes(company.sector);
      const employeesMatch = reg.applies_to_min_employees <= (company.employees_k * 1000);
      return sectorMatch && employeesMatch;
    });
  }

  const suggestedPersonas = getSuggestedPersonas(company.eigen_briques || []);

  return NextResponse.json({
    ...company,
    matched_regulations: matchedRegulations,
    suggested_personas: suggestedPersonas
  });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const supabase = await createAcqClient();
  const body = await request.json();
  
  const { stage, priority, notes } = body;
  
  const { data, error } = await supabase
    .from('acq_companies')
    .update({ stage, priority, notes })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
