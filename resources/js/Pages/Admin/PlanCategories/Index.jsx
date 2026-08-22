import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusBadge from '@/Components/Admin/StatusBadge';
import EmptyState from '@/Components/Admin/EmptyState';
import Icon from '@/Components/UI/Icon';

export default function Index({ categories, usageCounts }) {
    const handleDelete = (category) => {
        if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
            router.delete(route('admin.plan-categories.destroy', category.id));
        }
    };

    return (
        <AdminLayout title="Package Categories">
            <PageHeader
                title="Package Categories"
                description="Group your internet plans into categories shown as tabs on the packages page."
                actionHref={route('admin.plan-categories.create')}
                actionLabel="Add Category"
            />

            {categories.length === 0 ? (
                <EmptyState icon="layers" title="No categories yet" description="Create your first package category." actionHref={route('admin.plan-categories.create')} />
            ) : (
                <div className="overflow-hidden rounded-2xl border border-white/5">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5 bg-gray-900">
                                <th className="px-4 py-3 text-left font-medium text-gray-100">Category</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-100 hidden md:table-cell">Slug</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-100 hidden sm:table-cell">Plans</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-100 hidden lg:table-cell">Sort</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-100">Status</th>
                                <th className="px-4 py-3 text-right font-medium text-gray-100">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-white/[0.02]">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <Icon name={category.icon || 'layers'} className="h-4 w-4" />
                                            </span>
                                            <div>
                                                <div className="font-medium">{category.name}</div>
                                                {category.description && (
                                                    <div className="max-w-xs truncate text-xs text-gray-200">{category.description}</div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 hidden md:table-cell">
                                        <code className="rounded-lg bg-white/5 px-2 py-1 text-xs text-primary">{category.slug}</code>
                                    </td>
                                    <td className="px-4 py-3 hidden sm:table-cell">{usageCounts[category.slug] ?? 0}</td>
                                    <td className="px-4 py-3 hidden lg:table-cell">{category.sort_order}</td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={category.is_active ? 'active' : 'inactive'} label={category.is_active ? 'Active' : 'Inactive'} />
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={route('admin.plan-categories.edit', category.id)} className="text-gray-100 hover:text-white"><Icon name="edit" className="h-4 w-4" /></Link>
                                            <button onClick={() => handleDelete(category)} className="text-gray-100 hover:text-red-400" title={(usageCounts[category.slug] ?? 0) > 0 ? 'Category has plans — deletion is blocked' : undefined}><Icon name="trash" className="h-4 w-4" /></button>
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
