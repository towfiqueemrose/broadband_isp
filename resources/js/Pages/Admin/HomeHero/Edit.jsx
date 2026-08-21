import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import { FormInput, FormTextarea, FormSwitch, FormRange, FormCard } from '@/Components/Admin/FormField';
import Icon from '@/Components/UI/Icon';
import { cn } from '@/Utils/cn';

function ColorField({ label, value, onChange, error }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">{label}</label>
            <div className="flex items-center gap-2">
                <input
                    type="color"
                    value={value || '#ffffff'}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-9 w-9 shrink-0 cursor-pointer rounded-lg border border-gray-300 bg-white"
                />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="#ffffff"
                    className={cn(
                        'block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary focus:ring-1 focus:ring-primary',
                        error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500',
                    )}
                />
                {value && (
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="shrink-0 rounded-lg border border-gray-300 bg-gray-100 px-2 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200"
                    >
                        Reset
                    </button>
                )}
            </div>
            {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        </div>
    );
}

function TrustChipsInput({ chips, onChange, error }) {
    const addChip = () => {
        if (chips.length < 10) {
            onChange([...chips, '']);
        }
    };
    const updateChip = (idx, val) => {
        const newChips = [...chips];
        newChips[idx] = val;
        onChange(newChips);
    };
    const removeChip = (idx) => {
        onChange(chips.filter((_, i) => i !== idx));
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <div>
                    <label className="block text-sm font-medium text-gray-900">Feature Chips</label>
                    <p className="text-xs text-gray-500">Add up to 10 short feature highlights</p>
                </div>
                <button
                    type="button"
                    onClick={addChip}
                    disabled={chips.length >= 10}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                    <Icon name="plus" className="h-3.5 w-3.5" /> Add Chip
                </button>
            </div>
            {chips.length > 0 ? (
                <div className="space-y-2">
                    {chips.map((chip, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={chip}
                                onChange={(e) => updateChip(idx, e.target.value)}
                                placeholder="e.g. Symmetrical fiber speeds"
                                className="block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                                maxLength={100}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => removeChip(idx)}
                                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-red-500"
                            >
                                <Icon name="trash" className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
                    No chips added yet. Click "Add Chip" to start.
                </div>
            )}
            {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
        </div>
    );
}


export default function Edit({ hero }) {
    const [previewUrl, setPreviewUrl] = useState(
        hero.hero_image ? `/storage/${hero.hero_image}` : null
    );

    const form = useForm({
        _method: 'put',
        eyebrow_text: hero.eyebrow_text || '',
        main_heading: hero.main_heading || '',
        highlighted_text: hero.highlighted_text || '',
        description: hero.description || '',
        primary_cta_label: hero.primary_cta_label || '',
        primary_cta_url: hero.primary_cta_url || '',
        secondary_cta_label: hero.secondary_cta_label || '',
        secondary_cta_url: hero.secondary_cta_url || '',
        hero_image: null,
        image_opacity: hero.image_opacity ?? 40,
        eyebrow_text_color: hero.eyebrow_text_color || '',
        main_heading_text_color: hero.main_heading_text_color || '',
        highlighted_text_color: hero.highlighted_text_color || '',
        description_text_color: hero.description_text_color || '',
        trust_chips_color: hero.trust_chips_color || '',
        trust_chips: hero.trust_chips || [],
        is_active: hero.is_active,
    });

    useEffect(() => {
        if (!form.data.hero_image) return;
        const url = URL.createObjectURL(form.data.hero_image);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [form.data.hero_image]);

    const submit = (e) => {
        e.preventDefault();
        form.post(route('admin.home-hero.update', hero.id), { forceFormData: true });
    };

    return (
        <AdminLayout title="Edit Hero Section">
            <PageHeader
                title="Edit Hero Section"
                description="Update the homepage hero section content."
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
                            description="Small label above the main heading"
                        />
                        <div />
                        <FormInput
                            label="Main Heading"
                            value={form.data.main_heading}
                            onChange={(e) => form.setData('main_heading', e.target.value)}
                            error={form.errors.main_heading}
                            required
                        />
                        <FormInput
                            label="Highlighted Text"
                            value={form.data.highlighted_text}
                            onChange={(e) => form.setData('highlighted_text', e.target.value)}
                            error={form.errors.highlighted_text}
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
                    
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <TrustChipsInput
                            chips={form.data.trust_chips}
                            onChange={(chips) => form.setData('trust_chips', chips)}
                            error={form.errors.trust_chips}
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
                        />
                        <FormInput
                            label="Primary CTA URL"
                            value={form.data.primary_cta_url}
                            onChange={(e) => form.setData('primary_cta_url', e.target.value)}
                            error={form.errors.primary_cta_url}
                        />
                        <FormInput
                            label="Secondary CTA Label"
                            value={form.data.secondary_cta_label}
                            onChange={(e) => form.setData('secondary_cta_label', e.target.value)}
                            error={form.errors.secondary_cta_label}
                        />
                        <FormInput
                            label="Secondary CTA URL"
                            value={form.data.secondary_cta_url}
                            onChange={(e) => form.setData('secondary_cta_url', e.target.value)}
                            error={form.errors.secondary_cta_url}
                        />
                    </div>
                </FormCard>

                <FormCard title="Image & Status">
                    {previewUrl && (
                        <div className="mb-4 overflow-hidden rounded-xl border border-gray-200 relative">
                            <img
                                src={previewUrl}
                                alt="Hero preview"
                                className="h-48 w-full object-cover"
                                style={{ opacity: form.data.image_opacity / 100 }}
                            />
                            <div className="absolute inset-0 flex flex-col justify-center p-6">
                                <span
                                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-foreground w-fit"
                                    style={form.data.eyebrow_text_color ? { color: form.data.eyebrow_text_color } : undefined}
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                                    {form.data.eyebrow_text || 'Eyebrow text'}
                                </span>
                                <h2
                                    className="mt-3 text-2xl font-extrabold leading-[1.08] tracking-tight text-foreground"
                                    style={form.data.main_heading_text_color ? { color: form.data.main_heading_text_color } : undefined}
                                >
                                    {form.data.main_heading || 'Main heading'}
                                </h2>
                                {form.data.highlighted_text && (
                                    <span
                                        className="block text-lg font-bold text-primary"
                                        style={form.data.highlighted_text_color ? { color: form.data.highlighted_text_color } : undefined}
                                    >
                                        {form.data.highlighted_text}
                                    </span>
                                )}
                                {form.data.description && (
                                    <p
                                        className="mt-2 max-w-md text-sm leading-relaxed text-muted line-clamp-2"
                                        style={form.data.description_text_color ? { color: form.data.description_text_color } : undefined}
                                    >
                                        {form.data.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-900">
                                {hero.hero_image ? 'Replace Image' : 'Hero Image'}
                            </label>
                            <p className="text-xs text-gray-500 mb-1.5">Optional background image</p>
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={(e) => form.setData('hero_image', e.target.files[0])}
                                className="block w-full text-sm text-gray-900 file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/20"
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
                    <div className="mt-4">
                        <FormRange
                            label="Image Visibility"
                            description="How strongly the background image shows behind the hero content (higher = more visible)"
                            min={0}
                            max={100}
                            value={form.data.image_opacity}
                            onChange={(val) => form.setData('image_opacity', val)}
                            suffix="%"
                        />
                    </div>

                    <div className="mt-6">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-700 mb-3">Text Colors</h4>
                        <p className="text-xs text-gray-500 mb-4">Override individual text colors when displayed over the background image. Leave empty to use default theme colors.</p>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <ColorField
                                label="Eyebrow Text"
                                value={form.data.eyebrow_text_color}
                                onChange={(v) => form.setData('eyebrow_text_color', v)}
                                error={form.errors.eyebrow_text_color}
                            />
                            <ColorField
                                label="Main Heading"
                                value={form.data.main_heading_text_color}
                                onChange={(v) => form.setData('main_heading_text_color', v)}
                                error={form.errors.main_heading_text_color}
                            />
                            <ColorField
                                label="Highlighted Text"
                                value={form.data.highlighted_text_color}
                                onChange={(v) => form.setData('highlighted_text_color', v)}
                                error={form.errors.highlighted_text_color}
                            />
                            <ColorField
                                label="Description"
                                value={form.data.description_text_color}
                                onChange={(v) => form.setData('description_text_color', v)}
                                error={form.errors.description_text_color}
                            />
                            <ColorField
                                label="Feature Chips (✓ items)"
                                value={form.data.trust_chips_color}
                                onChange={(v) => form.setData('trust_chips_color', v)}
                                error={form.errors.trust_chips_color}
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
                        {form.processing ? 'Saving...' : 'Update Hero Section'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
