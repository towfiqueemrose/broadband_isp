import { usePage } from '@inertiajs/react';
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
                    <div className="text-center lg:text-left lg:col-span-7">
                        <Reveal>
                            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold text-foreground mx-auto lg:mx-0" style={color(heroData?.eyebrowTextColor)}>
                                <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
                                {eyebrowText}
                            </span>
                        </Reveal>

                        <Reveal delay={80}>
                            <h1
                                id="hero-heading"
                                className="mt-6 text-3xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
                                style={color(heroData?.mainHeadingTextColor)}
                            >
                                {mainHeading}
                                {highlightedText && (
                                    <span className="block text-primary" style={color(heroData?.highlightedTextColor)}>{highlightedText}</span>
                                )}
                            </h1>
                        </Reveal>

                        <Reveal delay={160}>
                            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg text-justify mx-auto lg:mx-0" style={color(heroData?.descriptionTextColor)}>
                                {description}
                            </p>
                        </Reveal>

                        <Reveal delay={240}>
                            <div className="mt-9 hidden lg:block">
                                <Button href={primaryCtaUrl} size="lg">
                                    {primaryCtaLabel}
                                    <Icon name="arrow-up-right" className="h-4 w-4" />
                                </Button>
                            </div>
                        </Reveal>

                        <Reveal delay={320}>
                            <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:justify-items-center lg:flex lg:flex-wrap lg:justify-start">
                                {(heroData?.trustChips?.length ? heroData.trustChips : defaultTrustChips).map((chip, i) => (
                                    <li
                                        key={`${chip}-${i}`}
                                        className="group relative inline-flex items-center justify-center gap-0 overflow-hidden rounded-[1.1rem] border border-white/40 bg-white/30 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur-xl transition-all duration-500 hover:border-white/60 hover:bg-white/40 hover:shadow-[0_8px_32px_rgba(71,2,189,0.12)] whitespace-nowrap sm:justify-center sm:text-center"
                                        style={color(heroData?.trustChipsColor)}
                                    >
                                        {/* Diamond cut corners */}
                                        <span className="pointer-events-none absolute -right-1.5 -top-1.5 h-4 w-4 rotate-45 border border-white/50 bg-background/40" />
                                        <span className="pointer-events-none absolute -bottom-1.5 -left-1.5 h-4 w-4 rotate-45 border border-white/50 bg-background/40" />

                                        {/* Glass diamond icon container */}
                                        <span className="relative mr-2.5 flex h-9 w-9 shrink-0 items-center justify-center">
                                            {/* Diamond shape behind icon */}
                                            <span className="absolute inset-0 rotate-45 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-inset ring-white/50 transition-all duration-500 group-hover:from-primary/30 group-hover:to-primary/10 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(71,2,189,0.2)]" />
                                            <Icon name="check" className="relative h-4 w-4 text-primary drop-shadow-sm" style={color(heroData?.trustChipsColor)} />
                                        </span>

                                        <span className="relative">
                                            {chip}
                                            {/* Subtle underline accent on hover */}
                                            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-primary/40 to-transparent transition-all duration-500 group-hover:w-full" />
                                        </span>

                                        {/* Top glow line */}
                                        <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
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
