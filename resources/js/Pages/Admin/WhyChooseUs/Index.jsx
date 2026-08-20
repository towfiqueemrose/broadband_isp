import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusBadge from '@/Components/Admin/StatusBadge';
import EmptyState from '@/Components/Admin/EmptyState';
import Icon from '@/Components/UI/Icon';

export default function Index({ items }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure?')) {
            router.delete(route('admin.why-choose-us.destroy', id));
        }
    };

    return (
        <AdminLayout title="Why Choose Us">
            <PageHeader title="Why Choose Us" description="Manage items shown in the 'Why Choose Us' section." actionHref={route('admin.why-choose-us.create')} actionLabel="Add Item" />

            {items.length === 0 ? (
                <EmptyState icon="shield-check" title="No items yet" description="Add your first item." actionHref={route('admin.why-choose-us.create')} />
            ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                    {items.map((item) => (
                        <div key={item.id} className="rounded-2xl border border-white/5 bg-gray-900 p-5 transition-all hover:border-white/10">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Icon name={item.icon || 'bolt'} className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <StatusBadge status={item.is_active ? 'active' : 'inactive'} label={item.is_active ? 'Active' : 'Inactive'} />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link href={route('admin.why-choose-us.edit', item.id)} className="text-gray-400 hover:text-white"><Icon name="edit" className="h-4 w-4" /></Link>
                                    <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-400"><Icon name="trash" className="h-4 w-4" /></button>
                                </div>
                            </div>
                            {item.description && <p className="mt-3 text-sm text-gray-400 line-clamp-2">{item.description}</p>}
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
