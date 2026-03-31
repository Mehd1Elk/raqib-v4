interface Column {
  key: string;
  label: string;
  align?: 'left' | 'right' | 'center';
  width?: string;
}

interface Props {
  columns: Column[];
  rows: Record<string, any>[];
  emptyMessage?: string;
}

export function MiniTable({ columns, rows, emptyMessage = 'Aucune donnee.' }: Props) {
  if (!rows.length) {
    return (
      <div className="p-6 text-center text-[10px] font-[family-name:var(--font-noto)] text-tm">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[10px] font-[family-name:var(--font-noto)]">
        <thead>
          <tr className="border-b border-div bg-cream">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-2 font-semibold text-t3 font-[family-name:var(--font-jetbrains)] ${
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                }`}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-div-l hover:bg-cream/50">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-2.5 font-[family-name:var(--font-jetbrains)] ${
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  }`}
                >
                  {row[col.key] ?? '\u2014'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
