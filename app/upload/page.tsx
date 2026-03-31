'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Upload, FileSpreadsheet, Check, AlertTriangle, ArrowRight, Search } from 'lucide-react';
import { parseDataset, getColumns, ACCEPTED_MIME } from '@/lib/dataset-parser';
import { datasetToEntries } from '@/lib/dataset-to-entries';
import { suggestLayer, detectBestViz } from '@/lib/auto-suggest-layer';
import { createClient } from '@/lib/supabase/client';
import { ENTITIES } from '@/lib/constants';

interface LayerOption {
  id: string;
  name: string;
  entity_id: string;
  entity_name: string;
}

type Step = 'upload' | 'preview' | 'importing' | 'done';

export default function UploadPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<Step>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Layer selection
  const [layers, setLayers] = useState<LayerOption[]>([]);
  const [selectedEntity, setSelectedEntity] = useState('');
  const [selectedLayer, setSelectedLayer] = useState('');
  const [layerSearch, setLayerSearch] = useState('');
  const [suggestedLayer, setSuggestedLayer] = useState<string | null>(null);
  const [detectedViz, setDetectedViz] = useState('DataTable');

  // Import state
  const [importCount, setImportCount] = useState(0);
  const [importError, setImportError] = useState<string | null>(null);

  // Fetch all layers on mount
  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('layers')
      .select('id, name, entity_id, entities!inner(name)')
      .order('entity_id')
      .order('id')
      .range(0, 1999)
      .then(({ data }) => {
        if (data) {
          setLayers(
            data.map((l) => ({
              id: l.id,
              name: l.name,
              entity_id: l.entity_id,
              entity_name: (l.entities as unknown as { name: string }).name,
            })),
          );
        }
      });
  }, []);

  // Filter layers by entity + search
  const filteredLayers = useMemo(() => {
    let filtered = layers;
    if (selectedEntity) filtered = filtered.filter((l) => l.entity_id === selectedEntity);
    if (layerSearch) {
      const q = layerSearch.toLowerCase();
      filtered = filtered.filter(
        (l) => l.id.toLowerCase().includes(q) || l.name.toLowerCase().includes(q),
      );
    }
    return filtered.slice(0, 50);
  }, [layers, selectedEntity, layerSearch]);

  // Handle file drop/select
  const handleFile = useCallback(async (f: File) => {
    setError(null);
    setFile(f);
    try {
      const parsed = await parseDataset(f);
      if (parsed.length === 0) {
        setError('Fichier vide ou format non reconnu.');
        return;
      }
      const cols = getColumns(parsed);
      setRows(parsed);
      setColumns(cols);

      // Auto-suggest
      const suggestion = suggestLayer(cols);
      setSuggestedLayer(suggestion);
      if (suggestion) setSelectedLayer(suggestion);

      const viz = detectBestViz(cols);
      setDetectedViz(viz);

      setStep('preview');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de parsing');
    }
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile],
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile],
  );

  // Import into Supabase
  const handleImport = useCallback(async () => {
    if (!selectedLayer || rows.length === 0 || !file) return;
    setStep('importing');
    setImportError(null);

    const entries = datasetToEntries(rows, selectedLayer, file.name);
    const supabase = createClient();

    // Insert in batches of 100
    let inserted = 0;
    for (let i = 0; i < entries.length; i += 100) {
      const batch = entries.slice(i, i + 100);
      const { error: err } = await supabase.from('entries').insert(batch);
      if (err) {
        setImportError(err.message);
        setStep('preview');
        return;
      }
      inserted += batch.length;
      setImportCount(inserted);
    }

    // Update layer actual_rows
    const { data: countData } = await supabase
      .from('entries')
      .select('id', { count: 'exact', head: true })
      .eq('layer_id', selectedLayer);

    if (countData !== null) {
      await supabase
        .from('layers')
        .update({ actual_rows: inserted, status: 'partial', last_populated_at: new Date().toISOString() })
        .eq('id', selectedLayer);
    }

    setStep('done');
  }, [selectedLayer, rows, file]);

  // Find the entity for the selected layer
  const selectedLayerEntity = layers.find((l) => l.id === selectedLayer)?.entity_id;

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="h-[52px] flex items-center justify-between px-6 border-b border-div bg-ivory">
        <div className="flex items-center gap-3.5">
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <Link
            href="/"
            className="font-[family-name:var(--font-cormorant)] text-[22px] font-bold italic text-noir tracking-[3px] no-underline hover:text-gold transition-colors"
          >
            Raqib
          </Link>
          <span className="font-[family-name:var(--font-cormorant)] text-[15px] text-sand">رقيب</span>
          <div className="w-px h-5 bg-div" />
          <span className="text-[9px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[2px]">
            V4 · IMPORT DATASET
          </span>
        </div>
        <Link
          href="/"
          className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm hover:text-gold no-underline transition-colors"
        >
          ← DASHBOARD
        </Link>
      </div>

      <div className="max-w-3xl mx-auto py-8 px-6">
        <h1 className="font-[family-name:var(--font-cormorant)] text-[28px] font-bold italic text-noir mb-1">
          Importer un dataset
        </h1>
        <p className="text-[10px] font-[family-name:var(--font-jetbrains)] text-tm mb-6">
          CSV, Excel, JSON, GeoJSON — parse automatique, suggestion de couche, import direct.
        </p>

        {/* ── STEP 1: Upload ──────────────────────────────── */}
        {step === 'upload' && (
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-div hover:border-gold rounded-lg p-16 flex flex-col items-center justify-center cursor-pointer transition-colors bg-ivory"
          >
            <Upload size={32} className="text-sand mb-3" />
            <div className="text-[11px] font-[family-name:var(--font-noto)] text-t2 mb-1">
              Glissez un fichier ici ou cliquez pour parcourir
            </div>
            <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm">
              .csv · .xlsx · .json · .geojson
            </div>
            <input
              ref={fileRef}
              type="file"
              accept={ACCEPTED_MIME}
              onChange={onFileChange}
              className="hidden"
            />
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-ruby/10 border border-ruby/30 rounded flex items-center gap-2">
            <AlertTriangle size={14} className="text-ruby" />
            <span className="text-[10px] font-[family-name:var(--font-jetbrains)] text-ruby">{error}</span>
          </div>
        )}

        {/* ── STEP 2: Preview ─────────────────────────────── */}
        {(step === 'preview' || step === 'importing') && file && (
          <div className="space-y-5">
            {/* File info */}
            <div className="bg-ivory border border-div rounded p-4 flex items-center gap-3">
              <FileSpreadsheet size={20} className="text-gold" />
              <div>
                <div className="text-[11px] font-[family-name:var(--font-noto)] text-t1 font-medium">
                  {file.name}
                </div>
                <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-tm">
                  {rows.length.toLocaleString()} lignes · {columns.length} colonnes · Viz
                  suggeree : {detectedViz}
                </div>
              </div>
            </div>

            {/* Auto-suggestion banner */}
            {suggestedLayer && (
              <div className="bg-emerald/10 border border-emerald/30 rounded p-3 flex items-center gap-2">
                <Check size={14} className="text-emerald" />
                <span className="text-[10px] font-[family-name:var(--font-jetbrains)] text-emerald">
                  Suggestion automatique : couche{' '}
                  <strong>{suggestedLayer}</strong> (
                  {layers.find((l) => l.id === suggestedLayer)?.name ?? suggestedLayer})
                </span>
              </div>
            )}

            {/* Preview table */}
            <div className="bg-ivory border border-div rounded overflow-hidden">
              <div className="px-3 py-2 border-b border-div bg-parchment">
                <span className="text-[9px] font-[family-name:var(--font-jetbrains)] text-t3 tracking-[1px]">
                  APERCU — {Math.min(10, rows.length)} PREMIERES LIGNES
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[9px] font-[family-name:var(--font-jetbrains)]">
                  <thead>
                    <tr className="border-b border-div">
                      {columns.slice(0, 8).map((col) => (
                        <th
                          key={col}
                          className="px-3 py-1.5 text-left text-tm font-normal whitespace-nowrap"
                        >
                          {col}
                        </th>
                      ))}
                      {columns.length > 8 && (
                        <th className="px-3 py-1.5 text-left text-sand">+{columns.length - 8}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.slice(0, 10).map((row, i) => (
                      <tr key={i} className="border-b border-div-l">
                        {columns.slice(0, 8).map((col) => (
                          <td key={col} className="px-3 py-1.5 text-t2 whitespace-nowrap max-w-[200px] truncate">
                            {String(row[col] ?? '')}
                          </td>
                        ))}
                        {columns.length > 8 && <td className="px-3 py-1.5 text-sand">...</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Layer selection */}
            <div className="bg-ivory border border-div rounded p-4 space-y-3">
              <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-t3 tracking-[1px] mb-2">
                ASSOCIER A UNE COUCHE
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Entity filter */}
                <div>
                  <label className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm block mb-1">
                    ENTITE
                  </label>
                  <select
                    value={selectedEntity}
                    onChange={(e) => {
                      setSelectedEntity(e.target.value);
                      setSelectedLayer('');
                    }}
                    className="w-full bg-cream border border-div rounded px-2 py-1.5 text-[10px] font-[family-name:var(--font-noto)] text-t1"
                  >
                    <option value="">Toutes les entites</option>
                    {ENTITIES.map((ent) => (
                      <option key={ent.id} value={ent.id}>
                        {ent.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Layer search */}
                <div>
                  <label className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm block mb-1">
                    RECHERCHE COUCHE
                  </label>
                  <div className="relative">
                    <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-sand" />
                    <input
                      type="text"
                      placeholder="n01, psychiatre, pib..."
                      value={layerSearch}
                      onChange={(e) => setLayerSearch(e.target.value)}
                      className="w-full bg-cream border border-div rounded pl-7 pr-2 py-1.5 text-[10px] font-[family-name:var(--font-noto)] text-t1 placeholder:text-sand"
                    />
                  </div>
                </div>
              </div>

              {/* Layer select */}
              <select
                value={selectedLayer}
                onChange={(e) => setSelectedLayer(e.target.value)}
                size={6}
                className="w-full bg-cream border border-div rounded px-2 py-1 text-[10px] font-[family-name:var(--font-jetbrains)] text-t1"
              >
                {filteredLayers.map((l) => (
                  <option key={l.id} value={l.id}>
                    [{l.id}] {l.name} — {l.entity_name}
                  </option>
                ))}
              </select>

              {selectedLayer && (
                <div className="text-[9px] font-[family-name:var(--font-jetbrains)] text-gold">
                  Couche selectionnee : {selectedLayer} —{' '}
                  {layers.find((l) => l.id === selectedLayer)?.name}
                </div>
              )}
            </div>

            {importError && (
              <div className="p-3 bg-ruby/10 border border-ruby/30 rounded flex items-center gap-2">
                <AlertTriangle size={14} className="text-ruby" />
                <span className="text-[10px] font-[family-name:var(--font-jetbrains)] text-ruby">
                  {importError}
                </span>
              </div>
            )}

            {/* Import button */}
            <button
              onClick={handleImport}
              disabled={!selectedLayer || step === 'importing'}
              className="w-full py-3 rounded font-[family-name:var(--font-jetbrains)] text-[10px] tracking-[2px] text-ivory transition-opacity disabled:opacity-40"
              style={{ background: '#2C1810' }}
            >
              {step === 'importing'
                ? `IMPORT EN COURS... ${importCount}/${rows.length}`
                : `IMPORTER ${rows.length.toLocaleString()} ENTRIES DANS ${selectedLayer || '...'}`}
            </button>
          </div>
        )}

        {/* ── STEP 3: Done ────────────────────────────────── */}
        {step === 'done' && (
          <div className="bg-ivory border border-div rounded p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald/20 flex items-center justify-center mx-auto">
              <Check size={24} className="text-emerald" />
            </div>
            <div className="font-[family-name:var(--font-cormorant)] text-[22px] font-bold italic text-noir">
              Import termine
            </div>
            <div className="text-[10px] font-[family-name:var(--font-jetbrains)] text-tm">
              {importCount.toLocaleString()} entries importees dans la couche {selectedLayer}
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <Link
                href={`/${selectedLayerEntity}/${selectedLayer}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded text-[10px] font-[family-name:var(--font-jetbrains)] tracking-[1px] text-ivory no-underline"
                style={{ background: '#2C1810' }}
              >
                VOIR LA COUCHE <ArrowRight size={12} />
              </Link>
              <button
                onClick={() => {
                  setStep('upload');
                  setFile(null);
                  setRows([]);
                  setColumns([]);
                  setSelectedLayer('');
                  setImportCount(0);
                }}
                className="px-4 py-2 rounded border border-div text-[10px] font-[family-name:var(--font-jetbrains)] tracking-[1px] text-tm hover:text-t1 transition-colors"
              >
                NOUVEL IMPORT
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="h-[26px] flex items-center justify-between px-6 border-t border-div bg-ivory">
        <span className="text-[7px] text-tm font-[family-name:var(--font-jetbrains)]">
          RAQIB V4 · 1100 COUCHES · 9 PLATEFORMES
        </span>
        <span className="text-[7px] text-gold font-[family-name:var(--font-jetbrains)]">
          EIGEN HOLDING SAS
        </span>
      </div>
    </div>
  );
}
