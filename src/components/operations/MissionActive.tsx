'use client';

import React, { useState } from 'react';
import { T } from '@/lib/tahrik-tokens';

const MISSION = {
  titre: "Reconnaissance Dakhla",
  lieu: "Dakhla-Oued Eddahab",
  dates: "20–26 avr 2026",
  duree: "7 jours",
  statut: "preparation",
  priorite: "P0"
};

const EQUIPE = [
  { nom: 'Mehdi', role: 'Fondateur · Pilote mission' },
  { nom: 'Oncle', role: 'CEO AlgueSov · Réseau local · Darija' },
  { nom: 'Associé', role: 'BTP/IA · Cybeform · Chantiers' }
];

const INITIAL_OBJECTIFS = [
  { id: 'OBJ-1', priority: 'P0', title: 'Contact CRI + Conseil Régional', owner: 'Mehdi + Oncle', kpi: 'RDV obtenu + fiche implantation CG', status: 'todo' },
  { id: 'OBJ-2', priority: 'P0', title: "Visite Port Atlantique N'Tireft", owner: 'Mehdi + Associé', kpi: 'Visite effectuée + contact technique', status: 'todo' },
  { id: 'OBJ-3', priority: 'P0', title: 'Repérage QG CG + Lieux Forum 2027', owner: 'Mehdi', kpi: 'Devis Technopole + shortlist 3 lieux', status: 'todo' },
  { id: 'OBJ-4', priority: 'P1', title: 'Cartographie algues + réseau oncle', owner: 'Oncle + Mehdi', kpi: '5+ contacts filière scorés', status: 'todo' },
  { id: 'OBJ-5', priority: 'P1', title: 'Cartographie BTP/IA chantiers', owner: 'Associé + Mehdi', kpi: 'Scoring 5 verticales + 3 contacts BTP', status: 'todo' }
];

const PROGRAMME = [
  { jour: "J1", dates: "Dim 20 avr", titre: "Arrivée + Reconnaissance", concept: "布石 Fuseki", horaires: [ { heure:"7h", titre:"Vol Casa→Dakhla", detail: "" }, { heure:"11h", titre:"Briefing Oncle", detail: "" }, { heure:"14h", titre:"Reconnaissance terrain", detail: "" }, { heure:"19h30", titre:"Dîner stratégique", detail: "" }] },
  { jour: "J2", dates: "Lun 21 avr", titre: "Administration locale", concept: "禮 Lǐ", horaires: [ { heure:"9h", titre:"CRI", detail:"" }, { heure:"11h", titre:"Conseil Régional", detail:"" }, { heure:"14h", titre:"Chambre Commerce", detail:"" }, { heure:"16h", titre:"ANAPEC/ISTA", detail:"" } ] },
  { jour: "J3", dates: "Mar 22 avr", titre: "Port Atlantique", concept: "地の巻 Chi no Maki", horaires: [ { heure:"9h", titre:"Direction aménagement", detail:"" }, { heure:"12h", titre:"Visite chantier N'Tireft", detail:"" }, { heure:"15h", titre:"Réunion contacts BTP", detail:"" } ] },
  { jour: "J4", dates: "Mer 23 avr", titre: "Technopole + Forum", concept: "کاروانسرا", horaires: [ { heure:"9h", titre:"Dakhla Technopole", detail:"" }, { heure:"14h", titre:"Repérage 3 lieux Forum", detail:"" }, { heure:"17h", titre:"Réunion potentiel QG CG", detail:"" } ] },
  { jour: "J5", dates: "Jeu 24 avr", titre: "Filière algues", concept: "仁 Rén", horaires: [ { heure:"9h", titre:"Sites production algues", detail:"" }, { heure:"12h", titre:"Déjeuner coopérative pêcheurs", detail:"" }, { heure:"15h", titre:"Cartographie MYNε/BURHAN", detail:"" } ] },
  { jour: "J6", dates: "Ven 25 avr", titre: "BTP/IA chantiers", concept: "形 Xíng", horaires: [ { heure:"9h", titre:"SGTM/TGCC visite", detail:"" }, { heure:"14h", titre:"Scoring 5 verticales Cybeform", detail:"" }, { heure:"17h", titre:"Note investisseurs", detail:"" } ] },
  { jour: "J7", dates: "Sam 26 avr", titre: "Bilan + départ", concept: "天命 Tiānmìng", horaires: [ { heure:"9h", titre:"Mémo 1 page Lambert+Salvaudon", detail:"" }, { heure:"12h", titre:"Déjeuner réseau oncle", detail:"" }, { heure:"16h", titre:"Vol retour", detail:"" } ] }
];

