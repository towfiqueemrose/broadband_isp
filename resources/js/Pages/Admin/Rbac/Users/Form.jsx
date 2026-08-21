import { Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import { FormInput, FormSelect } from '@/Components/Admin/FormField';
import Icon from '@/Components/UI/Icon';

export default function UserForm({ editingUser, roles }) {
    const isEdit = editingUser !== null;

    const { data, setData, post, put, processing, errors } = useForm({
        name: editingUser?.name ?? '',
        email: editingUser?.email ?? '',
        password: '',
        password_confirmation: '',
        role_id: editingUser?.role_id ?? '',
    });

    const roleOptions = [
        { value: '', label: 'No access (regular user)' },
        ...roles,
    ];

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.users.update', editingUser.id));
        } else {
            post(route('admin.users.store'));
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit User' : 'Create User'}>
            <PageHeader
                title={isEdit ? `Edit User — ${editingUser.name}` : 'Create User'}
                description={isEdit ? 'Update account details or change the assigned role.' : 'Create a staff account and assign a role.'}
            />

            <form onSubmit={submit} className="space-y-6">
                <div className="rounded-2xl border border-white/5 bg-gray-900 p-6">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-200">Account</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput label="Full Name" value={data.name} onChange={(e) => setData('name', e.target.value)} error={errors.name} placeholder="Jane Doe" required />
                        <FormInput label="Email Address" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} error={errors.email} placeholder="jane@company.com" required />
                    </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-gray-900 p-6">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-200">Security</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput
                            label={isEdit ? 'New Password' : 'Password'}
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={errors.password}
                            placeholder={isEdit ? 'Leave blank to keep current' : 'Min 8 characters'}
                            autoComplete="new-password"
                            required={!isEdit}
                        />
                        <FormInput
                            label="Confirm Password"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            error={errors.password_confirmation}
                            placeholder="Repeat password"
                            autoComplete="new-password"
                            required={!isEdit || data.password.length > 0}
                        />
                    </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-gray-900 p-6">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-200">Access</h3>
                    <FormSelect
                        label="Role"
                        value={data.role_id ?? ''}
                        onChange={(e) => setData('role_id', e.target.value || null)}
                        error={errors.role_id}
                        options={roleOptions}
                        description="Roles control which admin modules this user can access."
                    />
                </div>

                <div className="flex items-center gap-3">
                    <button type="submit" disabled={processing} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50">
                        <Icon name="check" className="h-4 w-4" />
                        {processing ? 'Saving...' : isEdit ? 'Update User' : 'Create User'}
                    </button>
                    <Link href={route('admin.users.index')} className="text-sm font-medium text-gray-100 hover:text-white">Cancel</Link>
                </div>
            </form>
        </AdminLayout>
    );
}
