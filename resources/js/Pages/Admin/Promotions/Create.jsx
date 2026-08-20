import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import { FormInput, FormTextarea, FormSwitch, FormCard } from '@/Components/Admin/FormField';

export default function Create() {
    const form = useForm({
        eyebrow: '', title: '', description: '', details: [],
        cta_label: '', cta_url: '', image: null,
        display_location: 'homepage', start_date: '', end_date: '',
        is_active: true, sort_order: 0, _detailsText: '',
    });
    const submit = (e) => {
        e.preventDefault();
        const data = { ...form.data };
        if (data._detailsText) {
            data.details = data._detailsText.split('\n').filter(d => d.trim());
        }
        delete data._detailsText;
        form.post(route('admin.promotions.store'), { data, forceFormData: true });
    };
    return (
        <AdminLayout title="Create Promotion">
            <PageHeader title="Create Promotion" actionHref={route('admin.promotions.index')} actionLabel="Back" />
            <form onSubmit={submit} encType="multipart/form-data" className="max-w-3xl space-y-6">
                <FormCard title="Promotion Content">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput label="Eyebrow" value={form.data.eyebrow} onChange={(e) => form.setData('eyebrow', e.target.value)} placeholder="Limited-time offer" />
                        <FormInput label="Display Location" value={form.data.display_location} onChange={(e) => form.setData('display_location', e.target.value)} />
                        <div className="sm:col-span-2"><FormInput label="Title" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} error={form.errors.title} required /></div>
                        <div className="sm:col-span-2"><FormTextarea label="Description" value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} rows={3} /></div>
                        <div className="sm:col-span-2"><FormTextarea label="Details (one per line)" value={form.data._detailsText} onChange={(e) => form.setData('_detailsText', e.target.value)} rows={4} placeholder="Free installation&#10;Free WiFi router" /></div>
                    </div>
                </FormCard>
                <FormCard title="CTA & Dates">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput label="CTA Label" value={form.data.cta_label} onChange={(e) => form.setData('cta_label', e.target.value)} />
                        <FormInput label="CTA URL" value={form.data.cta_url} onChange={(e) => form.setData('cta_url', e.target.value)} />
                        <FormInput label="Start Date" type="date" value={form.data.start_date} onChange={(e) => form.setData('start_date', e.target.value)} />
                        <FormInput label="End Date" type="date" value={form.data.end_date} onChange={(e) => form.setData('end_date', e.target.value)} />
                        <FormInput label="Sort Order" type="number" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} />
                        <div className="flex items-end"><FormSwitch label="Active" checked={form.data.is_active} onChange={(val) => form.setData('is_active', val)} /></div>
                    </div>
                </FormCard>
                <button type="submit" disabled={form.processing} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50">
                    {form.processing ? 'Saving...' : 'Create Promotion'}
                </button>
            </form>
        </AdminLayout>
    );
}
