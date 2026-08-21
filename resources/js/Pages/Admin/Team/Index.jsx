import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusBadge from '@/Components/Admin/StatusBadge';
import EmptyState from '@/Components/Admin/EmptyState';
import Icon from '@/Components/UI/Icon';

export default function Index({ members, currentType }) {
    const handleDelete = (id) => { if (confirm('Are you sure?')) router.delete(route('admin.team.destroy', id)); };

    const types = [
        { value: 'all', label: 'All' },
        { value: 'leadership', label: 'Leadership' },
        { value: 'general', label: 'General' },
        { value: 'sales', label: 'Sales Team' },
    ];

    return (
        <AdminLayout title="Team Members">
            <PageHeader title="Team Members" description="Manage leadership, general, and sales team members." actionHref={route('admin.team.create')} actionLabel="Add Member" />

            <div className="mb-6 flex flex-wrap gap-2">
                {types.map((type) => (
                    <Link key={type.value} href={route('admin.team.index', type.value !== 'all' ? { type: type.value } : {})} className={`inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-all ${currentType === type.value ? 'bg-primary text-white' : 'bg-white/5 text-gray-100 hover:bg-white/10 hover:text-white'}`}>
                        {type.label}
                    </Link>
                ))}
            </div>

            {members.length === 0 ? (
                <EmptyState icon="users" title="No team members yet" actionHref={route('admin.team.create')} />
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {members.map((member) => (
                        <div key={member.id} className="rounded-2xl border border-white/5 bg-gray-900 p-5 transition-all hover:border-white/10">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                                        {member.name.split(' ').map(p => p[0]).slice(0, 2).join('')}
                                    </div>
                                    <div>
                                        <h3 className="font-medium">{member.name}</h3>
                                        <p className="text-sm text-gray-100">{member.designation}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link href={route('admin.team.edit', member.id)} className="text-gray-100 hover:text-white"><Icon name="edit" className="h-4 w-4" /></Link>
                                    <button onClick={() => handleDelete(member.id)} className="text-gray-100 hover:text-red-400"><Icon name="trash" className="h-4 w-4" /></button>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                                <StatusBadge status={member.is_active ? 'active' : 'inactive'} />
                                <span className="inline-flex rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-gray-100 capitalize">{member.team_type}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
