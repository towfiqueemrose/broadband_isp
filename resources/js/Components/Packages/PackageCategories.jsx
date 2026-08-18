import { cn } from '@/Utils/cn';

function Tab({ active, onClick, label, count }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={cn(
                'relative flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                active
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-slate-200'
            )}
        >
            <span>{label}</span>
            <span
                className={cn(
                    'flex h-5 items-center justify-center rounded-full px-2 text-xs font-bold transition-colors duration-300',
                    active
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-500'
                )}
            >
                {count}
            </span>
        </button>
    );
}

export default function PackageCategories({ categories, activeType, allCount, onChange, gridId }) {
    const active = categories.find((category) => category.type === activeType);

    return (
        <div>
            <div className="-mx-4 overflow-x-auto px-4 pb-4 no-scrollbar sm:mx-0 sm:px-0 sm:pb-0">
                <div
                    role="group"
                    aria-label="Package categories"
                    className="mx-auto flex w-max items-center gap-3 sm:gap-4"
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
                className="mx-auto mt-6 max-w-xl text-center text-sm leading-relaxed text-muted"
            >
                {activeType === 'all'
                    ? 'Everything we offer, side by side — switch categories to focus on what fits.'
                    : active?.description}
            </p>
        </div>
    );
}