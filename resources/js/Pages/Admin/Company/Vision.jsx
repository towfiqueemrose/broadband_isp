import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusBadge from '@/Components/Admin/StatusBadge';
import EmptyState from '@/Components/Admin/EmptyState';
import Icon from '@/Components/UI/Icon';

export default function Vision({ visions }) {
    const handleDelete = (id) => { if (confirm('Are you sure?')) router.delete(route('admin.company.vision.destroy', id)); };
    return (
        <AdminLayout title="Vision">
            <PageHeader title="Company Vision" description="Manage the company vision statement." actionHref={route('admin.company.vision.create')} actionLabel="Add Vision" />
            {visions.length === 0 ? (
                <EmptyState icon="globe" title="No vision yet" actionHref={route('admin.company.vision.create')} />
            ) : (
                <div className="space-y-3">
                    {visions.map((v) => (
                        <div key={v.id} className="rounded-2xl border border-white/5 bg-gray-900 p-5 transition-all hover:border-white/10">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2"><h3 className="font-medium">{v.title}</h3><StatusBadge status={v.is_active ? 'active' : 'inactive'} /></div>
                                    {v.description && <p className="mt-2 text-sm text-gray-100 max-w-2xl">{v.description}</p>}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link href={route('admin.company.vision.edit', v.id)} className="text-gray-100 hover:text-white"><Icon name="edit" className="h-4 w-4" /></Link>
                                    <button onClick={() => handleDelete(v.id)} className="text-gray-100 hover:text-red-400"><Icon name="trash" className="h-4 w-4" /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
