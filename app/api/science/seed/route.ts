import { NextResponse } from 'next/server';
import { createSciClient } from '@/lib/science/supabase';
import seedPapers from '@/lib/science/seed-papers.json';
import seedLabs from '@/lib/science/seed-labs.json';
import seedConferences from '@/lib/science/seed-conferences.json';
import seedBreakthroughs from '@/lib/science/seed-breakthroughs.json';
import seedPatents from '@/lib/science/seed-patents.json';

export async function POST() {
  const supabase = await createSciClient();
  const results: Record<string, string> = {};

  // Seed papers
  const { error: pe } = await supabase.from('sci_papers').upsert(seedPapers, { onConflict: 'id' });
  results.papers = pe ? pe.message : `${seedPapers.length} seeded`;

  // Seed labs
  const { error: le } = await supabase.from('sci_labs').upsert(seedLabs, { onConflict: 'id' });
  results.labs = le ? le.message : `${seedLabs.length} seeded`;

  // Seed conferences
  const { error: ce } = await supabase.from('sci_conferences').upsert(seedConferences, { onConflict: 'id' });
  results.conferences = ce ? ce.message : `${seedConferences.length} seeded`;

  // Seed breakthroughs
  const { error: be } = await supabase.from('sci_breakthroughs').upsert(seedBreakthroughs, { onConflict: 'id' });
  results.breakthroughs = be ? be.message : `${seedBreakthroughs.length} seeded`;

  // Seed patents
  const { error: pae } = await supabase.from('sci_patents').upsert(seedPatents, { onConflict: 'id' });
  results.patents = pae ? pae.message : `${seedPatents.length} seeded`;

  return NextResponse.json(results);
}
