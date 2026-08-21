import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusBadge from '@/Components/Admin/StatusBadge';
import EmptyState from '@/Components/Admin/EmptyState';
import Icon from '@/Components/UI/Icon';

export default function Index({ services }) {
    const handleDelete = (id) => { if (confirm('Are you sure?')) router.delete(route('admin.services.destroy', id)); };

    return (
        <AdminLayout title="Services">
            <PageHeader title="Services" description="Manage services shown on the homepage." actionHref={route('admin.services.create')} actionLabel="Add Service" />
            {services.length === 0 ? (
                <EmptyState icon="layers" title="No services yet" actionHref={route('admin.services.create')} />
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <div key={service.id} className="rounded-2xl border border-white/5 bg-gray-900 p-5 transition-all hover:border-white/10">
                            <div className="flex items-start justify-between">
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Icon name={service.icon || 'layers'} className="h-5 w-5" />
                                </span>
                                <div className="flex items-center gap-2">
                                    <Link href={route('admin.services.edit', service.id)} className="text-gray-100 hover:text-white"><Icon name="edit" className="h-4 w-4" /></Link>
                                    <button onClick={() => handleDelete(service.id)} className="text-gray-100 hover:text-red-400"><Icon name="trash" className="h-4 w-4" /></button>
                                </div>
                            </div>
                            <h3 className="mt-3 font-semibold">{service.title}</h3>
                            {service.description && <p className="mt-1 text-sm text-gray-100 line-clamp-2">{service.description}</p>}
                            <div className="mt-3"><StatusBadge status={service.is_active ? 'active' : 'inactive'} label={service.is_active ? 'Active' : 'Inactive'} /></div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
