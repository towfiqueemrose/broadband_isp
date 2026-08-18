import { cn } from '@/Utils/cn';

export default function BrandLogo({ className = 'h-9 w-9' }) {
    return (
        <span
            className={cn(
                'inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark text-primary-foreground shadow-soft',
                className,
            )}
            aria-hidden="true"
        >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-[52%] w-[52%]">
                <rect x="5" y="15.5" width="3" height="5.5" rx="1.2" />
                <rect x="10.5" y="11" width="3" height="10" rx="1.2" />
                <rect x="16" y="6.5" width="3" height="14.5" rx="1.2" />
            </svg>
        </span>
    );
}
