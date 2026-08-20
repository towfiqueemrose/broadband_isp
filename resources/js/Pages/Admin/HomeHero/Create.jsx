import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import { FormInput, FormTextarea, FormSwitch, FormCard } from '@/Components/Admin/FormField';

export default function Create() {
    const form = useForm({
        eyebrow_text: '',
        main_heading: '',
        highlighted_text: '',
        description: '',
        primary_cta_label: 'Get Connected',
        primary_cta_url: '/contact',
        secondary_cta_label: 'Explore Plans',
        secondary_cta_url: '/plans',
        hero_image: null,
        is_active: true,
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('admin.home-hero.store'));
    };

    return (
        <AdminLayout title="Create Hero Section">
            <PageHeader
                title="Create Hero Section"
                description="Add a new hero section for the homepage."
                actionHref={route('admin.home-hero.index')}
                actionLabel="Back to List"
            />

            <form onSubmit={submit} encType="multipart/form-data" className="max-w-3xl space-y-6">
                <FormCard title="Content">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput
                            label="Eyebrow Text"
                            value={form.data.eyebrow_text}
                            onChange={(e) => form.setData('eyebrow_text', e.target.value)}
                            error={form.errors.eyebrow_text}
                            placeholder="Fiber-optic broadband · Now serving Dhaka"
                            description="Small label above the main heading"
                        />
                        <div />
                        <FormInput
                            label="Main Heading"
                            value={form.data.main_heading}
                            onChange={(e) => form.setData('main_heading', e.target.value)}
                            error={form.errors.main_heading}
                            placeholder="Internet at the speed"
                            required
                        />
                        <FormInput
                            label="Highlighted Text"
                            value={form.data.highlighted_text}
                            onChange={(e) => form.setData('highlighted_text', e.target.value)}
                            error={form.errors.highlighted_text}
                            placeholder="of your ambition."
                            description="Text shown in primary color"
                        />
                    </div>
                    <div className="mt-4">
                        <FormTextarea
                            label="Description"
                            value={form.data.description}
                            onChange={(e) => form.setData('description', e.target.value)}
                            error={form.errors.description}
                            rows={3}
                            placeholder="NexaLink brings true fiber to your doorstep..."
                        />
                    </div>
                </FormCard>

                <FormCard title="Call to Action">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput
                            label="Primary CTA Label"
                            value={form.data.primary_cta_label}
                            onChange={(e) => form.setData('primary_cta_label', e.target.value)}
                            error={form.errors.primary_cta_label}
                            placeholder="Get Connected"
                        />
                        <FormInput
                            label="Primary CTA URL"
                            value={form.data.primary_cta_url}
                            onChange={(e) => form.setData('primary_cta_url', e.target.value)}
                            error={form.errors.primary_cta_url}
                            placeholder="/contact"
                        />
                        <FormInput
                            label="Secondary CTA Label"
                            value={form.data.secondary_cta_label}
                            onChange={(e) => form.setData('secondary_cta_label', e.target.value)}
                            error={form.errors.secondary_cta_label}
                            placeholder="Explore Plans"
                        />
                        <FormInput
                            label="Secondary CTA URL"
                            value={form.data.secondary_cta_url}
                            onChange={(e) => form.setData('secondary_cta_url', e.target.value)}
                            error={form.errors.secondary_cta_url}
                            placeholder="/plans"
                        />
                    </div>
                </FormCard>

                <FormCard title="Image & Status">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Hero Image</label>
                            <p className="text-xs text-gray-500 mb-1.5">Optional background image</p>
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={(e) => form.setData('hero_image', e.target.files[0])}
                                className="block w-full text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-white/5 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-white/10"
                            />
                            {form.errors.hero_image && (
                                <p className="mt-1 text-sm text-red-400">{form.errors.hero_image}</p>
                            )}
                        </div>
                        <div className="flex items-end">
                            <FormSwitch
                                label="Active"
                                description="Show this hero section on the website"
                                checked={form.data.is_active}
                                onChange={(val) => form.setData('is_active', val)}
                            />
                        </div>
                    </div>
                </FormCard>

                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={form.processing}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-dark disabled:opacity-50"
                    >
                        {form.processing ? 'Saving...' : 'Create Hero Section'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
