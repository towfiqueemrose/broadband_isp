import Skeleton from '@/Components/UI/Skeleton';

export default function PackageCardSkeleton() {
    return (
        <div className="flex h-full flex-col rounded-3xl border border-border bg-surface p-7 shadow-card sm:p-8">
            <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="mt-4 h-6 w-40" />
            <div className="mt-6">
                <Skeleton className="h-10 w-44" />
                <Skeleton className="mt-3 h-4 w-32" />
            </div>
            <Skeleton className="mt-6 h-8 w-36" />
            <Skeleton className="mt-6 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-3/4" />
            <div className="mt-6 space-y-3 border-t border-border pt-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
            </div>
            <Skeleton className="mt-auto h-11 w-full rounded-full" />
        </div>
    );
}