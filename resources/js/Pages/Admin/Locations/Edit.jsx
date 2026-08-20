import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import { FormInput, FormSwitch, FormCard } from '@/Components/Admin/FormField';
export default function Edit({ location }) {
    const form = useForm({ name: location.name, address: location.address || '', phone: location.phone || '', email: location.email || '', business_hours: location.business_hours || '', latitude: location.latitude || '', longitude: location.longitude || '', maps_embed_url: location.maps_embed_url || '', maps_url: location.maps_url || '', is_active: location.is_active });
    const submit = (e) => { e.preventDefault(); form.put(route('admin.locations.update', location.id)); };
    return (
        <AdminLayout title={`Edit — ${location.name}`}>
            <PageHeader title={`Edit ${location.name}`} actionHref={route('admin.locations.index')} actionLabel="Back" />
            <form onSubmit={submit} className="max-w-3xl space-y-6">
                <FormCard title="Location Details">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2"><FormInput label="Name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} required /></div>
                        <div className="sm:col-span-2"><FormInput label="Address" value={form.data.address} onChange={(e) => form.setData('address', e.target.value)} /></div>
                        <FormInput label="Phone" value={form.data.phone} onChange={(e) => form.setData('phone', e.target.value)} />
                        <FormInput label="Email" type="email" value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} />
                        <FormInput label="Business Hours" value={form.data.business_hours} onChange={(e) => form.setData('business_hours', e.target.value)} />
                    </div>
                </FormCard>
                <FormCard title="Google Maps">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput label="Latitude" type="number" step="any" value={form.data.latitude} onChange={(e) => form.setData('latitude', e.target.value)} />
                        <FormInput label="Longitude" type="number" step="any" value={form.data.longitude} onChange={(e) => form.setData('longitude', e.target.value)} />
                        <div className="sm:col-span-2"><FormInput label="Maps Embed URL" value={form.data.maps_embed_url} onChange={(e) => form.setData('maps_embed_url', e.target.value)} /></div>
                        <div className="sm:col-span-2"><FormInput label="Maps Direction URL" value={form.data.maps_url} onChange={(e) => form.setData('maps_url', e.target.value)} /></div>
                    </div>
                    <div className="mt-4"><FormSwitch label="Active" checked={form.data.is_active} onChange={(val) => form.setData('is_active', val)} /></div>
                </FormCard>
                <button type="submit" disabled={form.processing} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50">{form.processing ? 'Saving...' : 'Update'}</button>
            </form>
        </AdminLayout>
    );
}
