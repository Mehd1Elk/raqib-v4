import React, { useState } from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from '../shared/constants';

const ENTITIES = ["MYNE", "EIGEN", "BURHAN", "NOOS", "AELYA", "CG", "YRKNOWN", "RAQIB"];
const TYPES = ["JSON", "DOCX", "JSX", "MD"];
const STATUSES = ["CANONIQUE", "DOUBLON", "ARCHIVE"];

const MOCK_FILES = Array.from({ length: 49 }, (_, i) => {
  const entity = ENTITIES[i % ENTITIES.length];
  const type = TYPES[i % TYPES.length];
  const status = STATUSES[Math.floor(Math.random() * 3)];
  // specifically make MYNE dominant maybe?
  const actualEntity = i < 15 ? "MYNE" : entity;
  return {
    id: `file-${i}`,
    numero: i + 1,
    entite: actualEntity,
    fichier: `${actualEntity.toLowerCase()}_data_v${Math.floor(Math.random() * 5)}.${type.toLowerCase()}`,
    type: type,
    theme: ["Intelligence", "Ontologie", "Modèle Economique", "Architecture"][i % 4],
    poids: Array(Math.floor(Math.random() * 5) + 1).fill("★").join(""),
    statut: status,
    angle: "Focalisation sur l'extraction d'intention primaire.",
    liens: ["EIGEN_Core", "NOOS_Ledger"],
    date: `2026-04-0${(i % 9) + 1}`,
    extrait: type === 'JSON' || type === 'JSX' ? `// Sample ${type}\n{\n  "module": "${actualEntity}",\n  "status": "active"\n}` : "Contenu textuel non structuré..."
  };
});

const STATS = {
  total: 49,
  canoniques: MOCK_FILES.filter(f => f.statut === "CANONIQUE").length,
  doublons: MOCK_FILES.filter(f => f.statut === "DOUBLON").length,
  dominante: "MYNE"
};

const getStatusColor = (status: string) => {
  if (status === "CANONIQUE") return BLOOMBERG_PRUNE_COLORS.accentPositive;
  if (status === "DOUBLON") return '#F59E0B'; // orange
  return '#6B7280'; // gris
};

const getEntityColor = (entity: string) => {
  const colors: Record<string, string> = {
    MYNE: '#3B82F6', EIGEN: '#8B5CF6', BURHAN: '#EC4899', NOOS: '#10B981',
    AELYA: '#F59E0B', CG: '#6366F1', YRKNOWN: '#EF4444', RAQIB: '#14B8A6'
  };
  return colors[entity] || '#FFFFFF';
};

