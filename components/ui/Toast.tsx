'use client';
import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, X, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastItem { id: string; type: ToastType; message: string; }

const ToastContext = createContext<{ toast: (type: ToastType, message: string) => void }>({ toast: () => {} });
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((type: ToastType, message: string) => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const icons = { success: CheckCircle2, error: AlertTriangle, warning: AlertTriangle, info: Info };
  const colors = { success: '#3D7C5E', error: '#9C3D3D', warning: '#B87D3E', info: '#3D5E8C' };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
        {toasts.map(t => {
          const Icon = icons[t.type];
          return (
            <div
              key={t.id}
              className="flex items-center gap-3 px-4 py-3 bg-ivory border rounded-lg shadow-lg min-w-[300px]"
              style={{ borderColor: colors[t.type] + '40', animation: 'fadeInUp 200ms ease-out' }}
            >
              <Icon size={16} style={{ color: colors[t.type] }} />
              <span className="font-[family-name:var(--font-noto)] text-[11px] text-noir flex-1">{t.message}</span>
              <button onClick={() => setToasts(prev => prev.filter(tt => tt.id !== t.id))}>
                <X size={12} className="text-stone" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
