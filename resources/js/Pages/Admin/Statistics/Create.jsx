import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import { FormInput, FormSelect, FormSwitch, FormCard } from '@/Components/Admin/FormField';

export default function Create() {
    const form = useForm({
        label: '',
        value: '',
        suffix: '',
        decimals: 0,
        description: '',
        icon: '',
        display_location: 'both',
        is_active: true,
        sort_order: 0,
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('admin.statistics.store'));
    };

    return (
        <AdminLayout title="Create Statistic">
            <PageHeader title="Create Statistic" description="Add a new trust statistic." actionHref={route('admin.statistics.index')} actionLabel="Back to List" />

            <form onSubmit={submit} className="max-w-3xl space-y-6">
                <FormCard title="Statistic Details">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <FormInput label="Label" value={form.data.label} onChange={(e) => form.setData('label', e.target.value)} error={form.errors.label} placeholder="Active customers" required />
                        </div>
                        <FormInput label="Value" type="number" step="0.01" value={form.data.value} onChange={(e) => form.setData('value', e.target.value)} error={form.errors.value} placeholder="48000" required />
                        <FormInput label="Suffix" value={form.data.suffix} onChange={(e) => form.setData('suffix', e.target.value)} error={form.errors.suffix} placeholder="+" />
                        <FormInput label="Decimals" type="number" min="0" max="2" value={form.data.decimals} onChange={(e) => form.setData('decimals', e.target.value)} error={form.errors.decimals} />
                        <FormInput label="Icon" value={form.data.icon} onChange={(e) => form.setData('icon', e.target.value)} error={form.errors.icon} placeholder="bolt, shield-check, etc." />
                        <FormSelect label="Display Location" value={form.data.display_location} onChange={(e) => form.setData('display_location', e.target.value)} error={form.errors.display_location} options={[{ value: 'both', label: 'Both Pages' }, { value: 'homepage', label: 'Homepage Only' }, { value: 'about', label: 'About Page Only' }]} />
                        <FormInput label="Sort Order" type="number" min="0" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} error={form.errors.sort_order} />
                    </div>
                    <div className="mt-4">
                        <FormSwitch label="Active" checked={form.data.is_active} onChange={(val) => form.setData('is_active', val)} />
                    </div>
                </FormCard>

                <button type="submit" disabled={form.processing} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-dark disabled:opacity-50">
                    {form.processing ? 'Saving...' : 'Create Statistic'}
                </button>
            </form>
        </AdminLayout>
    );
}
