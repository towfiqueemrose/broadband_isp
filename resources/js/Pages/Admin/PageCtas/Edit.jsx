import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import { FormInput, FormTextarea, FormSelect, FormSwitch, FormCard } from '@/Components/Admin/FormField';
export default function Edit({ cta }) {
    const form = useForm({ eyebrow: cta.eyebrow || '', title: cta.title, description: cta.description || '', primary_label: cta.primary_label || '', primary_url: cta.primary_url || '', secondary_label: cta.secondary_label || '', secondary_url: cta.secondary_url || '', bg_style: cta.bg_style, is_active: cta.is_active });
    const submit = (e) => { e.preventDefault(); form.put(route('admin.page-ctas.update', cta.id)); };
    return (
        <AdminLayout title={`Edit CTA — ${cta.slug}`}>
            <PageHeader title={`Edit CTA: ${cta.title}`} description={`Slug: ${cta.slug}`} actionHref={route('admin.page-ctas.index')} actionLabel="Back" />
            <form onSubmit={submit} className="max-w-3xl space-y-6">
                <FormCard>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput label="Eyebrow" value={form.data.eyebrow} onChange={(e) => form.setData('eyebrow', e.target.value)} />
                        <FormSelect label="Background Style" value={form.data.bg_style} onChange={(e) => form.setData('bg_style', e.target.value)} options={[{ value: 'primary', label: 'Primary' }, { value: 'dark', label: 'Dark' }, { value: 'gradient', label: 'Gradient' }]} />
                        <div className="sm:col-span-2"><FormInput label="Title" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} required /></div>
                        <div className="sm:col-span-2"><FormTextarea label="Description" value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} rows={3} /></div>
                        <FormInput label="Primary Button Label" value={form.data.primary_label} onChange={(e) => form.setData('primary_label', e.target.value)} />
                        <FormInput label="Primary Button URL" value={form.data.primary_url} onChange={(e) => form.setData('primary_url', e.target.value)} />
                        <FormInput label="Secondary Button Label" value={form.data.secondary_label} onChange={(e) => form.setData('secondary_label', e.target.value)} />
                        <FormInput label="Secondary Button URL" value={form.data.secondary_url} onChange={(e) => form.setData('secondary_url', e.target.value)} />
                    </div>
                    <div className="mt-4"><FormSwitch label="Active" checked={form.data.is_active} onChange={(val) => form.setData('is_active', val)} /></div>
                </FormCard>
                <button type="submit" disabled={form.processing} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50">{form.processing ? 'Saving...' : 'Update'}</button>
            </form>
        </AdminLayout>
    );
}
