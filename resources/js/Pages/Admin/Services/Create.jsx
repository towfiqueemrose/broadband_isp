import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import SlugInput from '@/Components/Admin/SlugInput';
import { FormInput, FormTextarea, FormSwitch, FormCard } from '@/Components/Admin/FormField';

export default function Create() {
    const form = useForm({ icon: 'layers', title: '', slug: '', description: '', link_url: '', is_active: true, sort_order: 0 });

    const submit = (e) => { e.preventDefault(); form.post(route('admin.services.store')); };

    return (
        <AdminLayout title="Create Service">
            <PageHeader title="Create Service" actionHref={route('admin.services.index')} actionLabel="Back" />
            <form onSubmit={submit} className="max-w-3xl space-y-6">
                <FormCard title="Service Details">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput label="Icon" value={form.data.icon} onChange={(e) => form.setData('icon', e.target.value)} error={form.errors.icon} />
                        <FormInput label="Sort Order" type="number" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} />
                        <div className="sm:col-span-2"><FormInput label="Title" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} error={form.errors.title} required /></div>
                        <div className="sm:col-span-2"><SlugInput source={form.data.title} value={form.data.slug} onChange={(v) => form.setData('slug', v)} error={form.errors.slug}  /></div>
                        <div className="sm:col-span-2"><FormTextarea label="Description" value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} rows={3} /></div>
                        <div className="sm:col-span-2"><FormInput label="Link URL" value={form.data.link_url} onChange={(e) => form.setData('link_url', e.target.value)} placeholder="/plans" /></div>
                    </div>
                    <div className="mt-4"><FormSwitch label="Active" checked={form.data.is_active} onChange={(val) => form.setData('is_active', val)} /></div>
                </FormCard>
                <button type="submit" disabled={form.processing} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50">
                    {form.processing ? 'Saving...' : 'Create Service'}
                </button>
            </form>
        </AdminLayout>
    );
}
