import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import { FormInput, FormTextarea, FormSwitch, FormCard, IconSelect } from '@/Components/Admin/FormField';

export default function Edit({ category, planCount }) {
    const form = useForm({
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        icon: category.icon || 'layers',
        is_active: category.is_active,
        sort_order: category.sort_order,
    });

    const submit = (e) => {
        e.preventDefault();
        form.put(route('admin.plan-categories.update', category.id));
    };

    return (
        <AdminLayout title={`Edit Category — ${category.name}`}>
            <PageHeader title={`Edit ${category.name}`} actionHref={route('admin.plan-categories.index')} actionLabel="Back" />
            <form onSubmit={submit} className="max-w-3xl space-y-6">
                <FormCard title="Category Details">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput label="Category Name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} error={form.errors.name} required />
                        <FormInput
                            label="Slug"
                            value={form.data.slug}
                            disabled
                            description="Locked — plans are linked to the category by this slug."
                            className="opacity-70"
                        />
                        <IconSelect label="Icon" value={form.data.icon} onChange={(val) => form.setData('icon', val || 'layers')} error={form.errors.icon} />
                        <FormInput label="Sort Order" type="number" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} error={form.errors.sort_order} />
                        <div className="sm:col-span-2">
                            <FormTextarea label="Description" value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} error={form.errors.description} rows={3} />
                        </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-6">
                        <FormSwitch label="Active" checked={form.data.is_active} onChange={(val) => form.setData('is_active', val)} />
                    </div>
                </FormCard>

                {planCount > 0 && (
                    <p className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-400">
                        {planCount} plan{planCount === 1 ? '' : 's'} currently use this category. Deactivating it will hide those plans from the packages page tabs.
                    </p>
                )}

                <button type="submit" disabled={form.processing} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50">
                    {form.processing ? 'Saving...' : 'Update Category'}
                </button>
            </form>
        </AdminLayout>
    );
}
