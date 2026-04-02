import { NextResponse } from 'next/server';
import type { Regulation, Brique } from '@/components/acquisition/types';

const REGULATIONS: Regulation[] = [
  {
    id: 'csrd',
    name: 'CSRD',
    description: 'Corporate Sustainability Reporting Directive — reporting ESG obligatoire',
    deadline: '2025-01-01',
    penalty: 'Amendes jusqu\'à 0.5% CA + exclusion marchés publics',
    sectors: ['Finance', 'Énergie', 'Industrie', 'Assurance', 'Immobilier', 'Transport', 'Agroalimentaire', 'Tech', 'Télécoms', 'Construction'],
    countries: ['FR', 'DE', 'BE', 'NL', 'IT', 'ES', 'PT', 'AT', 'LU', 'IE', 'SE', 'DK', 'FI', 'NO', 'PL', 'CZ', 'RO', 'GR', 'HR', 'CH'],
    briques_activated: ['RAQIB', 'MIZAN', 'NOOS'],
  },
  {
    id: 'ai-act',
    name: 'AI Act',
    description: 'Règlement européen sur l\'IA — classification des risques et obligations',
    deadline: '2026-08-01',
    penalty: 'Jusqu\'à 35M€ ou 7% CA mondial',
    sectors: ['Tech', 'Finance', 'Santé', 'Assurance', 'RH', 'Télécoms', 'Défense', 'Transport', 'Éducation'],
    countries: ['FR', 'DE', 'BE', 'NL', 'IT', 'ES', 'PT', 'AT', 'LU', 'IE', 'SE', 'DK', 'FI', 'PL', 'CZ', 'RO', 'GR'],
    briques_activated: ['ÆLYA', 'NOOS', 'RAQIB', 'MIZAN'],
  },
  {
    id: 'dora',
    name: 'DORA',
    description: 'Digital Operational Resilience Act — résilience numérique secteur financier',
    deadline: '2025-01-17',
    penalty: '1% CA quotidien pendant 6 mois max',
    sectors: ['Finance', 'Assurance', 'Fintech', 'Crypto'],
    countries: ['FR', 'DE', 'BE', 'NL', 'IT', 'ES', 'PT', 'AT', 'LU', 'IE', 'SE', 'DK', 'FI'],
    briques_activated: ['BURHAN', 'RAQIB', 'MYNε'],
  },
  {
    id: 'nis2',
    name: 'NIS2',
    description: 'Network & Information Security Directive 2 — cybersécurité élargie',
    deadline: '2024-10-17',
    penalty: 'Jusqu\'à 10M€ ou 2% CA mondial',
    sectors: ['Énergie', 'Transport', 'Santé', 'Finance', 'Eau', 'Numérique', 'Espace', 'Poste', 'Déchets', 'Chimie', 'Agroalimentaire', 'Industrie'],
    countries: ['FR', 'DE', 'BE', 'NL', 'IT', 'ES', 'PT', 'AT', 'LU', 'IE', 'SE', 'DK', 'FI', 'PL', 'CZ', 'RO', 'GR', 'HR'],
    briques_activated: ['BURHAN', 'MYNε', 'RAQIB'],
  },
  {
    id: 'gdpr-enforcement',
    name: 'RGPD Enforcement Wave',
    description: 'Vague de sanctions RGPD 2025-2026 — contrôles renforcés CNIL/DPA',
    deadline: '2025-06-01',
    penalty: 'Jusqu\'à 20M€ ou 4% CA mondial',
    sectors: ['Tech', 'E-commerce', 'Santé', 'Finance', 'Assurance', 'Télécoms', 'RH', 'Marketing', 'Éducation'],
    countries: ['FR', 'DE', 'BE', 'NL', 'IT', 'ES', 'PT', 'AT', 'LU', 'IE', 'SE', 'DK', 'FI', 'NO', 'PL', 'CZ'],
    briques_activated: ['NOOS', 'ÆLYA', 'YrKnown'],
  },
  {
    id: 'cs3d',
    name: 'CS3D',
    description: 'Corporate Sustainability Due Diligence — devoir de vigilance supply chain',
    deadline: '2027-07-01',
    penalty: '5% CA net mondial',
    sectors: ['Industrie', 'Textile', 'Agroalimentaire', 'Énergie', 'Mines', 'Transport', 'Construction', 'Chimie'],
    countries: ['FR', 'DE', 'BE', 'NL', 'IT', 'ES', 'PT', 'AT', 'LU', 'IE', 'SE', 'DK', 'FI'],
    briques_activated: ['MIZAN', 'RAQIB', 'NOOS', 'YrKnown'],
  },
  {
    id: 'esg-taxonomy',
    name: 'EU Taxonomy',
    description: 'Taxonomie européenne — classification activités durables',
    deadline: '2024-01-01',
    penalty: 'Exclusion financements verts + amendes nationales',
    sectors: ['Finance', 'Énergie', 'Immobilier', 'Transport', 'Construction', 'Industrie', 'Agriculture'],
    countries: ['FR', 'DE', 'BE', 'NL', 'IT', 'ES', 'PT', 'AT', 'LU', 'IE', 'SE', 'DK', 'FI'],
    briques_activated: ['MIZAN', 'RAQIB', 'NOOS'],
  },
  {
    id: 'ehds',
    name: 'EHDS',
    description: 'European Health Data Space — espace données de santé',
    deadline: '2026-03-01',
    penalty: 'Interdiction accès données + amendes RGPD',
    sectors: ['Santé', 'Pharma', 'Assurance', 'Biotech', 'MedTech'],
    countries: ['FR', 'DE', 'BE', 'NL', 'IT', 'ES', 'PT', 'AT', 'LU', 'IE', 'SE', 'DK', 'FI'],
    briques_activated: ['NOOS', 'ÆLYA', 'BURHAN', 'YrKnown'],
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const company = searchParams.get('company');
  const sector = searchParams.get('sector');

  let result = REGULATIONS;

  if (sector) {
    result = result.filter((r) => r.sectors.includes(sector));
  }

  const allSectors = [...new Set(REGULATIONS.flatMap((r) => r.sectors))].sort();

  return NextResponse.json({
    regulations: result,
    total: result.length,
    sectors: allSectors,
    filter: { company, sector },
  });
}
