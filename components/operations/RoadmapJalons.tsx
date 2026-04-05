'use client';

import { T } from '@/lib/tahrik-tokens';

interface Jalon {
  title: string;
  date: string;
  status: 'done' | 'in_progress' | 'upcoming';
  entity: string;
}

const JALONS: Jalon[] = [
  { title: 'GITEX Africa Marrakech', date: '2026-04-09', status: 'done', entity: 'RAQIB' },
  { title: 'Mission Dakhla terrain', date: '2026-04-26', status: 'in_progress', entity: 'TAHRIK' },
  { title: 'London Africa Tech Summit', date: '2026-05-29', status: 'upcoming', entity: 'CG' },
  { title: 'Dakar Oil & Gas Expo', date: '2026-06-10', status: 'upcoming', entity: 'CG' },
  { title: 'VivaTech Paris', date: '2026-06-17', status: 'upcoming', entity: 'CG' },
  { title: 'Annonce officielle Forum Dakhla', date: '2026-09-01', status: 'upcoming', entity: 'Forum' },
  { title: 'China Trip Shenzhen/Shanghai', date: '2026-10-01', status: 'upcoming', entity: 'Eigen' },
  { title: 'BURHAN SDK V1', date: '2026-11-01', status: 'upcoming', entity: 'BURHAN' },
  { title: 'NOOS MVP Clinical', date: '2026-12-01', status: 'upcoming', entity: 'NOOS' },
  { title: 'AlgueSov V2 Launch', date: '2027-01-15', status: 'upcoming', entity: 'AlgueSov' },
  { title: 'MYN\u03B5 Beta', date: '2027-02-01', status: 'upcoming', entity: 'MYN\u03B5' },
  { title: 'Forum de Dakhla 2027', date: '2027-05-09', status: 'upcoming', entity: 'Forum' },
];

function formatDate(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: '2-digit' });
}

export default function RoadmapJalons() {
  return (
    <div style={{ overflowX: 'auto', padding: '24px 0' }}>
      <div
        style={{
          minWidth: 1200,
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-start',
          paddingTop: 40,
          paddingBottom: 20,
        }}
      >
        {/* Horizontal line */}
        <div
          style={{
            position: 'absolute',
            top: 44,
            left: 0,
            right: 0,
            height: 1,
            background: T.bdr,
          }}
        />

        {JALONS.map((j, i) => {
          const isActive = j.status === 'done' || j.status === 'in_progress';
          return (
            <div
              key={i}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                position: 'relative',
              }}
            >
              {/* Dot */}
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: isActive ? T.acc : T.card,
                  border: isActive ? 'none' : `1px solid ${T.bdrH}`,
                  zIndex: 1,
                }}
              />

              {/* Date */}
              <span
                style={{
                  fontFamily: T.fM,
                  fontSize: '9px',
                  color: T.txtD,
                  whiteSpace: 'nowrap',
                }}
              >
                {formatDate(j.date)}
              </span>

              {/* Title */}
              <span
                style={{
                  fontFamily: T.fB,
                  fontSize: '11px',
                  color: T.txt,
                  textAlign: 'center',
                  lineHeight: 1.3,
                  maxWidth: 90,
                }}
              >
                {j.title}
              </span>

              {/* Entity badge */}
              <span
                style={{
                  fontFamily: T.fM,
                  fontSize: '9px',
                  background: 'rgba(0,212,192,0.1)',
                  color: T.acc,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                }}
              >
                {j.entity}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
