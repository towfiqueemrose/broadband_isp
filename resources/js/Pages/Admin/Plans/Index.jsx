import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusBadge from '@/Components/Admin/StatusBadge';
import EmptyState from '@/Components/Admin/EmptyState';
import Icon from '@/Components/UI/Icon';
import { formatPrice } from '@/Utils/format';

export default function Index({ plans, currentType, categories }) {
    const handleDelete = (id) => { if (confirm('Are you sure?')) router.delete(route('admin.plans.destroy', id)); };

    const types = [
        { value: 'all', label: 'All Plans' },
        ...Object.entries(categories).map(([value, cat]) => ({ value, label: cat.label ?? value })),
    ];

    return (
        <AdminLayout title="Internet Plans">
            <PageHeader title="Internet Plans" description="Manage all internet packages and plans." actionHref={route('admin.plans.create')} actionLabel="Add Plan" />

            {/* Type filter */}
            <div className="mb-6 flex flex-wrap gap-2">
                {types.map((type) => (
                    <Link
                        key={type.value}
                        href={route('admin.plans.index', type.value !== 'all' ? { type: type.value } : {})}
                        className={`inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                            currentType === type.value
                                ? 'bg-primary text-white'
                                : 'bg-white/5 text-gray-100 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        {type.label}
                    </Link>
                ))}
            </div>

            {plans.length === 0 ? (
                <EmptyState icon="bolt" title="No plans yet" description="Create your first internet plan." actionHref={route('admin.plans.create')} />
            ) : (
                <div className="overflow-hidden rounded-2xl border border-white/5">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5 bg-gray-900">
                                <th className="px-4 py-3 text-left font-medium text-gray-100">Plan</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-100 hidden sm:table-cell">Type</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-100">Speed</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-100">Price</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-100 hidden md:table-cell">Featured</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-100">Status</th>
                                <th className="px-4 py-3 text-right font-medium text-gray-100">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {plans.map((plan) => (
                                <tr key={plan.id} className="hover:bg-white/[0.02]">
                                    <td className="px-4 py-3">
                                        <div className="font-medium">{plan.name}</div>
                                        {plan.badge && <span className="text-xs text-primary">{plan.badge}</span>}
                                    </td>
                                    <td className="px-4 py-3 text-gray-100 hidden sm:table-cell capitalize">{plan.type}</td>
                                    <td className="px-4 py-3">
                                        <span className="font-semibold text-primary">{plan.download_mbps}</span>
                                        <span className="text-gray-200"> Mbps</span>
                                    </td>
                                    <td className="px-4 py-3 font-semibold">{formatPrice(plan.price_monthly)}<span className="text-gray-200 text-xs">/mo</span></td>
                                    <td className="px-4 py-3 hidden md:table-cell">
                                        {plan.is_featured ? <StatusBadge status="active" label="Featured" /> : <span className="text-gray-200">—</span>}
                                    </td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={plan.is_active ? 'active' : 'inactive'} label={plan.is_active ? 'Active' : 'Inactive'} />
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={route('admin.plans.edit', plan.id)} className="text-gray-100 hover:text-white"><Icon name="edit" className="h-4 w-4" /></Link>
                                            <button onClick={() => handleDelete(plan.id)} className="text-gray-100 hover:text-red-400"><Icon name="trash" className="h-4 w-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </AdminLayout>
    );
}
