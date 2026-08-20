import { useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/UI/Button';
import Icon from '@/Components/UI/Icon';
import { Head } from '@inertiajs/react';

export default function Settings({ settings }) {
    const { brand } = usePage().props;
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(
        settings.background_image ? `/storage/${settings.background_image}` : null,
    );

    const form = useForm({
        background_image: null,
        remove_background: '0',
    });

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
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const submit = (e) => {
        e.preventDefault();
        form.post(route('admin.settings.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Site Settings
                </h2>
            }
        >
            <Head title="Site Settings" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} encType="multipart/form-data">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            Background Image
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Set a site-wide background image. It will display as a fixed, full-screen background with a semi-transparent overlay for readability.
                                        </p>
                                    </div>

                                    {preview && (
                                        <div className="relative overflow-hidden rounded-lg border border-gray-200">
                                            <img
                                                src={preview}
                                                alt="Background preview"
                                                className="h-48 w-full object-cover sm:h-64"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemove}
                                                className="absolute right-2 top-2 inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-600"
                                            >
                                                <Icon name="trash" className="h-3 w-3" />
                                                Remove
                                            </button>
                                        </div>
                                    )}

                                    <div>
                                        <label
                                            htmlFor="background_image"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            {preview ? 'Replace image' : 'Upload image'}
                                        </label>
                                        <input
                                            ref={fileInputRef}
                                            id="background_image"
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={handleFileChange}
                                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                                        />
                                        {form.errors.background_image && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {form.errors.background_image}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3 border-t border-gray-200 pt-6">
                                        <Button
                                            type="submit"
                                            disabled={form.processing}
                                        >
                                            {form.processing ? (
                                                <>
                                                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                    Saving...
                                                </>
                                            ) : (
                                                'Save Settings'
                                            )}
                                        </Button>

                                        {form.isDirty && !form.processing && (
                                            <span className="text-sm text-gray-500">
                                                Unsaved changes
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
