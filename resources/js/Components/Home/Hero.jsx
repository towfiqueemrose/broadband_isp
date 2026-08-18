import { usePage } from '@inertiajs/react';
import Button from '@/Components/UI/Button';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';
import NetworkVisual from '@/Components/Home/NetworkVisual';

const trustChips = ['Symmetrical fiber speeds', 'Unlimited data', '24/7 local support'];

export default function Hero() {
    const { brand } = usePage().props;

    return (
        <section className="relative overflow-hidden" aria-labelledby="hero-heading">
            <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_12%_0%,var(--primary-soft),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(45%_50%_at_95%_5%,var(--primary-soft),transparent_55%)]" />
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                    }}
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
            </div>

            <div className="container-page relative pb-20 pt-16 sm:pt-20 lg:pb-28 lg:pt-28">
                <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-7">
                        <Reveal>
                            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-xs font-semibold text-foreground backdrop-blur">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
                                Fiber-optic broadband · Now serving Dhaka
                            </span>
                        </Reveal>

                        <Reveal delay={80}>
                            <h1
                                id="hero-heading"
                                className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
                            >
                                Internet at the speed
                                <span className="block text-primary">of your ambition.</span>
                            </h1>
                        </Reveal>

                        <Reveal delay={160}>
                            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                                {brand.name} brings true fiber to your doorstep — symmetric speeds,
                                99.9% uptime and support that actually answers. Home or business,
                                we keep you connected.
                            </p>
                        </Reveal>

                        <Reveal delay={240}>
                            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Button href={route('contact.index')} size="lg">
                                    Get Connected
                                    <Icon name="arrow-up-right" className="h-4 w-4" />
                                </Button>
                                <Button href={route('plans.index')} variant="outline" size="lg">
                                    Explore Plans
                                </Button>
                            </div>
                        </Reveal>

                        <Reveal delay={320}>
                            <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2.5">
                                {trustChips.map((chip) => (
                                    <li
                                        key={chip}
                                        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted"
                                    >
                                        <Icon name="check" className="h-4 w-4 text-primary" />
                                        {chip}
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    </div>

                    <Reveal delay={200} className="lg:col-span-5">
                        <NetworkVisual />
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
