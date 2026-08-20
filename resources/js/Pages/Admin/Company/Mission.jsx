import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusBadge from '@/Components/Admin/StatusBadge';
import EmptyState from '@/Components/Admin/EmptyState';
import Icon from '@/Components/UI/Icon';

export default function Mission({ missions }) {
    const handleDelete = (id) => { if (confirm('Are you sure?')) router.delete(route('admin.company.mission.destroy', id)); };
    return (
        <AdminLayout title="Mission">
            <PageHeader title="Company Mission" description="Manage the company mission statement." actionHref={route('admin.company.mission.create')} actionLabel="Add Mission" />
            {missions.length === 0 ? (
                <EmptyState icon="eye" title="No mission yet" actionHref={route('admin.company.mission.create')} />
            ) : (
                <div className="space-y-3">
                    {missions.map((m) => (
                        <div key={m.id} className="rounded-2xl border border-white/5 bg-gray-900 p-5 transition-all hover:border-white/10">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2"><h3 className="font-medium">{m.title}</h3><StatusBadge status={m.is_active ? 'active' : 'inactive'} /></div>
                                    {m.description && <p className="mt-2 text-sm text-gray-400 max-w-2xl">{m.description}</p>}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link href={route('admin.company.mission.edit', m.id)} className="text-gray-400 hover:text-white"><Icon name="edit" className="h-4 w-4" /></Link>
                                    <button onClick={() => handleDelete(m.id)} className="text-gray-400 hover:text-red-400"><Icon name="trash" className="h-4 w-4" /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
