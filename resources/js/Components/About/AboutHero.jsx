import { usePage } from '@inertiajs/react';
import Button from '@/Components/UI/Button';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';
import Container from '@/Components/UI/Container';

export default function AboutHero({ content }) {
    const { brand } = usePage().props;

    return (
        <section className="relative overflow-hidden" aria-labelledby="about-hero-heading">
            <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(45%_50%_at_15%_0%,var(--primary-soft),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(40%_50%_at_90%_10%,var(--primary-soft),transparent_60%)]" />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />
            </div>

            <Container className="relative py-16 sm:py-20 lg:py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <Reveal>
                        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-xs font-semibold text-foreground backdrop-blur">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                            {content.eyebrow}
                        </span>
                    </Reveal>

                    <Reveal delay={80}>
                        <h1
                            id="about-hero-heading"
                            className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
                        >
                            {content.title}
                        </h1>
                    </Reveal>

                    <Reveal delay={160}>
                        <p className="mt-6 max-w-2xl mx-auto text-base leading-relaxed text-muted sm:text-lg">
                            {content.description}
                        </p>
                    </Reveal>

                    <Reveal delay={240}>
                        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Button href={route('plans.index')} size="lg">
                                Explore Packages
                                <Icon name="arrow-up-right" className="h-4 w-4" />
                            </Button>
                            <Button href={route('contact.index')} variant="outline" size="lg">
                                Get Connected
                            </Button>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}
