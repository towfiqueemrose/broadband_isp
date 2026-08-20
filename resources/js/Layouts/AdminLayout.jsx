import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Icon from '@/Components/UI/Icon';
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
            { name: 'Hero Section', href: route('admin.home-hero.index'), icon: 'zap' },
            { name: 'Why Choose Us', href: route('admin.why-choose-us.index'), icon: 'shield-check' },
            { name: 'Services', href: route('admin.services.index'), icon: 'layers' },
            { name: 'Network & Tech', href: route('admin.network-tech.index'), icon: 'server-stack' },
            { name: 'Promotions', href: route('admin.promotions.index'), icon: 'gift' },
            { name: 'Final CTA', href: route('admin.page-ctas.index'), icon: 'arrow-up-circle' },
        ],
    },
    {
        group: 'Packages',
        items: [
            { name: 'Internet Plans', href: route('admin.plans.index'), icon: 'bolt' },
        ],
    },
    {
        group: 'About',
        items: [
            { name: 'Mission', href: route('admin.company.mission.index'), icon: 'eye' },
            { name: 'Vision', href: route('admin.company.vision.index'), icon: 'globe' },
            { name: 'Core Values', href: route('admin.company.journey.index'), icon: 'heart' },
            { name: 'Journey', href: route('admin.company.journey.index'), icon: 'activity' },
            { name: 'Team Members', href: route('admin.team.index'), icon: 'users' },
        ],
    },
    {
        group: 'Contact & Support',
        items: [
            { name: 'Inquiries', href: route('admin.inquiries.index'), icon: 'chat' },
            { name: 'FAQs', href: route('admin.faqs.index'), icon: 'document' },
            { name: 'Office Locations', href: route('admin.locations.index'), icon: 'map-pin' },
        ],
    },
    {
        group: 'Settings',
        items: [
            { name: 'Brand Identity', href: route('admin.settings.brand'), icon: 'building-office' },
            { name: 'Theme & Colors', href: route('admin.settings.theme'), icon: 'sparkles' },
            { name: 'General Settings', href: route('admin.settings.general'), icon: 'settings' },
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
                    : 'text-gray-400 hover:bg-white/5 hover:text-white',
            )}
        >
            <Icon name={item.icon} className={cn('h-5 w-5 shrink-0', isActive ? 'text-white' : 'text-gray-500')} />
            {!collapsed && <span>{item.name}</span>}
        </Link>
    );
}

export default function AdminLayout({ children, title }) {
    const { auth, flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

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
                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
                    {navigation.map((group) => (
                        <div key={group.group}>
                            {sidebarOpen && (
                                <h3 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
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
                        className="flex w-full items-center justify-center rounded-xl py-2 text-gray-500 hover:bg-white/5 hover:text-white transition-colors"
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
                        className="inline-flex items-center justify-center rounded-xl p-2 text-gray-400 hover:bg-white/5 hover:text-white lg:hidden"
                    >
                        <Icon name="menu" className="h-6 w-6" />
                    </button>

                    <div className="flex-1" />

                    {/* User dropdown */}
                    <div className="flex items-center gap-3">
                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-medium">{auth?.user?.name}</p>
                            <p className="text-xs text-gray-500">{auth?.user?.email}</p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                            {auth?.user?.name?.charAt(0) ?? 'A'}
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
        </div>
    );
}
