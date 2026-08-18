import { cn } from '@/Utils/cn';

export default function Card({ children, className, as: Tag = 'div' }) {
    return (
        <Tag className={cn('rounded-2xl border border-border bg-surface shadow-card', className)}>
            {children}
        </Tag>
    );
}
