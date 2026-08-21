import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusBadge from '@/Components/Admin/StatusBadge';
import { FormSelect, FormCard } from '@/Components/Admin/FormField';

export default function Show({ inquiry }) {
    const form = useForm({ status: inquiry.status });
    const submit = (e) => {
        e.preventDefault();
        form.post(route('admin.inquiries.status', inquiry.id), { preserveScroll: true });
    };

    return (
        <AdminLayout title={`Inquiry — ${inquiry.name}`}>
            <PageHeader title={`Inquiry from ${inquiry.name}`} actionHref={route('admin.inquiries.index')} actionLabel="Back to Inquiries" />

            <div className="max-w-3xl space-y-6">
                <FormCard>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div><p className="text-xs text-gray-200">Name</p><p className="font-medium">{inquiry.name}</p></div>
                        <div><p className="text-xs text-gray-200">Email</p><p className="font-medium">{inquiry.email}</p></div>
                        <div><p className="text-xs text-gray-200">Phone</p><p className="font-medium">{inquiry.phone}</p></div>
                        <div><p className="text-xs text-gray-200">Date</p><p className="font-medium">{new Date(inquiry.created_at).toLocaleString()}</p></div>
                        <div className="sm:col-span-2"><p className="text-xs text-gray-200">Subject</p><p className="font-medium">{inquiry.subject}</p></div>
                        <div className="sm:col-span-2"><p className="text-xs text-gray-200">Message</p><p className="mt-1 whitespace-pre-wrap text-sm text-gray-100">{inquiry.message}</p></div>
                    </div>
                </FormCard>

                <FormCard title="Update Status">
                    <form onSubmit={submit} className="flex items-center gap-4">
                        <FormSelect value={form.data.status} onChange={(e) => form.setData('status', e.target.value)} options={[
                            { value: 'new', label: 'New' },
                            { value: 'read', label: 'Read' },
                            { value: 'in_progress', label: 'In Progress' },
                            { value: 'resolved', label: 'Resolved' },
                            { value: 'archived', label: 'Archived' },
                        ]} />
                        <button type="submit" disabled={form.processing} className="inline-flex items-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50">
                            {form.processing ? 'Saving...' : 'Update'}
                        </button>
                    </form>
                </FormCard>
            </div>
        </AdminLayout>
    );
}
