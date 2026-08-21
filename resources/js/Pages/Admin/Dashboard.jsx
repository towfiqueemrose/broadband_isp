import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Icon from '@/Components/UI/Icon';

function StatCard({ icon, label, value, href, color = 'primary' }) {
    const colors = {
        primary: 'bg-primary/10 text-primary',
        emerald: 'bg-emerald-500/10 text-emerald-400',
        amber: 'bg-amber-500/10 text-amber-400',
        blue: 'bg-blue-500/10 text-blue-400',
    };

    return (
        <Link
            href={href}
            className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-gray-900 p-5 transition-all duration-200 hover:border-white/10 hover:bg-gray-800"
        >
            <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colors[color]}`}>
                <Icon name={icon} className="h-6 w-6" />
            </span>
            <div className="flex-1">
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-sm text-gray-100">{label}</p>
            </div>
            <Icon name="arrow-right" className="h-4 w-4 text-gray-200 group-hover:text-gray-100 transition-colors" />
        </Link>
    );
}

function QuickAction({ href, icon, label }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 rounded-xl border border-white/5 bg-gray-800/50 px-4 py-3 text-sm font-medium text-gray-100 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-white"
        >
            <Icon name={icon} className="h-4 w-4 text-primary" />
            {label}
        </Link>
    );
}

const statusColors = {
    new: 'bg-blue-500/10 text-blue-400',
    read: 'bg-gray-500/10 text-gray-100',
    in_progress: 'bg-amber-500/10 text-amber-400',
    resolved: 'bg-emerald-500/10 text-emerald-400',
    archived: 'bg-gray-600/10 text-gray-200',
};

export default function Dashboard({ stats, recent_inquiries }) {
    return (
        <AdminLayout title="Dashboard">
            <div className="space-y-8">
                {/* Page header */}
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-100">Overview of your website content and activity.</p>
                </div>

                {/* Stats grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <StatCard icon="bolt" label="Total Packages" value={stats.total_packages} href={route('admin.plans.index')} color="primary" />
                    <StatCard icon="check-circle" label="Active Packages" value={stats.active_packages} href={route('admin.plans.index')} color="emerald" />
                    <StatCard icon="chat" label="Total Inquiries" value={stats.total_inquiries} href={route('admin.inquiries.index')} color="blue" />
                    <StatCard icon="mail" label="New Inquiries" value={stats.new_inquiries} href={route('admin.inquiries.index')} color="amber" />
                    <StatCard icon="users" label="Team Members" value={stats.total_team} href={route('admin.team.index')} color="primary" />
                    <StatCard icon="document" label="Active FAQs" value={stats.total_faqs} href={route('admin.faqs.index')} color="emerald" />
                </div>

                {/* Quick actions */}
                <div>
                    <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <QuickAction href={route('admin.plans.create')} icon="plus" label="Add Package" />
                        <QuickAction href={route('admin.home-hero.index')} icon="zap" label="Edit Homepage Hero" />
                        <QuickAction href={route('admin.faqs.create')} icon="plus" label="Add FAQ" />
                        <QuickAction href={route('admin.inquiries.index')} icon="chat" label="View Inquiries" />
                        <QuickAction href={route('admin.settings.theme')} icon="sparkles" label="Manage Theme" />
                        <QuickAction href={route('admin.settings.brand')} icon="building-office" label="Brand Settings" />
                        <QuickAction href={route('admin.team.create')} icon="plus" label="Add Team Member" />
                        <QuickAction href={route('admin.promotions.create')} icon="gift" label="Add Promotion" />
                    </div>
                </div>

                {/* Recent inquiries */}
                {recent_inquiries.length > 0 && (
                    <div>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Recent Inquiries</h2>
                            <Link
                                href={route('admin.inquiries.index')}
                                className="text-sm text-primary hover:text-primary-light transition-colors"
                            >
                                View all →
                            </Link>
                        </div>
                        <div className="overflow-hidden rounded-2xl border border-white/5">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/5 bg-gray-900">
                                        <th className="px-4 py-3 text-left font-medium text-gray-100">Name</th>
                                        <th className="px-4 py-3 text-left font-medium text-gray-100 hidden sm:table-cell">Subject</th>
                                        <th className="px-4 py-3 text-left font-medium text-gray-100 hidden md:table-cell">Date</th>
                                        <th className="px-4 py-3 text-left font-medium text-gray-100">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {recent_inquiries.map((inquiry) => (
                                        <tr key={inquiry.id} className="hover:bg-white/[0.02]">
                                            <td className="px-4 py-3">
                                                <Link href={route('admin.inquiries.show', inquiry.id)} className="font-medium hover:text-primary transition-colors">
                                                    {inquiry.name}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3 text-gray-100 hidden sm:table-cell">{inquiry.subject}</td>
                                            <td className="px-4 py-3 text-gray-200 hidden md:table-cell">
                                                {new Date(inquiry.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[inquiry.status] ?? 'bg-gray-500/10 text-gray-100'}`}>
                                                    {inquiry.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
