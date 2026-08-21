import { Link, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Icon from '@/Components/UI/Icon';
import Modal from '@/Components/Modal';
import { cn } from '@/Utils/cn';

const navigation = [
    {
        group: 'Dashboard',
        items: [
            { name: 'Overview', href: route('admin.dashboard'), icon: 'gauge' },
        ],
    },
    {
        group: 'Homepage',
        items: [
            { name: 'Hero Section', href: route('admin.home-hero.index'), icon: 'zap', permission: 'hero.manage' },
            { name: 'Why Choose Us', href: route('admin.why-choose-us.index'), icon: 'shield-check', permission: 'why-choose-us.manage' },
            { name: 'Services', href: route('admin.services.index'), icon: 'layers', permission: 'services.manage' },
            { name: 'Promotions', href: route('admin.promotions.index'), icon: 'gift', permission: 'promotions.manage' },
            { name: 'Final CTA', href: route('admin.page-ctas.index'), icon: 'arrow-up-circle', permission: 'page-ctas.manage' },
        ],
    },
    {
        group: 'Packages',
        items: [
            { name: 'Internet Plans', href: route('admin.plans.index'), icon: 'bolt', permission: 'plans.manage' },
        ],
    },
    {
        group: 'About',
        items: [
            { name: 'Mission', href: route('admin.company.mission.index'), icon: 'eye', permission: 'mission.manage' },
            { name: 'Vision', href: route('admin.company.vision.index'), icon: 'globe', permission: 'vision.manage' },
            { name: 'Core Values', href: route('admin.core-values.index'), icon: 'heart', permission: 'core-values.manage' },
            { name: 'Journey', href: route('admin.company.journey.index'), icon: 'activity', permission: 'journey.manage' },
            { name: 'Team Members', href: route('admin.team.index'), icon: 'users', permission: 'team.manage' },
        ],
    },
    {
        group: 'Contact & Support',
        items: [
            { name: 'Pages', href: route('admin.pages.index'), icon: 'document', permission: 'pages.manage' },
            { name: 'Inquiries', href: route('admin.inquiries.index'), icon: 'chat', permission: 'inquiries.manage' },
            { name: 'FAQs', href: route('admin.faqs.index'), icon: 'document', permission: 'faqs.manage' },
            { name: 'Office Locations', href: route('admin.locations.index'), icon: 'map-pin', permission: 'locations.manage' },
        ],
    },
    {
        group: 'Settings',
        items: [
            { name: 'Brand Identity', href: route('admin.settings.brand'), icon: 'building-office', permission: 'settings.manage' },
            { name: 'Theme & Colors', href: route('admin.settings.theme'), icon: 'sparkles', permission: 'settings.manage' },
            { name: 'General Settings', href: route('admin.settings.general'), icon: 'settings', permission: 'settings.manage' },
        ],
    },
    {
        group: 'Access Control',
        items: [
            { name: 'Roles & Permissions', href: route('admin.roles.index'), icon: 'shield-check', permission: 'rbac.manage' },
            { name: 'Users', href: route('admin.users.index'), icon: 'user', permission: 'rbac.manage' },
        ],
    },
];

function SidebarLink({ item, collapsed }) {
    const { url } = usePage();
    const isActive = url === item.href || url.startsWith(item.href + '?');

    return (
        <Link
            href={item.href}
            className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-200 hover:bg-white/5 hover:text-white',
            )}
        >
            <Icon name={item.icon} className={cn('h-5 w-5 shrink-0', isActive ? 'text-white' : 'text-gray-200')} />
            {!collapsed && <span>{item.name}</span>}
        </Link>
    );
}