export default function InventaireView() {
  const [filterEntity, setFilterEntity] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  
  const [selectedFile, setSelectedFile] = useState(MOCK_FILES[0]);

  const filteredFiles = MOCK_FILES.filter(f => {
    if (filterEntity && f.entite !== filterEntity) return false;
    if (filterType && f.type !== filterType) return false;
    if (filterStatus && f.statut !== filterStatus) return false;
    return true;
  });

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 style={COMMON_STYLES.sectionTitle}>L'Inventaire Vivant (Intention/Attention)</h2>
        <div className="flex items-center space-x-6 text-xs" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
          <div className="flex flex-col items-end">
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>FICHIERS</span>
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textMain, fontSize: '16px' }}>{STATS.total}</span>
          </div>
          <div className="flex flex-col items-end">
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>CANONIQUES</span>
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.accentPositive, fontSize: '16px' }}>{STATS.canoniques}</span>
          </div>
          <div className="flex flex-col items-end">
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>DOUBLONS</span>
            <span style={{ color: '#F59E0B', fontSize: '16px' }}>{STATS.doublons}</span>
          </div>
          <div className="flex flex-col items-end">
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>DOMINANTE</span>
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textMain, fontSize: '16px' }}>{STATS.dominante} ({MOCK_FILES.filter(f => f.entite === STATS.dominante).length})</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col space-y-3">
        <div className="flex flex-wrap gap-2">
          {ENTITIES.map(ent => (
            <button
              key={ent}
              onClick={() => setFilterEntity(filterEntity === ent ? null : ent)}
              className="px-3 py-1 border"
              style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: '10px',
                backgroundColor: filterEntity === ent ? 'rgba(255,255,255,0.1)' : 'transparent',
                borderColor: filterEntity === ent ? getEntityColor(ent) : BLOOMBERG_PRUNE_COLORS.border,
                color: filterEntity === ent ? getEntityColor(ent) : BLOOMBERG_PRUNE_COLORS.textSecondary
              }}
            >
              {ent}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px' }}>
          <div className="flex items-center space-x-2">
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>TYPE:</span>
            {TYPES.map(t => (
              <button key={t} onClick={() => setFilterType(filterType === t ? null : t)} style={{ color: filterType === t ? '#FFF' : BLOOMBERG_PRUNE_COLORS.textTertiary }}>{t}</button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <span style={{ color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>STATUT:</span>
            {STATUSES.map(s => (
              <button key={s} onClick={() => setFilterStatus(filterStatus === s ? null : s)} style={{ color: filterStatus === s ? getStatusColor(s) : BLOOMBERG_PRUNE_COLORS.textTertiary }}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        {/* Table List */}
        <div style={COMMON_STYLES.card} className="flex-1 flex flex-col overflow-hidden">
          <div className="grid grid-cols-12 gap-2 p-3 border-b" style={{ ...COMMON_STYLES.separator, ...COMMON_STYLES.categoryLabel }}>
            <div className="col-span-1">N°</div>
            <div className="col-span-2">Entité</div>
            <div className="col-span-3">Fichier</div>
            <div className="col-span-1">Type</div>
            <div className="col-span-2">Thème</div>
            <div className="col-span-1 text-right">Poids</div>
            <div className="col-span-2 text-right">Statut</div>
          </div>
          <div className="overflow-y-auto flex-1">
            {filteredFiles.map((file) => (
              <div 
                key={file.id}
                onClick={() => setSelectedFile(file)}
                className="grid grid-cols-12 gap-2 p-3 border-b cursor-pointer transition-colors"
                style={{ 
                  ...COMMON_STYLES.separator, 
                  backgroundColor: selectedFile.id === file.id ? 'rgba(255,255,255,0.05)' : 'transparent' 
                }}
              >
                <div className="col-span-1" style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>
                  {file.numero.toString().padStart(2, '0')}
                </div>
                <div className="col-span-2 flex items-center">
                  <span className="px-2 py-0.5 rounded-sm" style={{ backgroundColor: `${getEntityColor(file.entite)}20`, color: getEntityColor(file.entite), fontSize: '10px', fontFamily: '"JetBrains Mono", monospace' }}>
                    {file.entite}
                  </span>
                </div>
                <div className="col-span-3 truncate" style={COMMON_STYLES.tableData}>{file.fichier}</div>
                <div className="col-span-1" style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>{file.type}</div>
                <div className="col-span-2 truncate" style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>{file.theme}</div>
                <div className="col-span-1 text-right" style={{ fontSize: '10px', color: '#FCD34D' }}>{file.poids}</div>
                <div className="col-span-2 text-right" style={{ ...COMMON_STYLES.categoryLabel, color: getStatusColor(file.statut) }}>
                  {file.statut}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        <div style={{ ...COMMON_STYLES.card, width: '320px' }} className="flex flex-col flex-shrink-0">
          <div className="p-4 border-b" style={COMMON_STYLES.separator}>
            <div style={COMMON_STYLES.categoryLabel}>Détails du Fichier</div>
            <div style={{ ...COMMON_STYLES.sectionTitle, marginTop: '8px', fontSize: '15px', wordBreak: 'break-all' }}>
              {selectedFile.fichier}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="px-2 py-0.5 rounded-sm" style={{ backgroundColor: `${getEntityColor(selectedFile.entite)}20`, color: getEntityColor(selectedFile.entite), fontSize: '10px', fontFamily: '"JetBrains Mono", monospace' }}>
                {selectedFile.entite}
              </span>
              <span style={{ ...COMMON_STYLES.categoryLabel, color: getStatusColor(selectedFile.statut) }}>{selectedFile.statut}</span>
            </div>
          </div>
          
          <div className="p-4 flex flex-col space-y-4 overflow-y-auto" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: BLOOMBERG_PRUNE_COLORS.textMain }}>
            <div>
              <div style={COMMON_STYLES.categoryLabel} className="mb-1">Angle Intention/Attention</div>
              <div style={{ color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>{selectedFile.angle}</div>
            </div>
            
            <div>
              <div style={COMMON_STYLES.categoryLabel} className="mb-1">Écosystème Lié</div>
              <div className="flex space-x-2">
                {selectedFile.liens.map(lien => (
                  <span key={lien} className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded-sm">{lien}</span>
                ))}
              </div>
            </div>

            <div>
              <div style={COMMON_STYLES.categoryLabel} className="mb-1">Date / Version</div>
              <div style={{ color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>{selectedFile.date}</div>
            </div>

            <div className="flex-1">
              <div style={COMMON_STYLES.categoryLabel} className="mb-2">Extrait de Contenu</div>
              <pre className="p-3 bg-gray-900 rounded-sm overflow-x-auto text-[10px]" style={{ color: '#E4D4EA', border: `1px solid ${BLOOMBERG_PRUNE_COLORS.border}` }}>
                {selectedFile.extrait}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Graph (Repartition Treemap/Stacked Bar) */}
      <div style={COMMON_STYLES.card} className="h-16 flex-shrink-0 flex items-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 flex">
          {ENTITIES.map(ent => {
            const count = MOCK_FILES.filter(f => f.entite === ent).length;
            const pct = (count / STATS.total) * 100;
            if (pct === 0) return null;
            return (
              <div 
                key={ent} 
                style={{ width: `${pct}%`, backgroundColor: getEntityColor(ent), opacity: 0.8 }} 
                className="h-full border-r border-black flex items-center justify-center relative group"
              >
                {pct > 5 && <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: '#000', fontWeight: 'bold' }}>{ent}</span>}
                {/* Tooltip */}
                <div className="absolute bottom-full mb-1 bg-black text-white text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 z-10 whitespace-nowrap pointer-events-none">
                  {ent}: {count} fichiers
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
