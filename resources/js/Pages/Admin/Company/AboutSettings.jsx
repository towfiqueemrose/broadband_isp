import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import { Link } from '@inertiajs/react';
import Icon from '@/Components/UI/Icon';

function SettingCard({ title, description, href, icon }) {
    return (
        <Link href={href} className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-gray-900 p-5 transition-all hover:border-primary/30 hover:bg-gray-800">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Icon name={icon} className="h-5 w-5" />
            </span>
            <div className="flex-1">
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-gray-400">{description}</p>
            </div>
            <Icon name="arrow-right" className="h-4 w-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
        </Link>
    );
}

export default function AboutSettings() {
    return (
        <AdminLayout title="About Page Settings">
            <PageHeader title="About Page" description="Manage content sections for the About page." />
            <div className="grid gap-4 sm:grid-cols-2">
                <SettingCard title="Mission" description="Company mission statement" href={route('admin.company.mission.index')} icon="eye" />
                <SettingCard title="Vision" description="Company vision statement" href={route('admin.company.vision.index')} icon="globe" />
                <SettingCard title="Core Values" description="Company core values" href={route('admin.core-values.index')} icon="heart" />
                <SettingCard title="Journey" description="Company milestones and timeline" href={route('admin.company.journey.index')} icon="activity" />
                <SettingCard title="Team Members" description="Leadership and general team" href={route('admin.team.index')} icon="users" />
                <SettingCard title="Statistics" description="Trust statistics for about page" href={route('admin.statistics.index')} icon="signal" />
                <SettingCard title="Final CTA" description="About page call to action" href={route('admin.page-ctas.index')} icon="arrow-up-circle" />
            </div>
        </AdminLayout>
    );
}
