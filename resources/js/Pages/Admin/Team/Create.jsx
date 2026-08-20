import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import { FormInput, FormTextarea, FormSelect, FormSwitch, FormCard } from '@/Components/Admin/FormField';

export default function Create() {
    const form = useForm({
        name: '', designation: '', description: '', image: null,
        phone: '', email: '', whatsapp: '', social_links: {},
        team_type: 'general', is_active: true, sort_order: 0,
    });
    const submit = (e) => {
        e.preventDefault();
        form.post(route('admin.team.store'), { forceFormData: true });
    };

    return (
        <AdminLayout title="Add Team Member">
            <PageHeader title="Add Team Member" actionHref={route('admin.team.index')} actionLabel="Back" />
            <form onSubmit={submit} encType="multipart/form-data" className="max-w-3xl space-y-6">
                <FormCard title="Basic Info">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput label="Full Name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} error={form.errors.name} required />
                        <FormInput label="Designation" value={form.data.designation} onChange={(e) => form.setData('designation', e.target.value)} error={form.errors.designation} placeholder="Chief Technology Officer" />
                        <FormSelect label="Team Type" value={form.data.team_type} onChange={(e) => form.setData('team_type', e.target.value)} options={[{ value: 'leadership', label: 'Leadership' }, { value: 'general', label: 'General Team' }, { value: 'sales', label: 'Sales Team' }]} />
                        <FormInput label="Sort Order" type="number" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} />
                        <div className="sm:col-span-2"><FormTextarea label="Short Bio" value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} rows={3} /></div>
                    </div>
                </FormCard>

                <FormCard title="Contact Details">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput label="Phone" value={form.data.phone} onChange={(e) => form.setData('phone', e.target.value)} placeholder="+880 1711-123456" />
                        <FormInput label="Email" type="email" value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} />
                        <FormInput label="WhatsApp" value={form.data.whatsapp} onChange={(e) => form.setData('whatsapp', e.target.value)} />
                    </div>
                </FormCard>

                <FormCard title="Photo & Status">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Profile Photo</label>
                            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => form.setData('image', e.target.files[0])} className="mt-1 block w-full text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-white/5 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-white/10" />
                            {form.errors.image && <p className="mt-1 text-sm text-red-400">{form.errors.image}</p>}
                        </div>
                        <div className="flex items-end"><FormSwitch label="Active" checked={form.data.is_active} onChange={(val) => form.setData('is_active', val)} /></div>
                    </div>
                </FormCard>

                <button type="submit" disabled={form.processing} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50">
                    {form.processing ? 'Saving...' : 'Add Team Member'}
                </button>
            </form>
        </AdminLayout>
    );
}
