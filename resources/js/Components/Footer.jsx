import { Link, usePage } from '@inertiajs/react';
import BrandLogo from '@/Components/BrandLogo';
import Icon from '@/Components/UI/Icon';

const columns = [
    {
        title: 'Company',
        links: [
            { name: 'Home', route: 'home' },
            { name: 'About', route: 'about.index' },
            { name: 'Contact', route: 'contact.index' },
        ],
    },
    {
        title: 'Services',
        links: [
            { name: 'Home Broadband', route: 'plans.index' },
            { name: 'Business Internet', route: 'plans.index' },
            { name: 'Coverage', route: 'coverage.index' },
        ],
    },
    {
        title: 'Support',
        links: [
            { name: 'FAQ', route: 'faq.index' },
            { name: 'Check Coverage', route: 'coverage.index' },
            { name: 'Privacy Policy', route: 'legal.privacy' },
            { name: 'Terms of Service', route: 'legal.terms' },
        ],
    },
];

export default function Footer() {
    const { brand } = usePage().props;
    const year = new Date().getFullYear();

    return (
        <footer className="bg-ink text-white/70">
            <div className="container-page">
                <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-2.5">
                            <BrandLogo />
                            <span className="text-lg font-bold text-white">{brand.name}</span>
                        </div>
                        <p className="mt-5 max-w-sm text-sm leading-relaxed">{brand.tagline}</p>

                        <div className="mt-6 flex items-center gap-2.5">
                            {Object.entries(brand.socials).map(([name, url]) => (
                                <a
                                    key={name}
                                    href={url}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={`${brand.name} on ${name}`}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                                >
                                    <Icon name={name} className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {columns.map((column) => (
                        <div key={column.title} className="lg:col-span-2">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                                {column.title}
                            </h3>
                            <ul className="mt-5 space-y-3">
                                {column.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={route(link.route)}
                                            className="text-sm transition-colors duration-200 hover:text-primary-light"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                            Contact
                        </h3>
                        <ul className="mt-5 space-y-3.5 text-sm">
                            <li className="flex items-start gap-2.5">
                                <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" />
                                <span>{brand.contact.hotline}</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" />
                                <span>{brand.contact.email}</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <Icon name="map-pin" className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" />
                                <span>{brand.contact.address}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs sm:flex-row">
                    <p>
                        © {year} {brand.name}. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href={route('legal.privacy')}
                            className="transition-colors hover:text-primary-light"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href={route('legal.terms')}
                            className="transition-colors hover:text-primary-light"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
