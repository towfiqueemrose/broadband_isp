import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusBadge from '@/Components/Admin/StatusBadge';
import EmptyState from '@/Components/Admin/EmptyState';
import Icon from '@/Components/UI/Icon';

export default function Index({ statistics }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this statistic?')) {
            router.delete(route('admin.statistics.destroy', id));
        }
    };

    return (
        <AdminLayout title="Statistics">
            <PageHeader
                title="Statistics"
                description="Manage trust statistics displayed on homepage and about page."
                actionHref={route('admin.statistics.create')}
                actionLabel="Add Statistic"
            />

            {statistics.length === 0 ? (
                <EmptyState
                    icon="signal"
                    title="No statistics yet"
                    description="Add your first statistic to get started."
                    actionHref={route('admin.statistics.create')}
                />
            ) : (
                <div className="overflow-hidden rounded-2xl border border-white/5">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5 bg-gray-900">
                                <th className="px-4 py-3 text-left font-medium text-gray-400">Label</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-400">Value</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-400 hidden sm:table-cell">Location</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-400 hidden md:table-cell">Order</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-400">Status</th>
                                <th className="px-4 py-3 text-right font-medium text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {statistics.map((stat) => (
                                <tr key={stat.id} className="hover:bg-white/[0.02]">
                                    <td className="px-4 py-3 font-medium">{stat.label}</td>
                                    <td className="px-4 py-3">
                                        <span className="text-primary font-semibold">{stat.value}{stat.suffix}</span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-400 hidden sm:table-cell capitalize">{stat.display_location}</td>
                                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{stat.sort_order}</td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={stat.is_active ? 'active' : 'inactive'} label={stat.is_active ? 'Active' : 'Inactive'} />
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={route('admin.statistics.edit', stat.id)} className="text-gray-400 hover:text-white transition-colors">
                                                <Icon name="edit" className="h-4 w-4" />
                                            </Link>
                                            <button onClick={() => handleDelete(stat.id)} className="text-gray-400 hover:text-red-400 transition-colors">
                                                <Icon name="trash" className="h-4 w-4" />
                                            </button>
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
