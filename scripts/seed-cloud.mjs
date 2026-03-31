// Seed remaining entities to Supabase cloud via REST API
import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

const url = 'https://ybwmmmvwhpnotxdysded.supabase.co';
// Use service_role key from env or anon key (we need service_role for RLS bypass)
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!key) {
  console.error('Set SUPABASE_SERVICE_ROLE_KEY env var');
  process.exit(1);
}

const supabase = createClient(url, key);

const entities = ['myne', 'burhan', 'yrknown', 'diwane', 'alguesov', 'amana', 'cg', 'cercle'];

for (const entity of entities) {
  const file = `/Users/mehdielkadiri/eigen-repos/raqib-v4/supabase/migrations/seed_${entity}.sql`;
  const sql = readFileSync(file, 'utf-8');
  const lines = sql.split('\n').filter(l => l.startsWith('INSERT'));

  console.log(`Seeding ${entity}: ${lines.length} statements...`);

  // Execute categories first, then layers
  const catLines = lines.filter(l => l.includes('INTO categories'));
  const layerLines = lines.filter(l => l.includes('INTO layers'));

  // Insert categories
  for (const line of catLines) {
    const match = line.match(/VALUES \('([^']+)', (\d+), '([^']+)'\)/);
    if (match) {
      const { error } = await supabase.from('categories').insert({
        entity_id: match[1],
        position: parseInt(match[2]),
        name: match[3]
      });
      if (error) console.error(`  Cat error: ${error.message}`);
    }
  }

  // Get category IDs for this entity
  const { data: cats } = await supabase.from('categories')
    .select('id, position')
    .eq('entity_id', entity);
  const catMap = {};
  cats.forEach(c => catMap[c.position] = c.id);

  // Insert layers in batches
  const layerRows = [];
  for (const line of layerLines) {
    // Extract: id, entity_id, position, platform_code, name, target_rows
    const m = line.match(/VALUES \('([^']+)', '([^']+)', \(SELECT id FROM categories WHERE entity_id = '([^']+)' AND position = (\d+)\), '([^']+)', '((?:[^'\\]|\\.|'')*)', (\d+)\)/);
    if (m) {
      layerRows.push({
        id: m[1],
        entity_id: m[2],
        category_id: catMap[parseInt(m[4])],
        platform_code: m[5],
        name: m[6].replace(/''/g, "'"),
        target_rows: parseInt(m[7])
      });
    }
  }

  // Batch insert layers (50 at a time)
  for (let i = 0; i < layerRows.length; i += 50) {
    const batch = layerRows.slice(i, i + 50);
    const { error } = await supabase.from('layers').insert(batch);
    if (error) console.error(`  Layer batch error at ${i}: ${error.message}`);
  }

  console.log(`  Done: ${catLines.length} cats, ${layerRows.length} layers`);
}

// Verify
const { data: counts } = await supabase.from('layers').select('entity_id', { count: 'exact', head: false });
const grouped = {};
counts.forEach(r => { grouped[r.entity_id] = (grouped[r.entity_id] || 0) + 1; });
console.log('\n=== VERIFICATION ===');
console.log(grouped);
console.log(`Total layers: ${counts.length}`);
