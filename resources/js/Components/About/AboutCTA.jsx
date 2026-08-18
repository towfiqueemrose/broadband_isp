import { usePage } from '@inertiajs/react';
import Button from '@/Components/UI/Button';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';
import Container from '@/Components/UI/Container';

export default function AboutCTA({ content }) {
    const { brand } = usePage().props;

    return (
        <section className="relative overflow-hidden" aria-labelledby="about-cta-heading">
            <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_20%_0%,var(--primary-soft),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(45%_50%_at_85%_5%,var(--primary-soft),transparent_55%)]" />
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                    }}
                />
            </div>

            <Container className="relative py-16 sm:py-20 lg:py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <Reveal>
                        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-xs font-semibold text-foreground backdrop-blur">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                            Next Step
                        </span>
                    </Reveal>

                    <Reveal delay={80}>
                        <h2
                            id="about-cta-heading"
                            className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
                        >
                            {content.title}
                        </h2>
                    </Reveal>

                    <Reveal delay={160}>
                        <p className="mt-6 max-w-2xl mx-auto text-base leading-relaxed text-muted sm:text-lg">
                            {content.description}
                        </p>
                    </Reveal>

                    <Reveal delay={240}>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Button href={content.primary.route ? route(content.primary.route) : '#'} size="lg">
                                {content.primary.label}
                                <Icon name="arrow-up-right" className="h-4 w-4" />
                            </Button>
                            {content.secondary && (
                                <Button href={content.secondary.route ? route(content.secondary.route) : '#'} variant="outline" size="lg">
                                    {content.secondary.label}
                                </Button>
                            )}
                        </div>
                    </Reveal>

                    <Reveal delay={320}>
                        <p className="mt-8 text-sm text-muted/80">
                            Questions? Call us at {brand.contact.hotline} or email {brand.contact.email}
                        </p>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}
