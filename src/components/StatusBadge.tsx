import { CheckCircle2, Clock, Loader, XCircle, PackageCheck } from 'lucide-react';
import type { OrderStatus } from '@/types';

const statusConfig: Record<OrderStatus, { label: string; classes: string; icon: typeof Clock }> = {
  pending: { label: 'Pending', classes: 'bg-amber-50 text-amber-700 ring-amber-200', icon: Clock },
  'in-progress': { label: 'In Progress', classes: 'bg-blue-50 text-blue-700 ring-blue-200', icon: Loader },
  ready: { label: 'Ready', classes: 'bg-teal-50 text-teal-700 ring-teal-200', icon: PackageCheck },
  completed: { label: 'Completed', classes: 'bg-emerald-50 text-emerald-700 ring-emerald-200', icon: CheckCircle2 },
  rejected: { label: 'Rejected', classes: 'bg-rose-50 text-rose-700 ring-rose-200', icon: XCircle },
};

export default function StatusBadge({ status, size = 'md' }: { status: OrderStatus; size?: 'sm' | 'md' }) {
  const config = statusConfig[status];
  const Icon = config.icon;
  const iconSize = size === 'sm' ? 12 : 14;
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold ring-1 ring-inset ${padding} ${config.classes}`}>
      <Icon size={iconSize} className={status === 'in-progress' ? 'animate-spin' : ''} strokeWidth={2.5} />
      {config.label}
    </span>
  );
}
