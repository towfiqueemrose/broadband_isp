import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusBadge from '@/Components/Admin/StatusBadge';
import EmptyState from '@/Components/Admin/EmptyState';
import Icon from '@/Components/UI/Icon';

export default function Index({ locations }) {
    const handleDelete = (id) => { if (confirm('Are you sure?')) router.delete(route('admin.locations.destroy', id)); };
    return (
        <AdminLayout title="Office Locations">
            <PageHeader title="Office Locations" description="Manage office locations and head office details." actionHref={route('admin.locations.create')} actionLabel="Add Location" />
            {locations.length === 0 ? (
                <EmptyState icon="map-pin" title="No locations yet" actionHref={route('admin.locations.create')} />
            ) : (
                <div className="space-y-3">
                    {locations.map((loc) => (
                        <div key={loc.id} className="rounded-2xl border border-white/5 bg-gray-900 p-5 transition-all hover:border-white/10">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2"><h3 className="font-medium">{loc.name}</h3><StatusBadge status={loc.is_active ? 'active' : 'inactive'} /></div>
                                    {loc.address && <p className="mt-1 text-sm text-gray-400">{loc.address}</p>}
                                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
                                        {loc.phone && <span>Phone: {loc.phone}</span>}
                                        {loc.email && <span>Email: {loc.email}</span>}
                                        {loc.business_hours && <span>Hours: {loc.business_hours}</span>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link href={route('admin.locations.edit', loc.id)} className="text-gray-400 hover:text-white"><Icon name="edit" className="h-4 w-4" /></Link>
                                    <button onClick={() => handleDelete(loc.id)} className="text-gray-400 hover:text-red-400"><Icon name="trash" className="h-4 w-4" /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
