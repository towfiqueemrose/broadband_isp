import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import { FormInput, FormTextarea, FormSelect, FormSwitch, FormCard } from '@/Components/Admin/FormField';

export default function Create() {
    const form = useForm({ question: '', answer: '', category: '', display_location: 'all', is_popular: false, is_active: true, sort_order: 0 });
    const submit = (e) => { e.preventDefault(); form.post(route('admin.faqs.store')); };

    return (
        <AdminLayout title="Create FAQ">
            <PageHeader title="Create FAQ" actionHref={route('admin.faqs.index')} actionLabel="Back" />
            <form onSubmit={submit} className="max-w-3xl space-y-6">
                <FormCard>
                    <div className="space-y-4">
                        <FormInput label="Question" value={form.data.question} onChange={(e) => form.setData('question', e.target.value)} error={form.errors.question} required />
                        <FormTextarea label="Answer" value={form.data.answer} onChange={(e) => form.setData('answer', e.target.value)} error={form.errors.answer} rows={6} required />
                        <div className="grid gap-4 sm:grid-cols-3">
                            <FormInput label="Category" value={form.data.category} onChange={(e) => form.setData('category', e.target.value)} description="e.g. General, Billing, Technical" />
                            <FormSelect label="Display Location" value={form.data.display_location} onChange={(e) => form.setData('display_location', e.target.value)} options={[{ value: 'all', label: 'All Pages' }, { value: 'homepage', label: 'Homepage' }, { value: 'contact', label: 'Contact Page' }, { value: 'faq-page', label: 'FAQ Page' }, { value: 'packages', label: 'Packages Page' }]} />
                            <FormInput label="Sort Order" type="number" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} />
                        </div>
                        <div className="flex items-center gap-6">
                            <FormSwitch label="Active" checked={form.data.is_active} onChange={(val) => form.setData('is_active', val)} />
                            <FormSwitch label="Popular" description="Show in Popular Questions section" checked={form.data.is_popular} onChange={(val) => form.setData('is_popular', val)} />
                        </div>
                    </div>
                </FormCard>
                <button type="submit" disabled={form.processing} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50">
                    {form.processing ? 'Saving...' : 'Create FAQ'}
                </button>
            </form>
        </AdminLayout>
    );
}
