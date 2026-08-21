import { useRef, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import { FormInput, FormTextarea, FormSwitch, FormCard } from '@/Components/Admin/FormField';
import RichTextEditor from '@/Components/Editor/RichTextEditor';

export default function Edit({ page }) {
    const contentRef = useRef(page.content || '');
    const { errors } = usePage().props;

    const [data, setData] = useState({
        title: page.title,
        meta_title: page.meta_title || '',
        meta_description: page.meta_description || '',
        is_active: !!page.is_active,
    });
    const [processing, setProcessing] = useState(false);

    const set = (field) => (val) => setData((prev) => ({ ...prev, [field]: val }));

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        router.put(
            route('admin.pages.update', page.id),
            { ...data, content: contentRef.current },
            {
                preserveScroll: true,
                onFinish: () => setProcessing(false),
            },
        );
    };

    return (
        <AdminLayout title={`Edit — ${page.title}`}>
            <PageHeader
                title={`Edit ${page.title}`}
                description={`Editing /${page.slug}`}
                actionHref={route('admin.pages.index')}
                actionLabel="Back to Pages"
            />

            <form onSubmit={submit} className="max-w-4xl space-y-6">
                <FormCard title="Page Content">
                    <div className="space-y-5">
                        <FormInput
                            label="Title"
                            value={data.title}
                            onChange={(e) => set('title')(e.target.value)}
                            error={errors.title}
                            required
                        />

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-900">
                                Content
                            </label>
                            <RichTextEditor
                                value={page.content || ''}
                                onChange={(html) => { contentRef.current = html; }}
                                placeholder="Write your page content here..."
                            />
                            {errors.content && (
                                <p className="mt-1.5 text-xs text-red-500">{errors.content}</p>
                            )}
                        </div>
                    </div>
                </FormCard>

                <FormCard title="SEO Settings">
                    <div className="space-y-4">
                        <FormInput
                            label="Meta Title"
                            value={data.meta_title}
                            onChange={(e) => set('meta_title')(e.target.value)}
                            error={errors.meta_title}
                            placeholder="Leave empty to use page title"
                        />
                        <FormTextarea
                            label="Meta Description"
                            value={data.meta_description}
                            onChange={(e) => set('meta_description')(e.target.value)}
                            error={errors.meta_description}
                            rows={3}
                            placeholder="Brief description for search engines"
                        />
                    </div>
                </FormCard>

                <FormCard title="Status">
                    <FormSwitch
                        label="Active"
                        description="Active pages are visible on the public website"
                        checked={data.is_active}
                        onChange={set('is_active')}
                    />
                </FormCard>

                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
                >
                    {processing ? (
                        <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Saving...
                        </>
                    ) : (
                        'Save Changes'
                    )}
                </button>
            </form>
        </AdminLayout>
    );
}
