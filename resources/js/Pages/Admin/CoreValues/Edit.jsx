import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import { FormInput, FormTextarea, FormSwitch, FormCard } from '@/Components/Admin/FormField';
export default function Edit({ value }) {
    const form = useForm({ icon: value.icon || '', title: value.title, description: value.description || '', is_active: value.is_active, sort_order: value.sort_order });
    const submit = (e) => { e.preventDefault(); form.put(route('admin.core-values.update', value.id)); };
    return (
        <AdminLayout title="Edit Core Value">
            <PageHeader title="Edit Core Value" actionHref={route('admin.core-values.index')} actionLabel="Back" />
            <form onSubmit={submit} className="max-w-3xl space-y-6">
                <FormCard>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput label="Icon" value={form.data.icon} onChange={(e) => form.setData('icon', e.target.value)} error={form.errors.icon} />
                        <FormInput label="Sort Order" type="number" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} />
                        <div className="sm:col-span-2"><FormInput label="Title" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} error={form.errors.title} required /></div>
                        <div className="sm:col-span-2"><FormTextarea label="Description" value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} rows={3} /></div>
                    </div>
                    <div className="mt-4"><FormSwitch label="Active" checked={form.data.is_active} onChange={(val) => form.setData('is_active', val)} /></div>
                </FormCard>
                <button type="submit" disabled={form.processing} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50">{form.processing ? 'Saving...' : 'Update'}</button>
            </form>
        </AdminLayout>
    );
}
