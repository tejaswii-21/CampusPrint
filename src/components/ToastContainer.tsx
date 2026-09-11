import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { ToastType } from '@/types';

const toastConfig: Record<ToastType, { icon: typeof CheckCircle2; classes: string }> = {
  success: { icon: CheckCircle2, classes: 'bg-emerald-50 text-emerald-800 ring-emerald-200' },
  error: { icon: XCircle, classes: 'bg-rose-50 text-rose-800 ring-rose-200' },
  info: { icon: Info, classes: 'bg-blue-50 text-blue-800 ring-blue-200' },
};

export default function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2.5">
      {toasts.map((toast) => {
        const config = toastConfig[toast.type];
        const Icon = config.icon;
        return (
          <div
            key={toast.id}
            className={`animate-slide-up flex items-center gap-3 rounded-lg px-4 py-3 shadow-card-hover ring-1 ring-inset ${config.classes} min-w-[280px] max-w-sm`}
          >
            <Icon size={18} className="shrink-0" strokeWidth={2.5} />
            <span className="flex-1 text-sm font-medium">{toast.message}</span>
            <button onClick={() => dismissToast(toast.id)} className="shrink-0 opacity-60 hover:opacity-100">
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
