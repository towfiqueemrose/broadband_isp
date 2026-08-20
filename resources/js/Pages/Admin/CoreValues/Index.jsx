import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusBadge from '@/Components/Admin/StatusBadge';
import EmptyState from '@/Components/Admin/EmptyState';
import Icon from '@/Components/UI/Icon';

export default function Index({ values }) {
    const handleDelete = (id) => { if (confirm('Are you sure?')) router.delete(route('admin.core-values.destroy', id)); };
    return (
        <AdminLayout title="Core Values">
            <PageHeader title="Core Values" description="Manage company core values for the about page." actionHref={route('admin.core-values.create')} actionLabel="Add Value" />
            {values.length === 0 ? (
                <EmptyState icon="heart" title="No core values yet" actionHref={route('admin.core-values.create')} />
            ) : (
                <div className="space-y-3">
                    {values.map((value) => (
                        <div key={value.id} className="flex items-center justify-between rounded-2xl border border-white/5 bg-gray-900 p-4 transition-all hover:border-white/10">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon name={value.icon || 'heart'} className="h-4 w-4" /></span>
                                <div>
                                    <h3 className="font-medium">{value.title}</h3>
                                    {value.description && <p className="text-sm text-gray-400 truncate max-w-lg">{value.description}</p>}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <StatusBadge status={value.is_active ? 'active' : 'inactive'} />
                                <div className="flex items-center gap-2">
                                    <Link href={route('admin.core-values.edit', value.id)} className="text-gray-400 hover:text-white"><Icon name="edit" className="h-4 w-4" /></Link>
                                    <button onClick={() => handleDelete(value.id)} className="text-gray-400 hover:text-red-400"><Icon name="trash" className="h-4 w-4" /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
