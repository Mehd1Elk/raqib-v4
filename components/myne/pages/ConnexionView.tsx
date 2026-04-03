'use client';

import { useState } from 'react';
import { M, HD, BD, MN } from '../shared/constants';
import MYNECard from '../shared/MYNECard';
import { CONNEXION_CONTENT } from '../shared/data';

export default function ConnexionView() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const inputStyle = {
    width: '100%', padding: '12px 0', background: 'transparent', border: 'none',
    borderBottom: `1px solid ${M.border}`, color: M.t1, fontFamily: BD,
    fontSize: 14, outline: 'none', transition: 'border-color 0.3s',
  };
  const labelStyle = {
    fontFamily: BD, fontSize: 12, fontWeight: 400 as const,
    color: M.t2, marginBottom: 4, display: 'block' as const,
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        <MYNECard style={{ padding: 32 }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontFamily: MN, fontSize: 28, fontWeight: 300, color: M.gold, marginBottom: 8 }}>MYN&#949;</div>
            <h2 style={{ fontFamily: HD, fontSize: 22, fontWeight: 400, color: M.t1, margin: '0 0 8px' }}>{CONNEXION_CONTENT.headline}</h2>
            <p style={{ fontFamily: BD, fontSize: 14, color: M.t2, margin: 0 }}>{CONNEXION_CONTENT.subheadline}</p>
          </div>

          {!submitted ? (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
              {CONNEXION_CONTENT.fields.map(f => (
                <div key={f.id} style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>
                    {f.label}
                    {f.required && <span style={{ color: M.gold }}> *</span>}
                  </label>
                  {f.type === 'select' ? (
                    <select
                      value={form[f.id] || ''}
                      onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                      required={f.required}
                      style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' as const }}
                    >
                      <option value="" style={{ background: M.bgCard }}>Sélectionner</option>
                      {f.options?.map(o => <option key={o} value={o} style={{ background: M.bgCard }}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.id] || ''}
                      required={f.required}
                      onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                      style={inputStyle}
                    />
                  )}
                </div>
              ))}
              <button type="submit" style={{
                width: '100%', padding: '14px 32px', background: M.gold, color: '#000',
                fontFamily: BD, fontSize: 15, fontWeight: 400, border: 'none', borderRadius: 8,
                cursor: 'pointer', marginTop: 8, transition: 'background 0.3s',
              }}>
                {CONNEXION_CONTENT.cta}
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>✓</div>
              <div style={{ fontFamily: BD, fontSize: 16, fontWeight: 400, color: M.green }}>Inscription enregistrée</div>
              <div style={{ fontSize: 13, color: M.t2, marginTop: 8 }}>Nous vous contacterons dès que votre accès sera prêt.</div>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <div style={{ fontFamily: MN, fontSize: 14, color: M.gold, fontWeight: 300 }}>{CONNEXION_CONTENT.social_proof}</div>
            <div style={{ fontSize: 12, color: M.green, marginTop: 6 }}>⚡ {CONNEXION_CONTENT.urgency}</div>
          </div>
          <div style={{ fontSize: 11, color: M.t3, textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>{CONNEXION_CONTENT.subtext}</div>
        </MYNECard>
      </div>
    </div>
  );
}
