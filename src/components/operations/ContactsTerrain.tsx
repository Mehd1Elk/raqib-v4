'use client';

import { useState, useEffect } from 'react';
import { T } from '@/lib/tahrik-tokens';
import { createClient } from '@/lib/supabase/client';

interface Contact {
  name: string;
  org: string;
  role: string;
  scoring: string;
  status: string;
  next_action: string;
}

const SEED_DAKHLA: Contact[] = [
  { name: 'Yanja El Khattat', org: 'Conseil Régional Dakhla-Oued Eddahab', role: 'Président', scoring: 'P0', status: 'hot', next_action: 'RDV via CRI + lettre officielle CG' },
  { name: 'Noreddine Tahiri', org: 'Dakhla Technopole · AjarInvest', role: 'Directeur', scoring: 'P0', status: 'hot', next_action: 'Email intro Oncle envoyé — confirmer J4' },
  { name: 'Nisrine Iouzzi', org: 'Port Atlantique Dakhla', role: 'Direction aménagement', scoring: 'P0', status: 'warm', next_action: 'Via Associé BTP — J3 visite chantier' },
  { name: 'Abid Mrayzig', org: 'Port Atlantique Dakhla', role: "Chef travaux N'Tireft", scoring: 'P1', status: 'warm', next_action: 'J3 visite chantier sur place' },
  { name: 'Directeur ANAPEC Dakhla', org: 'ANAPEC', role: 'Recrutement terrain', scoring: 'P2', status: 'cold', next_action: 'J2 16h — profils stagiaires Eigen' },
];

const DAKHLA_MISSION_ID = 'dakhla-2026';

export default function ContactsTerrain() {
  const [contacts, setContacts] = useState<Contact[]>(SEED_DAKHLA);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formOrg, setFormOrg] = useState('');
  const [formScoring, setFormScoring] = useState('P1');
  const [formAction, setFormAction] = useState('');

  useEffect(() => {
    // ops_contacts not yet in generated types — cast to any
    const supabase = createClient() as unknown as { from: (t: string) => any };
    supabase
      .from('ops_contacts')
      .select('*')
      .eq('mission_id', DAKHLA_MISSION_ID)
      .order('scoring', { ascending: true })
      .order('created_at', { ascending: true })
      .then(({ data }: { data: Record<string, string>[] | null }) => {
        if (data && data.length > 0) {
          setContacts(
            data.map((r: Record<string, string>) => ({
              name: r.name,
              org: r.org ?? '',
              role: r.role ?? '',
              scoring: r.scoring ?? 'P2',
              status: r.status ?? 'cold',
              next_action: r.next_action ?? '',
            }))
          );
        }
      });
  }, []);

  const handleSubmit = async () => {
    if (!formName.trim()) return;
    const supabase = createClient() as unknown as { from: (t: string) => any };
    const newContact: Contact = {
      name: formName,
      org: formOrg,
      role: '',
      scoring: formScoring,
      status: 'cold',
      next_action: formAction,
    };

    await supabase.from('ops_contacts').insert({
      mission_id: DAKHLA_MISSION_ID,
      name: formName,
      org: formOrg,
      scoring: formScoring,
      next_action: formAction,
      status: 'cold',
    });

    await supabase.from('stream_events').insert({
      event_type: 'conquest',
      entity: 'TAHRIK',
      title: 'Contact terrain — ' + formName,
      urgency: 'normal',
    });

    setContacts((prev) => [...prev, newContact]);
    setFormName('');
    setFormOrg('');
    setFormScoring('P1');
    setFormAction('');
    setShowForm(false);
  };

  const scoringBadge = (s: string) => {
    if (s === 'P0')
      return {
        background: 'rgba(0,212,192,0.22)',
        color: T.acc,
        border: 'none',
      };
    if (s === 'P1')
      return {
        background: 'transparent',
        color: T.txtS,
        border: `1px solid ${T.bdr}`,
      };
    return {
      background: 'transparent',
      color: T.txtD,
      border: 'none',
    };
  };

  const statusDot = (s: string) => {
    if (s === 'hot') return '#00D4C0';
    if (s === 'warm') return 'rgba(0,212,192,0.5)';
    return T.txtD;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {contacts.map((c, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            background: T.bg2,
            borderRadius: '6px',
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'rgba(0,212,192,0.1)',
              color: '#00D4C0',
              fontFamily: T.fM,
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {c.name
              .split(' ')
              .map((w) => w[0])
              .slice(0, 2)
              .join('')
              .toUpperCase()}
          </div>

          {/* Info */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <span style={{ fontFamily: T.fB, fontSize: '12px', color: T.txt }}>{c.name}</span>
            <span style={{ fontFamily: T.fM, fontSize: '10px', color: T.txtD }}>
              {c.org} · {c.role}
            </span>
            <span style={{ fontFamily: T.fB, fontSize: '11px', color: T.txtS, fontStyle: 'italic' }}>
              {c.next_action}
            </span>
          </div>

          {/* Scoring badge */}
          <span
            style={{
              fontFamily: T.fM,
              fontSize: '10px',
              padding: '2px 8px',
              borderRadius: '4px',
              ...scoringBadge(c.scoring),
            }}
          >
            {c.scoring}
          </span>

          {/* Status dot */}
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: statusDot(c.status),
              flexShrink: 0,
            }}
          />
        </div>
      ))}

      {/* Add button / form */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          style={{
            background: 'transparent',
            border: `1px solid ${T.bdrH}`,
            color: T.acc,
            fontFamily: T.fB,
            fontSize: '12px',
            padding: '10px',
            cursor: 'pointer',
            borderRadius: '6px',
          }}
        >
          + Contact
        </button>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '12px',
            background: T.bg2,
            borderRadius: '6px',
            border: `1px solid ${T.bdrH}`,
          }}
        >
          <input
            placeholder="Nom"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Organisation"
            value={formOrg}
            onChange={(e) => setFormOrg(e.target.value)}
            style={inputStyle}
          />
          <select
            value={formScoring}
            onChange={(e) => setFormScoring(e.target.value)}
            style={inputStyle}
          >
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
          <input
            placeholder="Prochaine action"
            value={formAction}
            onChange={(e) => setFormAction(e.target.value)}
            style={inputStyle}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleSubmit} style={{ flex: 1, background: T.acc, color: '#0C2EC8', border: 'none', padding: '8px', fontFamily: T.fB, fontSize: '12px', cursor: 'pointer', borderRadius: '4px' }}>
              Ajouter
            </button>
            <button onClick={() => setShowForm(false)} style={{ background: 'transparent', border: `1px solid ${T.bdr}`, color: T.txtD, padding: '8px 12px', fontFamily: T.fB, fontSize: '12px', cursor: 'pointer', borderRadius: '4px' }}>
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: 'rgba(0,212,192,0.05)',
  border: `1px solid rgba(0,212,192,0.15)`,
  color: '#E8FCFA',
  fontFamily: "'DM Sans',system-ui,sans-serif",
  fontSize: '12px',
  padding: '8px 10px',
  borderRadius: '4px',
  outline: 'none',
};
