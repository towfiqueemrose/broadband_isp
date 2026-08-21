import BrandLogo from '@/Components/BrandLogo';
import Icon from '@/Components/UI/Icon';
import { Head, Link, useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

const highlights = [
    { icon: 'wifi', text: 'Blazing-fast fiber network' },
    { icon: 'shield-check', text: 'Secure admin workspace' },
    { icon: 'gauge', text: 'Real-time content control' },
];

export default function Login({ status }) {
    const { brand, settings } = usePage().props;
    const loginImage = settings?.login_image ? `/storage/${settings.login_image}` : null;

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => setData('password', ''),
        });
    };

    return (
        <div className="flex min-h-screen bg-background">
            <Head title="Log in" />

            <section className="relative hidden w-[46%] shrink-0 overflow-hidden lg:flex xl:w-[52%]">
                {loginImage ? (
                    <img
                        src={loginImage}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/40 to-gray-950/30" />

                <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '28px 28px',
                    }}
                />

                <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <BrandLogo className="h-11 w-11 rounded-2xl" />
                        <span className="text-xl font-bold tracking-tightest text-white">
                            {brand?.name ?? 'NexaLink'}
                        </span>
                    </Link>

                    <div className="max-w-md">
                        <h2 className="text-3xl font-bold leading-tight tracking-tightest text-white xl:text-4xl">
                            {brand?.tagline || 'Connectivity that moves you forward.'}
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-white/70">
                            Sign in to manage packages, promotions, and everything that powers the
                            {' '}
                            {brand?.name ?? 'NexaLink'} website.
                        </p>

                        <ul className="mt-8 space-y-3.5">
                            {highlights.map((item) => (
                                <li key={item.text} className="flex items-center gap-3 text-sm font-medium text-white/85">
                                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10 backdrop-blur-sm">
                                        <Icon name={item.icon} className="h-4 w-4 text-white" />
                                    </span>
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <main className="flex flex-1 flex-col px-6 py-10 sm:px-10 lg:px-16 xl:px-20">
                <div className="flex items-center gap-3 lg:hidden">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <BrandLogo className="h-9 w-9" />
                        <span className="text-lg font-bold tracking-tight text-ink">
                            {brand?.name ?? 'NexaLink'}
                        </span>
                    </Link>
                </div>

                <div className="flex flex-1 items-center">
                    <div className="mx-auto w-full max-w-md">
                        <div className="mb-8 lg:mb-10">
                            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                                Admin Portal
                            </p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tightest text-ink sm:text-4xl">
                                Welcome back
                            </h1>
                            <p className="mt-2.5 text-sm text-muted">
                                Enter your credentials to access your account.
                            </p>
                        </div>

                        {status && (
                            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-success/25 bg-success/10 px-4 py-3 text-sm font-medium text-success">
                                <Icon name="check-circle" className="mt-0.5 h-4 w-4 shrink-0" />
                                {status}
                            </div>
                        )}

                        {(errors.email && !data.email) && (
                            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-error/25 bg-error/10 px-4 py-3 text-sm font-medium text-error">
                                <Icon name="x" className="mt-0.5 h-4 w-4 shrink-0" />
                                {errors.email}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5" noValidate>
                            <div>
                                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
                                    Email address
                                </label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted">
                                        <Icon name="mail" className="h-[18px] w-[18px]" />
                                    </span>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        autoFocus
                                        placeholder="you@company.com"
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={
                                            'block w-full rounded-xl border bg-surface py-3 pl-11 pr-4 text-sm text-ink shadow-card outline-none transition-all placeholder:text-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 ' +
                                            (errors.email && data.email
                                                ? 'border-error'
                                                : 'border-border')
                                        }
                                    />
                                </div>
                                {errors.email && data.email && (
                                    <p className="mt-1.5 text-xs font-medium text-error">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink">
                                    Password
                                </label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted">
                                        <Icon name="lock" className="h-[18px] w-[18px]" />
                                    </span>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={
                                            'block w-full rounded-xl border bg-surface py-3 pl-11 pr-12 text-sm text-ink shadow-card outline-none transition-all placeholder:text-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 ' +
                                            (errors.password
                                                ? 'border-error'
                                                : 'border-border')
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted transition-colors hover:text-ink"
                                    >
                                        <Icon name={showPassword ? 'eye-off' : 'eye'} className="h-[18px] w-[18px]" />
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1.5 text-xs font-medium text-error">{errors.password}</p>
                                )}
                            </div>

                            <label className="flex cursor-pointer select-none items-center gap-2.5">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="h-4 w-4 rounded border-border text-primary accent-[var(--primary)] focus:ring-2 focus:ring-ring"
                                />
                                <span className="text-sm font-medium text-foreground">Remember me</span>
                            </label>

                            <button
                                type="submit"
                                disabled={processing}
                                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-200 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60"
                            >
                                {processing ? (
                                    <>
                                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                                            <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                        </svg>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign in
                                        <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-xs text-muted">
                            Protected area · Authorized personnel only
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-6 text-xs text-muted">
                    <Link href="/" className="font-medium transition-colors hover:text-primary">
                        &larr; Back to website
                    </Link>
                    <span>&copy; {new Date().getFullYear()} {brand?.name ?? 'NexaLink'}</span>
                </div>
            </main>
        </div>
    );
}
