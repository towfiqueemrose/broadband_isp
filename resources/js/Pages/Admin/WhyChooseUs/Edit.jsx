import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import { FormInput, FormTextarea, FormSwitch, FormCard, IconSelect } from '@/Components/Admin/FormField';

export default function Edit({ item }) {
    const form = useForm({ icon: item.icon || '', title: item.title, description: item.description || '', is_active: item.is_active, sort_order: item.sort_order });

    const submit = (e) => { e.preventDefault(); form.put(route('admin.why-choose-us.update', item.id)); };

    return (
        <AdminLayout title="Edit Why Choose Us Item">
            <PageHeader title="Edit Item" actionHref={route('admin.why-choose-us.index')} actionLabel="Back" />
            <form onSubmit={submit} className="max-w-3xl space-y-6">
                <FormCard title="Item Details">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <IconSelect label="Icon" value={form.data.icon} onChange={(val) => form.setData('icon', val)} error={form.errors.icon} />
                        <FormInput label="Sort Order" type="number" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} />
                        <div className="sm:col-span-2"><FormInput label="Title" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} error={form.errors.title} required /></div>
                        <div className="sm:col-span-2"><FormTextarea label="Description" value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} rows={3} /></div>
                    </div>
                    <div className="mt-4"><FormSwitch label="Active" checked={form.data.is_active} onChange={(val) => form.setData('is_active', val)} /></div>
                </FormCard>
                <button type="submit" disabled={form.processing} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50">
                    {form.processing ? 'Saving...' : 'Update Item'}
                </button>
            </form>
        </AdminLayout>
    );
}
