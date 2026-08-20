import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import { FormInput, FormTextarea, FormSwitch, FormCard } from '@/Components/Admin/FormField';
export default function Create() {
    const form = useForm({ title: '', description: '', image: null, is_active: true });
    const submit = (e) => { e.preventDefault(); form.post(route('admin.company.vision.store'), { forceFormData: true }); };
    return (
        <AdminLayout title="Create Vision">
            <PageHeader title="Create Vision" actionHref={route('admin.company.vision.index')} actionLabel="Back" />
            <form onSubmit={submit} encType="multipart/form-data" className="max-w-3xl space-y-6">
                <FormCard>
                    <div className="space-y-4">
                        <FormInput label="Title" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} error={form.errors.title} required />
                        <FormTextarea label="Description" value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} rows={4} />
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Image (optional)</label>
                            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => form.setData('image', e.target.files[0])} className="mt-1 block w-full text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-white/5 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-white/10" />
                        </div>
                        <FormSwitch label="Active" checked={form.data.is_active} onChange={(val) => form.setData('is_active', val)} />
                    </div>
                </FormCard>
                <button type="submit" disabled={form.processing} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50">{form.processing ? 'Saving...' : 'Create'}</button>
            </form>
        </AdminLayout>
    );
}
