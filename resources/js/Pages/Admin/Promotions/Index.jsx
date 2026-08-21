import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusBadge from '@/Components/Admin/StatusBadge';
import EmptyState from '@/Components/Admin/EmptyState';
import Icon from '@/Components/UI/Icon';

export default function Index({ promotions }) {
    const handleDelete = (id) => { if (confirm('Are you sure?')) router.delete(route('admin.promotions.destroy', id)); };
    return (
        <AdminLayout title="Promotions">
            <PageHeader title="Promotions" description="Manage promotional offers and banners." actionHref={route('admin.promotions.create')} actionLabel="Add Promotion" />
            {promotions.length === 0 ? (
                <EmptyState icon="gift" title="No promotions yet" actionHref={route('admin.promotions.create')} />
            ) : (
                <div className="space-y-3">
                    {promotions.map((promo) => (
                        <div key={promo.id} className="rounded-2xl border border-white/5 bg-gray-900 p-4 transition-all hover:border-white/10">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-medium">{promo.title}</h3>
                                        <StatusBadge status={promo.is_active ? 'active' : 'inactive'} />
                                    </div>
                                    {promo.eyebrow && <p className="text-xs text-primary mt-1">{promo.eyebrow}</p>}
                                    {promo.description && <p className="text-sm text-gray-100 line-clamp-2 mt-1">{promo.description}</p>}
                                    <p className="text-xs text-gray-200 mt-2">Location: {promo.display_location}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link href={route('admin.promotions.edit', promo.id)} className="text-gray-100 hover:text-white"><Icon name="edit" className="h-4 w-4" /></Link>
                                    <button onClick={() => handleDelete(promo.id)} className="text-gray-100 hover:text-red-400"><Icon name="trash" className="h-4 w-4" /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
