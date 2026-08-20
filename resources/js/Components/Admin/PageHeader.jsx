import { Link } from '@inertiajs/react';
import Icon from '@/Components/UI/Icon';

export default function PageHeader({ title, description, action, actionHref, actionLabel }) {
    return (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                {description && (
                    <p className="mt-1 text-sm text-gray-400">{description}</p>
                )}
            </div>
            {(actionHref || action) && (
                <div>
                    {actionHref ? (
                        <Link
                            href={actionHref}
                            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-dark active:scale-[0.98]"
                        >
                            <Icon name="plus" className="h-4 w-4" />
                            {actionLabel || 'Add New'}
                        </Link>
                    ) : action}
                </div>
            )}
        </div>
    );
}
