import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import EmptyState from '@/Components/Admin/EmptyState';
import Icon from '@/Components/UI/Icon';

function RoleBadge({ isSystem }) {
    if (!isSystem) return null;
    return (
        <span className="inline-flex items-center rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
            System
        </span>
    );
}

export default function RolesIndex({ roles }) {
    const handleDelete = (role) => {
        if (confirm(`Delete the "${role.label}" role? This cannot be undone.`)) {
            router.delete(route('admin.roles.destroy', role.id), { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="Roles & Permissions">
            <PageHeader
                title="Roles & Permissions"
                description="Create roles and control which admin modules each one can access."
                actionHref={route('admin.roles.create')}
                actionLabel="Add Role"
            />

            {roles.length === 0 ? (
                <EmptyState icon="shield-check" title="No roles yet" description="Create your first role." actionHref={route('admin.roles.create')} />
            ) : (
                <div className="overflow-hidden rounded-2xl border border-white/5">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5 bg-gray-900">
                                <th className="px-4 py-3 text-left font-medium text-gray-100">Role</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-100 hidden md:table-cell">Slug</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-100">Permissions</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-100">Users</th>
                                <th className="px-4 py-3 text-right font-medium text-gray-100">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {roles.map((role) => (
                                <tr key={role.id} className="hover:bg-white/[0.02]">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2 font-medium">
                                            {role.label}
                                            <RoleBadge isSystem={role.is_system} />
                                        </div>
                                        {role.description && (
                                            <p className="mt-0.5 max-w-md truncate text-xs text-gray-200">{role.description}</p>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 hidden md:table-cell">
                                        <code className="rounded bg-white/5 px-2 py-1 text-xs text-gray-100">{role.name}</code>
                                    </td>
                                    <td className="px-4 py-3">
                                        {role.is_system ? (
                                            <span className="font-semibold text-primary">All access</span>
                                        ) : (
                                            <span>{(role.permissions ?? []).length}</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">{role.users_count}</td>
                                    <td className="px-4 py-3 text-right">
                                        {role.is_system ? (
                                            <span className="text-xs text-gray-200">Locked</span>
                                        ) : (
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={route('admin.roles.edit', role.id)} className="text-gray-100 hover:text-white"><Icon name="edit" className="h-4 w-4" /></Link>
                                                <button onClick={() => handleDelete(role)} disabled={role.users_count > 0} className="text-gray-100 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30"><Icon name="trash" className="h-4 w-4" /></button>
                                            </div>
                                        )}
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
