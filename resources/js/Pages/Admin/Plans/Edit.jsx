import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import { FormInput, FormTextarea, FormSelect, FormSwitch, FormCard } from '@/Components/Admin/FormField';

export default function Edit({ plan, categories }) {
    const form = useForm({
        name: plan.name, slug: plan.slug, type: plan.type,
        download_mbps: plan.download_mbps, upload_mbps: plan.upload_mbps,
        price_monthly: plan.price_monthly, installation_fee: plan.installation_fee || '',
        original_price: plan.original_price || '', promo_price: plan.promo_price || '',
        promo_label: plan.promo_label || '', promo_description: plan.promo_description || '',
        promo_ends_at: plan.promo_ends_at || '', billing_label: plan.billing_label || 'per month',
        description: plan.description || '',
        features: Array.isArray(plan.features) ? plan.features.join('\n') : '',
        attributes: plan.attributes || {}, badge: plan.badge || '',
        is_featured: plan.is_featured, is_active: plan.is_active, sort_order: plan.sort_order,
    });

    const submit = (e) => {
        e.preventDefault();
        const data = { ...form.data };
        if (typeof data.features === 'string') {
            data.features = data.features.split('\n').filter(f => f.trim());
        }
        form.put(route('admin.plans.update', plan.id), { data });
    };

    const typeOptions = Object.entries(categories).map(([value, cat]) => ({ value, label: cat.label ?? value }));

    return (
        <AdminLayout title={`Edit Plan — ${plan.name}`}>
            <PageHeader title={`Edit ${plan.name}`} actionHref={route('admin.plans.index')} actionLabel="Back" />
            <form onSubmit={submit} className="max-w-4xl space-y-6">
                <FormCard title="Basic Info">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput label="Plan Name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} error={form.errors.name} required />
                        <FormInput label="Slug" value={form.data.slug} onChange={(e) => form.setData('slug', e.target.value)} error={form.errors.slug} />
                        <FormSelect label="Category" value={form.data.type} onChange={(e) => form.setData('type', e.target.value)} options={typeOptions} />
                        <FormInput label="Badge" value={form.data.badge} onChange={(e) => form.setData('badge', e.target.value)} />
                    </div>
                </FormCard>

                <FormCard title="Pricing & Speed">
                    <div className="grid gap-4 sm:grid-cols-3">
                        <FormInput label="Download (Mbps)" type="number" value={form.data.download_mbps} onChange={(e) => form.setData('download_mbps', e.target.value)} required />
                        <FormInput label="Upload (Mbps)" type="number" value={form.data.upload_mbps} onChange={(e) => form.setData('upload_mbps', e.target.value)} />
                        <FormInput label="Monthly Price (৳)" type="number" value={form.data.price_monthly} onChange={(e) => form.setData('price_monthly', e.target.value)} required />
                        <FormInput label="Installation Fee (৳)" type="number" value={form.data.installation_fee} onChange={(e) => form.setData('installation_fee', e.target.value)} />
                        <FormInput label="Billing Label" value={form.data.billing_label} onChange={(e) => form.setData('billing_label', e.target.value)} />
                    </div>
                </FormCard>

                <FormCard title="Promotion">
                    <div className="grid gap-4 sm:grid-cols-3">
                        <FormInput label="Original Price (৳)" type="number" value={form.data.original_price} onChange={(e) => form.setData('original_price', e.target.value)} />
                        <FormInput label="Promo Price (৳)" type="number" value={form.data.promo_price} onChange={(e) => form.setData('promo_price', e.target.value)} />
                        <FormInput label="Promo Label" value={form.data.promo_label} onChange={(e) => form.setData('promo_label', e.target.value)} />
                        <FormInput label="Promo Ends At" type="date" value={form.data.promo_ends_at} onChange={(e) => form.setData('promo_ends_at', e.target.value)} />
                        <div className="sm:col-span-2"><FormInput label="Promo Description" value={form.data.promo_description} onChange={(e) => form.setData('promo_description', e.target.value)} /></div>
                    </div>
                </FormCard>

                <FormCard title="Features & Description">
                    <FormTextarea label="Description" value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} rows={3} />
                    <div className="mt-4">
                        <FormTextarea label="Features (one per line)" value={form.data.features} onChange={(e) => form.setData('features', e.target.value)} rows={6} />
                    </div>
                </FormCard>

                <FormCard title="Status">
                    <div className="flex flex-wrap items-center gap-6">
                        <FormSwitch label="Active" checked={form.data.is_active} onChange={(val) => form.setData('is_active', val)} />
                        <FormSwitch label="Featured" checked={form.data.is_featured} onChange={(val) => form.setData('is_featured', val)} />
                        <FormInput label="Sort Order" type="number" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} className="w-32" />
                    </div>
                </FormCard>

                <button type="submit" disabled={form.processing} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50">
                    {form.processing ? 'Saving...' : 'Update Plan'}
                </button>
            </form>
        </AdminLayout>
    );
}
