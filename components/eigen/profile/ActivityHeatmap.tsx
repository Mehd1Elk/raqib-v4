import React from 'react';

function getHeatColor(activity: number): string {
  if (activity === 0) return '#F7F3EA';
  if (activity <= 2) return '#B8963E20';
  if (activity <= 5) return '#B8963E50';
  if (activity <= 8) return '#B8963E80';
  return '#B8963E';
}

function getActivityForDay(agentId: string, date: Date): number {
  // Mock function to return random activity based on ID and date
  const hash = Array.from(agentId + date.getDate().toString()).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  if (hash % 5 === 0) return 0;
  return hash % 11; // 0 to 10
}

export function ActivityHeatmap({ agentId }: { agentId: string }) {
  // Générer les données d'activité des 30 derniers jours
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const activity = getActivityForDay(agentId, date);
    return { date, activity };
  });

  return (
    <div className="flex gap-0.5" role="group" aria-label="Activity heatmap">
      {days.map((day, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-sm transition-colors cursor-help hover:ring-1 hover:ring-[#B8963E]"
          style={{ backgroundColor: getHeatColor(day.activity) }}
          title={`${day.date.toLocaleDateString('fr-FR')} — ${day.activity} actions`}
        />
      ))}
    </div>
  );
}
