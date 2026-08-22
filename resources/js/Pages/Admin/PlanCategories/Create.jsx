import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import SlugInput from '@/Components/Admin/SlugInput';
import { FormInput, FormTextarea, FormSwitch, FormCard, IconSelect } from '@/Components/Admin/FormField';

export default function Create() {
    const form = useForm({
        name: '', slug: '', description: '', icon: 'layers',
        is_active: true, sort_order: 0,
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('admin.plan-categories.store'));
    };

    return (
        <AdminLayout title="Create Package Category">
            <PageHeader title="Create Category" description="Add a new category for grouping packages." actionHref={route('admin.plan-categories.index')} actionLabel="Back" />
            <form onSubmit={submit} className="max-w-3xl space-y-6">
                <FormCard title="Category Details">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput label="Category Name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} error={form.errors.name} required placeholder="Home Internet" />
                        <SlugInput source={form.data.name} value={form.data.slug} onChange={(v) => form.setData('slug', v)} error={form.errors.slug} hint="Plans are linked to the category by this slug." />
                        <IconSelect label="Icon" value={form.data.icon} onChange={(val) => form.setData('icon', val || 'layers')} error={form.errors.icon} />
                        <FormInput label="Sort Order" type="number" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} error={form.errors.sort_order} />
                        <div className="sm:col-span-2">
                            <FormTextarea label="Description" value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} error={form.errors.description} rows={3} placeholder="Shown under the category tab on the packages page." />
                        </div>
                    </div>
                    <div className="mt-4"><FormSwitch label="Active" checked={form.data.is_active} onChange={(val) => form.setData('is_active', val)} /></div>
                </FormCard>
                <button type="submit" disabled={form.processing} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50">
                    {form.processing ? 'Saving...' : 'Create Category'}
                </button>
            </form>
        </AdminLayout>
    );
}
