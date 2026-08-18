import { cn } from '@/Utils/cn';

export default function Skeleton({ className }) {
    return <div className={cn('animate-pulse rounded-xl bg-surface-2', className)} aria-hidden="true" />;
}
