import { NextResponse } from 'next/server';
import type { AcquisitionEvent, EventName } from '@/components/acquisition/types';

const EVENTS: AcquisitionEvent[] = [
  {
    id: 'gitex-2026',
    name: 'GITEX',
    date: '2026-10-13',
    location: 'Dubai World Trade Centre',
    description: 'GITEX Global 2026 — plus grand salon tech MENA/Afrique. Focus: AI, Cybersecurity, Fintech.',
    targets: [
      { company_id: 'c-001', company_name: 'Etisalat Group', contact: 'Ahmad Al-Rashid, VP Innovation', approche: 'Demo BURHAN + RAQIB sur use case telecom compliance', priority: 'P0' },
      { company_id: 'c-002', company_name: 'Emirates NBD', contact: 'Fatima Hassan, CISO', approche: 'Pitch DORA compliance via MYNε + BURHAN', priority: 'P0' },
      { company_id: 'c-003', company_name: 'Careem', contact: 'Omar Khaled, CTO', approche: 'AI Act readiness avec ÆLYA + NOOS', priority: 'P1' },
      { company_id: 'c-004', company_name: 'Majid Al Futtaim', contact: 'Sara El-Mansi, CDO', approche: 'CSRD reporting via RAQIB + MIZAN', priority: 'P1' },
      { company_id: 'c-005', company_name: 'DEWA', contact: 'Khalid Noor, Head Digital', approche: 'NIS2/energy compliance BURHAN + RAQIB', priority: 'P1' },
      { company_id: 'c-006', company_name: 'Network International', contact: 'Layla Abdel, VP Risk', approche: 'Fintech compliance stack MYNε + RAQIB', priority: 'P2' },
      { company_id: 'c-007', company_name: 'Jumia Technologies', contact: 'David Osei, DPO', approche: 'RGPD/e-commerce via NOOS + YrKnown', priority: 'P2' },
      { company_id: 'c-008', company_name: 'Kaspersky META', contact: 'Alexei Volkov, BD Director', approche: 'Partnership channel BURHAN', priority: 'P2' },
    ],
  },
  {
    id: 'ats-2026',
    name: 'ATS',
    date: '2026-06-17',
    location: 'Palais des Congrès, Paris',
    description: 'Africa Tech Summit Paris 2026 — corridor Afrique-Europe, French Tech Africa.',
    targets: [
      { company_id: 'c-010', company_name: 'Orange Afrique', contact: 'Mamadou Diallo, DG Innovation', approche: 'Suite compliance telecom NIS2 + CSRD', priority: 'P0' },
      { company_id: 'c-011', company_name: 'Société Générale Afrique', contact: 'Aminata Koné, CISO', approche: 'DORA + RGPD stack complet', priority: 'P0' },
      { company_id: 'c-012', company_name: 'Wave Mobile Money', contact: 'Ibrahima Ndiaye, CTO', approche: 'Fintech compliance MYNε + BURHAN', priority: 'P1' },
      { company_id: 'c-013', company_name: 'Flutterwave', contact: 'Oluwaseun Adeyemi, VP Compliance', approche: 'Cross-border payment compliance MIZAN', priority: 'P1' },
      { company_id: 'c-014', company_name: 'Andela', contact: 'Sade Ogunlesi, CPO', approche: 'AI Act + talent platform ÆLYA + NOOS', priority: 'P1' },
      { company_id: 'c-015', company_name: 'Ecobank Group', contact: 'Jean-Baptiste Adjobi, CRO', approche: 'Banking compliance suite BURHAN + RAQIB', priority: 'P2' },
      { company_id: 'c-016', company_name: 'NSIA Group', contact: 'Mariam Touré, DSI', approche: 'Assurance compliance DORA + CSRD', priority: 'P2' },
    ],
  },
  {
    id: 'vivatech-2026',
    name: 'VivaTech',
    date: '2026-06-11',
    location: 'Paris Expo Porte de Versailles',
    description: 'VivaTech 2026 — salon européen startup/corporate innovation. Focus: AI, GreenTech, Regulation.',
    targets: [
      { company_id: 'c-020', company_name: 'BNP Paribas', contact: 'Claire Dupont, Head AI Ethics', approche: 'AI Act compliance ÆLYA + RAQIB — demo live', priority: 'P0' },
      { company_id: 'c-021', company_name: 'TotalEnergies', contact: 'Marc Lefevre, VP Digital', approche: 'CSRD + CS3D reporting MIZAN + RAQIB', priority: 'P0' },
      { company_id: 'c-022', company_name: 'Schneider Electric', contact: 'Sophie Martin, CDO', approche: 'EU Taxonomy + NIS2 via RAQIB + BURHAN', priority: 'P0' },
      { company_id: 'c-023', company_name: 'Doctolib', contact: 'Thomas Bernard, CISO', approche: 'EHDS + RGPD health data NOOS + YrKnown', priority: 'P1' },
      { company_id: 'c-024', company_name: 'Qonto', contact: 'Léa Moreau, Head Compliance', approche: 'Fintech DORA + AI Act stack', priority: 'P1' },
      { company_id: 'c-025', company_name: 'OVHcloud', contact: 'Pierre Duval, VP Trust', approche: 'NIS2 + AI Act cloud provider BURHAN + ÆLYA', priority: 'P1' },
      { company_id: 'c-026', company_name: 'Dassault Systèmes', contact: 'Anne Richard, DPO', approche: 'AI Act + CSRD enterprise ÆLYA + MIZAN', priority: 'P1' },
      { company_id: 'c-027', company_name: 'Veolia', contact: 'Jean Mercier, DSI', approche: 'CS3D supply chain + NIS2 MIZAN + BURHAN', priority: 'P2' },
      { company_id: 'c-028', company_name: 'Atos', contact: 'Philippe Laurent, CTO', approche: 'Full Eigen stack — digital transformation', priority: 'P2' },
      { company_id: 'c-029', company_name: 'Thales', contact: 'Guillaume Blanc, Head Cyber', approche: 'Defence + NIS2 BURHAN + MYNε', priority: 'P2' },
    ],
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const event = searchParams.get('event') as EventName | null;

  let result = EVENTS;
  if (event) {
    result = result.filter((e) => e.name === event);
  }

  return NextResponse.json({
    events: result,
    total: result.reduce((s, e) => s + e.targets.length, 0),
  });
}
