import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import BrandLogo from '@/Components/BrandLogo';
import Button from '@/Components/UI/Button';
import Icon from '@/Components/UI/Icon';
import { useScrollPosition } from '@/Hooks/useScrollPosition';
import { cn } from '@/Utils/cn';

const navItems = [
    { name: 'Home', route: 'home' },
    { name: 'About', route: 'about.index' },
    { name: 'Plans', route: 'plans.index' },
    { name: 'Coverage', route: 'coverage.index' },
    { name: 'FAQ', route: 'faq.index' },
    { name: 'Contact', route: 'contact.index' },
];

export default function Header() {
    const { brand } = usePage().props;
    const scrolled = useScrollPosition(16);
    const [open, setOpen] = useState(false);

    return (
        <header className="bg-secondary">
            <div className="hidden bg-primary text-secondary lg:block">
                <div className="container-page flex h-9 items-center justify-between text-xs">
                    <div className="flex items-center gap-6">
                        <span className="inline-flex items-center gap-1.5">
                            <Icon name="phone" className="h-3.5 w-3.5 font-bold" />
                            {brand.contact.hotline}
                        </span>
                        <span className="hidden items-center gap-1.5 xl:inline-flex">
                            <Icon name="mail" className="h-3.5 w-3.5" />
                            {brand.contact.email}
                        </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5">
                        <Icon name="clock" className="h-3.5 w-3.5" />
                        {brand.contact.hours}
                    </span>
                </div>
            </div>

            <div className="container-page">
                <div className="flex h-16 items-center justify-between lg:h-[72px]">
                    <Link
                        href={route('home')}
                        className="flex items-center gap-2.5"
                        aria-label={`${brand.name} homepage`}
                    >
                        <BrandLogo />
                        <span className="text-lg font-bold tracking-tight text-white">
                            {brand.name}
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
                        {navItems.map((item) => {
                            const active = route().current(item.route);

                            return (
                                <Link
                                    key={item.route}
                                    href={route(item.route)}
                                    aria-current={active ? 'page' : undefined}
                                    className={cn(
                                        'rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200',
                                        active
                                            ? 'bg-primary-soft text-primary-dark'
                                            : 'text-white/80 hover:bg-white/10 hover:text-white',
                                    )}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="hidden items-center gap-3 lg:flex">
                        <Button href={route('contact.index')} className="px-6">
                            Get Connected
                            <Icon name="arrow-up-right" className="h-4 w-4" />
                        </Button>
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpen((value) => !value)}
                        aria-expanded={open}
                        aria-controls="mobile-nav"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 lg:hidden"
                    >
                        <Icon name={open ? 'x' : 'menu'} className="h-6 w-6" />
                    </button>
                </div>
            </div>

            <div
                id="mobile-nav"
                className={cn(
                    'grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out lg:hidden',
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
            >
                <div className="min-h-0">
                    <nav
                        className="border-t border-white/10 bg-secondary px-4 pb-6 pt-2"
                        aria-label="Mobile navigation"
                    >
                        <div className="flex flex-col gap-1">
                            {navItems.map((item) => {
                                const active = route().current(item.route);

                                return (
                                    <Link
                                        key={item.route}
                                        href={route(item.route)}
                                        onClick={() => setOpen(false)}
                                        aria-current={active ? 'page' : undefined}
                                        className={cn(
                                            'flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold transition-colors',
                                            active
                                                ? 'bg-primary-soft text-primary-dark'
                                                : 'text-white hover:bg-white/10',
                                        )}
                                    >
                                        {item.name}
                                        <Icon name="arrow-right" className="h-4 w-4 opacity-40" />
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="mt-4 px-2">
                            <Button
                                href={route('contact.index')}
                                onClick={() => setOpen(false)}
                                className="w-full"
                                size="lg"
                            >
                                Get Connected
                                <Icon name="arrow-up-right" className="h-4 w-4" />
                            </Button>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
