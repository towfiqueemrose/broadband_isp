import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusBadge from '@/Components/Admin/StatusBadge';
import EmptyState from '@/Components/Admin/EmptyState';

export default function Index({ inquiries, currentStatus }) {
    const handleDelete = (id) => { if (confirm('Are you sure?')) router.delete(route('admin.inquiries.destroy', id)); };

    const statuses = [
        { value: 'all', label: 'All' },
        { value: 'new', label: 'New' },
        { value: 'read', label: 'Read' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'resolved', label: 'Resolved' },
        { value: 'archived', label: 'Archived' },
    ];

    return (
        <AdminLayout title="Contact Inquiries">
            <PageHeader title="Contact Inquiries" description="Manage messages from the contact form." />

            <div className="mb-6 flex flex-wrap gap-2">
                {statuses.map((s) => (
                    <Link key={s.value} href={route('admin.inquiries.index', s.value !== 'all' ? { status: s.value } : {})} className={`inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-all ${currentStatus === s.value ? 'bg-primary text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}>
                        {s.label}
                    </Link>
                ))}
            </div>

            {inquiries.length === 0 ? (
                <EmptyState icon="chat" title="No inquiries" description="Contact form submissions will appear here." />
            ) : (
                <div className="space-y-3">
                    {inquiries.map((inquiry) => (
                        <div key={inquiry.id} className={`rounded-2xl border bg-gray-900 p-4 transition-all hover:border-white/10 ${inquiry.status === 'new' ? 'border-primary/30' : 'border-white/5'}`}>
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <Link href={route('admin.inquiries.show', inquiry.id)} className="font-medium hover:text-primary transition-colors">{inquiry.name}</Link>
                                        <StatusBadge status={inquiry.status} />
                                    </div>
                                    <p className="mt-1 text-sm text-gray-400">{inquiry.email} • {inquiry.phone}</p>
                                    <p className="mt-1 text-sm font-medium">{inquiry.subject}</p>
                                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{inquiry.message}</p>
                                    <p className="mt-2 text-xs text-gray-600">{new Date(inquiry.created_at).toLocaleString()}</p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <Link href={route('admin.inquiries.show', inquiry.id)} className="inline-flex items-center rounded-xl bg-white/5 px-3 py-2 text-xs font-medium text-gray-300 hover:bg-white/10">View</Link>
                                    <button onClick={() => handleDelete(inquiry.id)} className="text-gray-400 hover:text-red-400">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
