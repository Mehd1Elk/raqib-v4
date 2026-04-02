'use client';

import { useState, useEffect } from 'react';
import { C, GR, MN, SN, thS, tdS, wrap, PERSONAS as P_LIST } from './shared/constants';
import { SectionTitle } from './shared/SectionTitle';
import { Pill } from './shared/Pill';
import { fetchContacts } from '@/lib/acquisition/api';
import type { AcqContact } from '@/lib/acquisition/types';

export default function ContactsView() {
  const [contacts, setContacts] = useState<AcqContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPersona, setFilterPersona] = useState('');

  useEffect(() => {
    const params: Record<string, string> = {};
    if (filterPersona) params.persona = filterPersona;
    fetchContacts(params).then(setContacts).catch(() => setContacts([])).finally(() => setLoading(false));
  }, [filterPersona]);

  return (
    <div style={wrap}>
      <SectionTitle title="Contacts" count={contacts.length} />

      {/* Persona filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => { setLoading(true); setFilterPersona(''); }} style={{
          padding: '4px 10px', border: `0.5px solid ${!filterPersona ? C.accent : C.div}`, borderRadius: 0,
          fontFamily: MN, fontSize: 9, cursor: 'pointer', background: !filterPersona ? `${C.accent}20` : C.nacre, color: !filterPersona ? C.accent : C.t3,
        }}>Tous</button>
        {P_LIST.map(p => (
          <button key={p.id} onClick={() => { setLoading(true); setFilterPersona(filterPersona === p.id ? '' : p.id); }} style={{
            padding: '4px 10px', border: `0.5px solid ${filterPersona === p.id ? p.c : C.div}`, borderRadius: 0,
            fontFamily: MN, fontSize: 9, cursor: 'pointer', background: filterPersona === p.id ? `${p.c}20` : C.nacre, color: filterPersona === p.id ? p.c : C.t3,
          }}>{p.n}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ fontFamily: MN, fontSize: 10, color: C.t3, padding: 20 }}>Chargement...</div>
      ) : contacts.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center' }}>
          <div style={{ fontFamily: GR, fontSize: 16, fontStyle: 'italic', color: C.t2, marginBottom: 8 }}>
            Aucun contact en base
          </div>
          <div style={{ fontFamily: SN, fontSize: 11, color: C.t3 }}>
            Les données Perplexity seront injectées prochainement. Les contacts LinkedIn des 396 entreprises cibles seront enrichis automatiquement.
          </div>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thS}>Nom</th>
                <th style={thS}>Rôle</th>
                <th style={thS}>Persona</th>
                <th style={thS}>Entreprise</th>
                <th style={thS}>LinkedIn</th>
                <th style={thS}>Priority</th>
                <th style={thS}>Prochaine Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(ct => {
                const persona = P_LIST.find(p => p.id === ct.persona);
                return (
                  <tr key={ct.id}
                    onMouseEnter={e => (e.currentTarget.style.background = C.nacre3)}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <td style={{ ...tdS, fontFamily: GR, fontWeight: 400, fontSize: 12 }}>{ct.name}</td>
                    <td style={tdS}>{ct.role}</td>
                    <td style={tdS}><Pill label={persona?.n || ct.persona} color={persona?.c || C.t3} /></td>
                    <td style={tdS}>{(ct as unknown as Record<string, Record<string, string>>).acq_companies?.name ?? '—'}</td>
                    <td style={tdS}>
                      {ct.linkedin ? <a href={ct.linkedin} target="_blank" rel="noreferrer" style={{ color: C.sapphire, fontFamily: MN, fontSize: 9 }}>Profil</a> : '—'}
                    </td>
                    <td style={tdS}><Pill label={ct.priority} color={ct.priority === 'P0' ? C.ruby : ct.priority === 'P1' ? C.accent : C.t3} /></td>
                    <td style={{ ...tdS, fontSize: 10, color: C.t2 }}>{ct.next_action || '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
