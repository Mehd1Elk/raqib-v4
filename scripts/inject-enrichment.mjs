#!/usr/bin/env node
/**
 * Inject enrichment sections into country blocks in data.ts
 * Strategy: For each country, find its risks: { ... } block end, 
 * then inject the enrichment fields right after.
 */
import { readFileSync, writeFileSync } from 'fs';

const DATA_FILE = new URL('../lib/corridor/data.ts', import.meta.url).pathname;
const ENRICH_FILE = new URL('./enrichment_lot1.ts', import.meta.url).pathname;

let data = readFileSync(DATA_FILE, 'utf8');
const enrich = readFileSync(ENRICH_FILE, 'utf8');

// Countries to enrich and their expected section markers
const targets = [
  { id: 'CD', name: 'RDC', marker: 'ENRICHMENT_CD' },
  { id: 'GN', name: 'Guinée', marker: 'ENRICHMENT_GN' },
  { id: 'GA', name: 'Gabon', marker: 'ENRICHMENT_GA' },
  { id: 'RW', name: 'Rwanda', marker: 'ENRICHMENT_RW' },
  { id: 'AO', name: 'Angola', marker: 'ENRICHMENT_AO' },
];

// Extract a named block from enrichment file between export const MARKER = { and the matching close
function getEnrichBlock(varName) {
  const marker = `export const ${varName} = {`;
  const start = enrich.indexOf(marker);
  if (start === -1) return null;
  
  const objStart = enrich.indexOf('{', start);
  let depth = 0;
  let i = objStart;
  while (i < enrich.length) {
    if (enrich[i] === '{') depth++;
    else if (enrich[i] === '}') { depth--; if (depth === 0) break; }
    i++;
  }
  // Return the content INSIDE the outer braces (without them)
  const inner = enrich.substring(objStart + 1, i);
  return inner;
}

// Extract individual field blocks from the enrichment inner content
function extractFields(inner) {
  const fields = {};
  const lines = inner.split('\n');
  let currentField = null;
  let currentLines = [];
  let braceDepth = 0;
  
  for (const line of lines) {
    // Detect top-level field start (2 spaces + fieldname + :)
    const fieldMatch = line.match(/^  (\w+)\s*:/);
    if (fieldMatch && braceDepth === 0 && currentField) {
      // Save previous field
      fields[currentField] = currentLines.join('\n');
      currentField = fieldMatch[1];
      currentLines = [line];
      braceDepth = 0;
      for (const ch of line) { if (ch === '{' || ch === '[') braceDepth++; if (ch === '}' || ch === ']') braceDepth--; }
    } else if (fieldMatch && braceDepth === 0 && !currentField) {
      currentField = fieldMatch[1];
      currentLines = [line];
      for (const ch of line) { if (ch === '{' || ch === '[') braceDepth++; if (ch === '}' || ch === ']') braceDepth--; }
    } else if (currentField) {
      currentLines.push(line);
      for (const ch of line) { if (ch === '{' || ch === '[') braceDepth++; if (ch === '}' || ch === ']') braceDepth--; }
    }
  }
  if (currentField) {
    fields[currentField] = currentLines.join('\n');
  }
  
  return fields;
}

let totalInsertions = 0;

for (const { id, name, marker } of targets) {
  const enrichInner = getEnrichBlock(marker);
  if (!enrichInner) {
    console.log(`[SKIP] ${id} (${name}): enrichment block '${marker}' not found`);
    continue;
  }
  
  const fields = extractFields(enrichInner);
  const fieldNames = Object.keys(fields).filter(f => f.trim().length > 0);
  
  // Find the country in data.ts
  const countryMarker = `id: "${id}",`;
  const countryPos = data.indexOf(countryMarker);
  if (countryPos === -1) {
    console.log(`[SKIP] ${id}: not found in data.ts`);
    continue;
  }
  
  // Check which fields already exist in this country block (search next 5000 chars)
  const searchWindow = data.substring(countryPos, countryPos + 6000);
  const newFields = [];
  
  for (const fname of fieldNames) {
    // Check if field exists (at 4-space indent level)
    const fieldPattern = new RegExp(`^    ${fname}\\s*:`, 'm');
    if (fieldPattern.test(searchWindow)) {
      console.log(`  [EXISTS] ${id}.${fname} — skipping`);
    } else {
      newFields.push(fname);
    }
  }
  
  if (newFields.length === 0) {
    console.log(`[SKIP] ${id}: all fields already present`);
    continue;
  }
  
  // Build insertion text — indent each field to 4 spaces (country object field level)
  const insertionParts = newFields.map(fname => {
    let block = fields[fname];
    // Re-indent from 2 spaces (enrichment file) to 4 spaces (data.ts country object)
    const reindented = block.split('\n').map(line => {
      if (line.trim() === '') return '';
      return '  ' + line; // Add 2 more spaces
    }).join('\n');
    return reindented;
  });
  
  // Find insertion point: after the last existing field in the country block
  // Look for the "risks:" field end, or the last recognizable field
  // Strategy: find the country's closing },  (at 4-space indent)
  // Search for the pattern "    }," after the risks block
  
  // Find "risks:" in the search window
  const risksIdx = searchWindow.indexOf('risks:');
  let insertAfterIdx;
  
  if (risksIdx !== -1) {
    // Find the closing of risks block
    let depth = 0;
    let startedObject = false;
    for (let i = risksIdx; i < searchWindow.length; i++) {
      if (searchWindow[i] === '{') { depth++; startedObject = true; }
      if (searchWindow[i] === '}') {
        depth--;
        if (startedObject && depth === 0) {
          // Found the end of risks. Check for trailing comma
          insertAfterIdx = i + 1;
          if (searchWindow[insertAfterIdx] === ',') insertAfterIdx++;
          break;
        }
      }
    }
  }
  
  if (!insertAfterIdx) {
    // Fallback: find recommendation field
    const recoIdx = searchWindow.indexOf('recommendation:');
    if (recoIdx !== -1) {
      // Find end of line
      insertAfterIdx = searchWindow.indexOf('\n', recoIdx) + 1;
    }
  }
  
  if (!insertAfterIdx) {
    console.log(`[ERROR] ${id}: cannot find insertion point`);
    continue;
  }
  
  // Convert to absolute position
  const absoluteInsertPos = countryPos + insertAfterIdx;
  
  const insertion = '\n' + insertionParts.join('\n');
  data = data.substring(0, absoluteInsertPos) + insertion + data.substring(absoluteInsertPos);
  
  totalInsertions += newFields.length;
  console.log(`[ENRICHED] ${id} (${name}): +${newFields.length} sections → ${newFields.join(', ')}`);
}

writeFileSync(DATA_FILE, data, 'utf8');

const lineCount = data.split('\n').length;
const sizeKB = (Buffer.byteLength(data, 'utf8') / 1024).toFixed(0);

console.log(`\n✅ Enrichment complete`);
console.log(`   Injected: ${totalInsertions} new sections across ${targets.length} countries`);
console.log(`   File: lib/corridor/data.ts — ${lineCount} lines, ${sizeKB} KB`);
