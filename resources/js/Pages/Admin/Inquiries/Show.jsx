import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusBadge from '@/Components/Admin/StatusBadge';
import Icon from '@/Components/UI/Icon';
import { cn } from '@/Utils/cn';

const statusOptions = [
    { value: 'new', label: 'New', color: 'bg-blue-500' },
    { value: 'read', label: 'Read', color: 'bg-gray-400' },
    { value: 'in_progress', label: 'In Progress', color: 'bg-amber-500' },
    { value: 'resolved', label: 'Resolved', color: 'bg-emerald-500' },
    { value: 'archived', label: 'Archived', color: 'bg-gray-600' },
];

function DarkCard({ title, children, className }) {
    return (
        <div className={cn('rounded-2xl border border-white/5 bg-gray-900 p-6', className)}>
            {title && <h3 className="mb-5 text-lg font-semibold">{title}</h3>}
            {children}
        </div>
    );
}

function InfoRow({ icon, label, value, href }) {
    const content = href ? (
        <a
            href={href}
            className="text-sm font-medium text-primary hover:underline"
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
        >
            {value}
        </a>
    ) : (
        <p className="text-sm font-medium">{value}</p>
    );

    return (
        <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                <Icon name={icon} className="h-4 w-4 text-gray-200" />
            </span>
            <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-200">{label}</p>
                <div className="mt-0.5">{content}</div>
            </div>
        </div>
    );
}

export default function Show({ inquiry }) {
    const form = useForm({ status: inquiry.status });

    const submitStatus = (e) => {
        e.preventDefault();
        form.post(route('admin.inquiries.status', inquiry.id), { preserveScroll: true });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this inquiry? This action cannot be undone.')) {
            router.delete(route('admin.inquiries.destroy', inquiry.id));
        }
    };

    const phoneDigits = inquiry.phone?.replace(/[^+\d]/g, '') ?? '';
    const emailHref = inquiry.email ? `mailto:${inquiry.email}` : null;
    const phoneHref = inquiry.phone ? `tel:${phoneDigits}` : null;

    return (
        <AdminLayout title={`Inquiry — ${inquiry.name}`}>
            <PageHeader
                title={`Inquiry from ${inquiry.name}`}
                description={`Received on ${new Date(inquiry.created_at).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`}
                actionHref={route('admin.inquiries.index')}
                actionLabel="Back to Inquiries"
            />

            <div className="grid gap-6 xl:grid-cols-3">
                {/* Left column — Contact info + Message */}
                <div className="space-y-6 xl:col-span-2">
                    {/* Contact details */}
                    <DarkCard title="Contact Details">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <InfoRow icon="user" label="Name" value={inquiry.name} />
                            <InfoRow icon="mail" label="Email" value={inquiry.email} href={emailHref} />
                            <InfoRow icon="phone" label="Phone" value={inquiry.phone || '—'} href={phoneHref} />
                            <InfoRow icon="tag" label="Subject" value={inquiry.subject || '—'} />
                        </div>

                        {/* Quick action buttons */}
                        {(emailHref || phoneHref) && (
                            <div className="mt-5 flex flex-wrap gap-3 border-t border-white/5 pt-5">
                                {phoneHref && (
                                    <a
                                        href={phoneHref}
                                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-100 transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
                                    >
                                        <Icon name="phone" className="h-4 w-4" />
                                        Call {inquiry.name.split(' ')[0]}
                                    </a>
                                )}
                                {emailHref && (
                                    <a
                                        href={emailHref}
                                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-100 transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
                                    >
                                        <Icon name="mail" className="h-4 w-4" />
                                        Email {inquiry.name.split(' ')[0]}
                                    </a>
                                )}
                            </div>
                        )}
                    </DarkCard>

                    {/* Message */}
                    <DarkCard title="Message">
                        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
                            <div className="flex items-start gap-3">
                                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                    <Icon name="chat" className="h-4 w-4 text-primary" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm leading-relaxed text-gray-100 whitespace-pre-wrap">
                                        {inquiry.message}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Source & timestamps */}
                        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-white/5 pt-4 text-xs text-gray-200">
                            <span className="inline-flex items-center gap-1.5">
                                <Icon name="globe" className="h-3.5 w-3.5" />
                                Source: <span className="font-medium capitalize text-gray-100">{inquiry.source}</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Icon name="clock" className="h-3.5 w-3.5" />
                                Submitted: <span className="font-medium text-gray-100">{new Date(inquiry.created_at).toLocaleString()}</span>
                            </span>
                            {inquiry.updated_at !== inquiry.created_at && (
                                <span className="inline-flex items-center gap-1.5">
                                    <Icon name="refresh" className="h-3.5 w-3.5" />
                                    Updated: <span className="font-medium text-gray-100">{new Date(inquiry.updated_at).toLocaleString()}</span>
                                </span>
                            )}
                        </div>
                    </DarkCard>
                </div>

                {/* Right column — Status & Actions */}
                <div className="space-y-6">
                    {/* Current status */}
                    <DarkCard title="Status">
                        <div className="mb-5 flex items-center gap-3">
                            <StatusBadge status={inquiry.status} />
                            <span className="text-sm text-gray-100 capitalize">{inquiry.status.replace('_', ' ')}</span>
                        </div>

                        {/* Status timeline */}
                        <div className="space-y-2">
                            {statusOptions.map((opt) => (
                                <div
                                    key={opt.value}
                                    className={cn(
                                        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors',
                                        inquiry.status === opt.value
                                            ? 'bg-primary/10 text-primary font-medium'
                                            : 'text-gray-200',
                                    )}
                                >
                                    <span className={cn('h-2.5 w-2.5 rounded-full', opt.color, inquiry.status !== opt.value && 'opacity-40')} />
                                    {opt.label}
                                    {inquiry.status === opt.value && (
                                        <Icon name="check" className="ml-auto h-4 w-4" />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Update form */}
                        <form onSubmit={submitStatus} className="mt-5 border-t border-white/5 pt-5">
                            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-200">
                                Change Status
                            </label>
                            <div className="flex gap-2">
                                <select
                                    value={form.data.status}
                                    onChange={(e) => form.setData('status', e.target.value)}
                                    className="block flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-100 transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                                >
                                    {statusOptions.map((o) => (
                                        <option key={o.value} value={o.value} className="bg-gray-900 text-gray-100">
                                            {o.label}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="submit"
                                    disabled={form.processing || form.data.status === inquiry.status}
                                    className="inline-flex shrink-0 items-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
                                >
                                    {form.processing ? (
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    ) : (
                                        'Save'
                                    )}
                                </button>
                            </div>
                        </form>
                    </DarkCard>

                    {/* Danger zone */}
                    <DarkCard title="Danger Zone">
                        <p className="mb-4 text-sm text-gray-200">
                            Permanently delete this inquiry. This action cannot be undone.
                        </p>
                        <button
                            onClick={handleDelete}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20 hover:text-red-300"
                        >
                            <Icon name="trash" className="h-4 w-4" />
                            Delete Inquiry
                        </button>
                    </DarkCard>
                </div>
            </div>
        </AdminLayout>
    );
}
