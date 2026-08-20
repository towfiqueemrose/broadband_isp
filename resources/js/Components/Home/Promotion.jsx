import Button from '@/Components/UI/Button';
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
            className="relative overflow-hidden bg-secondary"
            aria-labelledby="promo-heading"
        >
            {/* Gradient mesh overlay */}
            <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />
                <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Dot grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage:
                        'radial-gradient(var(--primary-foreground) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }}
                aria-hidden="true"
            />

            <div className="container-page section relative">
                <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* Left — Copy */}
                    <div className="flex flex-col text-left">
                        {eyebrow && (
                            <Reveal>
                                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
                                    <Icon name="sparkles" className="h-3.5 w-3.5" />
                                    {eyebrow}
                                </span>
                            </Reveal>
                        )}

                        <Reveal delay={80}>
                            <h2
                                id="promo-heading"
                                className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
                            >
                                {title}
                            </h2>
                        </Reveal>

                        {description && (
                            <Reveal delay={160}>
                                <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
                                    {description}
                                </p>
                            </Reveal>
                        )}

                        {/* Detail chips */}
                        {details.length > 0 && (
                            <Reveal delay={240}>
                                <div className="mt-6 flex flex-wrap gap-2.5">
                                    {details.map((detail) => (
                                        <span
                                            key={detail}
                                            className="group inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors duration-200 hover:border-white/20 hover:bg-white/10"
                                        >
                                            <Icon
                                                name="check-circle"
                                                className="h-4 w-4 text-accent transition-transform duration-200 group-hover:scale-110"
                                            />
                                            {detail}
                                        </span>
                                    ))}
                                </div>
                            </Reveal>
                        )}
                    </div>

                    {/* Right — Visual */}
                    <Reveal delay={200} className="relative hidden lg:flex">
                        <div className="relative mx-auto w-full max-w-md">
                            {/* Decorative card */}
                            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                                {/* Shimmer accent line */}
                                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-accent via-primary-light to-accent" />

                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
                                        <Icon name="gift" className="h-7 w-7 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white/50 uppercase tracking-wider">
                                            Limited Offer
                                        </p>
                                        <p className="text-lg font-bold text-white">
                                            {title}
                                        </p>
                                    </div>
                                </div>

                                {details.length > 0 && (
                                    <div className="mt-6 space-y-3">
                                        {details.slice(0, 4).map((detail) => (
                                            <div
                                                key={detail}
                                                className="flex items-center gap-2.5 text-sm text-white/75"
                                            >
                                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20">
                                                    <Icon
                                                        name="check"
                                                        className="h-3 w-3 text-accent"
                                                    />
                                                </span>
                                                {detail}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-6 border-t border-white/10 pt-4">
                                    <Button href={ctaUrl} variant="outline-light" size="md" className="w-full">
                                        {ctaLabel}
                                        <Icon name="arrow-right" className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Floating glow */}
                            <div className="absolute -inset-8 -z-10 rounded-3xl bg-gradient-to-br from-primary/15 to-accent/10 blur-2xl" />
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
