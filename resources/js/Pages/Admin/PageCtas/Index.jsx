import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusBadge from '@/Components/Admin/StatusBadge';
import Icon from '@/Components/UI/Icon';

export default function Index({ ctas }) {
    return (
        <AdminLayout title="Page CTAs">
            <PageHeader title="Page Call-to-Action Sections" description="Manage CTA sections at the bottom of pages." />
            <div className="space-y-3">
                {ctas.map((cta) => (
                    <div key={cta.id} className="rounded-2xl border border-white/5 bg-gray-900 p-5 transition-all hover:border-white/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-medium">{cta.title}</h3>
                                    <StatusBadge status={cta.is_active ? 'active' : 'inactive'} />
                                </div>
                                <p className="text-xs text-gray-200 mt-1">Slug: {cta.slug} • Style: {cta.bg_style}</p>
                                {cta.description && <p className="mt-1 text-sm text-gray-100 truncate max-w-lg">{cta.description}</p>}
                            </div>
                            <Link href={route('admin.page-ctas.edit', cta.id)} className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 px-3 py-2 text-xs font-medium text-gray-100 hover:bg-white/10">
                                <Icon name="edit" className="h-3.5 w-3.5" /> Edit
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
