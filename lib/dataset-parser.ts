import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export async function parseDataset(file: File): Promise<Record<string, unknown>[]> {
  const ext = file.name.split('.').pop()?.toLowerCase();

  if (ext === 'csv' || ext === 'tsv') {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data as Record<string, unknown>[]),
        error: (err: Error) => reject(err),
      });
    });
  }

  if (ext === 'xlsx' || ext === 'xls') {
    const buffer = await file.arrayBuffer();
    const wb = XLSX.read(buffer, { type: 'array' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    return XLSX.utils.sheet_to_json(ws) as Record<string, unknown>[];
  }

  if (ext === 'json' || ext === 'geojson') {
    const text = await file.text();
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed;
    if (parsed.features) return parsed.features;
    return [parsed];
  }

  throw new Error(`Format non supporté : ${ext}`);
}

export function getColumns(rows: Record<string, unknown>[]): string[] {
  if (rows.length === 0) return [];
  const keys = new Set<string>();
  for (const row of rows.slice(0, 50)) {
    for (const key of Object.keys(row)) {
      keys.add(key);
    }
  }
  return Array.from(keys);
}

export const ACCEPTED_EXTENSIONS = ['.csv', '.tsv', '.xlsx', '.xls', '.json', '.geojson'];
export const ACCEPTED_MIME = 'text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/json,.geojson,.csv,.tsv,.xlsx,.xls,.json';
