import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusBadge from '@/Components/Admin/StatusBadge';
import Icon from '@/Components/UI/Icon';

export default function Index({ pages }) {
    return (
        <AdminLayout title="Pages">
            <PageHeader title="Pages" description="Manage dynamic legal and informational pages." />

            <div className="space-y-3">
                {pages.map((page) => (
                    <div key={page.id} className="rounded-2xl border border-white/5 bg-gray-900 p-4 transition-all hover:border-white/10">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <h3 className="font-medium">{page.title}</h3>
                                    <StatusBadge status={page.is_active ? 'active' : 'inactive'} />
                                </div>
                                <p className="mt-1 text-sm text-gray-100">/{page.slug}</p>
                                {page.meta_title && (
                                    <p className="mt-1 text-xs text-gray-200">SEO: {page.meta_title}</p>
                                )}
                                <p className="mt-1 text-xs text-gray-200">
                                    Updated {new Date(page.updated_at).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <a
                                    href={route('admin.pages.edit', page.id)}
                                    className="inline-flex items-center rounded-xl bg-white/5 px-3 py-2 text-xs font-medium text-gray-100 hover:bg-white/10"
                                >
                                    <Icon name="edit" className="mr-1.5 h-3.5 w-3.5" />
                                    Edit
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
