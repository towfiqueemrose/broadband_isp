import { cn } from '@/Utils/cn';

function Tab({ active, onClick, label, count, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={cn(
                'relative px-3.5 py-2.5 text-sm font-semibold transition-colors duration-200 sm:px-4',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                active ? 'text-primary-dark' : 'text-muted hover:text-foreground',
            )}
        >
            {label}
            <span
                className={cn(
                    'ml-1.5 text-xs font-medium',
                    active ? 'text-primary' : 'text-muted',
                )}
            >
                {count}
            </span>
            <span
                aria-hidden="true"
                className={cn(
                    'absolute inset-x-2 -bottom-0.5 h-0.5 origin-left rounded-full bg-primary transition-transform duration-300 ease-out',
                    active ? 'scale-x-100' : 'scale-x-0',
                )}
            />
        </button>
    );
}

export default function PackageCategories({ categories, activeType, allCount, onChange, gridId }) {
    const active = categories.find((category) => category.type === activeType);

    return (
        <div>
            <div className="-mx-4 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
                <div
                    role="group"
                    aria-label="Package categories"
                    className="mx-auto flex w-max items-center gap-1 border-b border-border sm:gap-2"
                >
                    <Tab
                        active={activeType === 'all'}
                        onClick={() => onChange('all')}
                        label="All packages"
                        count={allCount}
                    />

                    {categories.map((category) => (
                        <Tab
                            key={category.type}
                            active={activeType === category.type}
                            onClick={() => onChange(category.type)}
                            label={category.label}
                            count={category.count}
                        />
                    ))}
                </div>
            </div>

            <p
                id={`${gridId}-description`}
                className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-muted"
            >
                {activeType === 'all'
                    ? 'Everything we offer, side by side — switch categories to focus on what fits.'
                    : active?.description}
            </p>
        </div>
    );
}