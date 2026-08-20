import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import { FormInput, FormCard } from '@/Components/Admin/FormField';

export default function Theme({ theme }) {
    const form = useForm({
        primary: theme.primary || '#4702bd',
        secondary: theme.secondary || '#1e1b4b',
        accent: theme.accent || '#22d3ee',
    });

    const submit = (e) => { e.preventDefault(); form.post(route('admin.settings.theme.update')); };

    return (
        <AdminLayout title="Theme & Colors">
            <PageHeader title="Theme & Appearance" description="Configure the website's brand colors." />

            <form onSubmit={submit} className="max-w-3xl space-y-6">
                <FormCard title="Brand Colors">
                    <p className="text-sm text-gray-400 mb-6">These colors control the visual identity of the public website. Changes take effect after cache clear.</p>
                    <div className="grid gap-6 sm:grid-cols-3">
                        {[
                            { key: 'primary', label: 'Primary Color', desc: 'Buttons, links, accents' },
                            { key: 'secondary', label: 'Secondary Color', desc: 'Dark backgrounds' },
                            { key: 'accent', label: 'Accent Color', desc: 'Highlights, badges' },
                        ].map(({ key, label, desc }) => (
                            <div key={key} className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">{label}</label>
                                <p className="text-xs text-gray-500">{desc}</p>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={form.data[key]}
                                        onChange={(e) => form.setData(key, e.target.value)}
                                        className="h-10 w-10 cursor-pointer rounded-lg border-0 bg-transparent"
                                    />
                                    <FormInput
                                        value={form.data[key]}
                                        onChange={(e) => form.setData(key, e.target.value)}
                                        className="flex-1"
                                    />
                                </div>
                                <div className="h-8 rounded-lg" style={{ backgroundColor: form.data[key] }} />
                            </div>
                        ))}
                    </div>
                </FormCard>

                <button type="submit" disabled={form.processing} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50">
                    {form.processing ? 'Saving...' : 'Save Theme'}
                </button>
            </form>
        </AdminLayout>
    );
}
