import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { cn } from '@/Utils/cn';

export function FormField({ label, error, children, className, description }) {
    return (
        <div className={cn('space-y-1.5', className)}>
            {label && <InputLabel className="text-gray-300">{label}</InputLabel>}
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
                    'block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-primary focus:ring-1 focus:ring-primary',
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
                    'block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-primary focus:ring-1 focus:ring-primary',
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
                    'block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white transition-colors focus:border-primary focus:ring-1 focus:ring-primary',
                    error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500',
                )}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-gray-900">
                        {opt.label}
                    </option>
                ))}
            </select>
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
                    props.checked ? 'bg-primary' : 'bg-gray-700',
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
                {label && <span className="text-sm font-medium text-gray-300">{label}</span>}
                {description && <p className="text-xs text-gray-500">{description}</p>}
            </div>
        </div>
    );
}

export function FormCard({ title, description, children }) {
    return (
        <div className="rounded-2xl border border-white/5 bg-gray-900 p-6">
            {(title || description) && (
                <div className="mb-6">
                    {title && <h3 className="text-lg font-semibold">{title}</h3>}
                    {description && <p className="mt-1 text-sm text-gray-400">{description}</p>}
                </div>
            )}
            {children}
        </div>
    );
}
