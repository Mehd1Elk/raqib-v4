#!/usr/bin/env node
/**
 * Merge enrichment data into lib/corridor/data.ts
 * Finds each country by id and inserts missing sections before the closing brace
 */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DATA_PATH = join(import.meta.dirname, '..', 'lib', 'corridor', 'data.ts');
const ENRICHMENT_PATH = join(import.meta.dirname, 'enrichment_lot1.ts');

let data = readFileSync(DATA_PATH, 'utf8');
const enrichment = readFileSync(ENRICHMENT_PATH, 'utf8');

// Extract enrichment objects by parsing the TypeScript-like content
function extractEnrichmentBlock(code, varName) {
  const start = code.indexOf(`export const ${varName}`);
  if (start === -1) return null;
  
  // Find the opening brace
  let braceStart = code.indexOf('{', start);
  let depth = 0;
  let i = braceStart;
  
  while (i < code.length) {
    if (code[i] === '{') depth++;
    if (code[i] === '}') {
      depth--;
      if (depth === 0) break;
    }
    i++;
  }
  
  return code.substring(braceStart, i + 1);
}

// Extract a specific field from enrichment block
function extractField(block, fieldName) {
  // Find fieldName: at the top level of the object
  const regex = new RegExp(`^  ${fieldName}:\\s`, 'm');
  const match = block.match(regex);
  if (!match) return null;
  
  const startIdx = block.indexOf(match[0]);
  let pos = block.indexOf(':', startIdx) + 1;
  
  // Skip whitespace
  while (pos < block.length && block[pos] === ' ') pos++;
  
  // Find the value - it's either an object { ... } or array [ ... ]
  const startChar = block[pos];
  if (startChar !== '{' && startChar !== '[') return null;
  
  const endChar = startChar === '{' ? '}' : ']';
  let depth = 0;
  let i = pos;
  
  while (i < block.length) {
    if (block[i] === startChar || (startChar === '{' && block[i] === '{') || (startChar === '[' && block[i] === '[')) {
      if (block[i] === startChar) depth++;
      else if (block[i] === '{' || block[i] === '[') depth++;
    }
    if (block[i] === endChar || (endChar === '}' && block[i] === '}') || (endChar === ']' && block[i] === ']')) {
      if (block[i] === endChar) depth--;
      else if (block[i] === '}' || block[i] === ']') depth--;
      if (depth <= 0) break;
    }
    // Actually, simpler: count all braces and brackets
    i++;
  }
  
  // Just get the raw text from the field declaration to the next top-level field or end
  // Simpler approach: find next top-level field or closing brace
  const lines = block.split('\n');
  let fieldLines = [];
  let capturing = false;
  let braceDepth = 0;
  
  for (const line of lines) {
    if (line.match(new RegExp(`^  ${fieldName}:`))) {
      capturing = true;
    }
    if (capturing) {
      fieldLines.push(line);
      for (const ch of line) {
        if (ch === '{' || ch === '[') braceDepth++;
        if (ch === '}' || ch === ']') braceDepth--;
      }
      // If we've closed all braces and encounter a new top-level field, stop
      if (braceDepth <= 0 && fieldLines.length > 1) {
        break;
      }
    }
  }
  
  let result = fieldLines.join('\n');
  // Ensure it ends with comma
  result = result.trimEnd();
  if (!result.endsWith(',')) result += ',';
  
  return result;
}

// For each country, find its block in data.ts and insert missing sections
const countries = [
  { id: 'CD', enrichVar: 'ENRICHMENT_CD' },
  { id: 'GN', enrichVar: 'ENRICHMENT_GN' },
  { id: 'GA', enrichVar: 'ENRICHMENT_GA' },
  { id: 'RW', enrichVar: 'ENRICHMENT_RW' },
  { id: 'AO', enrichVar: 'ENRICHMENT_AO' },
];

const fieldsToEnrich = ['industries', 'logistics', 'trade', 'billionaires', 'demographics'];

for (const { id, enrichVar } of countries) {
  const enrichBlock = extractEnrichmentBlock(enrichment, enrichVar);
  if (!enrichBlock) {
    console.log(`[SKIP] ${id}: enrichment block not found`);
    continue;
  }
  
  // Find the country in data.ts
  const idPattern = `id: "${id}",`;
  const countryStart = data.indexOf(idPattern);
  if (countryStart === -1) {
    console.log(`[SKIP] ${id}: not found in data.ts`);
    continue;
  }
  
  let insertions = [];
  
  for (const field of fieldsToEnrich) {
    // Check if the field already exists in the country block
    // Search within ~500 chars after the country id for existing field
    const searchRegion = data.substring(countryStart, countryStart + 5000);
    
    if (field === 'demographics' || field === 'billionaires') {
      // These may exist but be minimal - check if they have content
      const fieldIdx = searchRegion.indexOf(`${field}:`);
      if (fieldIdx !== -1) {
        // Check if it's just empty/minimal
        const afterField = searchRegion.substring(fieldIdx, fieldIdx + 50);
        if (afterField.includes('undefined') || afterField.includes('null')) {
          // Need to replace
        } else {
          // Already has content, skip
          continue;
        }
      }
    } else {
      // For industries, logistics, trade - check if they exist
      if (searchRegion.includes(`${field}:`)) {
        console.log(`  [EXISTS] ${id}.${field} already present`);
        continue;
      }
    }
    
    const fieldData = extractField(enrichBlock, field);
    if (fieldData) {
      insertions.push(fieldData);
    }
  }
  
  if (insertions.length === 0) {
    console.log(`[SKIP] ${id}: nothing new to insert`);
    continue;
  }
  
  // Find the closing of this country object - search for the risks: section end
  // or the last field before the closing brace
  // Strategy: find "recommendation:" field for this country as anchor, then insert after the risks block
  const risksIdx = data.indexOf('risks:', countryStart);
  if (risksIdx === -1 || risksIdx > countryStart + 8000) {
    console.log(`[ERROR] ${id}: cannot find risks section`);
    continue;
  }
  
  // Find the end of the risks block (closing brace + comma)
  let depth = 0;
  let scanStart = data.indexOf('{', risksIdx);
  let i = scanStart;
  while (i < data.length) {
    if (data[i] === '{') depth++;
    if (data[i] === '}') {
      depth--;
      if (depth === 0) break;
    }
    i++;
  }
  // i is now at the closing } of risks
  // Move past the comma if present
  let insertPoint = i + 1;
  if (data[insertPoint] === ',') insertPoint++;
  
  // Insert enrichment data
  const insertion = '\n    // --- ENRICHMENT Bloomberg ---\n    ' + insertions.join('\n    ');
  data = data.substring(0, insertPoint) + insertion + data.substring(insertPoint);
  
  console.log(`[ENRICHED] ${id}: +${insertions.length} sections (${fieldsToEnrich.filter(f => insertions.some(ins => ins.startsWith(`  ${f}:`))).join(', ')})`);
}

writeFileSync(DATA_PATH, data, 'utf8');
console.log('\n✅ Enrichment merged into lib/corridor/data.ts');
console.log(`   File size: ${(data.length / 1024).toFixed(0)} KB, ${data.split('\n').length} lines`);
