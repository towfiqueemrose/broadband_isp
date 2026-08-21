import { Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import SlugInput from '@/Components/Admin/SlugInput';
import { FormInput, FormTextarea } from '@/Components/Admin/FormField';
import Icon from '@/Components/UI/Icon';
import { cn } from '@/Utils/cn';

export default function RoleForm({ role, permissionCatalog }) {
    const isEdit = role !== null;

    const { data, setData, post, put, processing, errors } = useForm({
        name: role?.name ?? '',
        label: role?.label ?? '',
        description: role?.description ?? '',
        permissions: role?.permissions ?? [],
    });

    const togglePermission = (name) => {
        setData('permissions', data.permissions.includes(name)
            ? data.permissions.filter((p) => p !== name)
            : [...data.permissions, name]);
    };

    const toggleGroup = (permissions) => {
        const names = permissions.map((p) => p.name);
        const allSelected = names.every((n) => data.permissions.includes(n));
        setData('permissions', allSelected
            ? data.permissions.filter((n) => !names.includes(n))
            : [...new Set([...data.permissions, ...names])]);
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.roles.update', role.id));
        } else {
            post(route('admin.roles.store'));
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Role' : 'Create Role'}>
            <PageHeader title={isEdit ? `Edit Role — ${role.label}` : 'Create Role'} description="Set the identity and module access for this role." />

            <form onSubmit={submit} className="space-y-6">
                <div className="rounded-2xl border border-white/5 bg-gray-900 p-6">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-200">Identity</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput label="Display Name" value={data.label} onChange={(e) => setData('label', e.target.value)} error={errors.label} placeholder="Content Editor" required />
                        <SlugInput label="Slug" source={data.label} value={data.name} onChange={(v) => setData('name', v)} error={errors.name} hint="" />
                    </div>
                    <div className="mt-4">
                        <FormTextarea label="Description" value={data.description ?? ''} onChange={(e) => setData('description', e.target.value)} error={errors.description} rows={2} placeholder="What is this role for?" />
                    </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-gray-900 p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200">Module Access</h3>
                        <button type="button" onClick={() => setData('permissions', Object.values(permissionCatalog).flat().map((p) => p.name))} className="text-xs font-medium text-primary hover:text-primary-light">
                            Select all
                        </button>
                    </div>

                    <div className="space-y-6">
                        {Object.entries(permissionCatalog).map(([group, permissions]) => {
                            const allSelected = permissions.every((p) => data.permissions.includes(p.name));
                            return (
                                <div key={group}>
                                    <div className="mb-2.5 flex items-center justify-between">
                                        <h4 className="text-xs font-semibold text-gray-100">{group}</h4>
                                        <button type="button" onClick={() => toggleGroup(permissions)} className="text-[11px] font-medium text-gray-200 hover:text-gray-100">
                                            {allSelected ? 'Clear' : 'Select all'}
                                        </button>
                                    </div>
                                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                        {permissions.map((permission) => {
                                            const checked = data.permissions.includes(permission.name);
                                            return (
                                                <label
                                                    key={permission.name}
                                                    className={cn(
                                                        'flex cursor-pointer select-none items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-all',
                                                        checked ? 'border-primary/50 bg-primary/10 text-white' : 'border-white/10 bg-white/[0.02] text-gray-100 hover:border-white/20',
                                                    )}
                                                >
                                                    <input type="checkbox" checked={checked} onChange={() => togglePermission(permission.name)} className="h-4 w-4 rounded accent-[var(--primary)]" />
                                                    {permission.label}
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {errors.permissions && <p className="mt-3 text-sm text-red-400">{errors.permissions}</p>}
                </div>

                <div className="flex items-center gap-3">
                    <button type="submit" disabled={processing} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50">
                        <Icon name="check" className="h-4 w-4" />
                        {processing ? 'Saving...' : isEdit ? 'Update Role' : 'Create Role'}
                    </button>
                    <Link href={route('admin.roles.index')} className="text-sm font-medium text-gray-100 hover:text-white">Cancel</Link>
                </div>
            </form>
        </AdminLayout>
    );
}
