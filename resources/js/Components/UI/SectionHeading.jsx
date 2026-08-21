import { cn } from '@/Utils/cn';

export default function SectionHeading({
    eyebrow,
    title,
    description,
    align = 'center',
    dark = false,
    className,
    id,
}) {
    return (
        <div
            className={cn(
                'max-w-2xl',
                align === 'center' ? 'mx-auto text-center' : 'text-center lg:text-left',
                className,
            )}
        >
            {eyebrow ? (
                <span
                    className={cn(
                        'mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest',
                        dark ? 'bg-white/10 text-white' : 'bg-primary-soft text-primary-dark',
                    )}
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {eyebrow}
                </span>
            ) : null}

            <h2
                id={id}
                className={cn(
                    'text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl',
                    dark && 'text-white',
                )}
            >
                {title}
            </h2>

            {description ? (
                <p
                    className={cn(
                        'mt-4 text-base leading-relaxed text-muted sm:text-lg text-justify',
                        dark && 'text-white/70',
                    )}
                >
                    {description}
                </p>
            ) : null}
        </div>
    );
}
