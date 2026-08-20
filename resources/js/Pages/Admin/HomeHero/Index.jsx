import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusBadge from '@/Components/Admin/StatusBadge';
import EmptyState from '@/Components/Admin/EmptyState';
import Icon from '@/Components/UI/Icon';

export default function Index({ heroes }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this hero section?')) {
            router.delete(route('admin.home-hero.destroy', id));
        }
    };

    return (
        <AdminLayout title="Homepage Hero">
            <PageHeader
                title="Homepage Hero Section"
                description="Manage the main hero section displayed at the top of the homepage."
                actionHref={route('admin.home-hero.create')}
                actionLabel="Add Hero"
            />

            {heroes.length === 0 ? (
                <EmptyState
                    icon="zap"
                    title="No hero sections yet"
                    description="Create your first hero section to get started."
                    actionHref={route('admin.home-hero.create')}
                    actionLabel="Create Hero"
                />
            ) : (
                <div className="space-y-4">
                    {heroes.map((hero) => (
                        <div
                            key={hero.id}
                            className="flex items-center justify-between rounded-2xl border border-white/5 bg-gray-900 p-5 transition-all duration-200 hover:border-white/10"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3">
                                    <h3 className="font-semibold truncate">{hero.main_heading}</h3>
                                    <StatusBadge
                                        status={hero.is_active ? 'active' : 'inactive'}
                                        label={hero.is_active ? 'Active' : 'Inactive'}
                                    />
                                </div>
                                {hero.highlighted_text && (
                                    <p className="mt-1 text-sm text-primary">{hero.highlighted_text}</p>
                                )}
                                {hero.description && (
                                    <p className="mt-1 text-sm text-gray-400 truncate">{hero.description}</p>
                                )}
                            </div>
                            <div className="ml-4 flex items-center gap-2">
                                <Link
                                    href={route('admin.home-hero.edit', hero.id)}
                                    className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 px-3 py-2 text-xs font-medium text-gray-300 hover:bg-white/10 transition-colors"
                                >
                                    <Icon name="edit" className="h-3.5 w-3.5" />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(hero.id)}
                                    className="inline-flex items-center gap-1.5 rounded-xl bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/20 transition-colors"
                                >
                                    <Icon name="trash" className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
