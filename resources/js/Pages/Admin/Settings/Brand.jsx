import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import { FormInput, FormTextarea, FormCard } from '@/Components/Admin/FormField';

export default function Brand({ brand }) {
    const form = useForm({
        name: brand.name, tagline: brand.tagline, description: brand.description,
        meta_title: brand.meta_title, meta_description: brand.meta_description,
        hotline: brand.hotline, phone: brand.phone, email: brand.email,
        address: brand.address, hours: brand.hours,
        socials: brand.socials || {},
    });

    const submit = (e) => { e.preventDefault(); form.post(route('admin.settings.brand.update')); };

    return (
        <AdminLayout title="Brand Identity">
            <PageHeader title="Brand Identity" description="Manage company name, tagline, contact info, and social links." />

            <form onSubmit={submit} className="max-w-3xl space-y-6">
                <FormCard title="Company Identity">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput label="Company Name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} error={form.errors.name} required />
                        <FormInput label="Tagline" value={form.data.tagline} onChange={(e) => form.setData('tagline', e.target.value)} />
                        <div className="sm:col-span-2"><FormTextarea label="Description" value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} rows={3} /></div>
                    </div>
                </FormCard>

                <FormCard title="SEO Defaults">
                    <div className="space-y-4">
                        <FormInput label="Default Meta Title" value={form.data.meta_title} onChange={(e) => form.setData('meta_title', e.target.value)} />
                        <FormTextarea label="Default Meta Description" value={form.data.meta_description} onChange={(e) => form.setData('meta_description', e.target.value)} rows={2} />
                    </div>
                </FormCard>

                <FormCard title="Contact Information">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput label="Hotline" value={form.data.hotline} onChange={(e) => form.setData('hotline', e.target.value)} placeholder="+880 9600-123456" />
                        <FormInput label="Phone" value={form.data.phone} onChange={(e) => form.setData('phone', e.target.value)} />
                        <FormInput label="Email" type="email" value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} />
                        <FormInput label="Business Hours" value={form.data.hours} onChange={(e) => form.setData('hours', e.target.value)} />
                        <div className="sm:col-span-2"><FormInput label="Address" value={form.data.address} onChange={(e) => form.setData('address', e.target.value)} /></div>
                    </div>
                </FormCard>

                <FormCard title="Social Links">
                    <div className="grid gap-4 sm:grid-cols-2">
                        {['facebook', 'twitter', 'linkedin', 'youtube', 'instagram'].map((platform) => (
                            <FormInput key={platform} label={platform.charAt(0).toUpperCase() + platform.slice(1)} value={form.data.socials[platform] || ''} onChange={(e) => form.setData('socials', { ...form.data.socials, [platform]: e.target.value })} placeholder={`https://${platform}.com/...`} />
                        ))}
                    </div>
                </FormCard>

                <button type="submit" disabled={form.processing} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50">
                    {form.processing ? 'Saving...' : 'Save Brand Settings'}
                </button>
            </form>
        </AdminLayout>
    );
}
