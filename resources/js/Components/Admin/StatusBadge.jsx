import { cn } from '@/Utils/cn';

const variants = {
    active: 'bg-emerald-500/10 text-emerald-400',
    inactive: 'bg-gray-500/10 text-gray-400',
    new: 'bg-blue-500/10 text-blue-400',
    read: 'bg-gray-500/10 text-gray-400',
    in_progress: 'bg-amber-500/10 text-amber-400',
    resolved: 'bg-emerald-500/10 text-emerald-400',
    archived: 'bg-gray-600/10 text-gray-500',
    available: 'bg-emerald-500/10 text-emerald-400',
    coming_soon: 'bg-amber-500/10 text-amber-400',
};

export default function StatusBadge({ status, label }) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
                variants[status] ?? 'bg-gray-500/10 text-gray-400',
            )}
        >
            <span className={cn(
                'h-1.5 w-1.5 rounded-full',
                status === 'active' || status === 'available' || status === 'resolved' ? 'bg-emerald-400' :
                status === 'new' ? 'bg-blue-400' :
                status === 'in_progress' ? 'bg-amber-400' :
                'bg-gray-500',
            )} />
            {label ?? status}
        </span>
    );
}