export function MissionActive() {
  const [objectifs, setObjectifs] = useState(INITIAL_OBJECTIFS);
  const [activeDay, setActiveDay] = useState(0);

  const p0Total = objectifs.filter(o => o.priority === 'P0').length;
  const p0Done = objectifs.filter(o => o.priority === 'P0' && o.status === 'done').length;
  const progressPercent = p0Total === 0 ? 0 : (p0Done / p0Total) * 100;

  const toggleObjectif = (id: string) => {
    setObjectifs(prev => prev.map(o => o.id === id ? { ...o, status: o.status === 'todo' ? 'done' : 'todo' } : o));
  };

  const currentDay = PROGRAMME[activeDay];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
      
      {/* 1. Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            background: 'rgba(0,212,192,0.2)',
            color: '#00D4C0',
            fontFamily: T.fM,
            fontSize: '10px',
            padding: '4px 10px',
            borderRadius: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {MISSION.statut} · {MISSION.priorite}
          </span>
        </div>
        
        <h1 style={{
          fontFamily: T.fT,
          fontSize: '20px',
          color: '#FFFFFF',
          margin: 0,
          fontWeight: 400
        }}>
          {MISSION.titre}
        </h1>
        
        <div style={{
          fontFamily: T.fB,
          fontSize: '11px',
          color: T.txtS,
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          <span>{MISSION.lieu}</span>
          <span>·</span>
          <span>{MISSION.dates}</span>
          <span>·</span>
          <span>{MISSION.duree}</span>
        </div>

        <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: T.fM, fontSize: '9px', color: T.txtD, letterSpacing: '0.02em' }}>
            <span>PROGRESSION P0</span>
            <span style={{ color: '#00D4C0' }}>{p0Done} / {p0Total} COMPLETÉS</span>
          </div>
          <div style={{
            height: '3px',
            background: T.bg2,
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              background: '#00D4C0',
              width: `${progressPercent}%`,
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>
      </div>

      {/* 2. Équipe */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {EQUIPE.map((membre, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '12px', 
              background: T.bg2, 
              borderRadius: '6px',
              flex: '1 1 200px'
            }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'rgba(0,212,192,0.12)',
                color: '#00D4C0',
                fontFamily: T.fM,
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {membre.nom.slice(0, 2).toUpperCase()}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontFamily: T.fB, fontSize: '12px', color: '#FFFFFF', lineHeight: 1 }}>{membre.nom}</span>
                <span style={{ fontFamily: T.fB, fontSize: '10px', color: T.txtD, lineHeight: 1 }}>{membre.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Objectifs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {objectifs.map((obj) => (
            <div 
              key={obj.id} 
              onClick={() => toggleObjectif(obj.id)}
              style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '14px', 
                padding: '14px', 
                background: T.bg2, 
                borderLeft: `2px solid ${obj.priority === 'P0' ? '#00D4C0' : 'rgba(0,212,192,0.3)'}`,
                cursor: 'pointer',
                opacity: obj.status === 'done' ? 0.5 : 1,
                transition: 'opacity 0.2s ease',
                borderRadius: '0 4px 4px 0'
              }}
            >
              <div style={{ 
                width: '14px', 
                height: '14px', 
                border: `1px solid ${obj.status === 'done' ? '#00D4C0' : T.txtD}`,
                background: obj.status === 'done' ? 'rgba(0,212,192,0.2)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '1px',
                flexShrink: 0,
                transition: 'all 0.2s ease'
              }}>
                {obj.status === 'done' && (
                  <div style={{ width: '6px', height: '6px', background: '#00D4C0' }} />
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontFamily: T.fM, fontSize: '9px', color: '#00D4C0', padding: '2px 6px', background: 'rgba(0,212,192,0.1)', borderRadius: '4px' }}>
                    {obj.id}
                  </span>
                  <span style={{ fontFamily: T.fB, fontSize: '13px', color: '#FFFFFF', textDecoration: obj.status === 'done' ? 'line-through' : 'none', textDecorationColor: T.txtS }}>
                    {obj.title}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '12px', fontFamily: T.fB, fontSize: '10px', color: T.txtD }}>
                  <span>{obj.owner}</span>
                  <span>·</span>
                  <span>{obj.kpi}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Programme */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Pills */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          overflowX: 'auto', 
          paddingBottom: '8px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {PROGRAMME.map((prog, idx) => {
            const isActive = activeDay === idx;
            return (
              <div 
                key={prog.jour}
                onClick={() => setActiveDay(idx)}
                style={{
                  padding: '8px 16px',
                  background: isActive ? 'rgba(0,212,192,0.2)' : T.bg2,
                  border: `1px solid ${isActive ? '#00D4C0' : 'transparent'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  minWidth: '80px',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease'
              }}>
                <span style={{ fontFamily: T.fM, fontSize: '12px', color: isActive ? '#00D4C0' : T.txtS }}>{prog.jour}</span>
                <span style={{ fontFamily: T.fB, fontSize: '10px', color: isActive ? '#00D4C0' : T.txtD, whiteSpace: 'nowrap' }}>{prog.dates.split(' ')[0]}</span>
              </div>
            )
          })}
        </div>

        {/* Programme Detail du jour actif */}
        <div style={{ 
          background: T.bg2, 
          padding: '24px', 
          borderLeft: '2px solid rgba(0,212,192,0.3)',
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px',
          borderRadius: '0 8px 8px 0'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontFamily: T.fM, fontSize: '10px', color: '#00D4C0', letterSpacing: '0.05em' }}>{currentDay.concept}</span>
            <span style={{ fontFamily: T.fT, fontSize: '16px', color: '#FFFFFF' }}>{currentDay.titre}</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {currentDay.horaires.map((h, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: T.fM, fontSize: '10px', color: T.txtD, width: '40px', paddingTop: '2px', flexShrink: 0, textAlign: 'right' }}>{h.heure}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontFamily: T.fB, fontSize: '13px', color: '#FFFFFF', lineHeight: 1.2 }}>{h.titre}</span>
                  {h.detail && (
                    <span style={{ fontFamily: T.fB, fontSize: '11px', color: T.txtS, lineHeight: 1.4 }}>{h.detail}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

export default MissionActive;
