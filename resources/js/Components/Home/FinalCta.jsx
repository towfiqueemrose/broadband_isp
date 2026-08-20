import { Link } from '@inertiajs/react';
import Button from '@/Components/UI/Button';
import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';

export default function FinalCta({ cta }) {
    // Use dynamic CTA data if available, otherwise use defaults
    const title = cta?.title || 'Ready for internet that just works?';
    const description = cta?.description || 'Join thousands of customers enjoying fast, reliable fiber with support that actually answers. Most connections go live within 48 hours.';
    const primaryLabel = cta?.primary_label || 'Get connected today';
    const primaryUrl = cta?.primary_url || '/contact';
    const secondaryLabel = cta?.secondary_label || 'Browse packages';
    const secondaryUrl = cta?.secondary_url || '/plans';

    return (
        <section className="relative overflow-hidden bg-primary" aria-labelledby="cta-heading">
            <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage: 'radial-gradient(var(--primary-foreground) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
                aria-hidden="true"
            />
            <div
                className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary-dark/60 blur-3xl"
                aria-hidden="true"
            />
            <div
                className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary-light/20 blur-3xl"
                aria-hidden="true"
            />

            <div className="container-page section relative">
                <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
                    <Reveal>
                        <h2
                            id="cta-heading"
                            className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
                        >
                            {title}
                        </h2>
                    </Reveal>

                    <Reveal delay={100}>
                        <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
                            {description}
                        </p>
                    </Reveal>

                    <Reveal delay={200}>
                        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
                            {primaryLabel && (
                                <Button href={primaryUrl} variant="white" size="lg">
                                    {primaryLabel}
                                    <Icon name="arrow-up-right" className="h-4 w-4" />
                                </Button>
                            )}
                            {secondaryLabel && (
                                <Button href={secondaryUrl} variant="outline-light" size="lg">
                                    {secondaryLabel}
                                </Button>
                            )}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
