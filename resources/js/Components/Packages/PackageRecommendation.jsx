import { Link } from '@inertiajs/react';
import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';
import SectionHeading from '@/Components/UI/SectionHeading';
import { formatPrice } from '@/Utils/format';

export default function PackageRecommendation({ recommendations, plans }) {
    const bySlug = new Map(plans.map((plan) => [plan.slug, plan]));

    return (
        <section className="section bg-background" aria-labelledby="recommendation-heading">
            <Container>
                <Reveal>
                    <SectionHeading
                        id="recommendation-heading"
                        eyebrow="How to choose"
                        title="Which package suits you?"
                        description="Not sure where to start? Match your situation to the right speed — upgrade anytime without changing your router."
                    />
                </Reveal>

                <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {recommendations.map((item, index) => {
                        const plan = bySlug.get(item.plan);

                        return (
                            <Reveal key={item.title} delay={index * 80} className="h-full">
                                <div className="flex h-full flex-col rounded-3xl border border-border bg-surface p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary-dark">
                                        <Icon name={item.icon} className="h-6 w-6" />
                                    </span>
                                    <h3 className="mt-5 text-base font-bold text-foreground">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted">
                                        {item.description}
                                    </p>

                                    {plan ? (
                                        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                                            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                                                Suggested · {plan.name}
                                                <span className="block text-primary">
                                                    {plan.download} Mbps ·{' '}
                                                    {plan.promo
                                                        ? formatPrice(plan.promo.price)
                                                        : formatPrice(plan.price)}
                                                    /mo
                                                </span>
                                            </span>
                                            <Link
                                                href={route('contact.index', { plan: plan.slug })}
                                                aria-label={`Get ${plan.name} package`}
                                                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                            >
                                                <Icon name="arrow-up-right" className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    ) : null}
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}