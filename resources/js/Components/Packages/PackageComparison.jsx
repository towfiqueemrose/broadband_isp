import Button from '@/Components/UI/Button';
import Container from '@/Components/UI/Container';
import Icon from '@/Components/UI/Icon';
import Reveal from '@/Components/UI/Reveal';
import SectionHeading from '@/Components/UI/SectionHeading';
import { formatPrice } from '@/Utils/format';
import { cn } from '@/Utils/cn';

function BooleanValue({ value }) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 text-sm font-medium',
                value ? 'text-success' : 'text-muted',
            )}
        >
            <Icon name={value ? 'check-circle' : 'x'} className="h-4 w-4" />
            {value ? 'Yes' : 'No'}
        </span>
    );
}

export default function PackageComparison({ plans, content }) {
    if (plans.length < 2) {
        return null;
    }

    const attributes = content.attributes ?? [];

    return (
        <section className="section bg-background" aria-labelledby="comparison-heading">
            <Container>
                <Reveal>
                    <SectionHeading
                        id="comparison-heading"
                        eyebrow={content.eyebrow}
                        title={content.title}
                        description={content.description}
                    />
                </Reveal>

                <Reveal delay={120}>
                    <div className="relative mt-12">
                        <div
                            className="overflow-x-auto rounded-3xl border border-border bg-surface shadow-card"
                            tabIndex={0}
                            aria-label="Package comparison table, scroll horizontally on smaller screens"
                        >
                            <table className="w-full border-collapse text-left">
                                <caption className="sr-only">
                                    Side-by-side comparison of internet packages
                                </caption>

                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="sticky left-0 z-10 w-40 min-w-[10rem] bg-surface-2 px-5 py-4 text-left align-bottom"
                                        >
                                            <span className="sr-only">Package</span>
                                        </th>
                                        {plans.map((plan) => (
                                            <th
                                                key={plan.id}
                                                scope="col"
                                                className="min-w-[10rem] border-l border-border bg-surface-2 px-5 py-4 align-bottom"
                                            >
                                                <div className="text-sm font-bold text-foreground">
                                                    {plan.name}
                                                </div>
                                                <div className="mt-1 text-xs font-semibold text-primary">
                                                    {plan.download} Mbps
                                                </div>
                                                {plan.isFeatured && plan.badge ? (
                                                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-0.5 text-[11px] font-semibold text-primary-dark">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                        {plan.badge}
                                                    </span>
                                                ) : null}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <th
                                            scope="row"
                                            className="sticky left-0 z-10 bg-surface px-5 py-4 text-sm font-semibold text-foreground"
                                        >
                                            Monthly price
                                        </th>
                                        {plans.map((plan) => (
                                            <td
                                                key={plan.id}
                                                className="border-l border-border px-5 py-4"
                                            >
                                                {plan.promo ? (
                                                    <span className="mr-2 text-sm text-muted line-through">
                                                        {formatPrice(plan.promo.originalPrice)}
                                                    </span>
                                                ) : null}
                                                <span className="text-base font-bold text-primary">
                                                    {formatPrice(
                                                        plan.promo ? plan.promo.price : plan.price,
                                                    )}
                                                </span>
                                                <span className="ml-1 text-xs text-muted">
                                                    /{plan.billingLabel}
                                                </span>
                                            </td>
                                        ))}
                                    </tr>

                                    {attributes.map((attribute) => (
                                        <tr key={attribute.key}>
                                            <th
                                                scope="row"
                                                className="sticky left-0 z-10 border-t border-border bg-surface px-5 py-4 text-sm font-semibold text-foreground"
                                            >
                                                {attribute.label}
                                            </th>
                                            {plans.map((plan) => {
                                                const value = plan.attributes?.[attribute.key];

                                                return (
                                                    <td
                                                        key={plan.id}
                                                        className="border-l border-t border-border px-5 py-4 text-sm text-muted"
                                                    >
                                                        {attribute.type === 'boolean' ? (
                                                            <BooleanValue value={value === true} />
                                                        ) : (
                                                            <span className="inline-flex items-start gap-1.5">
                                                                {value ? (
                                                                    <Icon
                                                                        name="check"
                                                                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                                                                    />
                                                                ) : null}
                                                                {value || '—'}
                                                            </span>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}

                                    <tr>
                                        <th
                                            scope="row"
                                            className="sticky left-0 z-10 border-t border-border bg-surface px-5 py-4 text-sm font-semibold text-foreground"
                                        >
                                            <span className="sr-only">Action</span>
                                        </th>
                                        {plans.map((plan) => (
                                            <td
                                                key={plan.id}
                                                className="border-l border-t border-border px-5 py-4"
                                            >
                                                <Button
                                                    href={route('contact.index', {
                                                        plan: plan.slug,
                                                    })}
                                                    variant={plan.isFeatured ? 'primary' : 'outline'}
                                                    size="sm"
                                                    className="w-full"
                                                    aria-label={`Choose ${plan.name}`}
                                                >
                                                    Choose
                                                    <Icon name="arrow-right" className="h-3.5 w-3.5" />
                                                </Button>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-muted lg:hidden">
                            <Icon name="chevron-down" className="h-4 w-4 -rotate-90" />
                            Scroll sideways to compare every package
                        </p>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}