#!/usr/bin/env node
/**
 * Inject EU enrichment sections into EU country blocks in data.ts
 */
import { readFileSync, writeFileSync } from 'fs';

const DATA_FILE = new URL('../lib/corridor/data.ts', import.meta.url).pathname;
const ENRICH_FILE = new URL('./enrichment_eu1.ts', import.meta.url).pathname;

let data = readFileSync(DATA_FILE, 'utf8');
const enrich = readFileSync(ENRICH_FILE, 'utf8');

const targets = [
  { id: 'FR', marker: 'ENRICHMENT_FR' },
  { id: 'DE', marker: 'ENRICHMENT_DE' },
  { id: 'IT', marker: 'ENRICHMENT_IT' },
  { id: 'ES', marker: 'ENRICHMENT_ES' },
  { id: 'NL', marker: 'ENRICHMENT_NL' },
];

function getEnrichBlock(varName) {
  const marker = `export const ${varName}`;
  const start = enrich.indexOf(marker);
  if (start === -1) return null;
  const objStart = enrich.indexOf('{', start);
  let depth = 0, i = objStart;
  while (i < enrich.length) {
    if (enrich[i] === '{') depth++;
    else if (enrich[i] === '}') { depth--; if (depth === 0) break; }
    i++;
  }
  return enrich.substring(objStart + 1, i);
}

function extractFields(inner) {
  const fields = {};
  const lines = inner.split('\n');
  let currentField = null, currentLines = [], braceDepth = 0;
  
  for (const line of lines) {
    const fieldMatch = line.match(/^  (\w+)\s*:/);
    if (fieldMatch && braceDepth === 0) {
      if (currentField) fields[currentField] = currentLines.join('\n');
      currentField = fieldMatch[1];
      currentLines = [line];
      braceDepth = 0;
      for (const ch of line) { if (ch === '{' || ch === '[') braceDepth++; if (ch === '}' || ch === ']') braceDepth--; }
    } else if (currentField) {
      currentLines.push(line);
      for (const ch of line) { if (ch === '{' || ch === '[') braceDepth++; if (ch === '}' || ch === ']') braceDepth--; }
    }
  }
  if (currentField) fields[currentField] = currentLines.join('\n');
  return fields;
}

let totalInsertions = 0;

for (const { id, marker } of targets) {
  const enrichInner = getEnrichBlock(marker);
  if (!enrichInner) { console.log(`[SKIP] ${id}: block not found`); continue; }
  
  const fields = extractFields(enrichInner);
  const fieldNames = Object.keys(fields).filter(f => f.trim().length > 0);
  
  const countryMarker = `id: "${id}",`;
  const countryPos = data.indexOf(countryMarker);
  if (countryPos === -1) { console.log(`[SKIP] ${id}: not in data.ts`); continue; }
  
  const searchWindow = data.substring(countryPos, countryPos + 3000);
  const newFields = [];
  
  for (const fname of fieldNames) {
    // For EU countries, we want to REPLACE existing lighter versions
    // gigafactories and crmaInstitutions are always new
    if (fname === 'gigafactories' || fname === 'crmaInstitutions') {
      if (!searchWindow.includes(`${fname}:`)) {
        newFields.push(fname);
      } else {
        console.log(`  [EXISTS] ${id}.${fname}`);
      }
    } else {
      // For existing fields like criticalMineralsDemand, skip if already detailed
      if (!searchWindow.includes(`${fname}:`)) {
        newFields.push(fname);
      } else {
        console.log(`  [EXISTS] ${id}.${fname}`);
      }
    }
  }
  
  if (newFields.length === 0) { console.log(`[SKIP] ${id}: nothing new`); continue; }
  
  // Find insertion point: right before the country object's closing },
  // EU countries are smaller — look for riskScore as last field
  const riskIdx = searchWindow.indexOf('riskScore:');
  let insertAfterIdx;
  
  if (riskIdx !== -1) {
    // Go to end of line
    insertAfterIdx = searchWindow.indexOf('\n', riskIdx) + 1;
  } else {
    // Try tradeAfricaHighlights or crmaContact
    for (const anchor of ['tradeAfricaHighlights:', 'crmaContact:', 'euCrmaRole:']) {
      const aIdx = searchWindow.indexOf(anchor);
      if (aIdx !== -1) {
        insertAfterIdx = searchWindow.indexOf('\n', aIdx) + 1;
        break;
      }
    }
  }
  
  if (!insertAfterIdx) { console.log(`[ERROR] ${id}: no insertion point`); continue; }
  
  const insertionParts = newFields.map(fname => {
    return fields[fname].split('\n').map(line => line.trim() === '' ? '' : '  ' + line).join('\n');
  });
  
  const absolutePos = countryPos + insertAfterIdx;
  const insertion = '\n    // --- EU Enrichment Bloomberg ---\n' + insertionParts.join('\n');
  data = data.substring(0, absolutePos) + insertion + data.substring(absolutePos);
  
  totalInsertions += newFields.length;
  console.log(`[ENRICHED] ${id}: +${newFields.length} sections → ${newFields.join(', ')}`);
}

writeFileSync(DATA_FILE, data, 'utf8');
console.log(`\n✅ EU Enrichment complete — ${totalInsertions} sections, ${data.split('\n').length} lines, ${(Buffer.byteLength(data) / 1024).toFixed(0)} KB`);
