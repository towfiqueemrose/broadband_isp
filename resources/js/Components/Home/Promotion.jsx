import Button from '@/Components/UI/Button';
import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';

export default function Promotion({ offer }) {
    if (!offer) return null;

    const eyebrow = offer.eyebrow;
    const title = offer.title;
    const description = offer.description;
    const details = offer.details || [];
    const cta = offer.cta || {};
    const ctaLabel = cta.label || 'Learn more';
    const ctaUrl = cta.url || cta.route || '/contact';

    return (
        <section
            className="relative overflow-hidden bg-primary"
            aria-labelledby="offer-heading"
        >
            <div
                className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary-foreground/10"
                aria-hidden="true"
            />
            <div
                className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-primary-dark/60"
                aria-hidden="true"
            />
            <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage: 'radial-gradient(var(--primary-foreground) 1px, transparent 1px)',
                    backgroundSize: '26px 26px',
                }}
                aria-hidden="true"
            />

            <div className="container-page section relative">
                <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                    <Reveal>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
                            <Icon name="gift" className="h-4 w-4" />
                            {eyebrow}
                        </span>
                    </Reveal>

                    <Reveal delay={80}>
                        <h2
                            id="offer-heading"
                            className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
                        >
                            {title}
                        </h2>
                    </Reveal>

                    <Reveal delay={160}>
                        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                            {description}
                        </p>
                    </Reveal>

                    {details.length > 0 && (
                        <Reveal delay={240}>
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                                {details.map((detail) => (
                                    <span
                                        key={detail}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium text-white"
                                    >
                                        <Icon name="check" className="h-4 w-4" />
                                        {detail}
                                    </span>
                                ))}
                            </div>
                        </Reveal>
                    )}

                    {ctaLabel && (
                        <Reveal delay={320}>
                            <div className="mt-10">
                                <Button href={ctaUrl} variant="white" size="lg">
                                    {ctaLabel}
                                    <Icon name="arrow-up-right" className="h-4 w-4" />
                                </Button>
                            </div>
                        </Reveal>
                    )}
                </div>
            </div>
        </section>
    );
}
