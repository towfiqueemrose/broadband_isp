import { cn } from '@/Utils/cn';
import Button from '@/Components/UI/Button';
import Icon from '@/Components/UI/Icon';

export default function EmptyState({ icon = 'globe', title, description, action, className }) {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center',
                className,
            )}
        >
            <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary-dark">
                <Icon name={icon} className="h-7 w-7" />
            </span>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            {description ? <p className="mt-2 max-w-md text-sm text-muted">{description}</p> : null}
            {action ? <div className="mt-6">{action}</div> : null}
        </div>
    );
}
