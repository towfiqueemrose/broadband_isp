import Icon from '@/Components/UI/Icon';
import { Link } from '@inertiajs/react';

export default function EmptyState({ icon = 'globe', title, description, actionHref, actionLabel }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center">
            <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-gray-500">
                <Icon name={icon} className="h-7 w-7" />
            </span>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && <p className="mt-2 max-w-md text-sm text-gray-400">{description}</p>}
            {actionHref && (
                <div className="mt-6">
                    <Link
                        href={actionHref}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-dark"
                    >
                        <Icon name="plus" className="h-4 w-4" />
                        {actionLabel || 'Add New'}
                    </Link>
                </div>
            )}
        </div>
    );
}
