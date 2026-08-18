import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Button from '@/Components/UI/Button';
import Icon from '@/Components/UI/Icon';

export default function Stub({ page }) {
    return (
        <PublicLayout>
            <Head>
                <title>{page.title}</title>
                <meta name="description" content={page.description} />
            </Head>

            <section className="relative overflow-hidden" aria-labelledby="stub-heading">
                <div
                    className="absolute inset-0"
                    aria-hidden="true"
                    style={{
                        backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                >
                    <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_0%,var(--primary-soft),transparent_70%)]" />
                </div>

                <div className="container-page relative flex flex-col items-center px-4 py-28 text-center sm:py-36">
                    <span className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-soft text-primary-dark shadow-soft">
                        <Icon name={page.icon ?? 'globe'} className="h-9 w-9" />
                    </span>

                    <h1
                        id="stub-heading"
                        className="mt-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
                    >
                        {page.title}
                    </h1>

                    <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                        {page.description}
                    </p>

                    <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
                        {page.cta ? (
                            <Button href={route(page.cta.route)} size="lg">
                                {page.cta.label}
                                <Icon name="arrow-up-right" className="h-4 w-4" />
                            </Button>
                        ) : null}
                        <Button href={route('home')} variant="outline" size="lg">
                            Back to homepage
                        </Button>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