export default function AdminLayout({ children, title }) {
    const { auth, flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);
    const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const can = (permission) =>
        auth?.isSuperAdmin || (auth?.permissions ?? []).includes(permission);

    const visibleNavigation = navigation
        .map((group) => ({
            ...group,
            items: group.items.filter((item) => !item.permission || can(item.permission)),
        }))
        .filter((group) => group.items.length > 0);

    const logout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    const togglePasswordVisibility = (field) =>
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.post(route('admin.account.password.update'), {
            onSuccess: () => {
                setChangePasswordOpen(false);
                passwordForm.reset();
                setShowPasswords({ current: false, new: false, confirm: false });
            },
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-950 text-gray-100">
            <Head title={title ? `${title} — Admin` : 'Admin Panel'} />

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/5 bg-gray-900 transition-all duration-300',
                    sidebarOpen ? 'w-64' : 'w-[68px]',
                    mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
                )}
            >
                {/* Logo */}
                <div className="flex h-16 items-center gap-3 border-b border-white/5 px-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white text-sm font-bold">
                        N
                    </div>
                    {sidebarOpen && (
                        <span className="text-lg font-bold tracking-tight">NexaLink</span>
                    )}
                </div>

                {/* Navigation */}
                <nav className="no-scrollbar flex-1 overflow-y-auto px-3 py-4 space-y-6">
                    {visibleNavigation.map((group) => (
                        <div key={group.group}>
                            {sidebarOpen && (
                                <h3 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-100">
                                    {group.group}
                                </h3>
                            )}
                            <div className="space-y-1">
                                {group.items.map((item) => (
                                    <SidebarLink
                                        key={item.name}
                                        item={{
                                            ...item,
                                            href: item.href,
                                        }}
                                        collapsed={!sidebarOpen}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Sidebar toggle (desktop only) */}
                <div className="hidden border-t border-white/5 p-3 lg:block">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="flex w-full items-center justify-center rounded-xl py-2 text-gray-200 hover:bg-white/5 hover:text-white transition-colors"
                    >
                        <Icon
                            name={sidebarOpen ? 'arrow-left' : 'arrow-right'}
                            className="h-5 w-5"
                        />
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div
                className={cn(
                    'flex flex-1 flex-col transition-all duration-300',
                    sidebarOpen ? 'lg:ml-64' : 'lg:ml-[68px]',
                )}
            >
                {/* Top header */}
                <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/5 bg-gray-900/80 px-4 backdrop-blur-md sm:px-6">
                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="inline-flex items-center justify-center rounded-xl p-2 text-gray-100 hover:bg-white/5 hover:text-white lg:hidden"
                    >
                        <Icon name="menu" className="h-6 w-6" />
                    </button>

                    <div className="flex-1" />

                    {/* User dropdown */}
                    <div className="flex items-center gap-3">
                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-medium">{auth?.user?.name}</p>
                            <p className="text-xs text-gray-200">{auth?.user?.email}</p>
                        </div>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setUserMenuOpen((v) => !v)}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary transition-colors hover:bg-primary/30"
                                aria-label="Account menu"
                            >
                                {auth?.user?.name?.charAt(0) ?? 'A'}
                            </button>

                            {userMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                                    <div className="absolute right-0 top-11 z-20 w-56 overflow-hidden rounded-xl border border-white/10 bg-gray-900 shadow-lift">
                                        <div className="border-b border-white/5 px-4 py-3">
                                            <p className="truncate text-sm font-medium">{auth?.user?.name}</p>
                                            <p className="truncate text-xs text-gray-200">{auth?.user?.email}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setUserMenuOpen(false);
                                                setChangePasswordOpen(true);
                                            }}
                                            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-gray-200 transition-colors hover:bg-white/5 hover:text-white"
                                        >
                                            <Icon name="lock" className="h-4 w-4" />
                                            Change Password
                                        </button>
                                        <form onSubmit={logout} className="border-t border-white/5">
                                            <button
                                                type="submit"
                                                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-gray-200 transition-colors hover:bg-white/5 hover:text-white"
                                            >
                                                <Icon name="arrow-right" className="h-4 w-4 rotate-180" />
                                                Sign out
                                            </button>
                                        </form>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Flash messages */}
                {flash?.success && (
                    <div className="mx-4 mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400 sm:mx-6">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mx-4 mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 sm:mx-6">
                        {flash.error}
                    </div>
                )}

                {/* Page content */}
                <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>

            {/* Change Password modal */}
            <Modal
                show={changePasswordOpen}
                onClose={() => setChangePasswordOpen(false)}
                maxWidth="md"
                panelClassName="bg-gray-900 border border-white/10 rounded-2xl"
            >
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-white">Change Password</h3>
                    <p className="mt-1 text-sm text-gray-200">
                        Choose a strong password of at least 8 characters.
                    </p>

                    <form onSubmit={submitPassword} className="mt-5 space-y-4">
                        {[
                            { key: 'current', name: 'current_password', label: 'Current Password', autoComplete: 'current-password' },
                            { key: 'new', name: 'password', label: 'New Password', autoComplete: 'new-password' },
                            { key: 'confirm', name: 'password_confirmation', label: 'Confirm New Password', autoComplete: 'new-password' },
                        ].map((field) => (
                            <div key={field.name}>
                                <label htmlFor={field.name} className="mb-1.5 block text-sm font-medium text-gray-100">
                                    {field.label}
                                </label>
                                <div className="relative">
                                    <input
                                        id={field.name}
                                        type={showPasswords[field.key] ? 'text' : 'password'}
                                        value={passwordForm.data[field.name]}
                                        onChange={(e) => passwordForm.setData(field.name, e.target.value)}
                                        autoComplete={field.autoComplete}
                                        required
                                        className="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 pr-11 text-sm text-white placeholder-gray-400 transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility(field.key)}
                                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-300 hover:text-white"
                                        aria-label={showPasswords[field.key] ? 'Hide password' : 'Show password'}
                                    >
                                        <Icon name={showPasswords[field.key] ? 'eye-off' : 'eye'} className="h-4 w-4" />
                                    </button>
                                </div>
                                {passwordForm.errors[field.name] && (
                                    <p className="mt-1.5 text-xs text-red-400">{passwordForm.errors[field.name]}</p>
                                )}
                            </div>
                        ))}

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setChangePasswordOpen(false)}
                                className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-200 transition-colors hover:bg-white/5 hover:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={passwordForm.processing}
                                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
                            >
                                {passwordForm.processing && (
                                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                )}
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
