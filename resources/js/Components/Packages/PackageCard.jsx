import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';
import Icon from '@/Components/UI/Icon';
import { formatPrice } from '@/Utils/format';
import { cn } from '@/Utils/cn';

export default function PackageCard({ plan, categoryLabel }) {
    const featured = plan.isFeatured;
    const promo = plan.promo;
    const freeInstall = plan.installationFee === 0;

    return (
        <div
            className={cn(
                'relative flex h-full flex-col rounded-3xl border bg-surface p-7 transition-all duration-300 sm:p-8',
                featured
                    ? 'border-primary/40 shadow-lift ring-1 ring-primary/10 lg:-translate-y-3'
                    : 'border-border shadow-card hover:-translate-y-1 hover:shadow-card-hover',
            )}
        >
            {featured && plan.badge ? (
                <span className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2">
                    <Badge variant="primary">{plan.badge}</Badge>
                </span>
            ) : null}

            <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                    {categoryLabel ?? plan.type}
                </span>
                {promo ? (
                    <Badge variant="success">
                        <Icon name="sparkles" className="h-3 w-3" />
                        {promo.label ?? 'Special offer'}
                    </Badge>
                ) : null}
            </div>

            <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">{plan.name}</h3>

            <div className="mt-5">
                <span className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                    {plan.download}
                    <span className="text-xl font-bold text-muted"> Mbps</span>
                </span>
                <p className="mt-1 text-sm text-muted">
                    {plan.upload === plan.download
                        ? 'Symmetric fiber'
                        : `${plan.upload} Mbps upload`}
                </p>
            </div>

            <div className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                {promo ? (
                    <span className="text-lg font-semibold text-muted line-through">
                        {formatPrice(promo.originalPrice)}
                    </span>
                ) : null}
                <span className="text-2xl font-bold text-primary sm:text-3xl">
                    {formatPrice(promo ? promo.price : plan.price)}
                </span>
                <span className="text-sm text-muted">/{plan.billingLabel}</span>
            </div>

            {promo?.description ? (
                <p className="mt-2 text-sm text-success">{promo.description}</p>
            ) : null}

            <p className="mt-4 text-sm leading-relaxed text-muted">{plan.description}</p>

            <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
                {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {feature}
                    </li>
                ))}
            </ul>

            <div className="mt-auto flex flex-col gap-4 pt-8">
                <p className="flex items-center gap-1.5 text-xs text-muted">
                    <Icon
                        name={freeInstall ? 'gift' : 'document'}
                        className={cn('h-4 w-4 shrink-0', freeInstall && 'text-success')}
                    />
                    {freeInstall
                        ? 'Free installation & router'
                        : `${formatPrice(plan.installationFee)} one-time installation`}
                </p>
                <Button
                    href={route('contact.index', { plan: plan.slug })}
                    variant={featured ? 'primary' : 'outline'}
                    className="w-full"
                >
                    Choose {plan.name}
                </Button>
            </div>
        </div>
    );
}