import { cn } from '@/Utils/cn';
import Icon from '@/Components/UI/Icon';

export function controlClasses(hasError = false) {
    return cn(
        'w-full rounded-xl border bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted/60',
        'shadow-card transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
        hasError ? 'border-error' : 'border-border hover:border-primary/40',
    );
}

export default function Field({ label, htmlFor, required = false, error, hint, className, children }) {
    return (
        <div className={cn('space-y-1.5', className)}>
            {label ? (
                <label htmlFor={htmlFor} className="block text-sm font-semibold text-foreground">
                    {label}
                    {required ? (
                        <>
                            <span className="sr-only"> (required)</span>
                            <span aria-hidden="true" className="ml-0.5 text-error">
                                *
                            </span>
                        </>
                    ) : null}
                </label>
            ) : null}

            {children}

            {hint ? <p className="text-xs text-muted">{hint}</p> : null}

            {error ? (
                <p
                    id={`${htmlFor}-error`}
                    className="flex items-start gap-1.5 text-sm font-medium text-error"
                    role="alert"
                >
                    <Icon name="x" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {error}
                </p>
            ) : null}
        </div>
    );
}