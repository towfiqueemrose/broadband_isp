import { useForm } from '@inertiajs/react';
import { useState } from 'react';
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
        logo: null, remove_logo: '0',
        favicon: null, remove_favicon: '0',
    });

    const [logoPreview, setLogoPreview] = useState(brand.logo ? `/storage/${brand.logo}` : null);
    const [faviconPreview, setFaviconPreview] = useState(brand.favicon ? `/storage/${brand.favicon}` : null);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            form.setData('logo', file);
            form.setData('remove_logo', '0');
            setLogoPreview(URL.createObjectURL(file));
        }
    };
    const handleLogoRemove = () => {
        form.setData('logo', null);
        form.setData('remove_logo', '1');
        setLogoPreview(null);
    };

    const handleFaviconChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            form.setData('favicon', file);
            form.setData('remove_favicon', '0');
            setFaviconPreview(URL.createObjectURL(file));
        }
    };
    const handleFaviconRemove = () => {
        form.setData('favicon', null);
        form.setData('remove_favicon', '1');
        setFaviconPreview(null);
    };

    const submit = (e) => {
        e.preventDefault();
        form.post(route('admin.settings.brand.update'), { preserveScroll: true, forceFormData: true });
    };

    return (
        <AdminLayout title="Brand Identity">
            <PageHeader title="Brand Identity" description="Manage company name, tagline, contact info, and social links." />

            <form onSubmit={submit} className="max-w-3xl space-y-6">
                <FormCard title="Brand Logo">
                    <div className="flex items-start gap-6">
                        <div className="shrink-0">
                            {logoPreview ? (
                                <div className="relative">
                                    <img src={logoPreview} alt="Logo" className="h-20 w-20 rounded-xl object-contain bg-gray-50 border border-gray-200" />
                                    <button type="button" onClick={handleLogoRemove} className="absolute -right-2 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600">×</button>
                                </div>
                            ) : (
                                <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-400">
                                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" /></svg>
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-900">{logoPreview ? 'Replace Logo' : 'Upload Logo'}</label>
                            <p className="mt-1 text-xs text-gray-500">PNG, JPG, WebP, or SVG. Max 2 MB. Recommended: square image.</p>
                            <input type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" onChange={handleLogoChange} className="mt-2 block w-full text-sm text-gray-900 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-gray-200" />
                            {form.errors.logo && <p className="mt-1 text-sm text-red-500">{form.errors.logo}</p>}
                        </div>
                    </div>
                </FormCard>

                <FormCard title="Favicon">
                    <div className="flex items-start gap-6">
                        <div className="shrink-0">
                            {faviconPreview ? (
                                <div className="relative">
                                    <img src={faviconPreview} alt="Favicon" className="h-12 w-12 rounded-lg object-contain bg-gray-50 border border-gray-200" />
                                    <button type="button" onClick={handleFaviconRemove} className="absolute -right-2 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600">×</button>
                                </div>
                            ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-400">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-900">{faviconPreview ? 'Replace Favicon' : 'Upload Favicon'}</label>
                            <p className="mt-1 text-xs text-gray-500">PNG, JPG, WebP, or SVG. Max 512 KB. Recommended: 32×32 or 64×64 square icon.</p>
                            <input type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" onChange={handleFaviconChange} className="mt-2 block w-full text-sm text-gray-900 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-gray-200" />
                            {form.errors.favicon && <p className="mt-1 text-sm text-red-500">{form.errors.favicon}</p>}
                        </div>
                    </div>
                </FormCard>

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
