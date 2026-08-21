import { usePage, Link } from '@inertiajs/react';
import Button from '@/Components/UI/Button';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';
import NetworkVisual from '@/Components/Home/NetworkVisual';

const defaultTrustChips = ['Symmetrical fiber speeds', 'Unlimited data', '24/7 local support'];

export default function Hero({ hero: heroData }) {
    const { brand } = usePage().props;

    // Use dynamic hero data if available, otherwise use defaults
    const eyebrowText = heroData?.eyebrowText || 'Fiber-optic broadband · Now serving Dhaka';
    const mainHeading = heroData?.mainHeading || 'Internet at the speed';
    const highlightedText = heroData?.highlightedText || 'of your ambition.';
    const description = heroData?.description || `${brand.name} brings true fiber to your doorstep — symmetric speeds, 99.9% uptime and support that actually answers. Home or business, we keep you connected.`;
    const primaryCtaLabel = heroData?.primaryCtaLabel || 'Get Connected';
    const primaryCtaUrl = heroData?.primaryCtaUrl || '/contact';
    const secondaryCtaLabel = heroData?.secondaryCtaLabel || 'Explore Plans';
    const secondaryCtaUrl = heroData?.secondaryCtaUrl || '/plans';

    const color = (val) => val ? { color: val } : undefined;

    return (
        <section className="relative overflow-hidden bg-background" aria-labelledby="hero-heading">
            <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
            </div>

            {heroData?.heroImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(/storage/${heroData.heroImage})`,
                        opacity: (heroData.heroImageOpacity ?? 40) / 100,
                    }}
                    aria-hidden="true"
                />
            )}

            <div className="container-page relative pb-20 pt-16 sm:pt-20 lg:pb-28 lg:pt-28">
                <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-7">
                        <Reveal>
                            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold text-foreground" style={color(heroData?.eyebrowTextColor)}>
                                <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
                                {eyebrowText}
                            </span>
                        </Reveal>

                        <Reveal delay={80}>
                            <h1
                                id="hero-heading"
                                className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
                                style={color(heroData?.mainHeadingTextColor)}
                            >
                                {mainHeading}
                                {highlightedText && (
                                    <span className="block text-primary" style={color(heroData?.highlightedTextColor)}>{highlightedText}</span>
                                )}
                            </h1>
                        </Reveal>

                        <Reveal delay={160}>
                            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg" style={color(heroData?.descriptionTextColor)}>
                                {description}
                            </p>
                        </Reveal>

                        <Reveal delay={240}>
                            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Button href={primaryCtaUrl} size="lg">
                                    {primaryCtaLabel}
                                    <Icon name="arrow-up-right" className="h-4 w-4" />
                                </Button>
                            </div>
                        </Reveal>

                        <Reveal delay={320}>
                            <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2.5">
                                {defaultTrustChips.map((chip) => (
                                    <li
                                        key={chip}
                                        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted"
                                        style={color(heroData?.trustChipsColor)}
                                    >
                                        <Icon name="check" className="h-4 w-4 text-primary" style={color(heroData?.trustChipsColor)} />
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
