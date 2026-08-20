import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusBadge from '@/Components/Admin/StatusBadge';
import EmptyState from '@/Components/Admin/EmptyState';
import Icon from '@/Components/UI/Icon';

export default function Index({ items }) {
    const handleDelete = (id) => { if (confirm('Are you sure?')) router.delete(route('admin.network-tech.destroy', id)); };
    return (
        <AdminLayout title="Network & Technology">
            <PageHeader title="Network & Technology" description="Manage network technology points shown on homepage." actionHref={route('admin.network-tech.create')} actionLabel="Add Item" />
            {items.length === 0 ? (
                <EmptyState icon="server-stack" title="No items yet" actionHref={route('admin.network-tech.create')} />
            ) : (
                <div className="space-y-3">
                    {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between rounded-2xl border border-white/5 bg-gray-900 p-4 transition-all hover:border-white/10">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon name={item.icon || 'server-stack'} className="h-4 w-4" /></span>
                                <div>
                                    <h3 className="font-medium">{item.title}</h3>
                                    {item.description && <p className="text-sm text-gray-400 truncate max-w-md">{item.description}</p>}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <StatusBadge status={item.is_active ? 'active' : 'inactive'} />
                                <div className="flex items-center gap-2">
                                    <Link href={route('admin.network-tech.edit', item.id)} className="text-gray-400 hover:text-white"><Icon name="edit" className="h-4 w-4" /></Link>
                                    <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-400"><Icon name="trash" className="h-4 w-4" /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
