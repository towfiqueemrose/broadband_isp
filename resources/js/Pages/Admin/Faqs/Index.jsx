import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusBadge from '@/Components/Admin/StatusBadge';
import EmptyState from '@/Components/Admin/EmptyState';
import Icon from '@/Components/UI/Icon';

export default function Index({ faqs, currentLocation }) {
    const handleDelete = (id) => { if (confirm('Are you sure?')) router.delete(route('admin.faqs.destroy', id)); };

    const locations = [
        { value: 'all', label: 'All' },
        { value: 'homepage', label: 'Homepage' },
        { value: 'contact', label: 'Contact' },
        { value: 'packages', label: 'Packages' },
    ];

    return (
        <AdminLayout title="FAQs">
            <PageHeader title="FAQs" description="Manage frequently asked questions." actionHref={route('admin.faqs.create')} actionLabel="Add FAQ" />

            <div className="mb-6 flex flex-wrap gap-2">
                {locations.map((loc) => (
                    <Link key={loc.value} href={route('admin.faqs.index', loc.value !== 'all' ? { location: loc.value } : {})} className={`inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-all ${currentLocation === loc.value ? 'bg-primary text-white' : 'bg-white/5 text-gray-100 hover:bg-white/10 hover:text-white'}`}>
                        {loc.label}
                    </Link>
                ))}
            </div>

            {faqs.length === 0 ? (
                <EmptyState icon="document" title="No FAQs yet" actionHref={route('admin.faqs.create')} />
            ) : (
                <div className="space-y-3">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="rounded-2xl border border-white/5 bg-gray-900 p-4 transition-all hover:border-white/10">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-medium">{faq.question}</h3>
                                        <StatusBadge status={faq.is_active ? 'active' : 'inactive'} />
                                    </div>
                                    <p className="mt-1 text-sm text-gray-100 line-clamp-2">{faq.answer}</p>
                                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-200">
                                        <span className="capitalize">{faq.display_location || 'all'}</span>
                                        {faq.category && <span>• {faq.category}</span>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <Link href={route('admin.faqs.edit', faq.id)} className="text-gray-100 hover:text-white"><Icon name="edit" className="h-4 w-4" /></Link>
                                    <button onClick={() => handleDelete(faq.id)} className="text-gray-100 hover:text-red-400"><Icon name="trash" className="h-4 w-4" /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
