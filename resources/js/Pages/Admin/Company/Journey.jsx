import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusBadge from '@/Components/Admin/StatusBadge';
import EmptyState from '@/Components/Admin/EmptyState';
import Icon from '@/Components/UI/Icon';

export default function Journey({ milestones }) {
    const handleDelete = (id) => { if (confirm('Are you sure?')) router.delete(route('admin.company.journey.destroy', id)); };
    return (
        <AdminLayout title="Company Journey">
            <PageHeader title="Company Journey" description="Manage company milestones and timeline." actionHref={route('admin.company.journey.create')} actionLabel="Add Milestone" />
            {milestones.length === 0 ? (
                <EmptyState icon="activity" title="No milestones yet" actionHref={route('admin.company.journey.create')} />
            ) : (
                <div className="space-y-3">
                    {milestones.map((m) => (
                        <div key={m.id} className="flex items-center justify-between rounded-2xl border border-white/5 bg-gray-900 p-4 transition-all hover:border-white/10">
                            <div className="flex items-center gap-4">
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">{m.year}</span>
                                <div>
                                    <h3 className="font-medium">{m.title}</h3>
                                    {m.description && <p className="text-sm text-gray-100">{m.description}</p>}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <StatusBadge status={m.is_active ? 'active' : 'inactive'} />
                                <div className="flex items-center gap-2">
                                    <Link href={route('admin.company.journey.edit', m.id)} className="text-gray-100 hover:text-white"><Icon name="edit" className="h-4 w-4" /></Link>
                                    <button onClick={() => handleDelete(m.id)} className="text-gray-100 hover:text-red-400"><Icon name="trash" className="h-4 w-4" /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
