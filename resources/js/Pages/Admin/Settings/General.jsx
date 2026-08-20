import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import { FormInput, FormSwitch, FormCard } from '@/Components/Admin/FormField';

export default function General({ settings }) {
    const form = useForm({
        background_image: null,
        remove_background: '0',
        live_chat_enabled: settings.live_chat_enabled === 'true',
        live_chat_provider: settings.live_chat_provider || '',
        live_chat_welcome: settings.live_chat_welcome || '',
    });

    const [preview, setPreview] = useState(settings.background_image ? `/storage/${settings.background_image}` : null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            form.setData('background_image', file);
            form.setData('remove_background', '0');
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemove = () => {
        form.setData('background_image', null);
        form.setData('remove_background', '1');
        setPreview(null);
    };

    const submit = (e) => {
        e.preventDefault();
        form.post(route('admin.settings.general.update'), { preserveScroll: true, forceFormData: true });
    };

    return (
        <AdminLayout title="General Settings">
            <PageHeader title="General Settings" description="Manage background image and live chat configuration." />

            <form onSubmit={submit} encType="multipart/form-data" className="max-w-3xl space-y-6">
                <FormCard title="Background Image">
                    {preview && (
                        <div className="relative mb-4 overflow-hidden rounded-xl border border-white/10">
                            <img src={preview} alt="Background" className="h-48 w-full object-cover" />
                            <button type="button" onClick={handleRemove} className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600">Remove</button>
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">{preview ? 'Replace Image' : 'Upload Image'}</label>
                        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-white/5 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-white/10" />
                        {form.errors.background_image && <p className="mt-1 text-sm text-red-400">{form.errors.background_image}</p>}
                    </div>
                </FormCard>

                <FormCard title="Live Chat">
                    <div className="space-y-4">
                        <FormSwitch label="Enable Live Chat" description="Show the live chat widget on the public website" checked={form.data.live_chat_enabled} onChange={(val) => form.setData('live_chat_enabled', val)} />
                        <FormInput label="Provider" value={form.data.live_chat_provider} onChange={(e) => form.setData('live_chat_provider', e.target.value)} placeholder="tawk.to, drift, etc." description="Third-party chat provider name (for reference)" />
                        <FormInput label="Welcome Message" value={form.data.live_chat_welcome} onChange={(e) => form.setData('live_chat_welcome', e.target.value)} placeholder="Hello! How can we help you?" />
                    </div>
                </FormCard>

                <button type="submit" disabled={form.processing} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50">
                    {form.processing ? 'Saving...' : 'Save Settings'}
                </button>
            </form>
        </AdminLayout>
    );
}
