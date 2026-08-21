import React from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import Icon from '@/Components/UI/Icon';
import { cn } from '@/Utils/cn';

export function FormField({ label, error, children, className, description }) {
    return (
        <div className={cn('space-y-1.5', className)}>
            {label && <InputLabel className="text-gray-900">{label}</InputLabel>}
            {description && <p className="text-xs text-gray-500">{description}</p>}
            {children}
            {error && <InputError message={error} className="mt-1" />}
        </div>
    );
}

export function FormInput({ label, error, description, ...props }) {
    return (
        <FormField label={label} error={error} description={description}>
            <TextInput
                {...props}
                className={cn(
                    'block w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary focus:ring-1 focus:ring-primary',
                    error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500',
                )}
            />
        </FormField>
    );
}

export function FormTextarea({ label, error, description, ...props }) {
    return (
        <FormField label={label} error={error} description={description}>
            <textarea
                {...props}
                className={cn(
                    'block w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary focus:ring-1 focus:ring-primary',
                    error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500',
                )}
            />
        </FormField>
    );
}

export function FormSelect({ label, error, description, options = [], ...props }) {
    return (
        <FormField label={label} error={error} description={description}>
            <select
                {...props}
                className={cn(
                    'block w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-primary focus:ring-1 focus:ring-primary',
                    error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500',
                )}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-white text-gray-900">
                        {opt.label}
                    </option>
                ))}
            </select>
        </FormField>
    );
}

export function FormRange({ label, description, error, min = 0, max = 100, step = 1, value, onChange, suffix = '' }) {
    return (
        <FormField label={label} error={error} description={description}>
            <div className="flex items-center gap-3">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-primary"
                />
                <span className="w-12 shrink-0 text-right text-sm font-semibold text-gray-900">
                    {value}{suffix}
                </span>
            </div>
        </FormField>
    );
}

export function FormSwitch({ label, description, ...props }) {
    return (
        <div className="flex items-center gap-3">
            <button
                type="button"
                role="switch"
                aria-checked={props.checked}
                onClick={() => props.onChange(!props.checked)}
                className={cn(
                    'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200',
                    props.checked ? 'bg-primary' : 'bg-gray-300',
                )}
            >
                <span
                    className={cn(
                        'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transition-transform duration-200',
                        props.checked ? 'translate-x-5' : 'translate-x-0',
                    )}
                />
            </button>
            <div>
                {label && <span className="text-sm font-medium text-gray-900">{label}</span>}
                {description && <p className="text-xs text-gray-500">{description}</p>}
            </div>
        </div>
    );
}

export const ICON_OPTIONS = [
    { value: 'bolt', label: 'Bolt' },
    { value: 'shield-check', label: 'Shield Check' },
    { value: 'check', label: 'Check' },
    { value: 'check-circle', label: 'Check Circle' },
    { value: 'zap', label: 'Zap' },
    { value: 'sparkles', label: 'Sparkles' },
    { value: 'star', label: 'Star' },
    { value: 'heart', label: 'Heart' },
    { value: 'activity', label: 'Activity' },
    { value: 'trending-up', label: 'Trending Up' },
    { value: 'users', label: 'Users' },
    { value: 'user', label: 'User' },
    { value: 'globe', label: 'Globe' },
    { value: 'home', label: 'Home' },
    { value: 'layers', label: 'Layers' },
    { value: 'briefcase', label: 'Briefcase' },
    { value: 'server', label: 'Server' },
    { value: 'server-stack', label: 'Server Stack' },
    { value: 'building-office', label: 'Building' },
    { value: 'monitor', label: 'Monitor' },
    { value: 'document', label: 'Document' },
    { value: 'gift', label: 'Gift' },
    { value: 'refresh', label: 'Refresh' },
    { value: 'signal', label: 'Signal' },
    { value: 'wifi', label: 'WiFi' },
    { value: 'fiber', label: 'Fiber' },
    { value: 'gauge', label: 'Gauge' },
    { value: 'headset', label: 'Headset' },
    { value: 'phone', label: 'Phone' },
    { value: 'mail', label: 'Mail' },
    { value: 'map-pin', label: 'Map Pin' },
    { value: 'clock', label: 'Clock' },
    { value: 'chat', label: 'Chat' },
    { value: 'smile', label: 'Smile' },
    { value: 'play', label: 'Play' },
    { value: 'eye', label: 'Eye' },
    { value: 'eye-off', label: 'Eye Off' },
    { value: 'lock', label: 'Lock' },
    { value: 'edit', label: 'Edit' },
    { value: 'trash', label: 'Trash' },
    { value: 'plus', label: 'Plus' },
    { value: 'arrow-right', label: 'Arrow Right' },
    { value: 'arrow-up-right', label: 'Arrow Up Right' },
    { value: 'arrow-down', label: 'Arrow Down' },
    { value: 'arrow-up-circle', label: 'Arrow Up Circle' },
    { value: 'chevron-down', label: 'Chevron Down' },
    { value: 'menu', label: 'Menu' },
    { value: 'x', label: 'Close' },
];

export function IconSelect({ label, error, description, value, onChange }) {
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef(null);

    React.useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const selected = ICON_OPTIONS.find((o) => o.value === value);

    return (
        <FormField label={label} error={error} description={description}>
            <div ref={ref} className="relative">
                {/* Trigger button */}
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className={cn(
                        'flex w-full items-center gap-3 rounded-xl border bg-white px-4 py-2.5 text-left text-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary',
                        open ? 'border-primary ring-1 ring-primary' : 'border-gray-300',
                        error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500',
                    )}
                >
                    <span className={cn(
                        'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                        selected ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400',
                    )}>
                        {selected ? <Icon name={value} className="h-4 w-4" /> : <span className="text-xs">?</span>}
                    </span>
                    <span className={cn('flex-1 truncate', selected ? 'font-medium text-gray-900' : 'text-gray-400')}>
                        {selected ? selected.label : 'Select an icon'}
                    </span>
                    <Icon name="chevron-down" className={cn('h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200', open && 'rotate-180')} />
                </button>

                {/* Dropdown */}
                {open && (
                    <div className="absolute z-50 mt-1 w-full max-h-64 overflow-auto rounded-xl border border-gray-200 bg-white shadow-lg">
                        {/* Clear option */}
                        <button
                            type="button"
                            onClick={() => { onChange(''); setOpen(false); }}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-500 hover:bg-gray-50 transition-colors border-b border-gray-100"
                        >
                            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                                <Icon name="x" className="h-3.5 w-3.5" />
                            </span>
                            <span className="text-gray-400">Clear selection</span>
                        </button>
                        {/* Icon options */}
                        {ICON_OPTIONS.map((icon) => (
                            <button
                                key={icon.value}
                                type="button"
                                onClick={() => { onChange(icon.value); setOpen(false); }}
                                className={cn(
                                    'flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors',
                                    value === icon.value
                                        ? 'bg-primary/5 text-primary font-medium'
                                        : 'text-gray-700 hover:bg-gray-50',
                                )}
                            >
                                <span className={cn(
                                    'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                                    value === icon.value ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500',
                                )}>
                                    <Icon name={icon.value} className="h-4 w-4" />
                                </span>
                                <span className="flex-1">{icon.label}</span>
                                {value === icon.value && <Icon name="check" className="h-4 w-4 shrink-0 text-primary" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </FormField>
    );
}

export function FormCard({ title, description, children }) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
            {(title || description) && (
                <div className="mb-6">
                    {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
                    {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
                </div>
            )}
            {children}
        </div>
    );
}
