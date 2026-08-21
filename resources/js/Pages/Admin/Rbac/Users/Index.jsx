import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import EmptyState from '@/Components/Admin/EmptyState';
import Icon from '@/Components/UI/Icon';

export default function UsersIndex({ users, currentUserId }) {
    const handleDelete = (user) => {
        if (confirm(`Delete "${user.name}"? This cannot be undone.`)) {
            router.delete(route('admin.users.destroy', user.id), { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="Users">
            <PageHeader
                title="Users"
                description="Manage staff accounts and assign their roles."
                actionHref={route('admin.users.create')}
                actionLabel="Add User"
            />

            {users.length === 0 ? (
                <EmptyState icon="users" title="No users yet" description="Create your first user." actionHref={route('admin.users.create')} />
            ) : (
                <div className="overflow-hidden rounded-2xl border border-white/5">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5 bg-gray-900">
                                <th className="px-4 py-3 text-left font-medium text-gray-100">User</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-100 hidden sm:table-cell">Email</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-100">Role</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-100 hidden md:table-cell">Joined</th>
                                <th className="px-4 py-3 text-right font-medium text-gray-100">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-white/[0.02]">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                                                {user.name?.charAt(0).toUpperCase()}
                                            </span>
                                            <span className="font-medium">
                                                {user.name}
                                                {user.id === currentUserId && (
                                                    <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-gray-100">You</span>
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 hidden text-gray-100 sm:table-cell">{user.email}</td>
                                    <td className="px-4 py-3">
                                        {user.role ? (
                                            <span className={user.role.is_system
                                                ? 'inline-flex items-center rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary'
                                                : 'inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-gray-100'}
                                            >
                                                {user.role.label}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-gray-200">No access</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 hidden text-gray-200 md:table-cell">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        {user.id === currentUserId ? (
                                            <span className="text-xs text-gray-200">—</span>
                                        ) : (
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={route('admin.users.edit', user.id)} className="text-gray-100 hover:text-white"><Icon name="edit" className="h-4 w-4" /></Link>
                                                <button onClick={() => handleDelete(user)} className="text-gray-100 hover:text-red-400"><Icon name="trash" className="h-4 w-4" /></button>
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
