'use client';

import type { TopMineral } from '../../lib/corridor/types';
import { parseTrend } from '../../lib/corridor/utils';

interface MineralTableProps {
  minerals: TopMineral[];
  onMineralClick?: (name: string) => void;
}

export function MineralTable({ minerals, onMineralClick }: MineralTableProps) {
  return (
    <div className="minerals-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Minerai</th>
            <th>Prix</th>
            <th>Tendance</th>
            <th>Top producteurs corridor</th>
            <th>Statut CRMA</th>
            <th>Demande EU</th>
          </tr>
        </thead>
        <tbody>
          {minerals.map((m, i) => {
            const trend = parseTrend(m.trend);
            return (
              <tr
                key={i}
                style={{ cursor: onMineralClick ? 'pointer' : undefined }}
                onClick={() => onMineralClick?.(m.name)}
              >
                <td className="col-name">{m.name}</td>
                <td className="col-gold">{m.price}</td>
                <td>
                  <span style={{ color: trend.direction === 'up' ? 'var(--green)' : trend.direction === 'down' ? 'var(--red)' : 'var(--text-muted)' }}>
                    {trend.direction === 'up' ? '▲' : trend.direction === 'down' ? '▼' : '—'} {trend.value}
                  </span>
                </td>
                <td>{m.topProducers.join(', ')}</td>
                <td><span className="tag">{m.crmaStatus}</span></td>
                <td>{m.euDemand}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
