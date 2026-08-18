import { Link } from '@inertiajs/react';
import { cn } from '@/Utils/cn';

const variants = {
    primary: 'bg-primary text-primary-foreground shadow-soft hover:bg-primary-dark',
    secondary: 'bg-secondary text-white shadow-soft hover:bg-secondary/90',
    outline: 'border border-border bg-transparent text-foreground hover:border-primary/40 hover:bg-surface-2',
    ghost: 'bg-transparent text-foreground hover:bg-surface-2',
    soft: 'bg-primary-soft text-primary-dark hover:bg-primary/15',
    white: 'bg-white text-primary shadow-soft hover:bg-white/90',
    'outline-light': 'border border-white/30 text-white hover:bg-white/10',
};

const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
};

export default function Button({
    children,
    href,
    external = false,
    variant = 'primary',
    size = 'md',
    type = 'button',
    disabled = false,
    className,
    onClick,
}) {
    const classes = cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:pointer-events-none disabled:opacity-60',
        'active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className,
    );

    if (href) {
        if (external) {
            return (
                <a href={href} target="_blank" rel="noreferrer" className={classes}>
                    {children}
                </a>
            );
        }

        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} disabled={disabled} onClick={onClick} className={classes}>
            {children}
        </button>
    );
}
