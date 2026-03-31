// Parse raqib-v4-source.jsx and generate seed SQL for categories + layers
import { readFileSync, writeFileSync } from 'fs';

const jsx = readFileSync('/Users/mehdielkadiri/raqib-workspace/data/raqib-v4-source.jsx', 'utf-8');

// Extract LAYER_DEFS object
const startIdx = jsx.indexOf('const LAYER_DEFS = {');
const endMatch = jsx.indexOf('\n};', startIdx);
const layerDefsStr = jsx.slice(startIdx, endMatch + 3);

// We'll parse it manually using regex since it's not valid JSON
const entities = ['noos', 'aelya', 'myne', 'burhan', 'yrknown', 'diwane', 'alguesov', 'amana', 'cg', 'cercle'];

let sql = `-- 007: Seed 1000 layers (10 entities x 10 categories x 10 layers)\n-- Generated from raqib-v4-source.jsx\n\n`;

let totalCategories = 0;
let totalLayers = 0;

for (const entityId of entities) {
  // Find entity block
  const entityRegex = new RegExp(`\\b${entityId}\\s*:\\s*\\[`);
  const entityMatch = entityRegex.exec(layerDefsStr);
  if (!entityMatch) {
    console.error(`Entity ${entityId} not found!`);
    continue;
  }

  // Find all categories for this entity
  const startPos = entityMatch.index;
  // Find the matching closing bracket for the entity array
  let depth = 0;
  let entityEnd = startPos + entityMatch[0].length;
  for (let i = entityEnd - 1; i < layerDefsStr.length; i++) {
    if (layerDefsStr[i] === '[') depth++;
    if (layerDefsStr[i] === ']') depth--;
    if (depth === 0) { entityEnd = i + 1; break; }
  }
  const entityBlock = layerDefsStr.slice(startPos, entityEnd);

  // Extract categories
  const catRegex = /\{cat:"([^"]+)",layers:\[([^\]]*)\]\}/g;
  let catMatch;
  let position = 1;

  while ((catMatch = catRegex.exec(entityBlock)) !== null) {
    const catName = catMatch[1].replace(/'/g, "''");
    sql += `INSERT INTO categories (entity_id, position, name) VALUES ('${entityId}', ${position}, '${catName}');\n`;
    totalCategories++;

    // Extract layers from this category
    const layersStr = catMatch[2];
    const layerRegex = /\{id:"([^"]+)",n:"([^"]+)",p:"([^"]+)",rows:(\d+)\}/g;
    let layerMatch;
    while ((layerMatch = layerRegex.exec(layersStr)) !== null) {
      const [, id, name, platform, rows] = layerMatch;
      const safeName = name.replace(/'/g, "''");
      sql += `INSERT INTO layers (id, entity_id, category_id, platform_code, name, target_rows) VALUES ('${id}', '${entityId}', (SELECT id FROM categories WHERE entity_id = '${entityId}' AND position = ${position}), '${platform}', '${safeName}', ${rows});\n`;
      totalLayers++;
    }
    position++;
  }
  sql += `\n`;
}

sql += `-- Total: ${totalCategories} categories, ${totalLayers} layers\n`;

writeFileSync('/Users/mehdielkadiri/eigen-repos/raqib-v4/supabase/migrations/20260331000007_seed_1000_layers.sql', sql);
console.log(`Generated: ${totalCategories} categories, ${totalLayers} layers`);
