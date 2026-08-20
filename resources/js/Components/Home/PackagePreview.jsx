import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';
import Container from '@/Components/UI/Container';
import EmptyState from '@/Components/UI/EmptyState';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';
import SectionHeading from '@/Components/UI/SectionHeading';
import { formatPrice } from '@/Utils/format';
import { cn } from '@/Utils/cn';

function PlanCard({ plan }) {
    const featured = plan.isFeatured;

    return (
        <div
            className={cn(
                'relative flex h-full flex-col rounded-3xl border bg-surface p-8 transition-all duration-300',
                featured
                    ? 'border-primary/30 shadow-lift lg:-translate-y-4 lg:scale-[1.02]'
                    : 'border-border shadow-card hover:-translate-y-1 hover:shadow-card-hover',
            )}
        >
            {featured ? (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge variant="primary">{plan.badge}</Badge>
                </span>
            ) : null}

            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-base font-semibold text-foreground">{plan.name}</h3>
                    <p className="mt-1 text-sm text-muted">
                        {plan.type === 'business' ? 'Business' : 'Home'} plan
                    </p>
                </div>
                <Icon
                    name="bolt"
                    className={cn('h-5 w-5', featured ? 'text-primary' : 'text-muted')}
                />
            </div>

            <div className="mt-6">
                <span className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                    {plan.download}
                    <span className="text-xl font-bold text-muted"> Mbps</span>
                </span>
                <p className="mt-1 text-sm text-muted">
                    {plan.upload === plan.download ? 'Symmetric fiber' : `${plan.upload} Mbps upload`}
                </p>
            </div>

            <div className="mt-6 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-primary">{formatPrice(plan.price)}</span>
                <span className="text-sm text-muted">/{plan.billingLabel}</span>
            </div>

            <ul className="mt-6 space-y-3 border-t border-border pt-6">
                {plan.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {feature}
                    </li>
                ))}
            </ul>

            <div className="flex flex-1 items-end pt-8">
                <Button
                    href={route('contact.index')}
                    variant={featured ? 'primary' : 'outline'}
                    className="w-full"
                >
                    Choose {plan.name}
                </Button>
            </div>
        </div>
    );
}

export default function PackagePreview({ plans }) {
    return (
        <section className="section bg-background" aria-labelledby="packages-heading">
            <Container>
                <Reveal>
                    <SectionHeading
                        id="packages-heading"
                        eyebrow="Internet Packages"
                        title="Choose the speed that fits your life"
                        description="Every plan is unlimited, symmetric and backed by our 24/7 local support team. Start small and upgrade whenever you like."
                    />
                </Reveal>

                {plans.length === 0 ? (
                    <EmptyState
                        title="No packages available yet"
                        description="Our packages are being prepared. Check back soon or contact us directly."
                        className="mt-16"
                    />
                ) : (
                    <div className="mt-16 grid items-stretch gap-6 md:grid-cols-3">
                        {plans.map((plan, index) => (
                            <Reveal key={plan.id} delay={index * 100} className="h-full">
                                <PlanCard plan={plan} />
                            </Reveal>
                        ))}
                    </div>
                )}

                <div className="mt-14 text-center">
                    <Button href={route('plans.index')} variant="ghost" size="lg">
                        View all packages
                        <Icon name="arrow-right" className="h-4 w-4" />
                    </Button>
                </div>
            </Container>
        </section>
    );
}
