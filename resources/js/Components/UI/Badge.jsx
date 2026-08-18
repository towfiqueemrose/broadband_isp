import { cn } from '@/Utils/cn';

const variants = {
    primary: 'bg-primary text-primary-foreground',
    soft: 'bg-primary-soft text-primary-dark',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    outline: 'border border-border text-muted',
    light: 'bg-white/10 text-white',
};

export default function Badge({ children, variant = 'soft', className }) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide',
                variants[variant],
                className,
            )}
        >
            {children}
        </span>
    );
}
